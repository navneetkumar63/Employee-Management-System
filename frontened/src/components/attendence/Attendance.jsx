
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authContext";

// Helper component for marking attendance
const AttendanceHelper = ({ status, employeeId, refresh, isAdmin }) => {
  const markAttendance = async (status) => {
    try {
      await axios.put(
        `https://employee-management-system-q86i.onrender.com/api/attendance/update/${employeeId}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      toast.success("Attendance marked!");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark attendance");
    }
  };

  // Only admin sees buttons
  if (!status && isAdmin) {
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => markAttendance("Present")}
          className="bg-green-600 px-2 py-1 text-white rounded"
        >
          Present
        </button>
        <button
          onClick={() => markAttendance("Absent")}
          className="bg-red-500 px-2 py-1 text-white rounded"
        >
          Absent
        </button>
        <button
          onClick={() => markAttendance("Sick")}
          className="bg-gray-600 px-2 py-1 text-white rounded"
        >
          Sick
        </button>
        <button
          onClick={() => markAttendance("Leave")}
          className="bg-yellow-600 px-2 py-1 text-white rounded"
        >
          Leave
        </button>
      </div>
    );
  }

  // Employees and already marked records
  return <span className="px-3 py-1 bg-gray-200 rounded">{status || "Not marked"}</span>;
};

// Columns for DataTable
const columns = (refresh, isAdmin) => [
  { name: "S.No", selector: (row) => row.sno, width: "70px" },
  { name: "Name", selector: (row) => row.name, sortable: true, width: "150px" },
  { name: "Emp ID", selector: (row) => row.employeeId, sortable: true, width: "100px" },
  { name: "Department", selector: (row) => row.department, width: "120px" },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
    cell: (row) => <AttendanceHelper {...row.actionProps} refresh={refresh} isAdmin={isAdmin} />,
  },
];

const Attendance = () => {
  const { auth } = useAuth();
  const isAdmin = auth.user?.role === "admin";

  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://employee-management-system-q86i.onrender.com/api/attendance", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (res.data.success) {
        const data = res.data.attendance.map((att, index) => ({
          sno: index + 1,
          name: att.name,
          employeeId: att.employeeId,
          department: att.department,
          actionProps: {
            status: att.status === "not mark" ? null : att.status,
            employeeId: att.employeeId,
          },
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      toast.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const term = e.target.value.toLowerCase();
    setFilteredAttendance(
      attendance.filter((emp) => emp.employeeId.toLowerCase().includes(term))
    );
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Emp ID"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />
        <p className="text-lg">
          Mark Employees for{" "}
          <span className="font-bold underline">{new Date().toISOString().split("T")[0]}</span>
        </p>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns(fetchAttendance, isAdmin)}
          data={filteredAttendance}
          progressPending={loading}
          pagination
          noDataComponent="No records to display"
        />
      </div>
    </div>
  );
};

export default Attendance;



