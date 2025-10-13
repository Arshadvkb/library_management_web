import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isLoggedIn, userData } = useContext(AppContext);
  const location = useLocation();

  // If auth is required and user isn't logged in, redirect to login
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If we require no auth (like login page) and user is logged in, 
  // redirect to appropriate dashboard
  if (!requireAuth && isLoggedIn) {
    if (userData?.role === 'admin') {
      return <Navigate to="/admin/home" replace />;
    }
    return <Navigate to="/user/home" replace />;
  }

  return children;
};

export default ProtectedRoute;