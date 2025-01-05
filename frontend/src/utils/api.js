import axios from "axios";

// Define the base URL for your backend
const BASE_URL = "http://localhost:5001/api"; // Update with the deployed backend URL

// Function to call the backend API
export const generateText = async (input) => {
  try {
    const response = await axios.post(`${BASE_URL}/generate-text`, { input });
    return response.data.result; // Extract the AI-generated result
  } catch (error) {
    console.error("Error calling backend API:", error);
    throw error;
  }
};