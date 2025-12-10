import React from 'react';
import axios from 'axios';

export const columns = [
  { name: "S No", selector: row => row.sno, width: "70px" },
  { name: "Name", selector: row => row.name, sortable: true, width: "150px" },
  { name: "Emp ID", selector: row => row.employeeId, sortable: true, width: "100px" },
  { name: "Department", selector: row => row.department, width: "120px" },
  { name: "Action", selector: row => row.action, center: true },
];

export const AttendanceHelper = ({ status, employeeId, refresh, isAdmin }) => {
  const markAttendance = async (status) => {
    await axios.put(
      `http://localhost:5000/api/attendance/update/${employeeId}`,
      { status },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    refresh();
  };

  // Only admin sees buttons
  if (!status && isAdmin) {
    return (
      <div className="flex space-x-2">
        <button onClick={() => markAttendance("Present")} className="bg-green-600 px-2 py-1 text-white rounded">Present</button>
        <button onClick={() => markAttendance("Absent")} className="bg-red-500 px-2 py-1 text-white rounded">Absent</button>
        <button onClick={() => markAttendance("Sick")} className="bg-gray-600 px-2 py-1 text-white rounded">Sick</button>
        <button onClick={() => markAttendance("Leave")} className="bg-yellow-600 px-2 py-1 text-white rounded">Leave</button>
      </div>
    );
  }

  // Employees and already marked records
  return <span className="px-3 py-1 bg-gray-200 rounded">{status || "Not marked"}</span>;
};