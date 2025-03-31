import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockGitHubOAuth } from '../services/mockAuthService';
import { setAuthToken } from '../utils/authUtils';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await mockGitHubOAuth();
      setAuthToken(token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login with GitHub'}
      </button>
    </div>
  );
};

export default Login;
