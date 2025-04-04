import apiClient from './apiClient';
import { ApiResponse } from '../../types';

// Fetch all apps
export const fetchApps = async (): Promise<ApiResponse<any[]>> => {
  const response = await apiClient.get('/apps');
  return response.data;
};

// Create a new app
export const createApp = async (name: string, os: string, platform: string): Promise<ApiResponse<any>> => {
  const response = await apiClient.post('/apps', { name, os, platform });
  return response.data;
};

// Delete an app
export const deleteApp = async (appName: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/apps/${appName}`);
  return response.data;
};