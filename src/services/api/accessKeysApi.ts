import apiClient from './apiClient';

// Fetch access keys
export const fetchAccessKeys = async () => {
  const response = await apiClient.get('/accessKeys');
  return response.data;
};

// Remove an access key
export const removeAccessKey = async (keyId: string) => {
  const response = await apiClient.delete(`/accessKeys/${keyId}`);
  return response.data;
};