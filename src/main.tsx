import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
