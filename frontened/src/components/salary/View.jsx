
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext.jsx';

const View = () => {
  const { user } = useAuth(); // Auth se logged in user
  const { id } = useParams(); // Route param se id
  const navigate = useNavigate();

  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);

  const fetchSalaries = async () => {
    try {
      

      const response = await axios.get(`https://employee-management-system-q86i.onrender.com/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      } else {
        toast.error("Failed to fetch salary data");
      }
    } catch (error) {
      console.error("Error fetching salaries:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("Backend server is not running");
      } else {
        toast.error("Failed to fetch salary data");
      }
    }
  };

  useEffect(() => {
    // Agar user login hai aur id nahi aayi to user._id se redirect kar do
    if (!id && user && user._id) {
      navigate(`/salary/${user._id}`);
    } else {
      fetchSalaries();
    }
  }, [id, user, navigate]);

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    if (query === '') {
      setFilteredSalaries(salaries);
    } else {
      const filteredRecords = salaries.filter((salary) => {
        if (salary.employeeId && salary.employeeId.employeeId) {
          return salary.employeeId.employeeId.toLowerCase().includes(query);
        }
        return false;
      });
      setFilteredSalaries(filteredRecords);
    }
  };

  return (
    <div className='overflow-x-auto p-5'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Salary History</h2>
      </div>

      <div className='flex justify-end my-3'>
        <input
          type='text'
          placeholder='Search By Emp ID'
          className='border px-3 py-2 rounded-md border-gray-300 w-64'
          onChange={handleFilter}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th className='px-6 py-3'>SNO</th>
                <th className='px-6 py-3'>Emp ID</th>
                <th className='px-6 py-3'>Basic Salary</th>
                <th className='px-6 py-3'>Allowances</th>
                <th className='px-6 py-3'>Deductions</th>
                <th className='px-6 py-3'>Net Salary</th>
                <th className='px-6 py-3'>Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.map((salary, index) => (
                <tr key={salary._id} className='bg-white border-b hover:bg-gray-50'>
                  <td className='px-6 py-4'>{index + 1}</td>
                  <td className='px-6 py-4'>
                    {salary.employeeId?.employeeId || 'N/A'}
                  </td>
                  <td className='px-6 py-4'>{salary.basicSalary}</td>
                  <td className='px-6 py-4'>{salary.allowances}</td>
                  <td className='px-6 py-4'>{salary.deductions}</td>
                  <td className='px-6 py-4 font-semibold'>{salary.netSalary}</td>
                  <td className='px-6 py-4'>
                    {new Date(salary.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center py-10'>
          <p className='text-gray-500 text-lg'>
            {salaries.length === 0 ? 'No salary records found' : 'No matching records found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default View;
