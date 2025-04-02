import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

export const DeploymentToggle = ({ deployments, selectedDeployment, onDeploymentChange }) => {
  return (
    <ToggleButtonGroup
      value={selectedDeployment?.name || ''}
      exclusive
      onChange={onDeploymentChange}
      sx={{ marginBottom: 2 }}
    >
      {deployments.map((deployment) => (
        <ToggleButton key={deployment.name} value={deployment.name}>
          {deployment.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};