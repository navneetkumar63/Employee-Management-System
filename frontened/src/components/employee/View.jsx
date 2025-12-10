import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const View = () => {
    const {id} = useParams();
    const [employee,setEmployee] = useState(null)

   useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://employee-management-system-q86i.onrender.com/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
              if (response.data.success) {
                  setEmployee(response.data.employee)
                 }
                }

            catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
            }} 
        }
        fetchEmployee();
    }, [])
//find the onl
 // Function to safely access department name
    const getDepartmentName = () => {
        if (!employee || !employee.department) return 'Department not assigned';
        
        // Check different possible structures for department data
        if (typeof employee.department === 'string') {
            return employee.department;
        } else if (employee.department.dep_name) {
            return employee.department.dep_name;
        } else if (employee.department.name) {
            return employee.department.name;
        } else {
            return 'Department not available';
        }
    };


  return (
    <>{employee ? (
    <div className=' max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-8 text-center'
        > Employee Details</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <img  src={`https://employee-management-system-q86i.onrender.com/${employee.userId.profileImage}`} className='rounded-full border w-72'/> 
      </div>
<div className='flex space-x-3 mb-5'>
    <p className='text-lg font-bold'>Name:</p>
    <p className='font-medium'>{employee.userId.name}</p>
</div>

<div className='flex space-x-3 mb-5'>
    <p className='text-lg font-bold'>Employee Id:</p>
    <p className='font-medium'>{employee.employeeId}</p>
</div>
      
      <div className='flex space-x-3 mb-5'>
    <p className='text-lg font-bold'>Date of Birth:</p>
    <p className='font-medium'>{new Date (employee.dob).toLocaleDateString()}</p>
</div>

<div className='flex space-x-3 mb-5'>
    <p className='text-lg font-bold'>Gender:</p>
    <p className='font-medium'>{employee.gender}</p>
</div>

<div className='flex space-x-3 mb-5'>
    <p className='text-lg font-bold'>Department:</p>
    <p className='font-medium'>{getDepartmentName()}</p>
</div>

<div className='flex space-x-3 mb-5'>
    <p className='text-lg font-bold'>Marital Status:</p>
    <p className='font-medium'>{employee.maritalStatus}</p>
</div>
      <div>

      </div>
    </div>
    ): <div>Loading.......</div>}</>
  )
}

export default View

