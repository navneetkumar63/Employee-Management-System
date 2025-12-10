
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const PrivateRoutes = ({ children }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!auth?.token) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoutes;

