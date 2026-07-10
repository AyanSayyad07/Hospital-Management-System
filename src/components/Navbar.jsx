import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Hospital Management System</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
}
