// Replace react-query with a custom hook for data fetching
import { useState } from 'react';
import { promoteDeployment } from '../../../services';


export const usePromoteDeployment = (appName: string, sourceDeploymentName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const promote = async (targetDeploymentName: string, payload: object) => {
    setLoading(true);
    setError(null);
    try {
      await promoteDeployment(appName, sourceDeploymentName, targetDeploymentName, payload);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { promote, loading, error };
};