import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from './utils/authUtils';

const App = () => {
  console.log('App component rendered. Authenticated:', isAuthenticated());
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
