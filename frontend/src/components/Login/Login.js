import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';



const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    // Basic validation for empty fields
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    // If form is valid, reset error and handle submission (e.g., send to API)
    setError('');
    console.log('Login successful', formData);
    // Add API call or further handling here
  };

  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate('/SignUp');
  };

  return (
    <section className="login" id="login">
      <form onSubmit={handleSubmit}>
        <h1>SyllabAI - Login</h1>
        
        {error && <p className="error">{error}</p>}

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
        
        <button id="submit-button" type="submit">Login</button>
        {/* Sign up button under the submit button */}
        
        <span id="login-span">Don't have an account? <a id= "sign-up-link" onClick={navigateToSignUp}>Sign up</a></span>
      </form>
    </section>
  );
};

export default Login;
