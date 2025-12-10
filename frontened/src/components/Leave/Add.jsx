import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const { auth, loading } = useAuth();
  const user = auth?.user; // ✅ Get user safely
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: "", // initially empty
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Set userId once user is loaded
  useEffect(() => {
    if (user && user._id) {
      setLeave(prev => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  if (loading) return <div>Loading user info...</div>;
  if (!user) return <div>User not found. Please login.</div>; // Optional redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leave.userId) return toast.error("User not found. Please login again.");

    try {
      const response = await axios.post(`https://employee-management-system-q86i.onrender.com/api/leave/add`, leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success("Leave request submitted!");
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>Request for Leave</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Leave type</label>
            <select name='leaveType' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
              <option value="">Select Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>From Date</label>
              <input type='date' name='startDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>To Date</label>
              <input type='date' name='endDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea name='reason' placeholder='Reason' onChange={handleChange} className='w-full border border-gray-300'></textarea>
          </div>
        </div>

        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
          Add Leave
        </button>
      </form>
    </div>
  );
};

export default Add;
