import React from 'react';
import AppsManagement from '../components/AppsManagement';
import DeploymentsManagement from '../components/DeploymentsManagement';
import UsersManagement from '../components/UsersManagement';
import AccessKeysManagement from '../components/AccessKeysManagement';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <AppsManagement />
      <DeploymentsManagement appName="example-app" />
      <UsersManagement appName="example-app" />
      <AccessKeysManagement />
    </div>
  );
};

export default Dashboard;