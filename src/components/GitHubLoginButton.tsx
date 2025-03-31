import { getGitHubAuthUrl } from '../services/authService';

export const GitHubLoginButton = () => {
  const handleLogin = () => {
    const authUrl = getGitHubAuthUrl();
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with GitHub</button>;
};