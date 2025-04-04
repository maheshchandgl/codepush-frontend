import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Slider,
} from '@mui/material';
import { updateDeployment } from '../services/api/deploymentsApi';
import { UpdateDeploymentRequest } from '../types';

interface UpdateCodePushDialogProps {
  open: boolean;
  onClose: () => void;
  rollout: number;
  description: string;
  appVersion: string;
  label: string;
  onRolloutChange: (event: Event, value: number | number[]) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAppVersionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLabelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  appName: string;
  deploymentName: string;
}

export const UpdateCodePushDialog = ({
  open,
  onClose,
  rollout,
  description,
  appVersion,
  label,
  onRolloutChange,
  onDescriptionChange,
  onAppVersionChange,
  onLabelChange,
  onSave,
  appName,
  deploymentName,
}: UpdateCodePushDialogProps) => {
  const handleSave = async () => {
    console.info("Saving deployment update...", {
      appName, deploymentName,
      rollout,
      description,
      appVersion,
    });
    try {
      const data = await updateDeployment(appName, deploymentName, {
        rollout,
        isMandatory: true, // Adjust as needed
        description,
        appVersion,
        label,
      });
      console.log("Rollout updated successfully:", data);
      onSave(); // Call the onSave callback to close the dialog or perform additional actions
    } catch (error) {
      console.error("Error updating rollout:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Update Deployment</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{`Rollout ${rollout}%`}</Typography>
        <Slider
          value={rollout}
          onChange={onRolloutChange}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          value={description}
          onChange={onDescriptionChange}
        />
        <TextField
          label="App Version"
          fullWidth
          margin="normal"
          value={appVersion}
          onChange={onAppVersionChange}
        />
        <TextField
          label="Label"
          fullWidth
          margin="normal"
          value={label}
          onChange={onLabelChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};