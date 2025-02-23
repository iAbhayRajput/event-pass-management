import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          QR Pass System
        </Link>

        {/* Hamburger Icon */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/verified-users" onClick={() => setMenuOpen(false)}>Verified Users</Link></li>
          <li><Link to="/admin-verified" onClick={() => setMenuOpen(false)}>Admin</Link></li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
