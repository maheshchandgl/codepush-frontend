import { AppsManagement, AppBar } from '../components';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Button } from '@mui/material';
import { CreateNewAppDialog } from '../components/CreateNewAppDialog';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAppClick = (appName) => {
    navigate(`/apps/${appName}`);
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <div>
      <AppBar title="Dashboard" showBackButton={false} />
      <div>
        <AppsManagement onAppClick={handleAppClick} />
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
            sx={{ marginTop: 2 }}
          >
            Create App
          </Button>
        </Box>
        <CreateNewAppDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;