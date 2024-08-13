import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Ensure this file exists

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to TaskVanguard</h1>
      <p>Manage your tasks efficiently with our easy-to-use to-do list application.</p>
      <Link to="/todo">
        <button className="get-started-btn">Get Started</button>
      </Link>
      <footer>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="footer-icon" />
        </a>
        <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="footer-icon" />
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
