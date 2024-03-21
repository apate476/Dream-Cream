import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {}
        <div className="hamburger" onClick={toggleMenu}>
          <div
            className={isOpen ? "hamburger-line open" : "hamburger-line"}
          ></div>
          <div
            className={isOpen ? "hamburger-line open" : "hamburger-line"}
          ></div>
          <div
            className={isOpen ? "hamburger-line open" : "hamburger-line"}
          ></div>
        </div>

        {}
        <div className={isOpen ? "menu open" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/SearchBar">Search</Link>
          <Link to="api/users/register">Register</Link>
          <Link to="/api/users/login">Login</Link>
          <Link to="/Cart">Cart</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/api/users/admin">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
