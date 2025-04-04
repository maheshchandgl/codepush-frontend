import apiClient from './apiClient';
import { ApiResponse } from '../../types';

// Fetch app insights for a specific app
export const fetchAppInsights = async (appName: string): Promise<ApiResponse<any>> => {
  try {
    const response = await apiClient.get(`/apps/${appName}/insights`);
    return response.data;
  } catch (error) {
    console.error('Error fetching app insights:', error);
    throw error;
  }
};