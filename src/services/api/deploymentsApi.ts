import apiClient from "./apiClient";
import { Deployment, Package, UpdateDeploymentRequest, ApiResponse } from '../../types';

// Fetch all deployments of an app
export const fetchDeployments = async (appName: string): Promise<ApiResponse<Deployment[]>> => {
  const response = await apiClient.get(`/apps/${appName}/deployments`);
  return response.data;
};

// Create a new deployment
export const createDeployment = async (appName: string, deploymentName: string): Promise<ApiResponse<Deployment>> => {
  const response = await apiClient.post(`/apps/${appName}/deployments`, { name: deploymentName });
  return response.data;
};

// Delete a deployment
export const deleteDeployment = async (appName: string, deploymentName: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/apps/${appName}/deployments/${deploymentName}`);
  return response.data;
};

// Rename a deployment
export const renameDeployment = async (appName: string, deploymentName: string, newName: string): Promise<ApiResponse<Deployment>> => {
  const response = await apiClient.patch(`/apps/${appName}/deployments/${deploymentName}`, { name: newName });
  return response.data;
};

// Update deployment details
export const updateDeployment = async (
  appName: string,
  deploymentName: string,
  updateData: UpdateDeploymentRequest
): Promise<ApiResponse<Deployment>> => {
  const response = await apiClient.patch(`/apps/${appName}/deployments/${deploymentName}/release`, {
    packageInfo: updateData,
  });
  return response.data;
};
