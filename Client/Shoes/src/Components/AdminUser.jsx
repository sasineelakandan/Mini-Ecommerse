import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import ANavbar from './Adminnav.jsx';

const UserManagementPage = () => {
  const [users, setUsersState] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users data
  useEffect(() => {
    axios
      .get('http://localhost:8001/users', { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUsersState(response.data);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle Delete User
  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:8001/users/delete/${id}`)
      .then(() => {
        setUsersState(users.filter((user) => user._id !== id));
        toast.success('User deleted successfully');
      })
      .catch((error) => toast.error('Failed to delete user'));
  };

  // Open Edit Modal and set selected user data
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex">
      <ANavbar /> {/* Your Navbar here */}

      <div className="min-h-screen p-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 flex-1">
        <ToastContainer />
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold text-white text-center mb-12 animate-pulse">
            Manage Users
          </h1>

          <div className="overflow-x-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
            <table className="min-w-full text-white">
              <thead>
                <tr className="text-left bg-red-700">
                  <th className="py-2 px-4">User Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Phone</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-red-600 transition duration-200"
                  >
                    <td className="py-2 px-4">{user.Name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.phone}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => handleEditUser(user)}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 ml-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit User Modal */}
          {isEditModalOpen && (
            <EditUserModal
              user={selectedUser}
              closeModal={closeModal}
              setUsersState={setUsersState}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// EditUserModal Component
const EditUserModal = ({ user, closeModal, setUsersState, users }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Name: user.Name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = (data) => {
    axios
      .put(`http://localhost:8001/users/edit/${user._id}`, data)
      .then(() => {
        setUsersState(
          users.map((u) => (u._id === user._id ? { ...u, ...data } : u))
        );
        toast.success('User updated successfully');
        closeModal();
      })
      .catch((error) => toast.error('Failed to update user'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              {...register('Name', { required: 'Name is required' })}
              className={`w-full px-4 py-2 border ${
                errors.Name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg`}
            />
            {errors.Name && (
              <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded-lg`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagementPage;
