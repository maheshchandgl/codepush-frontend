import axios from 'axios';

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
  const accessKey = localStorage.getItem('accessKey');
  if (accessKey) {
    config.headers['Authorization'] = `Bearer ${accessKey}`;
  }
  console.info('Request made with access key:', accessKey);
  return config;
});

export default apiClient;