import os.path as osp
import json
import replicate
import nltk
from nltk.tokenize import sent_tokenize

class StableDiffusion():
    def __init__(self):
        self.debug = False
        nltk.download('punkt')
        self.diffusion = replicate.models.get("stability-ai/stable-diffusion")

    def get_prompt_from_paragraph(self,sentence):
        return str(sentence).strip() + ' painted by Hayao Miyazaki'

    def get_image_from_prompt(self,prompt):
        if self.debug:
             return "PlACEHOLDER" 
        try:
            return self.diffusion.predict(prompt=prompt)
        except Exception:
            return None

    def get_image_from_paragraph(self,paragraph):
        print(paragraph)
        image_url = None
        sentence_index = 0
        tokenized_paragraph = sent_tokenize(paragraph)
        print(tokenized_paragraph)
        while image_url == None and sentence_index < len(tokenized_paragraph):
            print("Attempting to generate image with: "+tokenized_paragraph[sentence_index])
            prompt = self.get_prompt_from_paragraph(tokenized_paragraph[sentence_index])
            image_url =  self.get_image_from_prompt(prompt)
            sentence_index += 1
        return image_url
