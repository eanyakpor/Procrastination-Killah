import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  // Smooth scroll to the Sign In section
  const scrollToSignIn = () => {
    const signInSection = document.getElementById('sign-in');
    signInSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <nav>
        <h3>SyllabAI</h3>
        <a href="#faq">FAQ</a>
        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#about" onClick={toggleMenu}>About</a></li>
              <li><a href="#experience" onClick={toggleMenu}>Experience</a></li>
              <li><a href="#project" onClick={toggleMenu}>Projects</a></li>
              <li><a href="#contact" onClick={toggleMenu}>Contacts</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="story">
        <h1>Get an AI study partner.</h1>
        <h1><span className="highlight-text" data-text="Glitch">Use SyllabAI.</span></h1>
        <p>
          SyllabAI is designed to help students like you stay organized and on track with your studies.
          Leverage AI to create personalized study plans, track your progress, and excel in your academic journey.
        </p>
        <button id="learn-more-button" onClick={toggleModal}>Learn More</button>
      </section>

      <section className="gif-container">
        <iframe 
          src="https://tenor.com/embed/15115777" 
          width="480" 
          height="270" 
          frameBorder="0" 
          className="tenor-gif-embed" 
          allowFullScreen
        ></iframe>
      </section>

      <section id="faq">
        <span id="hidden">.</span>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How does SyllabAI help with my studies?</h3>
          <p>SyllabAI uses AI to create personalized study plans and track your progress. It helps you stay organized and improve your academic performance.</p>
        </div>
        <div className="faq-item">
          <h3>Is my data safe with SyllabAI?</h3>
          <p>Yes, we prioritize your privacy and security. Your data is encrypted and will only be used to improve your study experience.</p>
        </div>
        <div className="faq-item">
          <h3>Can I collaborate with others using SyllabAI?</h3>
          <p>Yes, you can share your study plans with classmates and collaborate to achieve better academic results.</p>
        </div>
      </section>

      <section className="sign-in" id="sign-in">
        <form>
          <h1>SyllabAI</h1>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" placeholder="Enter your username" />
          
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email" />
          
          <button id="submit-button" type="submit">Submit</button>
        </form>
      </section>

      <Modal isOpen={isModalOpen} onClose={toggleModal} scrollToSignIn={scrollToSignIn} />

      <footer>
        <p>&copy; {new Date().getFullYear()} SyllabAI. All rights reserved.</p>
      </footer>
    </>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, scrollToSignIn }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Discover SyllabAI</h2>
        <p>
          SyllabAI is your AI-powered study partner that helps you:
        </p>
        <ul>
          <li>Create personalized study plans tailored to your needs.</li>
          <li>Track your progress and stay organized.</li>
          <li>Leverage AI to improve productivity and efficiency.</li>
        </ul>
        <p>
          Ready to transform the way you study? Sign up today and take the first step towards academic success!
        </p>
        <button onClick={() => { onClose(); scrollToSignIn(); }} className="cta-button">Sign Up!</button>
      </div>
    </div>
  );
};

export default HomePage;
