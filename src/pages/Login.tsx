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

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => window.location.href = '/auth/github'}>Login with GitHub</button>
    </div>
  );
};

export default Login;
