import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/authUtils';
import { getGitHubOAuthUrl } from '../services/authService';

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
      <button onClick={() => window.location.href = getGitHubOAuthUrl()}>Login with GitHub</button>
    </div>
  );
};

export default Login;
