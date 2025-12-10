import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify';
import axios from 'axios';

import AddDepartment from './AddDepartment'
import { columns, DepartmentButton } from '../../utils/DepartmentHelper'
const DepartmentList = () => {
  const[departments,setDepartments] = useState([])
  const [depLoading,setDepLoading] = useState(false)
  const [filteredDepartments,setFilteredDepartments] = useState([])

  const fetchDepartments = async (id) =>{
    setDepLoading(true);
try{
  const response = await axios.get("https://employee-management-system-q86i.onrender.com/api/department", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
})
 
if(response.data.success){
      let sno = 1 ;
  const data = await response.data.departments.map((dep)=>(
    {
      _id : dep._id ,
      sno : sno++ ,
      dep_name: dep.name,
     action: (
  <DepartmentButton id={dep._id} //onDepartmentDelete={onDepartmentDelete}
   refreshDepartments={fetchDepartments} 
  />
)
    }
  
  ));
  
  setDepartments(data);
  setFilteredDepartments(data)
    }
  }
  catch(error){
   if (error.response && error.response.data && error.response.data.message) {
       toast.error(error.response.data.message);
       console.log("error") // backend se aaya message
     } else {
      console.log(error);
       toast.error("Something went wrong!"); // fallback message
     }
  } finally{
    setDepLoading(false);
  }
} 
useEffect(()=>{
  fetchDepartments();
},[]);
//fetchDepartments();
//},[])

const filterDepartments = (e) =>{
const records = departments.filter((dep)=> 
dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
setFilteredDepartments(records);

}



  return (
  <>{depLoading ? <div>Loading.....</div> :

    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold mt-4'> Manage Department</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder=' Search By Dept Name' onChange={filterDepartments} className='px-4 py-0.5 border' />
        <Link to='/admin-dashboard/add-department' className='px-4 py-1 bg-teal-600 rounded text-white'> Add New Department </Link>
      </div>
      
      <div className="mt-5">
        <DataTable
        columns={columns} data={filteredDepartments} />
      </div>
    </div>
    }</>
  
  )}


export default DepartmentList




