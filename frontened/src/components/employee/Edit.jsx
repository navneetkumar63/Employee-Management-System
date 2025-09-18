
import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const [employee, setEmployee] = useState({
        name:'',
        maritalStatus: '',
        designation: '',
        salary:'',
        department:''
    });
    const [departments,setDepartments] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

     useEffect(() => {
        const getDepartments = async () => {
          const departments = await fetchDepartments();
          setDepartments(departments);
        };
        getDepartments();
      }, []);

    useEffect(() => {
        const fetchEmployee = async () => {

            try {
                const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const employee = response.data.employee
                    setEmployee((prev)=>({...prev, name:employee.userId.name, maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department
                    }))
                }
            }
            catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                }
            }
        }
        fetchEmployee();
    }, []);


    const handleChange = (e) => {
        const { name, value  } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
        };

    const handleSubmit = async (e) => {
        e.preventDefault();

       

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
              employee,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                toast.success('Employee Updated successfully!');
                navigate('/admin-dashboard/employees');
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    return (
        <>{departments &&  employee ? (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-600'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={employee.name}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-600'>Marital Status</label>
                        <select
                            name='maritalStatus'
                            value={employee.maritalStatus}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Status</option>
                            <option value='single'>Single</option>
                            <option value='married'>Married</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-600'>Designation</label>
                        <input
                            type='text'
                            name='designation'
                            value={employee.designation}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>

                   

                    <div>
                        <label className='block text-sm font-medium text-gray-600'>Salary</label>
                        <input
                            type='number'
                            name='salary'
                            value={employee.salary}
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>


                            <div className='col-span-2'>
                        <label className='block text-sm font-medium text-gray-600'>Department</label>
                        <select
                            name='department'
                            onChange={handleChange}
                           value={employee.department}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value=''>Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.name || dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    </div>
                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'
                    >
                        Add Employee
                    </button>
            </form>
            
        </div>
        ) : <div>Loading</div>} </>
    );
};

export default Edit;
