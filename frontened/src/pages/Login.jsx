
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRole, setLoginRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);

  // Register States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("employee");

  // Auto redirect if already logged in
  useEffect(() => {
    if (auth?.user) {
      if (auth.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/employee-dashboard");
    }
  }, [auth, navigate]);

  // LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://employee-management-system-q86i.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);

        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
          toast.success("Admin Login Successful");
        } else {
          navigate("/employee-dashboard");
          toast.success("Employee Login Successful");
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  // REGISTER FUNCTION
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://employee-management-system-q86i.onrender.com/api/auth/register", {
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
      });

      toast.success("Account Created Successfully!");
      setIsLogin(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-100 space-y-6">
      <h2 className="font-pacific text-3xl text-white">Employee Management System</h2>

      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Create Account"}</h2>

        {isLogin ? (
          // LOGIN FORM
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border pr-10"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Role</label>
              <select
                className="w-full px-3 py-2 border"
                value={loginRole}
                onChange={(e) => setLoginRole(e.target.value)}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-teal-600 text-white py-2">
              Login
            </button>

            <p className="text-center mt-3 text-gray-700">
              Don’t have an account?
              <span className="text-teal-600 cursor-pointer ml-1" onClick={() => setIsLogin(false)}>
                Create One
              </span>
            </p>
          </form>
        ) : (
          // REGISTER FORM
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border"
                placeholder="Enter Name"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="Enter Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Select Role</label>
              <select
                className="w-full px-3 py-2 border"
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-teal-600 text-white py-2">
              Create Account
            </button>

            <p className="text-center mt-3 text-gray-700">
              Already have an account?
              <span className="text-teal-600 cursor-pointer ml-1" onClick={() => setIsLogin(true)}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
