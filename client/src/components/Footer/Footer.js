import React from "react";
import "./Footer.css";
import logo from './logo.svg';

const Footer = () => (
  <footer className="footer">
    <span>Made with React! <img src={logo} className="App-logo" alt="logo" />      <a
        href="https://github.com/teknoma104/react-mongoscraper"
        target="_blank"
        rel="noopener noreferrer"
      >
      GitHub Link
          </a> </span>
  

  </footer>
);

export default Footer;
