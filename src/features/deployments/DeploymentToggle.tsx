import React, { useState } from 'react';
import Switch from '@mui/material/Switch';

interface DeploymentToggleProps {
  isDeployed: boolean;
  onToggle: (isDeployed: boolean) => void;
}

const DeploymentToggle: React.FC<DeploymentToggleProps> = ({ isDeployed, onToggle }) => {
  const [checked, setChecked] = useState(isDeployed);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onToggle(event.target.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      color="primary"
      inputProps={{ 'aria-label': 'deployment toggle' }}
    />
  );
};

export default DeploymentToggle;