import json
from flask import request,Flask
from story import Story
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



#input:
#initial_prompt
#reading_level
@app.route('/story/new',  methods=['POST'])
def story_new():
    request_data = request.json
    new_story = Story()
    #response  = new_story.init_story("a stormtrooper in star wars goes on a heist adventure")
    response  = new_story.init_story(request_data['initial_prompt'])
    response['story_id'] =new_story.story_id
    return json.dumps(response)

#input:
#story_id
#continue_choice_id
@app.route('/story/continue', methods=['POST'])
def story_continue():
    request_data = request.json
    story = Story(request_data['story_id'])
    response = story.continue_story(str(request_data['continue_choice_id']))
    response['story_id'] = story.story_id
    return json.dumps(response)

app.run()