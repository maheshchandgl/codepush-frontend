import apiClient from './apiClient';

// Fetch all apps
export const fetchApps = async () => {
  const response = await apiClient.get('/apps');
  return response.data;
};

// Create a new app
export const createApp = async (name: string, os: string, platform: string) => {
  const response = await apiClient.post('/apps', { name, os, platform });
  return response.data;
};

// Delete an app
export const deleteApp = async (appName: string) => {
  const response = await apiClient.delete(`/apps/${appName}`);
  return response.data;
};