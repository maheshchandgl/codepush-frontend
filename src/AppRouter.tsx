import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import { Dashboard, Login, AppDetails } from './pages';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
  console.info('AppRouter component loaded');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apps/:appName" element={<AppDetails />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
