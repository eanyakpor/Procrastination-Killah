require("dotenv").config();


const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate text with OpenAI
const generateText = async (input) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating text with OpenAI:", error);
    throw error;
  }
};

module.exports = { generateText }