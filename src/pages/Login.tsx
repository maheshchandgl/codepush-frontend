import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/authUtils';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setAuthToken(token);
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    window.location.href = `${serverUrl}/auth/register/github`;
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;