import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/authUtils';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessKey = urlParams.get('access_key'); // Try getting access_key from URL

    if (accessKey) {
      fetch(`${import.meta.env.VITE_SERVER_URL}/auth/exchange`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessKey }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.token) {
            setAuthToken(data.token); // Store auth token
            navigate('/dashboard');
          } else {
            console.error('Failed to exchange access key for token', data);
          }
        })
        .catch((err) => console.error('Auth error:', err));
    }
  }, [navigate]);

  const handleLogin = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    window.location.href = `${serverUrl}/auth/login/github`;
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;
