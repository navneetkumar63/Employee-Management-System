import axios from 'axios';
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const AddDepartment = () => {

    const[name,setName]= useState("");
    const[description,setDescription]  = useState("");

const navigate = useNavigate();


const handleSubmit = async (e)=>{
e.preventDefault();
try{
 
     const response = await axios.post('https://employee-management-system-q86i.onrender.com/api/department/add', 
         { name, description },
         {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
 })
 console.log("Data is saved");
  toast.success("Department is Added");
    navigate("/admin-dashboard/departments");
   

     
}
catch(error){
     if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message); // backend se aaya message
    } else {
      toast.error("Something went wrong!"); // fallback message
    }
}

}


  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        
            <h2 className='text-2xl font-bold mb-6'> Add Department</h2>

<form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="dep_name"  className='text-sm font-medium text-gray-700'> Department Name </label>
        <input type = "text" onChange={(e)=> setName(e.target.value)} placeholder='Enter Dept Name ' className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

    </div>
    <div>
        <label htmlFor=' description' className='text-sm font-medium text-gray-700' >Description</label>
        <textarea onChange={(e)=>setDescription(e.target.value)}  name ="description" placeholder='Enter Description' className='mt-1 w-full p-2 border border-gray-300 rounded-md'></textarea>
    </div>
    <button type="submit" className ="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-2  rounded">Add Department</button>
    </form>    
        </div>
      
   
  )
}

export default AddDepartment

