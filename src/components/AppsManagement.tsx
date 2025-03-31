import React, { useEffect, useState } from 'react';
import { fetchApps, createApp, deleteApp } from '../services/api/appsApi';

const AppsManagement = () => {
  const [apps, setApps] = useState([]);
  const [newApp, setNewApp] = useState({ name: '', os: '', platform: '' });

  useEffect(() => {
    const loadApps = async () => {
      const appsData = await fetchApps();
      setApps(appsData);
    };
    loadApps();
  }, []);

  const handleCreateApp = async () => {
    await createApp(newApp.name, newApp.os, newApp.platform);
    setNewApp({ name: '', os: '', platform: '' });
    const updatedApps = await fetchApps();
    setApps(updatedApps);
  };

  const handleDeleteApp = async (appName) => {
    await deleteApp(appName);
    const updatedApps = await fetchApps();
    setApps(updatedApps);
  };

  return (
    <div>
      <h2>Apps Management</h2>
      <ul>
        {apps.map((app) => (
          <li key={app.name}>
            {app.name} <button onClick={() => handleDeleteApp(app.name)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Create New App</h3>
        <input
          type="text"
          placeholder="Name"
          value={newApp.name}
          onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="OS"
          value={newApp.os}
          onChange={(e) => setNewApp({ ...newApp, os: e.target.value })}
        />
        <input
          type="text"
          placeholder="Platform"
          value={newApp.platform}
          onChange={(e) => setNewApp({ ...newApp, platform: e.target.value })}
        />
        <button onClick={handleCreateApp}>Create App</button>
      </div>
    </div>
  );
};

export default AppsManagement;