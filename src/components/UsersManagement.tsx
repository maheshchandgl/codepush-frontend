import React, { useState } from 'react';
import {
  fetchUsers,
  addUser,
  removeUser,
} from '../services/api/usersApi';

export const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  const loadUsers = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  };

  const handleAddUser = async () => {
    await addUser(newUser);
    setNewUser('');
    loadUsers();
  };

  const handleRemoveUser = async (userId) => {
    await removeUser(userId);
    loadUsers();
  };

  return (
    <div>
      <h2>Users Management</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="User Name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};