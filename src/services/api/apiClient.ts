import axios from 'axios';
import { getAuthToken } from '../../utils/authUtils';

const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

// Set up an Axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access key in headers
apiClient.interceptors.request.use((config) => {
  const accessKey = getAuthToken();
  if (accessKey) {
    config.headers['Authorization'] = `Bearer ${accessKey}`;
  }
  console.info('Request made with access key:', accessKey);
  return config;
});

export default apiClient;