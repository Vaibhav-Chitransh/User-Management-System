import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { roles } from "../utils/mockData";
import { Edit, Trash2 } from "lucide-react";

const Roles = () => {
  const [rolesList, setRolesList] = useState(roles);

  const deleteRole = (id) => {
    setRolesList(rolesList.filter((role) => role.id !== id));
  };

  return (
    <div>
      <header className="flex w-full justify-between items-center mt-5 mb-5">
        <h1 className="text-2xl font-semibold">Role Management</h1>
        <button className="px-3 py-2 bg-black text-white rounded flex justify-center items-center transition-all hover:scale-105">
          <FaPlus className="inline-block" />
          <span className="font-bold ml-2">Add Role</span>
        </button>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 mt-6">
        {rolesList.map((role) => {
          return (
            <div
              key={role.id}
              className="border border-gray-200 w-full rounded-lg p-4 shadow-sm hover:shadow-md flex justify-between"
            >
              <div>
                <h1 className="font-semibold text-lg">{role.name}</h1>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-2.5">
                  {role.permissions.map((permission) => {
                    return (
                      <div className="bg-blue-100 px-2 py-1 text-blue-800 rounded-3xl flex items-center justify-center">
                        {permission}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 justify-between items-center">
                <button
                  className="px-1 py-1 hover:bg-gray-200 border border-gray-300 rounded-lg"
                  onClick={() => alert("Edit user")}
                >
                  <Edit />
                </button>
                <button
                  className="text-red-500 px-1 py-1 hover:bg-gray-200 border border-gray-300 rounded-lg"
                  onClick={() => deleteRole(role.id)}
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roles;
