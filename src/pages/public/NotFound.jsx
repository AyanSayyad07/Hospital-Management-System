import React from 'react';

export default function NotFound() {
  return (
    <div className="page-container not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <a href="/" className="btn btn-primary">Return Home</a>
    </div>
  );
}
