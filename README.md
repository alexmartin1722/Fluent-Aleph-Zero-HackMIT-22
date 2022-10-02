# Fluent.ai :koala:
1. [About](#About)
2. [How To Run](#How-To-Run)
3. [Educational Background](#Educational-Background)
4. [Models](#Models)
5. [GPT-3](#GPT-3)
6. [Stable Diffusion](#Stable-Diffusion)
7. [FAQ](#FAQ)
8. [The Team](#The-Team)

### About
Our mission is to build emotionally-engaging, infinite stories for learning languages. 

We present our first infinite story: Aleph Zero, named after the smallest infinite cardinal number.

There are three parts:
1. A story where you choose what happens next.
2. A beautiful painting depicting the choices you make.
3. A quiz to test your understanding of your story.

### Learning English Shouldn't Be a Chore

There are two steps to effective language learning. 

Step 1: Find content that you are emotionally invested in. 
Step 2: Consume a lot of that content.

That's it; it's that simple.

My friend didn't learn Korean from Korean class. 

She learned by watching Korean Dramas.

Mike He didn't learn English from the two years of textbooks and worksheets from his ESL class. 

He learned by reading Orwell's _Animal Farm_.

By letting the user decide what happens to a character, and present a visual representation of their choices, it makes their choices have weight. The gamification.

### Future Vision
Our future vision is to continue increasing the emotional investment by . 

Imagine being able to create a short film where you control what happens next.

By leveraging generative AI models, anyone can learn any language, with content custom-tailored to their interests. 

### Tech Stack

**AI APIs**
* OpenAI AI GPT-3 davinci-002
* [Stability.ai](https://stability.ai/) Stable Diffusion via [Replicate](https://replicate.com/)

**Frontend**
* React

## How To Run

**Runn Locally**
1. Retrieve API keys. Your OpenAI API key can be found [here](https://beta.openai.com/account/api-keys). The Replicate key can be found [here](https://replicate.com/account). Fill in the keys into the `.env` file.
2. Node stuff HERE

**Static Demo**

## Educational Background
### Our Experience with ELL Education
@Mike He, can you put your expereince with learning english here

### ELL Statistics
- 4.9 Million ELL Students
- ELL enrolment increased 28.1% between 2000 and 2017


### Why a Story Book? 
A lot of people learn languages through ways that entertain them. They either listen to music, watch movies or TV shows, or play video games. We wanted to include images in our story to make it more interesting and entertaining than just reading plain text output.
#### Why images? 
> Giving students options that include music and or art to develop language increases the amount of language production and participation on assignments by students - **Center for Applied Linguistics**

## Models
### GPT-3:
#### Background for Understanding GPT: 
##### Zero-Shot Tasks:
GPT is a state-of-the-art (SOTA) model for zero-shot tasks. A zero-shot task has no demonstrations and a natural language instruction describing the task. 
##### One-shot and Few-shot Continuation and Closure:
GPT is also SOTA on LAMBADA tests. A LAMBADA test is used for modeling dependencies in text, requiring reading a paragraph of text for context. It's results for StoryCloze, a test for story closure, are not SOTA, but still produce comparable results to the SOTA model. 
#### Question Answering
**Closed Book Question Answering:** If you haven't guessed it already, GPT is SOTA in zero-shot, one-shot, and few-shot question answering. 


#### Why GPT?
**Zero-shot:** The SOTA zero-shot performance of the model means it is the best for starting our story. We provided the model with no context and just ask for it to generate a story based on the users input. We also prompt the model for question generation without examples which requires a high performance on zero-shot tasks.

**One-shot and Few-shot:** The results of GPT on one-shot and few-shot are either SOTA or comparable to SOTA. This means that we can use this model for story continuation and finalization with good faith in it's performance. 

**Question Answering** GPT is SOTA in zero-shot, one-shot, and few-shot question answering, making it suitable for any time of question answering system that might be used to measure English literacy.

#### How We Use GPT-3
**Story Generation:** We use GPT-3 to generate the paragraphs of the story based on the prompts we engineer from user input.

**Story Continuation:** We feed GPT-3 the context of the story and then ask for it to give us two options for continuation. 

**Question Generation:** We feed GPT-3 the previous paragraph for context to create a multiple choice question to test reading comprehension.

**Text Summarization:** We feed GPT-3 each paragraph and summarize the text into one sentence to feed the stable diffusion model. 


In summary, GPT is just an amazing model. It would be a waste not to use it. For more information on the models incredible performance across a large range of metrics, see the paper below. 

Paper: Brown et al 2020 [arvix](https://arxiv.org/pdf/2005.14165.pdf)


### Stable Diffusion:
#### Background for Understanding Stable Diffusion
##### Variational Autoencoders (VAE)
VAE has two parts, encoder and decoder.
**Encoder:** Convert the image into a low dimensional latent representation
**Decoder:** Transforms the latent representation back into an image

**Training:** Encoder gets the latents of the images for forward diffusion. 
**Infrence:** Decoder converts denoised latents generated by reverse diffusion back into images


##### U-Net 
U-Net consists of econder and decoder
**Encoder:** Compresses an image into a lower resolution image
**Decoder:** Decodes the lower resolution back to the original higer resolution image. 
**Output:** Predicts the noise residual (used to predic denoise image representation)

##### Text-Encoder
Uses CLIP trained text encoder see Radford et al 2021 [arvix](https://arxiv.org/pdf/2103.00020v1.pdf)

#### Why Stable Diffusion
**Speed:** U-Net operates on a low dimensional space which reduces the memory and computational requirements. This makes the speed of the model proposed by Rombach et al. much faster than other diffusion models, like pixel-space diffusion. 

To sumarize, the stable diffusion model was selected due to its unmatched speed. Other text-to-image models, like Dall-E, are too slow for a user interface where we want the user to be constantly engaged and not waiting for images to load. For more information on the stable diffusion model see the paper below.

Paper: Rombach et al 2022 [arvix](https://arxiv.org/pdf/2112.10752.pdf)

## FAQ
#### Why don't you feed GPT example text at the beginning?
Welcome to the few-shot paradigm ([Reynolds and McDonell](https://arxiv.org/pdf/2102.07350.pdf)). 

## API's Used:
1) OpenAI GPT-3 davinci-002
2) StabilityAI Stable Diffusion via replicate


## The Team
Yibo (Mike) He [github](https://github.com/mikehe123) [linkedin](https://www.linkedin.com/in/yibo-he/) [website]()
- BIO 

Mike Giardino [github](https://github.com/Mgiar2015) [linkedin](https://www.linkedin.com/in/michael-giardino/) [website]()
- BIO

Neil Yeung [github](https://github.com/Genuinely) [linkedin](https://www.linkedin.com/in/neilyeung/) [website](neilyeung.com)
- BIO

Alex Martin [github](https://github.com/alexmartin1722) [linkedin](https://www.linkedin.com/in/alexander-david-paul-martin/) [website](https://alexmartin1722.github.io/resume-website/)
- BIO
