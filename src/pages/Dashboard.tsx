import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppsManagement from '../components/AppsManagement';
import AppBar from '../components/AppBar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAppClick = (appName) => {
    navigate(`/apps/${appName}`);
  };

  return (
    <div>
      <AppBar title="Dashboard" showBackButton={false} />
      <div>
        <AppsManagement onAppClick={handleAppClick} />
      </div>
    </div>
  );
};

export default Dashboard;