import apiClient from './apiClient';

// Fetch app insights for a specific app
export const fetchAppInsights = async (appName) => {
  try {
    const response = await apiClient.get(`/apps/${appName}/insights`);
    return response.data;
  } catch (error) {
    console.error('Error fetching app insights:', error);
    throw error;
  }
};