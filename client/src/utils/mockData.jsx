export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
  },
];

export const roles = [
  {
    id: 1,
    name: "Admin",
    permissions: ["create", "read", "update", "delete"],
  },
  { id: 2, name: "Editor", permissions: ["read", "update"] },
  { id: 3, name: "Viewer", permissions: ["read"] },
];

export const permissions = [
  {
    id: 1,
    module: "User Management",
    actions: ["create", "read", "update", "delete"],
  },
  {
    id: 2,
    module: "Role Management",
    actions: ["read", "update"],
  },
];

export const rolesWithPermissions = [
  {
    id: 1,
    role: "Admin",
    permissions: {
      "User Management": ["create", "read", "update", "delete"],
      "Role Management": ["create", "read", "update"],
    },
  },
  {
    id: 2,
    role: "Manager",
    permissions: {
      "User Management": ["read", "update"],
    },
  },
];
