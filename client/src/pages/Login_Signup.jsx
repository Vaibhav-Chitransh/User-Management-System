import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";
import bcrypt from "bcryptjs-react";

const Login_Signup = ({
  currentUser,
  setCurrentUser,
  userList,
  setUserList,
}) => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const alert_box = (icon, title, msg, btn_color) => {
    alertbox.render({
      alertIcon: icon,
      title:title,
      message: msg,
      btnTitle: "Ok",
      themeColor: "#000000",
      btnColor: btn_color,
    });
  };

  const handleRegistration = async (type) => {
    try {
      if (type === "signup") {
        if (!validateEmail(signupInput.email)) {
          alert_box('error', 'Error!', "Please enter a valid email.", '#FF0000');
          return;
        }

        const hashedPassword = await bcrypt.hash(signupInput.password, 10);

        const newUser = {
          id: Date.now(),
          name: signupInput.name,
          email: signupInput.email,
          password: hashedPassword,
          role: "Viewer",
          status: "Active",
        };

        let fl = false;

        userList.map((user) => {
          if (user.email === signupInput.email) {
            alert_box('error', 'Error!', "Email already exists", '#FF0000');
            fl = true;
            return;
          }
        });

        if (!fl) {
          setUserList([...userList, newUser]);
          setCurrentUser(newUser);
          alert_box('success', 'Thank You!', "Signup successful!", '#7CFC00');
        }
      } else {
        const user = userList.find((u) => u.email === loginInput.email);

        if (
          user &&
          (await bcrypt.compare(loginInput.password, user.password))
        ) {
          setCurrentUser(user);
          alert_box('success', 'Welcome!', "Login successful!", '#7CFC00');
        } else {
          alert_box('error', 'Error!', "Invalid email or password.", '#FF0000');
        }
      }
    } catch (error) {
      alert_box('error', 'Error!', "An error occurred: " + error.message, '#FF0000');
    }
  };

  return (
    <div className="flex items-center justify-center w-full mt-32">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  placeholder="Alex"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="alex@gmail.com"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <button
                className="px-3 py-2 bg-black text-white rounded flex justify-center items-center transition-all hover:scale-105"
                onClick={() => handleRegistration("signup")}
              >
                Signup
              </button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="alex@gmail.com"
                  required="true"
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  required="true"
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <button
                className="px-3 py-2 bg-black text-white rounded flex justify-center items-center transition-all hover:scale-105"
                onClick={() => handleRegistration("login")}
              >
                Login
              </button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login_Signup;