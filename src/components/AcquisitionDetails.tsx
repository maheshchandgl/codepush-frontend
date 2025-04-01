import React, { useEffect, useState } from 'react';
import { fetchAcquisitionDetails } from '../services/api/acquisitionApi';
import { Box, Typography, CircularProgress } from '@mui/material';

const AcquisitionDetails = ({ appName }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchAcquisitionDetails(appName);
        setDetails(data);
      } catch (error) {
        console.error('Error loading acquisition details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [appName]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!details) {
    return <Typography>No acquisition details available for this app.</Typography>;
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Acquisition Details</Typography>
      <pre>{JSON.stringify(details, null, 2)}</pre>
    </Box>
  );
};

export default AcquisitionDetails;