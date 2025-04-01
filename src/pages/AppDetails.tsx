import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services/api/deploymentsApi';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

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
          <ListItemText primary="Staging" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Production" />
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Deployments
      </Typography>
      <List>
        {deployments.map((deployment) => (
          <ListItem key={deployment.name}>
            <ListItemText
              primary={deployment.name}
              secondary={`Target Version: ${deployment.targetVersion}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AppDetails;