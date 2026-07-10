import React from 'react';

export default function LandingPage() {
  return (
    <div className="page-container landing-page">
      <header className="hero">
        <h1>Welcome to Hospital Management System</h1>
        <p>Comprehensive healthcare management for patients, doctors, and administrators.</p>
        <div className="hero-actions">
          <a href="/login" className="btn btn-primary">Sign In</a>
          <a href="/register" className="btn btn-secondary">Register</a>
        </div>
      </header>
    </div>
  );
}
