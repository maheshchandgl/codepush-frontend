import React, { useEffect, useState } from 'react';
import { fetchApps, createApp, deleteApp } from '../services/api/appsApi';
import {
  Box,
  List,
  ListItemButton,
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

  useEffect(() => {
    const loadApps = async () => {
      const response = await fetchApps();
      setApps(response.apps); // Access the 'apps' array from the API response
    };
    loadApps();
  }, []);

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
      </Box>
  );
};