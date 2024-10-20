// src/users/UsersTable.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    displayName: "",
    email: "",
    role: "",
    status: "",
  });

  // State for new user form
  const [newUserData, setNewUserData] = useState({
    displayName: "",
    email: "",
    role: "",
    status: "",
  });

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter((user) => user.id !== id));
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  // Update user data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { displayName, email, role, status } = editFormData;

    await updateDoc(doc(db, "users", editingUser.id), {
      displayName,
      email,
      role,
      status,
    });

    setEditingUser(null);
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const { displayName, email, role, status } = newUserData;

    const docRef = await addDoc(collection(db, "users"), {
      displayName,
      email,
      role,
      status,
    });

    // Add the new user to the state
    setUsers([...users, { id: docRef.id, ...newUserData }]);

    // Reset new user form
    setNewUserData({
      displayName: "",
      email: "",
      role: "",
      status: "",
    });
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 shadow-lg rounded-xl p-6">
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {users.map((user) => (
            <motion.tr
              key={user.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                {user.displayName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {user.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <button
                  className="text-indigo-400 hover:text-indigo-300 mr-2"
                  onClick={() => handleEdit(user)}>
                  <Edit size={18} />
                </button>
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => handleDelete(user.id)}>
                  <Trash2 size={18} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <div className="my-8 border-b border-gray-600"></div>{" "}
      {editingUser && (
        <form className="mt-6" onSubmit={handleUpdate}>
          <h3 className="text-lg text-gray-100">
            Edit User: {editingUser.displayName}
          </h3>
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="User Name"
              value={editFormData.displayName}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  displayName: e.target.value,
                })
              }
            />
            <input
              type="email"
              className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Role"
              value={editFormData.role}
              onChange={(e) =>
                setEditFormData({ ...editFormData, role: e.target.value })
              }
            />
            <input
              type="text"
              className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Status"
              value={editFormData.status}
              onChange={(e) =>
                setEditFormData({ ...editFormData, status: e.target.value })
              }
            />
            <button
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2 transition duration-300"
              type="submit">
              Update User
            </button>
          </div>
        </form>
      )}
      <form className="mb-6 mt-10" onSubmit={handleCreateUser}>
        <h3 className="text-2xl font-bold text-gray-100">Create New User</h3>
        <div className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="User Name"
            value={newUserData.displayName}
            onChange={(e) =>
              setNewUserData({
                ...newUserData,
                displayName: e.target.value,
              })
            }
            required
          />
          <input
            type="email"
            className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            value={newUserData.email}
            onChange={(e) =>
              setNewUserData({ ...newUserData, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Role"
            value={newUserData.role}
            onChange={(e) =>
              setNewUserData({ ...newUserData, role: e.target.value })
            }
            required
          />
          <input
            type="text"
            className="bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Status"
            value={newUserData.status}
            onChange={(e) =>
              setNewUserData({ ...newUserData, status: e.target.value })
            }
            required
          />
          <button
            className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-2 transition duration-300"
            type="submit">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersTable;
