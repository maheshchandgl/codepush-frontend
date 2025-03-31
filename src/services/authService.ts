export const getGitHubOAuthUrl = (): string => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  return `${serverUrl}/auth/login/github?client_id=${clientId}&redirect_uri=${redirectUri}`;
  
};