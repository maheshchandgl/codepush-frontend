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
}) => {
  const handleSave = async () => {
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

  console.info('UpdateCodePushDialog', {
    open,
    rollout,
    description,
    onRolloutChange,
    onDescriptionChange,
    onSave,
    appVersion,
    label
  });
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Package Details</DialogTitle>
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};