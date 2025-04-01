import React, { useEffect, useState } from 'react';
import { fetchAppInsights } from '../services/api/appInsightsApi';
import { Box, Typography, CircularProgress } from '@mui/material';

const AppInsights = ({ appName }) => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await fetchAppInsights(appName);
        setInsights(data);
      } catch (error) {
        console.error('Error loading app insights:', error);
      } finally {
        setLoading(false);
      }
    };
    loadInsights();
  }, [appName]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!insights) {
    return <Typography>No insights available for this app.</Typography>;
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">App Insights</Typography>
      <pre>{JSON.stringify(insights, null, 2)}</pre>
    </Box>
  );
};

export default AppInsights;