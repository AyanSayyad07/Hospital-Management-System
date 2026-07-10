import React from 'react';

export default function Register() {
  return (
    <div className="page-container auth-page">
      <h1>Register Account</h1>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role">
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Create a password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}
