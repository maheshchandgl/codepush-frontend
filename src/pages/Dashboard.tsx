import { AppsManagement, AppBar } from '../components';
import { useNavigate } from 'react-router-dom';
import React from 'react';

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