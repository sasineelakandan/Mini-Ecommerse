import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', role: 'User' });
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditUser(user);
  };

  const handleSaveEditUser = () => {
    setUsers(
      users.map((user) =>
        user.id === editUser.id ? editUser : user
      )
    );
    setEditUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <Navbar />
      <div className="container mx-auto mt-10 p-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">User Management</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="px-4 py-2 rounded-lg text-black"
              placeholder="Search Users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="text-white text-xl" />
          </div>
        </div>

        {/* Add New User */}
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold mb-4">Add New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              className="px-4 py-2 rounded-lg text-black"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="px-4 py-2 rounded-lg text-black"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="px-4 py-2 rounded-lg text-black"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <button
              onClick={handleAddUser}
              className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faPlus} /> Add User
            </button>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-red-600">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white bg-opacity-20">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 flex space-x-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {editUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Edit User</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  className="px-4 py-2 rounded-lg"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="px-4 py-2 rounded-lg"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
                <select
                  className="px-4 py-2 rounded-lg"
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleSaveEditUser}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditUser(null)}
                    className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
