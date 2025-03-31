export const getGitHubAuthUrl = (): string => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  return `${serverUrl}/auth/login/github`;
};