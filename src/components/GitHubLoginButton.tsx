import { getGitHubOAuthUrl } from '../services/authService';

export const GitHubLoginButton = () => {
  const handleLogin = () => {
    const authUrl = getGitHubOAuthUrl();
    console.log('Redirecting to GitHub OAuth URL:', authUrl);
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with GitHub</button>;
};