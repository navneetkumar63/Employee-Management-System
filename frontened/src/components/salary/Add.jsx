import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId : '',
      basicSalary :0,
        allowances: 0,
        deductions:0,
     payDate:'',
    });
    const [departments,setDepartments] = useState(null);
    const[employees,setEmployees] = useState([]);
    const navigate = useNavigate();
    

     useEffect(() => {
        const getDepartments = async () => {
          const departments = await fetchDepartments();
          setDepartments(departments);
        };
        getDepartments();
      }, []);

    const handleDepartment = async(e)=>{
      const emps = await getEmployees(e.target.value);
      setEmployees(emps);
    }

    const handleEmployeeChange = (e) => {
    setSalary(prev => ({...prev, employeeId: e.target.value}));
};

 


    const handleChange = (e) => {
        const { name, value  } = e.target;
        setSalary((prev) => ({ ...prev, [name]: value }));
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `https://employee-management-system-q86i.onrender.com/api/salary/add/`,
            salary,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                toast.success('Salary updated successfully!');
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
        <>{departments  ?  (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>



                <div>
            <label className='block text-sm font-medium text-gray-600'>Department</label>
                        <select
                            name='department'
                            onChange={handleDepartment} 
                               className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required >
                            <option value=''>Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.name || dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    
                 <div>
                        <label className='block text-sm font-medium text-gray-600'>Employee</label>
                      <select
    name='employeeId'
    onChange={handleEmployeeChange} // ✅ Sahi: Alag function hona chahiye
    value={salary.employeeId}
    className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
    required
    disabled={employees.length === 0}
>
                        
                        <option value=''>Select Employee</option>
    {employees && employees.map((emp) => (
        <option key={emp._id} value={emp._id}>
            {emp.employeeId || emp.employee_id}
        </option>
    ))} </select>
     

  
</div>
                  

                   

                      <div>
                        <label className='block text-sm font-medium text-gray-600'>Basic Salary</label>
                        <input
                            type='number'
                            name='basicSalary'
                           placeholder='basic Salary'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>

                   

                    <div>
                        <label className='block text-sm font-medium text-gray-600'>Allowances</label>
                        <input
                            type='number'
                               name='allowances' 
                            placeholder='allowances'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-600'>Deductions</label>
                        <input
                            type='number'
                          name='deductions'
                            placeholder='deduction'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>

                        <div>
                        <label className='block text-sm font-medium text-gray-600'>Pay Date</label>
                        <input
                            type='date'
                            name='payDate'
                         
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-200 rounded-md'
                            required
                        />
                    </div>


                      

                    
                    </div>
                    <button
                        type='submit'
                        className='w-full mt-6 bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded'
                    >
                        Add Salary
                    </button>
                
            </form>
            
        </div>
        ) : <div>Loading</div>} </>
    );
};

export default Add;

