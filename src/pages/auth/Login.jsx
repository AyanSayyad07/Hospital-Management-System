import React from 'react';

export default function Login() {
  return (
    <div className="page-container auth-page">
      <h1>Login</h1>
      <form className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
}
