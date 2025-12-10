import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
//import { columns } from '../../utils/EmployeeHelper';
import { toast } from 'react-toastify';
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployee]  = useState([]);
 
 
   useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("https://employee-management-system-q86i.onrender.com/api/employee", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        });
        
        if (response.data.success) {
          
        
             let sno = 1;
          const data = response.data.employees.map((emp) => {


            
            // Check if department exists and has the expected structure
            let departmentName = 'No Department';
            if (emp.department) {
              if (emp.department.dep_name) {
                departmentName = emp.department.dep_name;
              } else if (emp.department.name) {
                departmentName = emp.department.name;
              } else if (typeof emp.department === 'string') {
                departmentName = emp.department;
              }
            }


            // Safe access to nested properties with fallbacks
          //  const departmentName = emp.department?.dep_name || 'No Department';
            const userName = emp.userId?.name || 'Unknown';
            const profileImage = emp.userId?.profileImage || null;
            
            // Safe date parsing
            let dobFormatted = 'Unknown';
            try {
              dobFormatted = emp.dob ? new Date(emp.dob).toLocaleDateString() : 'Unknown';
            } catch (error) {
              console.error("Error parsing date:", error);
            }
            
            return {
              _id: emp._id,
              sno: sno++,
              dep_name: departmentName,
              name: userName,
              dob: dobFormatted,
              profileImage: <img width={80} className='rounded-full' src={`https://employee-management-system-q86i.onrender.com/${emp.userId.profileImage}`} />,
              action: <EmployeeButtons Id={emp._id} />,
            };
          });
          setEmployees(data);
          setFilteredEmployee(data);
        }
      } catch (error) {
      
        toast.error("Failed to fetch employees!");
      } finally {
        setEmpLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

const handleFilter = (e) =>{
  const records = employees.filter((emp)=>(
    emp.name.toLowerCase().includes(e.target.value.toLowerCase())
  ))
  setFilteredEmployee(records)
}

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold mt-4">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center my-4">
        <input type="text" placeholder="Search By Dept Name" onChange={handleFilter} className="px-4 py-0.5 border" />
        <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 rounded text-white">
          Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredEmployee}/>
      </div>
     {/* {loading ? <div>Loading...</div> : <DataTable columns={columns} data={employees} />}*/}
    </div>
  );
};

export default List;






