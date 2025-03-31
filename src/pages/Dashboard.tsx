import { useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../utils/authUtils';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;