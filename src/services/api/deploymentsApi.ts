import apiClient from './apiClient';

// Fetch all deployments of an app
export const fetchDeployments = async (appName: string) => {
  const response = await apiClient.get(`/apps/${appName}/deployments`);
  return response.data;
};

// Create a new deployment
export const createDeployment = async (appName: string, deploymentName: string) => {
  const response = await apiClient.post(`/apps/${appName}/deployments`, { name: deploymentName });
  return response.data;
};

// Delete a deployment
export const deleteDeployment = async (appName: string, deploymentName: string) => {
  const response = await apiClient.delete(`/apps/${appName}/deployments/${deploymentName}`);
  return response.data;
};

// Rename a deployment
export const renameDeployment = async (appName: string, deploymentName: string, newName: string) => {
  const response = await apiClient.patch(`/apps/${appName}/deployments/${deploymentName}`, { name: newName });
  return response.data;
};