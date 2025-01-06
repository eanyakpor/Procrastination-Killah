import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const navigateToSignUp = () => {
    navigate('./SignUp');
  };

  const navigateToLogin = () => {
    navigate('./Login');
  };



  // Smooth scrolling function
  const handleScrollToFaq = (e) => {
    e.preventDefault(); // Prevent the default anchor link behavior
    const faqSection = document.querySelector('#faq');
    const offset = 40; // Adjust this value to control the stop point

    window.scrollTo({
      top: faqSection.offsetTop - offset, // Scroll position with offset
      behavior: 'smooth', // Smooth scrolling effect
    });
  };

  return (
    <>
      <nav>
        <a onClick={navigateToLogin}><h3>SyllabAI</h3></a>
        <a onClick={navigateToSignUp}><h3>Sign Up</h3></a>
        <a href="#faq" onClick={handleScrollToFaq}><h3>FAQ</h3></a> {/* Update to use smooth scroll */}
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

      <Modal isOpen={isModalOpen} onClose={toggleModal} navigateToSignUp={navigateToSignUp} />

      <section id="footer-section">
        <footer>
          <p>&copy; {new Date().getFullYear()} SyllabAI. All rights reserved.</p>
        </footer>
      </section>
    </>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, navigateToSignUp }) => {
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
        <button onClick={() => { onClose(); navigateToSignUp(); }} className="cta-button">Sign Up!</button>
      </div>
    </div>
  );
};

export default HomePage;
