import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/authUtils';
import { GitHubLoginButton } from '../components';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessKey = urlParams.get('accessKey');

    if (accessKey) {
      setAuthToken(accessKey);
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Login</h1>
      <GitHubLoginButton />
    </div>
  );
};

export default Login;
