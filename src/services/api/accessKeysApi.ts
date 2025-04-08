import apiClient from './apiClient';
import { ApiResponse } from '../../shared/types';

// Fetch access keys
export const fetchAccessKeys = async (): Promise<ApiResponse<any[]>> => {
  const response = await apiClient.get('/accessKeys');
  return response.data;
};

// Remove an access key
export const removeAccessKey = async (keyId: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete(`/accessKeys/${keyId}`);
  return response.data;
};