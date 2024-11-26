import React, { useState } from "react";

const EditPermissionsTab = ({
  role,
  permissions,
  savePermissions,
  closeEditTab,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState(
    role.permissions
  );

  const togglePermission = (module, action) => {
    const updatedPermissions = { ...selectedPermissions };

    if (!updatedPermissions[module]) {
      updatedPermissions[module] = [];
    }

    if (updatedPermissions[module].includes(action)) {
      updatedPermissions[module] = updatedPermissions[module].filter(
        (a) => a !== action
      );
    } else {
      updatedPermissions[module].push(action);
    }

    if (updatedPermissions[module].length === 0)
      delete updatedPermissions[module];

    setSelectedPermissions(updatedPermissions);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">
          Edit Permissions for {role.role}
        </h2>
        <div className="space-y-4">
          {permissions.map((permission) => {
            return (
              <div
                key={permission.id}
                className="flex justify-between items-center"
              >
                <span className="font-medium">{permission.module}</span>
                <div className="flex space-x-2">
                  {permission.actions.map((action) => {
                    return (
                      <button
                        key={action}
                        onClick={() =>
                          togglePermission(permission.module, action)
                        }
                        className={`px-3 py-1 rounded-2xl ${
                          selectedPermissions[permission.module]?.includes(
                            action
                          )
                            ? "bg-purple-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {action}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-3 py-2 bg-gray-200 text-black rounded flex justify-center items-center transition-all hover:scale-105"
            onClick={closeEditTab}
          >
            Cancel
          </button>
          <button
            className="px-3 py-2 bg-black text-white rounded flex justify-center items-center transition-all hover:scale-105"
            onClick={() => savePermissions(selectedPermissions)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPermissionsTab;
