


import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashBoard.jsx'
import EmployeeDashboard from './pages/EmployeeDashBoard.jsx'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBasedRoutes from './utils/RoleBasedRoutes.jsx';
import AdminSummary from './components/dashBoard/AdminSummary.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import AddDepartment from './components/department/AddDepartment.jsx';
import EditDepartment from './components/department/EditDepartment.jsx';
import List from './components/employee/List.jsx';
import Add from './components/employee/Add.jsx';
import View from './components/employee/View.jsx';
import Edit from './components/employee/Edit.jsx';
import AddSalary from './components/salary/Add.jsx';
import ViewSalary from './components/salary/View.jsx';
import Summary from './components/EmployeeDashboard/Summary.jsx';
import Profile from './components/EmployeeDashboard/Profile.jsx';
import LeaveList from './components/Leave/List.jsx';
import AddLeave from './components/Leave/Add.jsx'
import Setting from './components/EmployeeDashboard/Setting.jsx';
import Table from './components/Leave/Table.jsx';
import Details from './components/Leave/Details.jsx';
import AdminSetting from './components/adminSetting/Setting.jsx';
//import LeaveDetails from './components/Leave/LeaveDetails';
//import Attendance from './components/attendance/Attendance';
import Attendance from './components/attendence/Attendance.jsx';
import AttendanceReport from './components/attendence/AttendenceReport.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Dashboard with nested routes */}
        <Route 
          path='/admin-dashboard' 
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={['admin']}>
                <AdminDashboard/>
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />

          <Route path="employees" element={<List/>} />
          <Route path="add-employee" element={<Add/>} />
          <Route path="employees/:id" element={<View/>} />
          <Route path="employees/edit/:id" element={<Edit/>} />

          <Route path="salary/add" element={<AddSalary/>} />
          <Route path="employees/salary/:id" element={<ViewSalary/>} />


          <Route path="leaves" element={<Table/>} />
          <Route path="leaves/:id" element={<Details/>} />
           <Route path="employees/leaves/:id" element={<LeaveList/>} />

            <Route path="setting" element={<AdminSetting/>} />

            <Route path="attendance"  element={<Attendance />}/>
             <Route
            path="attendance-report" element={<AttendanceReport />} />
         
          

        </Route>

        {/* Employee Dashboard */}
        <Route path='/employee-dashboard'
         element={
         <PrivateRoutes>
          <RoleBasedRoutes requiredRole={["admin", "employee"]}>
         <EmployeeDashboard />
         </RoleBasedRoutes>
         </PrivateRoutes>
         }>
           <Route index element={<Summary/>} />
    <Route path="profile/:id" element={<Profile/>} />
     <Route path="leaves/:id" element={<LeaveList/>} />
 

 <Route path="add-leave" element={<AddLeave/>} />

 <Route path="salary/:id" element={<ViewSalary/>} />
   <Route path="attendance/:id" element={<Attendance />} /> 

 <Route path="setting" element={<Setting/>} />
 
</Route>
           
      </Routes>
    </BrowserRouter>
  )
}

export default App


