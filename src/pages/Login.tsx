import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // Redirect to GitHub OAuth login
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    console.log('Server URL:', serverUrl);
    window.location.href = `${serverUrl}/auth/github`;
  };
  console.log('Login button clicked');
  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;