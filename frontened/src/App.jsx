{/*import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import AdminDashboard from './pages/adminDashBoard'
import EmployeeDashboard from './pages/employeeDashBoard'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashBoard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/view';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View';


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Dashboard with nested routes */} 
      /*  <Route 
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

        </Route>

        {/* Employee Dashboard */
     {/*  <Route path='/employee-dashboard' element={<EmployeeDashboard />} />  
      </Routes>
    </BrowserRouter>
  )
}

export default App

*/}


import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom' 
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import AdminDashboard from './pages/adminDashBoard'
import EmployeeDashboard from './pages/employeeDashBoard'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBasedRoutes from './utils/RoleBasedRoutes';
import AdminSummary from './components/dashBoard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/view';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View';
import Summary from './components/EmployeeDashboard/Summary';
import Profile from './components/EmployeeDashboard/Profile';
import LeaveList from './components/Leave/List';
import AddLeave from './components/Leave/Add'
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/Leave/Table';
import Details from './components/Leave/Details';
import AdminSetting from './components/adminSetting/Setting';
//import LeaveDetails from './components/Leave/LeaveDetails';
//import Attendance from './components/attendance/Attendance';
import Attendance from './components/attendence/Attendance';
import AttendanceReport from './components/attendence/AttendenceReport';


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

 <Route path="setting" element={<Setting/>} />
 
</Route>
           
      </Routes>
    </BrowserRouter>
  )
}

export default App


