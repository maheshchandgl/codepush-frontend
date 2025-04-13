import React, { useState, FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Slider,
  Select,
  MenuItem,
} from '@mui/material';
import en from '../../public/en.json';
import { releaseReact } from '../services/api/deploymentsApi';
import { toast } from 'react-toastify';

// Define the enum for deployment platforms
enum DeploymentPlatform {
  Production = 'Production',
  Staging = 'Staging',
}

interface NewCodePushDialogProps {
  open: boolean;
  onClose: () => void;
  appName: string;
  deploymentName: string; // Add deploymentName as a prop
  platform: string;
}

export const NewCodePushDialog: FC<NewCodePushDialogProps> = ({ open, onClose, appName, deploymentName, platform }) => {
  const [appVersion, setAppVersion] = useState('');
  const [rollout, setRollout] = useState(0);
  const [description, setDescription] = useState('');
  const [targetBinaryVersion, setTargetBinaryVersion] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await releaseReact(appName, deploymentName, platform, description, targetBinaryVersion, rollout);
      toast.success('CodePush deployment created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create CodePush deployment. Please try again.');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{en.appDetails.generateNewCodePush}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography gutterBottom>Platform</Typography>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Target Binary Version"
            fullWidth
            margin="normal"
            value={targetBinaryVersion}
            onChange={(e) => setTargetBinaryVersion(e.target.value)}
            required
          />
          <Typography gutterBottom>Rollout %</Typography>
          <Slider
            value={rollout}
            onChange={(_, newValue) => setRollout(newValue as number)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            {en.common.cancel}
          </Button>
          <Button type="submit" color="primary">
            {en.appDetails.generateNewCodePush}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};