import React, { useState } from "react";
import { permissions, rolesWithPermissions } from "../utils/mockData";
import { Edit } from "lucide-react";
import EditPermissionsTab from "../components/layout/EditPermissionsTab";

const RolePermissions = () => {
  const [roles, setRoles] = useState(rolesWithPermissions);
  const [editRole, setEditRole] = useState(null);

  const openEditTab = (role) => {
    setEditRole(role);
  };

  const savePermissions = (updatedPermissions) => {
    setRoles(
      roles.map((role) => {
        return role.id === editRole.id
          ? { ...role, permissions: updatedPermissions }
          : role;
      })
    );

    setEditRole(null);
  };

  return (
    <div>
      <header className="flex w-full justify-between items-center mt-5 mb-5">
        <h1 className="text-2xl font-semibold">Role Permissions</h1>
      </header>
      <table className="mt-4 w-full border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Permissions</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => {
            return (
              <tr key={role.id} className="border-b-2 border-gray-300">
                <td className="font-semibold py-3 px-4">{role.role}</td>
                <td className="py-3 px-4">
                  {Object.entries(role.permissions).map(([module, actions]) => {
                    return (
                      <div key={module} className="py-3">
                        <strong>{module}: </strong>
                        {actions.map((item) => {
                          return (
                            <span className="bg-green-100 px-2 py-1 text-green-800 rounded-3xl mx-2">{item}</span>
                          )
                        })}
                      </div>
                    );
                  })}
                </td>
                <td className="py-3 px-4">
                  <button
                    className="px-1 py-1 hover:bg-gray-200"
                    onClick={() => openEditTab(role)}
                  >
                    <Edit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editRole && (
        <EditPermissionsTab
          role={editRole}
          permissions={permissions}
          savePermissions={savePermissions}
          closeEditTab={() => setEditRole(null)}
        />
      )}
    </div>
  );
};

export default RolePermissions;
