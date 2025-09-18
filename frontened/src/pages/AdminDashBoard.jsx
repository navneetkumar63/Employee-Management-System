// src/pages/AdminDashboard.jsx
import React from "react";
import { useAuth } from "../context/authContext.jsx"; // ✅ import useAuth
import AdminSideBar from "../components/dashBoard/AdminSideBar.jsx";
import NavBar from "../components/dashBoard/NavBar.jsx";
import AdminSummary from "../components/dashBoard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";



const AdminDashboard = () => {
  const { user, logout, loading } = useAuth(); // ✅ get user and loading state




  return (
    <div className="flex ">
      <AdminSideBar />
      <div className="flex-1 ml-64 bg-gray-100 min-h-screen">
        <NavBar />
        <Outlet />

      </div>
    </div>
  )
};

export default AdminDashboard;
