import React, { useState } from 'react';
import {
  fetchDeployments,
  createDeployment,
  deleteDeployment,
  renameDeployment,
} from '../services/api/deploymentsApi';

interface Deployment {
  name: string;
}

interface RenameData {
  oldName: string;
  newName: string;
}

interface DeploymentsManagementProps {
  appName: string;
}

export const DeploymentsManagement: React.FC<DeploymentsManagementProps> = ({ appName }) => {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [newDeployment, setNewDeployment] = useState<string>('');
  const [renameData, setRenameData] = useState<RenameData>({ oldName: '', newName: '' });

  const loadDeployments = async () => {
    const deploymentsData = await fetchDeployments(appName);
    setDeployments(deploymentsData);
  };

  const handleCreateDeployment = async () => {
    await createDeployment(appName, newDeployment);
    setNewDeployment('');
    loadDeployments();
  };

  const handleDeleteDeployment = async (deploymentName: string) => {
    await deleteDeployment(appName, deploymentName);
    loadDeployments();
  };

  const handleRenameDeployment = async () => {
    await renameDeployment(appName, renameData.oldName, renameData.newName);
    setRenameData({ oldName: '', newName: '' });
    loadDeployments();
  };

  return (
    <div>
      <h2>Deployments Management</h2>
      <ul>
        {deployments.map((deployment) => (
          <li key={deployment.name}>
            {deployment.name} <button onClick={() => handleDeleteDeployment(deployment.name)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Create New Deployment</h3>
        <input
          type="text"
          placeholder="Deployment Name"
          value={newDeployment}
          onChange={(e) => setNewDeployment(e.target.value)}
        />
        <button onClick={handleCreateDeployment}>Create Deployment</button>
      </div>
      <div>
        <h3>Rename Deployment</h3>
        <input
          type="text"
          placeholder="Old Name"
          value={renameData.oldName}
          onChange={(e) => setRenameData({ ...renameData, oldName: e.target.value })}
        />
        <input
          type="text"
          placeholder="New Name"
          value={renameData.newName}
          onChange={(e) => setRenameData({ ...renameData, newName: e.target.value })}
        />
        <button onClick={handleRenameDeployment}>Rename Deployment</button>
      </div>
    </div>
  );
};