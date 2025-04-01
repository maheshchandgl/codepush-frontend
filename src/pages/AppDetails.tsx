import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services/api/deploymentsApi';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import AppBar from '../components/AppBar';

const AppDetails = () => {
  const { appName } = useParams();
  const [deployments, setDeployments] = useState([]);
  const [selectedDeployment, setSelectedDeployment] = useState(null);

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
            <pre>{JSON.stringify(selectedDeployment.package, null, 2)}</pre>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1">Package History:</Typography>
            {selectedDeployment.packageHistory.map((pkg, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <pre>{JSON.stringify(pkg, null, 2)}</pre>
                <Divider />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default AppDetails;