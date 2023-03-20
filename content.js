document.addEventListener("mouseup", async () => {
  // Get the selected text
  const selectedText = window.getSelection().toString();
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  
  if(!selectedText) {
	  return; 
  }

  // Make an API request to OpenAI
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer ",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
	  max_tokens: 10,
      temperature: 0,
      n: 1,
      messages: [{
		  "role": "user", 
		  "content": selectedText + "Tl;dr"}]
	}),
  });

  // Parse the response JSON
  const data = await response.json();
  const newText = data.choices[0].message.content;

  // Replace the selected text with the response
  range.deleteContents();
  range.insertNode(document.createTextNode(newText));
});