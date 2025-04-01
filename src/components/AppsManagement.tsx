import React, { useEffect, useState } from 'react';
import { fetchApps, createApp, deleteApp } from '../services/api/appsApi';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';

const AppsManagement = ({ onAppClick }) => {
  const [apps, setApps] = useState([]);
  const [newApp, setNewApp] = useState({ name: '', os: '', platform: '' });

  useEffect(() => {
    const loadApps = async () => {
      const response = await fetchApps();
      setApps(response.apps); // Access the 'apps' array from the API response
    };
    loadApps();
  }, []);

  const handleCreateApp = async () => {
    await createApp(newApp.name, newApp.os, newApp.platform);
    setNewApp({ name: '', os: '', platform: '' });
    const response = await fetchApps();
    setApps(response.apps); // Update the state with the 'apps' array
  };

  const handleDeleteApp = async (appName) => {
    await deleteApp(appName);
    const response = await fetchApps();
    setApps(response.apps); // Update the state with the 'apps' array
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Apps Management
      </Typography>
      <List>
        {apps.map((app) => (
          <ListItem key={app.name} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => onAppClick(app.name)}
                >
                  {app.name}
                </Typography>
              }
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteApp(app.name)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Create New App</Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newApp.name}
          onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
        />
        <TextField
          label="OS"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newApp.os}
          onChange={(e) => setNewApp({ ...newApp, os: e.target.value })}
        />
        <TextField
          label="Platform"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newApp.platform}
          onChange={(e) => setNewApp({ ...newApp, platform: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateApp}
          sx={{ marginTop: 2 }}
        >
          Create App
        </Button>
      </Box>
    </Box>
  );
};

export default AppsManagement;