import React from 'react';
import { Box, Typography } from '@mui/material';

const GenericListItemContent = ({ primaryText, secondaryText }) => {
  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="body1" fontWeight="bold">
        {primaryText}
      </Typography>
      {secondaryText && (
        <Typography variant="body2" color="textSecondary">
          {secondaryText}
        </Typography>
      )}
    </Box>
  );
};

export default GenericListItemContent;