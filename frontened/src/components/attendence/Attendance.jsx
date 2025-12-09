/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'; 
import DataTable from 'react-data-table-component'
import {columns,AttendanceHelper} from '../../utils/AttendanceHelper.jsx'
import { useEffect } from 'react';
import axios from 'axios';
//import { EmployeeButtons } from '../../utils/EmployeeHelper.jsx';
import { EmployeeButtons } from '../../utils/EmployeeHelper.jsx';
const Attendance= () => {
    const[loading,setLoading]=useState(false)
    const[filteredAttendance,setFilteredAttendance]=useState([])
    const [attendance,setAttendance]=useState([])


    const statusChange=()=>{
      fetchAttendance()
    }


   const fetchAttendance = async () => {
     setLoading(true);
     try {
       const response = await axios.get("http://localhost:5000/api/attendance", {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       
       if (response.data.success) {
         let sno = 1;
         console.log(response.data);
         const data = response.data.attendance.map((att, index) => ({
         // sno: index + 1,
          //employeeId: att?.employeeId?.employeeId || "N/A",
         // department: att.employeeId?.department?.name || "N/A", // <-- changed here
         // name: att?.employeeId?.userId?.name || "N/A",

            sno: index + 1,
          employeeId: att.employeeId || "N/A",
          name: att.name || "N/A",
          department: att.department || "N/A", // just use att.department directly
          
           action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange}/>,
         }));

         setAttendance(data);
         setFilteredAttendance(data);
       }
     } catch (error) {
       if (error.response && !error.response.data.success) {
        console.error(
          "Attendance API error:",
          error.response?.data || error.message
        );

       }
     } finally {
       setLoading(false);
     }
   };
     useEffect(() => {
       
       fetchAttendance();
     }, []);



     const handleFilter=(e)=>{
const records=attendance.filter((emp)=>
(
  emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
))
setFilteredAttendance(records)
     }
  return (
    <div className='p-6 '>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Emp Id"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
          
        />
        <p className='text-2xl'>Mark Employees for <span className=' font-bold underline'>
          {new Date().toISOString().split('T')[0]}{""}
          </span>
          </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredAttendance} pagination/>
      </div>
    </div>
  );
}

export default Attendance