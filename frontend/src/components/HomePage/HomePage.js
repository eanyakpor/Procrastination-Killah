import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <form>
        Syllabis-Ai <br></br>
        <input type="text" placeholder="Enter text here" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HomePage;
