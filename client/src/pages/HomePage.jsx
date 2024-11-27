import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Users from "./Users";
import Roles from "./Roles";
import Permissions from "./Permissions";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { UserPlus, Shield, Lock, Settings2 } from "lucide-react";
import RolePermissions from "./RolePermissions";

const HomePage = ({ userList, setUserList, currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    setCurrentUser(null);
  };

  const navigate = useNavigate();
  console.log(userList);

  return (
    <div className="p-4 border border-gray-300 m-4 shadow-md rounded-2xl">
      <div className="flex justify-between">
        <h1 className="px-4 text-2xl font-bold mb-3">
          Welcome, {currentUser?.username}
        </h1>
        <button
          className="px-3 py-2 bg-black text-white rounded flex justify-center items-center transition-all hover:scale-105"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <Tabs defaultValue="users" className="w-full p-3">
        <TabsList>
          <TabsTrigger value="users" className="flex gap-2" >
            <UserPlus size={18} />
            <span className="font-semibold">Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex gap-2" >
            <Shield size={18} />
            <span className="font-semibold">Roles</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex gap-2" >
            <Lock size={18} />
            <span className="font-semibold">Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="role-permissions" className="flex gap-2" >
            <Settings2 size={18} />
            <span className="font-semibold">Role Permissions</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <Users
            userList={userList}
            setUserList={setUserList}
            currentUser={currentUser}
          />
        </TabsContent>
        <TabsContent value="roles">
          <Roles />
        </TabsContent>
        <TabsContent value="permissions">
          <Permissions />
        </TabsContent>
        <TabsContent value="role-permissions">
          <RolePermissions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePage;
