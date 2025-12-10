import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setAuth({ user: null, token: null });
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setAuth({ user: response.data.user, token });
        } else {
          setAuth({ user: null, token: null });
        }
      } catch (err) {
        setAuth({ user: null, token: null });
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData, token) => {
    setAuth({ user: userData, token });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ auth, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);