import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Edit, Trash2 } from "lucide-react";
import AddUserTab from "../components/layout/AddUserTab";
import EditUserTab from "../components/layout/EditUserTab";

const Users = ({userList, setUserList, currentUser}) => {
  const [newUser, setNewUser] = useState(false);
  const [editUser, setEditUser] = useState(0);

  console.log(currentUser);

  const deleteUser = (id) => {
    if(currentUser.role !== 'Admin') {
      alert('You do not have permission to delete users.');
      return ;
    }
    setUserList(userList.filter((user) => user.id !== id));
  };

  const addUser = () => {
    if(currentUser.role !== 'Admin') {
      alert('You do not have permission to add users.');
      return ;
    }
    setNewUser(true);
  }

  const edit = (id) => {
    if(currentUser.role === 'Viewer') {
      alert('You do not have permission to edit users.');
      return ;
    }
    setEditUser(id);
  }

  return (
    <div>
      <header className="flex w-full justify-between items-center mt-5 mb-5">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button className="px-3 py-2 bg-black text-white rounded flex justify-center items-center transition-all hover:scale-105" onClick={addUser}>
          <FaPlus className="inline-block" />
          <span className="font-bold ml-2">Add User</span>
        </button>
      </header>
      <table className="mt-4 w-full border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
                <tr key={user.id} className={`border-b-2 border-gray-300 ${currentUser && user.email === currentUser.email ? 'bg-blue-100' : ''}`}>
                  <td className="py-4 px-4">{user.name}</td>
                  <td className="py-4 px-4">{user.email}</td>
                  <td className="py-4 px-4">{user.role}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-3">
                      <button
                        className="px-1 py-1 hover:bg-gray-200"
                        onClick={() => edit(user.id)}
                      >
                        <Edit />
                      </button>
                      <button
                        className="text-red-500 px-1 py-1 hover:bg-gray-200"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </td>
                </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {newUser && <AddUserTab userList={userList} setUserList={setUserList} closeAddUserTab={() => setNewUser(false)} />}
      </div>
      <div>
        {editUser === 0 ? '' : <EditUserTab userList={userList} userId={editUser} setUserList={setUserList} closeEditUserTab={() => setEditUser(0)} />}
      </div>
    </div>
  );
};

export default Users;