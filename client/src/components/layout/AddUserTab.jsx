import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddUserTab = ({ userList, setUserList, closeAddUserTab }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fl = false;

    userList.map((user) => {
      if(user.email === formData.email) {
        alert("Email already exists");
        fl = true;
        return ;
      }
    })

    if(!fl) {
      setUserList((prevUsers) => {
        const updatedList = [...prevUsers, { id: Date.now(), ...formData }];
        console.log(updatedList);
        return updatedList;
      });
    }

    setFormData({ name: "", email: "", role: "", status: "" });
    closeAddUserTab();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="email">Name</Label>
          <Input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Bruce Wayne"
            required={true}
            onChange={(e) => handleInputChange(e)}
            className="mt-1 mb-1"
          />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            value={formData.email}
            name="email"
            placeholder="bruce@gmail.com"
            required={true}
            onChange={(e) => handleInputChange(e)}
            className="mt-1 mb-1"
          />
          <Label htmlFor="role">Role</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="w-[180px] mt-1 mb-1">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Editor">Editor</SelectItem>
              <SelectItem value="Viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="w-[180px] mt-1 mb-1">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value=" Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-3 justify-end">
            <button
              className="px-3 py-2 bg-gray-300 text-black rounded transition-all hover:scale-105 mt-3"
              onClick={closeAddUserTab}
            >
              Close
            </button>
            <button
              className="px-3 py-2 bg-black text-white rounded transition-all hover:scale-105 mt-3"
              type="submit"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserTab;
