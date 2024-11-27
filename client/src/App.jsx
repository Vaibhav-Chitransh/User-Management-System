import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login_Signup from "./pages/Login_Signup";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login_Signup
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userList={userList}
                setUserList={setUserList}
              />
            }
          />
          <Route
            path="/users"
            element={
                <ProtectedRoute currentUser ={currentUser }>
                    <HomePage
                        userList={userList}
                        setUserList={setUserList}
                        currentUser ={currentUser }
                        setCurrentUser ={setCurrentUser}
                    />
                </ProtectedRoute>
              }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
