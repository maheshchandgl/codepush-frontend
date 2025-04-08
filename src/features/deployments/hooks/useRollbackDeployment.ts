import { useState } from 'react';
import { rollbackDeployment } from '../../../services';

export const useRollbackDeployment = (appName: string, sourceDeploymentName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const rollback = async (label: string) => {
    setLoading(true);
    setError(null);
    try {
      await rollbackDeployment(appName, sourceDeploymentName, label);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { rollback, loading, error };
};