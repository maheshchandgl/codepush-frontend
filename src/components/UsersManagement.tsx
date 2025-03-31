import React, { useState } from 'react';
import {
  fetchUsers,
  addCollaborator,
  removeCollaborator,
  transferAppOwnership,
} from '../services/api/usersApi';

const UsersManagement = ({ appName }) => {
  const [users, setUsers] = useState([]);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [transferEmail, setTransferEmail] = useState('');

  const loadUsers = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  };

  const handleAddCollaborator = async () => {
    await addCollaborator(appName, collaboratorEmail);
    setCollaboratorEmail('');
    loadUsers();
  };

  const handleRemoveCollaborator = async (email) => {
    await removeCollaborator(appName, email);
    loadUsers();
  };

  const handleTransferOwnership = async () => {
    await transferAppOwnership(appName, transferEmail);
    setTransferEmail('');
    loadUsers();
  };

  return (
    <div>
      <h2>Users Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.email}>
            {user.email} <button onClick={() => handleRemoveCollaborator(user.email)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add Collaborator</h3>
        <input
          type="email"
          placeholder="Collaborator Email"
          value={collaboratorEmail}
          onChange={(e) => setCollaboratorEmail(e.target.value)}
        />
        <button onClick={handleAddCollaborator}>Add Collaborator</button>
      </div>
      <div>
        <h3>Transfer Ownership</h3>
        <input
          type="email"
          placeholder="New Owner Email"
          value={transferEmail}
          onChange={(e) => setTransferEmail(e.target.value)}
        />
        <button onClick={handleTransferOwnership}>Transfer Ownership</button>
      </div>
    </div>
  );
};

export default UsersManagement;