import React, { useEffect, useState } from 'react';
import { fetchApps, createApp, deleteApp } from '../services/api/appsApi';
import {
  Box,
  Button,
  List,
  ListItemButton,
  TextField,
  Typography,
} from '@mui/material';
import { GenericListItemContent } from './GenericListItemContent';
import { AppsManagementProps } from '../types';
import { toast } from 'react-toastify';

interface App {
  name: string;
  os: string;
  platform: string;
}

export const AppsManagement = ({ onAppClick }: AppsManagementProps) => {
  const [apps, setApps] = useState<App[]>([]);
  const [newApp, setNewApp] = useState<App>({ name: '', os: '', platform: '' });

  useEffect(() => {
    const loadApps = async () => {
      const response = await fetchApps();
      setApps(response.apps); // Access the 'apps' array from the API response
    };
    loadApps();
  }, []);

  const handleCreateApp = async () => {
    try {
      await createApp(newApp.name, newApp.os, newApp.platform); // Pass false for manuallyProvisionDeployments
      setNewApp({ name: '', os: '', platform: '' });
      const response = await fetchApps();
      setApps(response.apps); // Update the state with the 'apps' array
      toast.success('App created successfully!');
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(`An app named '${newApp.name}' already exists.`);
      } else {
        toast.error('Failed to create app. Please try again.');
      }
      console.error(error);
    }
  };

  const handleDeleteApp = async (appName: string) => {
    try {
      await deleteApp(appName);
      const response = await fetchApps();
      setApps(response.apps); // Update the state with the 'apps' array
      toast.success('App deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete app. Please try again.');
      console.error(error);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Apps Management</Typography>
      <List>
        {apps.map((app) => (
          <ListItemButton key={app.name} onClick={() => onAppClick(app.name)}>
            <GenericListItemContent primaryText={app.name} />
          </ListItemButton>
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