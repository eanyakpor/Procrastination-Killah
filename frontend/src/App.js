import './App.css';
import React, { useState } from 'react';
import { database } from "./firebase.js";
import { ref, push } from "firebase/database";
import { ref as sRef } from 'firebase/storage';

function App() {
  const [inputValue, setInputValue] = useState("");
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
      // Push the input value into Firebase 
      await push(dbRef, { value: inputValue, timestamp: Date.now() });
      alert("Data Submitted Succesfully!");
      setInputValue("") // Clear the input field
    } catch (error) {
      console.error("Error submitting data: ", error);
      alert("An error occurred while submitting data.");
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
    </div>
  );
}

export default App;
