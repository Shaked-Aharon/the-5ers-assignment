import React from 'react';
import { Navigate } from 'react-router-dom';
import { Constant } from '../constant';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  // Check if token is stored in localStorage
  const token = localStorage.getItem(Constant.localStorageKeys.Token);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the children components
  return <>{children}</>;
};

export default AuthGuard;
