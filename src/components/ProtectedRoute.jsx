import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute Wrapper Component
 * Accepts a required `role` prop and checks against the current user state.
 * 
 * - If no user is logged in, redirects to `/login`.
 * - If user's role does not match `role`, redirects to `/not-found` (Unauthorized / NotFound).
 * - Otherwise, renders child components or route `<Outlet />`.
 */
export default function ProtectedRoute({ role, children }) {
  // Read mock state from localStorage
  const userStr = localStorage.getItem('currentUser');
  const currentUser = userStr ? JSON.parse(userStr) : null;

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/not-found" replace />;
  }

  return children ? children : <Outlet />;
}
