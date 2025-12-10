import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom'
import { colummn, LeaveButton } from '../../utils/LeaveHelper';
import axios from 'axios';
import { toast } from 'react-toastify';




const Table = () => {

  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      });
     
      if (response.data.success) {

        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name,
          days:
            new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButton Id={leave._id} />,
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    }
    catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees!");
    }
  }


  useEffect(() => {
    fetchLeaves()
  }, [])

  const filterByInput = (e) => {
    const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data);
  }


  const filterByButton = (status) => {
    const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data);
  }


  return (
    <>
      {filteredLeaves ? (

        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold ">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center ">
            <input type="text" placeholder="Search By Emp Id" onChange={filterByInput} className="px-4 py-0.5 border" />

            <div className='space-x-3'>
              <button onClick={() => filterByButton("Pending")} className='px-2 py-1 bg-yellow-600 text-white hover:bg-yellow-700'>Pending</button>
              <button onClick={() => filterByButton("Approved")} className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Approve</button>
              <button onClick={() => filterByButton("Rejected")} className='px-2 py-1 bg-red-600 text-white hover:bg-red-700'>Rejected</button>
            </div>
          </div>

          <div className='mt-3'>
            <DataTable columns={colummn} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : <div>Loading </div>}
    </>
  )
}

export default Table
