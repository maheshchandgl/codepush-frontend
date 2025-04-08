import { useState } from 'react';
import { rollbackDeployment } from '../services/api/deploymentsApi';
import { toast } from 'react-toastify';

export const useRollbackDeployment = (appName: string, sourceDeploymentName: string) => {
  const [loading, setLoading] = useState(false);

  const rollback = async (packageLabel: string) => {
    if (!window.confirm('Are you sure you want to rollback this deployment?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await rollbackDeployment(appName, sourceDeploymentName, packageLabel);
      toast.success('Deployment rolled back successfully!');
      return response;
    } catch (error) {
      toast.error('Failed to rollback deployment.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { rollback, loading };
};