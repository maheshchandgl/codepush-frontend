import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services/api/deploymentsApi';
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppBar from '../components/AppBar';
import GenericListItemContent from '../components/GenericListItemContent';

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
          Deployments
        </Typography>
        <List>
          {deployments.map((deployment) => (
            <ListItem key={deployment.name}>
              <Accordion sx={{ width: '100%' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <GenericListItemContent
                    primaryText={deployment.name}
                    secondaryText={`Key: ${deployment.key}`}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1">Current Package:</Typography>
                  <pre>{JSON.stringify(deployment.package, null, 2)}</pre>
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="subtitle1">Package History:</Typography>
                  {deployment.packageHistory.map((pkg, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <pre>{JSON.stringify(pkg, null, 2)}</pre>
                      <Divider />
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default AppDetails;