import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // You can replace with your desired icons
import "./NavigationBar.css"; // Create a CSS file for styling
import Logo from '../../assets/logo.png'

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={Logo} alt="Logo" />
        </Link>
        <div
          className={`menu-icon ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
          <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
            <li className="nav-item">
              <Link to="/chatbot" className="nav-links"  onClick={toggleMenu} >
                Chatbot
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links"  onClick={toggleMenu} >
                Image classifier
              </Link>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
