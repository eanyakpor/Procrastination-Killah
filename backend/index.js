const express = require("express");
const { generateText } = require("./openai"); // Import your function
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow cross-origin requests from frontend

// Define a POST endpoint for generateText
app.post("/api/generate-text", async (req, res) => {
  const { input } = req.body; // Expecting input from the frontend
  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  try {
    const response = await generateText(input); // Call the generateText function
    res.json({ result: response });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

// Start the server
const PORT = 5001; // Use any available port
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
