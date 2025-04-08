import React, { useState } from 'react';
import {
  fetchUsers,
  addUser,
  removeUser,
} from '../services';

interface User {
  id: string;
  name: string;
}

export const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<string>('');

  const loadUsers = async () => {
    const usersData: User[] = await fetchUsers();
    setUsers(usersData);
  };

  const handleAddUser = async () => {
    await addUser(newUser);
    setNewUser('');
    loadUsers();
  };

  const handleRemoveUser = async (userId: string) => {
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