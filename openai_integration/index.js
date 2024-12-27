const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// CREATE
app.post("/find-complexity", async (req, res) => {
    try{
        const { prompt } = req.body;
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            max_tokens: 64,
            temperature: 0,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        return res.status(200).json({
            success: true,
            data: response.choices[0].message.content.trim(), // Use .message.content for chat-based models
        });

        /*if (response.choices && response.choices.length > 0) {
            return res.status(200).json({
                success: true,
                data: response.choices[0].message.content.trim(), // Access the response properly
            });
        } else {
            throw new Error("No response from OpenAI");
        }*/
    }catch (error) {
        //console.error(error);
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : "There was an issue on the server",
        })
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));