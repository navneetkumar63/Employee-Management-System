import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Details = () => {
    const {id} = useParams();
    const [leave,setLeave] = useState(null)
    const navigate = useNavigate();

   useEffect(() => {
        const fetchLeave = async () => {
            try {
                const response = await axios.get(`https://employee-management-system-q86i.onrender.com/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
              if (response.data.success) {
                  setLeave(response.data.leave)
                 }
                }

            catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
            }} 
        }
        fetchLeave();
    }, [])


    const changeStatus = async (id,status)=>{
           try {
                const response = await axios.put(`https://employee-management-system-q86i.onrender.com/api/leave/${id}`,{status}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
              if (response.data.success) {
                  navigate('/admin-dashboard/leaves')
                 }
                }

            catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
            }
    }
}



  return (
    <>{leave ? (
  <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
  <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>

  {/* 👇 Flex container banaya */}
  <div className="flex flex-col md:flex-row items-start gap-10">
    {/* Left Side - Image */}
    <div className="flex-shrink-0">
      <img  
        src={`https://employee-management-system-q86i.onrender.com/${leave.employeeId.userId.profileImage}`} 
        className="rounded-full border w-72 h-72 object-cover"
        alt="Employee"
      /> 
    </div>

    {/* Right Side - Details */}
    <div className="flex-1">
      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Name:</p>
        <p className="font-medium">{leave.employeeId.userId.name}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Employee Id:</p>
        <p className="font-medium">{leave.employeeId.employeeId}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Leave Type:</p>
        <p className="font-medium">{leave.leaveType}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Reason:</p>
        <p className="font-medium">{leave.reason}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Department:</p>
        <p className="font-medium">{leave.employeeId.department.dep_name}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">Start Date:</p>
        <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">End Date:</p>
        <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
      </div>

      <div className="flex space-x-3 mb-5">
        <p className="text-lg font-bold">{leave.status ==="Pending" ? "Action" : "Status:"}</p>
        {leave.status === "Pending" ? (
            <div className='flex space-x-2'>
                <button className='bg-green-500 rounded text-white p-1 font-medium' onClick={()=> changeStatus(leave._id,"Approved")}>Approve</button>
                 <button className='bg-red-600 rounded text-white p-1 font-medium'onClick={()=> changeStatus(leave._id,"Rejected")}>Reject</button>
            </div>
        ) :
        <p className='font-medium'>{leave.status}</p>
    }
       
      </div>
    </div>
  </div>
</div>
    ): <div>Loading.......</div>}</>
  )
}

export default Details
