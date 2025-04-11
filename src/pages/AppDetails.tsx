import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteDeploymentHistory, fetchDeployments } from '../services';
import {
  Box,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { AppBar, DeploymentToggle, DeploymentTable, UpdateCodePushDialog, NewPushDialog } from '../components';
import { DEPLOYMENT_NAMES } from '../constants';
import { toast } from 'react-toastify';
import en from '../../public/en.json';
import { Deployment, Package } from '../shared/types';

const AppDetails: React.FC = () => {
  const { appName } = useParams<{ appName: string }>();
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [rollout, setRollout] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [appVersion, setAppVersion] = useState<string>('');
  const [label, setLabel] = useState<string>('');
  const [codePushDialogOpen, setCodePushDialogOpen] = useState<boolean>(false);

  // Replace the useState for platform with a derived value based on appName
  const platform = appName
    .toLowerCase()
    .includes("android")
    ? "android"
    : appName.toLowerCase().includes("ios")
    ? "ios"
    : "unknown";

  useEffect(() => {
    const loadDeployments = async () => {
      if (!appName) return;
      const response = await fetchDeployments(appName);
      const deploymentsData = response.deployments || [];
      setDeployments(deploymentsData);
      if (deploymentsData.length > 0) {
        setSelectedDeployment(deploymentsData[0]); // Default to the first deployment
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

  const handleRowClick = (pkg: any) => {
    console.info('Package clicked:', pkg);
    setRollout(pkg.rollout || 0); // Ensure rollout is set correctly
    setDescription(pkg.description || '');
    setAppVersion(pkg.appVersion || '');
    setLabel(pkg.label || '');  
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
  const handleDeleteHistory = async (deploymentName: string) => {
    if (!window.confirm('Are you sure you want to delete the deployment history?')) {
      return;
    }

    try {
      if (appName) {
        await deleteDeploymentHistory(appName, deploymentName);
      } else {
        console.error('App name is undefined.');
        toast.error('App name is undefined.');
      }
      toast.success('Deployment history deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete deployment history.');
      console.error(error);
    }
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
            <Typography variant="subtitle2">ID: {selectedDeployment.id}</Typography> {/* Use `id` instead of `key` */}
            <Typography variant="subtitle2">Created At: {new Date(selectedDeployment.createdAt).toLocaleString()}</Typography> {/* Use `createdAt` */}
            <Divider sx={{ marginY: 2 }} />
            <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteHistory(selectedDeployment.name)}
                >
                  Delete History
                </Button>
            <Divider sx={{ marginY: 2 }} />

            <Typography variant="subtitle1">Package Info:</Typography>
            <DeploymentTable
              packages={selectedDeployment.packageHistory || []} // Explicitly cast to shared Package type
              onRowClick={handleRowClick}
              sourceDeploymentName={selectedDeployment.name}
              appName={appName || ''} // Ensure `appName` is a string
              productionPackages={deployments.find((d) => d.name === DEPLOYMENT_NAMES.PRODUCTION)?.packageInfo ? [deployments.find((d) => d.name === DEPLOYMENT_NAMES.PRODUCTION)?.packageInfo] : []} // Adjust for `packageInfo`
            />
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCodePushDialog}
          sx={{ marginTop: 2 }}
        >
           {en.appDetails.generateNewCodePush}
        </Button>
        <NewPushDialog
          open={codePushDialogOpen}
          onClose={handleCloseCodePushDialog}
          appName={appName || ''} // Ensure appName is a string
          platform={platform}
          deploymentName={selectedDeployment?.name || ''} // Ensure deploymentName is a string
        />
      </Box>
      <UpdateCodePushDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        rollout={rollout}
        appVersion={appVersion}
        label={label}
        description={description}
        onRolloutChange={handleRolloutChange}
        onDescriptionChange={(e) => setDescription(e.target.value)}
        onAppVersionChange={(e) => setAppVersion(e.target.value)}
        onLabelChange={(e) => setLabel(e.target.value)}
        onSave={handleSaveChanges}
        appName={appName}
        deploymentName={selectedDeployment?.name || ''}
      />
    </div>
  );
};

export default AppDetails;