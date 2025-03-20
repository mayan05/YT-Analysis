import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h1 className="footer-heading">Contact Me</h1>
        <div className="footer-content">
          <p className="footer-text">Mayan Sequeira</p>
          <p className="footer-text">mayan.sequeira@gmail.com</p>
          <p className="footer-text">+91 8660579551</p>
          <a
            href="https://www.linkedin.com/in/mayan-sequeira/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a 
            className='footer-link'
            target="_new"
            rel="noopener noreferrer"
            href="https://github.com/mayan05"
            > 
              GitHub
            </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;