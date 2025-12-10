
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const RoleBasedRoutes = ({ children, requiredRole }) => {
  const { auth, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!auth?.token) return <Navigate to="/login" replace />;

  if (!requiredRole.includes(auth.user.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default RoleBasedRoutes;

