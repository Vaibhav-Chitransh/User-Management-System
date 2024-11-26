import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import Login_Signup from './pages/Login_Signup';
import { users } from "./utils/mockData";

const App = () => {
  const [userList, setUserList] = useState(users);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      {!currentUser ? <Login_Signup currentUser={currentUser} setCurrentUser={setCurrentUser} userList={userList} setUserList={setUserList} /> : <HomePage userList={userList} setUserList={setUserList} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
    </div>
  )
}

export default App
