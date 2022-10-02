export default async function InitPrompt(prompt) {
  const rawResponse = await fetch("http://127.0.0.1:5000/story/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initial_prompt: prompt,
      reading_level: "",
    }),
  });
  const content = await rawResponse.json();

  return content;
}
