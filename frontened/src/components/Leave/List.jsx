
import React, { useState,useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';



const List = () => {
 const {user} = useAuth();
  const [leaves,setLeaves]  = useState([]);
  let sno = 1;

  const {id} = useParams();

   const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            if (response.data.success) {
                setLeaves(response.data.leaves);
            
               } else {
                toast.error("Failed to fetch Leaves data");
            }
        } catch (error) {
           toast.error("Failed to fetch Leaves data") 
        } //finally {
         //   setLoading(false);
       // }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    if(!leaves){
      return <div> Loding...</div>
    }

  return (
     <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold mt-4">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center my-4">
        <input type="text" placeholder="Search By Dept Name"  className="px-4 py-0.5 border" />
     
        <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-teal-600 rounded text-white">
          Add New Leave
        </Link>

      </div>
    

<table className='w-full text-sm text-left text-gray-500 mt-6 '>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 font-black'>SNO</th>
                                <th className='px-6 py-3 font-black'>Leave Type</th>
                                <th className='px-6 py-3 font-black'>From </th>
                                <th className='px-6 py-3 font-black'>To</th>
                                <th className='px-6 py-3 font-black'>Description</th>
                                <th className='px-6 py-3 font-black'>Status</th>
                            </tr>
                        </thead>
                        

<tbody>
  {leaves.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center py-4 text-gray-500">
        No leaves found
      </td>
    </tr>
  ) : (
    leaves.map((leave, index) => (
      <tr key={leave._id} className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4">{leave.leaveType}</td>
        <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
        <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
        <td className="px-6 py-4">{leave.reason}</td>
        <td className="px-6 py-4">{leave.status}</td>
      </tr>
    ))
  )}
</tbody>
</table>
</div>
  )
}



export default List;



