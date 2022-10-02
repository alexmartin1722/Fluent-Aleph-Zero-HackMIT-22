import os, json
import openai
import nltk

class GPT():
    def __init__(self):
        nltk.download('punkt')
        openai.api_key = os.getenv('OPENAI_API_KEY')

    def generate_continuation_prompt(self, full_text, prompt):
        return full_text + "\n" + "continue the story with: '" + prompt + "'\n"

    #fix this prompt
    def generate_option_prompt(self,num_options):
        return '\nAsk the user how the above story should continue and give them ' + str(num_options) + 'different options in a numbered list. Each option is on its own line:\nQuestion:'

    def generate_story_prompt(self,prompt):
        return "Tell the beginning of a story about " + prompt + "."

    def generate_quiz_prompt(self, curr_text, question_type='reading comprehension', num_options=4):
        quiz_prompt = curr_text + '\nGenerate one ' +  question_type + ' question with ' + str(num_options) + ' numbered answer options seperated by a new line and tell me which option is the correct answer based off the above paragraph\nQuestion:' 
        #quiz_prompt = curr_text + '\nIdentify a common noun in the above text and generate a question asking for the definition of the noun with 3 incorrect answers and 1 correct answer numbered and seperated by a new line and tell me which option is the correct answer based on the dictonary definition\nQuestion:'
        return quiz_prompt

    def parse_option_response(self,raw_options):
        formatted_options = []
        lines = raw_options.strip().splitlines()
        for line in lines:
            if len(line.strip()) > 0:
                try:
                    formatted_options.append(line.split(".")[1].strip())
                except:
                    return None
        formatted_options = { int(i) : formatted_options[i] for i in range(len(formatted_options)) }
        if len(formatted_options) != 2 or formatted_options[0] == formatted_options[1]:
            return None
        return formatted_options

    def parse_quiz_response(self,raw_options):
        quiz = {}
        formatted_options = []
        lines = raw_options.strip().splitlines()
        for line in lines:
            if len(line.strip()) > 0:
                formatted_options.append(line.strip())
        quiz["answer_id"] = None
        quiz["question"] = formatted_options.pop(0)
        formatted_no_numbers = []
        for i in formatted_options:
            try:
                if ")" in i:
                    formatted_no_numbers.append(i.split(")")[1])
                else:
                    formatted_no_numbers.append(i.split(".")[1])
            except Exception:
                return None
        answer = formatted_no_numbers.pop()
        quiz["options"] = { int(i) : formatted_no_numbers[i] for i in range(len(formatted_no_numbers)) }
        for key in quiz["options"]:
            if answer == quiz["options"][key]:
                quiz["answer_id"] = key
        if len(quiz["options"]) > 4:
            return None
        if len(quiz["question"].strip()) == 0:
            return None
        if quiz["answer_id"] == None:
            return None
        return quiz

    def get_result_from_prompt(self,prompt):
        result_text = ""
        
        while len(result_text) == 0:
            print("Calling GPT 3")
            api_result = openai.Completion.create(
                model="text-davinci-002",
                prompt=prompt,
                max_tokens=100, # 100 tokens ~5 sentences / paragraph.
                temperature=0.8,
            )
            result_text = api_result.choices[0].text.strip()
        return result_text

    def get_story_and_options(self,prompt):
        story_prompt = prompt
        story = self.get_result_from_prompt(story_prompt)
        # hard code in two options for now
        story_option_prompt = story + self.generate_option_prompt(2)
        story_options = None
        attempt = 0
        while story_options == None:
            print("Generating Prompt Attempt: "+str(attempt))
            story_options_raw = self.get_result_from_prompt(story_option_prompt)
            story_options = self.parse_option_response(story_options_raw)
            attempt += 1
            if attempt > 20:
                raise Exception
        return story, story_options

    def get_quiz_and_answer(self, curr_text):
        quiz = None
        attempt = 0
        quiz_prompt = self.generate_quiz_prompt(curr_text)
        while quiz == None:
            #figure this out what to do at 20 attempts
            print("Generating Quiz Attempt: "+str(attempt))
            quiz_and_answer = self.get_result_from_prompt(quiz_prompt)
            quiz = self.parse_quiz_response(quiz_and_answer)
            attempt += 1
            if attempt > 5:
                return None
        return quiz