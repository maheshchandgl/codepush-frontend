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
interface App {
  name: string;
  os: string;
  platform: string;
}

export const CreateNewAppDialog: FC<CreateNewAppDialogProps> = ({ open, onClose }) => {
  const [newApp, setNewApp] = useState<App>({ name: '', os: '', platform: '' });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createApp(newApp.name, newApp.os, newApp.platform); // Pass false for manuallyProvisionDeployments
      setNewApp({ name: '', os: '', platform: '' });
      toast.success('App created successfully!');
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(`An app named '${newApp.name}' already exists.`);
      } else {
        toast.error('Failed to create app. Please try again.');
      }
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{en.appsManagement.createNewApp}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newApp.name}
            onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
          />
          <TextField
            label="OS"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newApp.os}
            onChange={(e) => setNewApp({ ...newApp, os: e.target.value })}
          />
          <TextField
            label="Platform"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newApp.platform}
            onChange={(e) => setNewApp({ ...newApp, platform: e.target.value })}
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