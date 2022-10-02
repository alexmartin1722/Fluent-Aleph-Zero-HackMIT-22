from os import walk
import json
from services.diffusion import StableDiffusion
from services.gpt import GPT
from nltk.tokenize import sent_tokenize




class Story():
    def __init__(self,story_id=None):
        self.gpt = GPT()
        self.stable_diffusion = StableDiffusion()
        #if we are creating a new story
        if story_id == None:
            self.story_id,story_data = self.init_story_file()
            self.story_parts = story_data['story_parts']
            self.quiz_parts = story_data['quiz_parts']
            return
        else:
            self.story_id = story_id
            story_data =  self.load_story_file(story_id)
            self.story_parts = story_data['story_parts']
            self.quiz_parts = story_data['quiz_parts']


    def get_story_path_from_id(self,story_id):
        return "./stories/story_" + str(story_id) + ".json"

    def get_new_story_id(self):
        #get all current stories and their ids to determine new story id
        filenames = next(walk("./stories"), (None, None, []))[2]
        story_ids = [int(i.split("_")[1].split(".")[0]) for i in filenames]
        story_ids.sort()
        return story_ids[-1] + 1

    def init_story_file(self):
        story_id = self.get_new_story_id()
        file_path =self.get_story_path_from_id(story_id)
        story_data = {"id":story_id,"story_parts":[],"quiz_parts":[]}
        with open(file_path, 'w') as f:
            json.dump(story_data, f, indent=4)
        return story_id,story_data

    def load_story_file(self,story_id):
        story_file_path = self.get_story_path_from_id(story_id)
        f = open(story_file_path)
        story_data = json.load(f)
        return story_data
    
    def update_story_file(self):
        story_data = {"id":self.story_id,"story_parts":self.story_parts,"quiz_parts":self.quiz_parts}
        file_path =self.get_story_path_from_id(self.story_id)
        with open(file_path, 'w') as f:
            json.dump(story_data, f, indent=4)

    def save_new_story_part(self,paragraph,image_url,next_options):
        story_part = {"story_part_id":len(self.story_parts),"text":paragraph,"image_url":image_url,"next_options":next_options,"selected_option_id": None}
        self.story_parts.append(story_part)
        self.update_story_file()
        return story_part

    def save_story_selected_option(self,selected_option):
        self.story_parts[-1]['selected_option_id'] = selected_option
        self.update_story_file()
        return self.story_parts[-1]

    def save_new_quiz(self, quiz):
        self.quiz_parts.append(quiz)
        self.update_story_file()
        return quiz
    
    def get_full_story(self):
        full_text = ""
        for story_part in self.story_parts:
            full_text += story_part['text']
        return full_text
    
    def init_story(self,initial_prompt="John the prince"):
        prompt = self.gpt.generate_story_prompt(initial_prompt)
        story, story_options = self.gpt.get_story_and_options(prompt)
        image_url = self.stable_diffusion.get_image_from_paragraph(story)
        story_part_formatted = self.save_new_story_part(story,image_url,story_options)
        return story_part_formatted

    def get_fitting_full_story(self,full_story):
        story_tokenized = sent_tokenize(full_story)
        story = ""
        for i in reversed(range(len(story_tokenized))):
            print(len(story))
            story = story_tokenized[i]+story
            if len(story) > 400:
                return story
        return story

    
    def continue_story(self,continue_option_id):
        self.save_story_selected_option(continue_option_id)
        full_story = self.get_full_story()
        fitting_full_story = self.get_fitting_full_story(full_story)
        selected_option = self.story_parts[-1]['next_options'][continue_option_id]
        prompt = self.gpt.generate_continuation_prompt(fitting_full_story,selected_option)
        new_story_part, new_story_part_options = self.gpt.get_story_and_options(prompt)
        if len(new_story_part) == 0:
            input()
        image_url = self.stable_diffusion.get_image_from_paragraph(new_story_part)
        story_part_formatted = self.save_new_story_part(new_story_part,image_url,new_story_part_options)
        story_part_formatted_return = story_part_formatted.copy()
        if len(self.story_parts) % 1 == 0:
            quiz_part = self.create_quiz()
            if quiz_part != None:
                story_part_formatted_return['quiz'] = quiz_part
        return story_part_formatted_return
        
    def create_quiz(self):
        curr_story = self.story_parts[-1]['text']
        quiz = self.gpt.get_quiz_and_answer(curr_text=curr_story)
        if quiz == None:
            return None
        quiz['story_part_id'] = len(self.story_parts)-1
        quiz_part = self.save_new_quiz(quiz)
        print(quiz)
        return quiz_part
