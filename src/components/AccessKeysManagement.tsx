import React, { useEffect, useState } from 'react';
import { fetchAccessKeys, removeAccessKey } from '../services/api/accessKeysApi';

const AccessKeysManagement = () => {
  const [accessKeys, setAccessKeys] = useState([]);

  useEffect(() => {
    const loadAccessKeys = async () => {
      const keysData = await fetchAccessKeys();
      setAccessKeys(keysData);
    };
    loadAccessKeys();
  }, []);

  const handleRemoveAccessKey = async (keyId) => {
    await removeAccessKey(keyId);
    const updatedKeys = await fetchAccessKeys();
    setAccessKeys(updatedKeys);
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