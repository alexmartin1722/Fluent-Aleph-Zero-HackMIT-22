from dotenv import load_dotenv
from story import Story

load_dotenv()

story = Story()
story_part = story.init_story("a space cowboy goes on a heist adventure")
for i in range(10):
    story_part = story.continue_story(0)
