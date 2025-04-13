import React, { useState, FC } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import en from '../../public/en.json';
import { createApp } from '../services/api/appsApi';
import { toast } from 'react-toastify';

interface CreateNewAppDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateNewAppDialog: FC<CreateNewAppDialogProps> = ({ open, onClose }) => {
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createApp(appName, appDescription);
      toast.success('App created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create app. Please try again.');
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{en.appsManagement.createNewApp}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="App Name"
            fullWidth
            margin="normal"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            required
          />
          <TextField
            label="App Description"
            fullWidth
            margin="normal"
            value={appDescription}
            onChange={(e) => setAppDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};