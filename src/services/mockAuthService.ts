export const mockGitHubOAuth = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate receiving a token from the backend
      resolve('mock-github-oauth-token');
    }, 1000);
  });
};