import './App.css';
import React, { useState } from 'react';
import { database } from "./firebase.js";
import { ref, push } from "firebase/database";
import { ref as sRef } from 'firebase/storage';
import { generateText } from "./utils/api.js";


function App() {
  // states to manage user input and Ai output 
  const [inputValue, setInputValue] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const dbRef = ref(database, "inputs");
  // handle input change 
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // handle form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      alert("Input cannot be empty");
      return;
    }
    try {
      console.log("inputted value", inputValue)
      const response = await generateText(inputValue); // Call backend API
      setAiResponse(response);
    } catch (error) {
      console.error("Error generating AI response:", error);
      alert("Failed to generate AI response.");
    }
  }
  return (
    <div className="App">
      <h1>Submit Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your input"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>
      {aiResponse && (
        <div>
          <h2>AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
