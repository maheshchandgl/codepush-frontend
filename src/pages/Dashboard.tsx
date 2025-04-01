import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppsManagement from '../components/AppsManagement';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAppClick = (appName) => {
    navigate(`/apps/${appName}`);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <AppsManagement onAppClick={handleAppClick} />
    </div>
  );
};

export default Dashboard;