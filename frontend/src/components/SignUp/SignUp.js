import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for empty fields and password mismatch
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // If form is valid, reset error and handle submission (e.g., send to API)
    setError('');
    console.log('Form submitted', formData);
    // Add API call or further handling here
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/Login');
  };

  return (
    <section className="sign-up" id="sign-up">
      <form onSubmit={handleSubmit}>
        <h1>SyllabAI - Sign Up</h1>
        
        {error && <p className="error">{error}</p>}

        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        /> 
        
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          id="confirm-password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
        />
        
        <button id="submit-button" type="submit">Sign Up</button>
        <span id = "signup-span">Have an account? <a id= "login-link" onClick={navigateToLogin}>Log in</a></span>
      </form>
    </section>
  );
};

export default SignUp;
