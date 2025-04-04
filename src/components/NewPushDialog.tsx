import React, { useState } from 'react';
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

export const NewPushDialog = ({ open, onClose }) => {
  const [appVersion, setAppVersion] = useState('');
  const [rollout, setRollout] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('CodePush Form Submitted:', { appVersion, rollout });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Start New CodePush</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="App Version"
            fullWidth
            margin="normal"
            value={appVersion}
            onChange={(e) => setAppVersion(e.target.value)}
            required
          />
          <Typography gutterBottom>Rollout %</Typography>
          <Slider
            value={rollout}
            onChange={(_, newValue) => setRollout(newValue)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Start CodePush
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};