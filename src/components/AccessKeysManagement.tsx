import React, { useEffect, useState } from 'react';
import { fetchAccessKeys, removeAccessKey } from '../services/api/accessKeysApi';

const AccessKeysManagement = () => {
  const [accessKeys, setAccessKeys] = useState([]);

  useEffect(() => {
    const loadAccessKeys = async () => {
      const response = await fetchAccessKeys();
      setAccessKeys(response.accessKeys || []); // Access the 'accessKeys' array from the API response
    };
    loadAccessKeys();
  }, []);

  const handleRemoveAccessKey = async (keyId) => {
    await removeAccessKey(keyId);
    const response = await fetchAccessKeys();
    setAccessKeys(response.accessKeys || []); // Update the state with the 'accessKeys' array
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

export default AccessKeysManagement;