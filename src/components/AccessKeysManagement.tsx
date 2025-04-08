import { useEffect, useState } from 'react';
import { fetchAccessKeys, removeAccessKey } from '../services/api/accessKeysApi';
import { AccessKey, ApiResponse } from '../types';

export const AccessKeysManagement = () => {
  const [accessKeys, setAccessKeys] = useState<AccessKey[]>([]);

  useEffect(() => {
    const loadAccessKeys = async () => {
      const response: ApiResponse<AccessKey[]> = await fetchAccessKeys();
      setAccessKeys(response.data || []); // Access the 'data' array from the API response
    };
    loadAccessKeys();
  }, []);

  const handleRemoveAccessKey = async (keyId: string) => {
    await removeAccessKey(keyId);
    const response: ApiResponse<AccessKey[]> = await fetchAccessKeys();
    setAccessKeys(response.data || []); // Update the state with the 'data' array
  };

  return (
    <div>
      <h2>Access Keys Management</h2>
      <ul>
        {accessKeys.map((key) => (
          <li key={key.id}>
            {key.name} <button onClick={() => handleRemoveAccessKey(key.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};