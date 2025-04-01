import apiClient from './apiClient';

// Fetch acquisition details for a specific app
export const fetchAcquisitionDetails = async (appName) => {
  try {
    const response = await apiClient.get(`/apps/${appName}/acquisition`);
    return response.data;
  } catch (error) {
    console.error('Error fetching acquisition details:', error);
    throw error;
  }
};