import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services/api/deploymentsApi';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import AppBar from '../components/AppBar';
import GenericListItemContent from '../components/GenericListItemContent';
import AppInsights from '../components/AppInsights';

const AppDetails = () => {
  const { appName } = useParams();
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    const loadDeployments = async () => {
      const response = await fetchDeployments(appName);
      setDeployments(response.deployments || []); // Access the 'deployments' array from the API response
    };
    loadDeployments();
  }, [appName]);

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
          Environments
        </Typography>
        <List>
          <ListItem>
            <GenericListItemContent primaryText="Staging" />
          </ListItem>
          <Divider />
          <ListItem>
            <GenericListItemContent primaryText="Production" />
          </ListItem>
        </List>
        <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
          Deployments
        </Typography>
        <List>
          {deployments.map((deployment) => (
            <ListItem key={deployment.name}>
              <GenericListItemContent
                primaryText={deployment.name}
                secondaryText={`Target Version: ${deployment.targetVersion || 'N/A'}`}
              />
            </ListItem>
          ))}
        </List>
        <AppInsights appName={appName} />
      </Box>
    </div>
  );
};

export default AppDetails;