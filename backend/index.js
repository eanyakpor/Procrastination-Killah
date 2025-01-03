require("dotenv").config();


const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const completion = openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    store: true,
    messages: [
      {"role": "user", "content": "write a haiku about ai"},
    ],
  });
  
  completion
  .then((result) => console.log(result.choices[0]))
  .catch((error) => console.error(error));