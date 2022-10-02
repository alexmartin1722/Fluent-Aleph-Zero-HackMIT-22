export default async function ContinPrompt(storyId, continueChoiceId) {
  const rawResponse = await fetch("http://127.0.0.1:5000/story/continue", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      story_id: storyId,
      continue_choice_id: continueChoiceId,
    }),
  });
  const content = await rawResponse.json();

  return content;
}
