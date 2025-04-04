import apiClient from './apiClient';
import { ApiResponse } from '../../types';

// List all users
export const fetchUsers = async (): Promise<ApiResponse<any[]>> => {
  const response = await apiClient.get('/users');
  return response.data;
};

// Add a new user
export const addUser = async (userName: string): Promise<ApiResponse<any>> => {
  const response = await apiClient.post('/users', { name: userName });
  return response.data;
};

// Remove an existing user
export const removeUser = async (userId: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

// Add a collaborator to an app
export const addCollaborator = async (appName: string, email: string) => {
  const response = await apiClient.post(`/apps/${appName}/collaborators/${email}`);
  return response.data;
};

// Remove a collaborator
export const removeCollaborator = async (appName: string, email: string) => {
  const response = await apiClient.delete(`/apps/${appName}/collaborators/${email}`);
  return response.data;
};

// Transfer app ownership
export const transferAppOwnership = async (appName: string, newOwnerEmail: string) => {
  const response = await apiClient.post(`/apps/${appName}/transfer/${newOwnerEmail}`);
  return response.data;
};