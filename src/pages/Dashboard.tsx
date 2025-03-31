import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, clearAuthToken } from '../utils/authUtils';

const Dashboard = () => {
  console.log('Dashboard component rendered');
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are successfully logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;