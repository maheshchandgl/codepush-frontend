import { authService } from '../services';

export const GitHubLoginButton = () => {
  const handleLogin = () => {
    const authUrl = authService.getGitHubOAuthUrl();
    console.log('Redirecting to GitHub OAuth URL:', authUrl);
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with GitHub</button>;
};