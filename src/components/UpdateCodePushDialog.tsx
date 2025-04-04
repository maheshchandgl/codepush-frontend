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

export const UpdateCodePushDialog = ({
  open,
  onClose,
  rollout,
  description,
  onRolloutChange,
  onDescriptionChange,
  onSave,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Package Details</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>Rollout %</Typography>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};