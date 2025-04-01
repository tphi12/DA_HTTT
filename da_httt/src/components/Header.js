import React from "react";
import "../assets/styles.css";
import "../assets/image/logo.png";
const Header = () => {
  return (
    <header>
      <div className="left-section">
        <div className="logo">
          <img src="logo-icon.png" alt="Logo Icon" />
          <span>Countt</span>
        </div>
      </div>
      <nav className="middle-section">
        <ul>
          <li>
            <a href="#">Products</a>
          </li>
          <span className="separator">•</span>
          <li>
            <a href="#">Solutions</a>
          </li>
          <span className="separator">•</span>
          <li>
            <a href="#">Resources</a>
          </li>
          <li>
            <a href="#">Pricing</a>
          </li>
        </ul>
      </nav>
      <div className="right-section">
        <button className="login">Login</button>
        <button className="try-app">Try app free</button>
      </div>
    </header>
  );
};

export default Header;
