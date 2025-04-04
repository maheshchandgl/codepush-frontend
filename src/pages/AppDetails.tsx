import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services';
import {
  Box,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { AppBar, DeploymentToggle, DeploymentTable, UpdateCodePushDialog, NewPushDialog } from '../components';

interface Deployment {
  name: string;
  key: string;
  createdTime: number;
  package: Package;
  packageHistory: Package[];
}

interface Package {
  label: string;
  appVersion: string;
  rollout: number | null;
  size: number;
  releaseMethod: string;
  uploadTime: number;
  description: string;
}

const AppDetails = () => {
  const { appName } = useParams<{ appName: string }>();
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rollout, setRollout] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [codePushDialogOpen, setCodePushDialogOpen] = React.useState(false);

  useEffect(() => {
    const loadDeployments = async () => {
      if (!appName) return;
      const response = await fetchDeployments(appName);
      setDeployments(response.deployments || []);
      if (response.deployments && response.deployments.length > 0) {
        setSelectedDeployment(response.deployments[0]); // Default to the first deployment
      }
    };
    loadDeployments();
  }, [appName]);

  const handleDeploymentChange = (_event: React.MouseEvent<HTMLElement>, newDeploymentName: string | null) => {
    if (newDeploymentName) {
      const deployment = deployments.find((d) => d.name === newDeploymentName);
      if (deployment) setSelectedDeployment(deployment);
    }
  };

  const handleRowClick = (pkg: Package) => {
    setSelectedPackage(pkg);
    setRollout(pkg.rollout !== null && pkg.rollout !== undefined ? pkg.rollout : 0); // Ensure rollout is set correctly
    setDescription(pkg.description || '');
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveChanges = () => {
    // Logic to save changes to rollout and description
    console.log('Updated Rollout:', rollout);
    console.log('Updated Description:', description);
    setDialogOpen(false);
  };

  const handleRolloutChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setRollout(newValue);
    }
  };

  const handleOpenCodePushDialog = () => {
    setCodePushDialogOpen(true);
  };

  const handleCloseCodePushDialog = () => {
    setCodePushDialogOpen(false);
  };

  return (
    <div>
      <AppBar title="App Details" />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          App Details
        </Typography>
        <Typography variant="h5" gutterBottom>
          {appName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Deployments
        </Typography>
        <DeploymentToggle
          deployments={deployments}
          selectedDeployment={selectedDeployment}
          onDeploymentChange={handleDeploymentChange}
        />
        {selectedDeployment && (
          <Box>
            <Typography variant="subtitle1">Deployment: {selectedDeployment.name}</Typography>
            <Typography variant="subtitle2">Key: {selectedDeployment.key}</Typography>
            <Typography variant="subtitle2">Created Time: {new Date(selectedDeployment.createdTime).toLocaleString()}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Current Package:</Typography>
            <DeploymentTable
              packages={[selectedDeployment.package]}
              onRowClick={handleRowClick}
            />
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Package History:</Typography>
            <DeploymentTable
              packages={selectedDeployment.packageHistory}
              onRowClick={handleRowClick}
            />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCodePushDialog}
          sx={{ marginTop: 2 }}
        >
          Generate New CodePush
        </Button>
        <NewPushDialog
          open={codePushDialogOpen}
          onClose={handleCloseCodePushDialog}
        />
      </Box>
      <UpdateCodePushDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        rollout={rollout}
        description={description}
        onRolloutChange={handleRolloutChange}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default AppDetails;