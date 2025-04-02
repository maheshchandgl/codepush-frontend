import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services/api/deploymentsApi';
import {
  Box,
  Typography,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import AppBar from '../components/AppBar';

const AppDetails = () => {
  const { appName } = useParams();
  const [deployments, setDeployments] = useState([]);
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rollout, setRollout] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadDeployments = async () => {
      const response = await fetchDeployments(appName);
      setDeployments(response.deployments || []);
      if (response.deployments && response.deployments.length > 0) {
        setSelectedDeployment(response.deployments[0]); // Default to the first deployment
      }
    };
    loadDeployments();
  }, [appName]);

  const handleDeploymentChange = (event, newDeploymentName) => {
    if (newDeploymentName) {
      const deployment = deployments.find((d) => d.name === newDeploymentName);
      setSelectedDeployment(deployment);
    }
  };

  const handleRowClick = (pkg) => {
    setSelectedPackage(pkg);
    setRollout(pkg.rollout || '');
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
        <ToggleButtonGroup
          value={selectedDeployment?.name || ''}
          exclusive
          onChange={handleDeploymentChange}
          sx={{ marginBottom: 2 }}
        >
          {deployments.map((deployment) => (
            <ToggleButton key={deployment.name} value={deployment.name}>
              {deployment.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {selectedDeployment && (
          <Box>
            <Typography variant="subtitle1">Deployment: {selectedDeployment.name}</Typography>
            <Typography variant="subtitle2">Key: {selectedDeployment.key}</Typography>
            <Typography variant="subtitle2">Created Time: {new Date(selectedDeployment.createdTime).toLocaleString()}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Current Package:</Typography>
            <TableContainer component={Paper} sx={{ marginY: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>App Version</TableCell>
                    <TableCell>Rollout</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Release Method</TableCell>
                    <TableCell>Upload Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow onClick={() => handleRowClick(selectedDeployment.package)}>
                    <TableCell>{selectedDeployment.package.label}</TableCell>
                    <TableCell>{selectedDeployment.package.appVersion}</TableCell>
                    <TableCell>{selectedDeployment.package.rollout || 'N/A'}</TableCell>
                    <TableCell>{selectedDeployment.package.size}</TableCell>
                    <TableCell>{selectedDeployment.package.releaseMethod}</TableCell>
                    <TableCell>{new Date(selectedDeployment.package.uploadTime).toLocaleString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Package History:</Typography>
            <TableContainer component={Paper} sx={{ marginY: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>App Version</TableCell>
                    <TableCell>Rollout</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Release Method</TableCell>
                    <TableCell>Upload Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedDeployment.packageHistory.map((pkg, index) => (
                    <TableRow key={index} onClick={() => handleRowClick(pkg)}>
                      <TableCell>{pkg.label}</TableCell>
                      <TableCell>{pkg.appVersion}</TableCell>
                      <TableCell>{pkg.rollout || 'N/A'}</TableCell>
                      <TableCell>{pkg.size}</TableCell>
                      <TableCell>{pkg.releaseMethod}</TableCell>
                      <TableCell>{new Date(pkg.uploadTime).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Package Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Rollout %"
            type="number"
            fullWidth
            margin="normal"
            value={rollout}
            onChange={(e) => setRollout(e.target.value)}
          />
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppDetails;