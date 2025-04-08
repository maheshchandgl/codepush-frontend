import { useState } from 'react';
import { promoteDeployment } from '../services/api/deploymentsApi';
import { toast } from 'react-toastify';

export const usePromoteDeployment = (appName: string, sourceDeploymentName: string) => {
  const [loading, setLoading] = useState(false);

  const promote = async (destDeploymentName: string, packageInfo: any) => {
    if (!window.confirm('Are you sure you want to promote this deployment?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await promoteDeployment(appName, sourceDeploymentName, destDeploymentName, packageInfo);
      toast.success('Deployment promoted successfully!');
      return response;
    } catch (error) {
      toast.error('Failed to promote deployment.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { promote, loading };
};