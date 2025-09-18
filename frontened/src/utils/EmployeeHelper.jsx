import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const columns = [
    {
        name:"S No",
        selector :(row) => row.sno,
        width :"70px",
    },
     {
        name:"Name",
        selector :(row) => row.name,
        sortable: true,
         width :"130px",
    },
  {
        name:"Image",
        selector :(row) => row.profileImage,
        sortable: true,
         width :"90px",
    },
    {
        name:"Department",
        selector :(row) => row.dep_name,
        sortable: true,
         width :"120px",
    },
    {
        name:"DOB",
        selector :(row) => row.dob,
        sortable: true,
         width :"130px",
    },
      {
        name:"Actions",
        selector :(row) => row.action,
        sortable: true,
       center:"true"
    },


]



// Fetch departments from API
export const fetchDepartments = async () => {
  let departments
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments
      
    } else {
      toast.error("Failed to fetch departments");
      return [];
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
    return [];
  }
  return departments
};

//employees for salary from
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
console.log(response.data)
    if (response.data.success) {
     // employees = response.data.departments;
      return response.data.employees;
      
    } else {
      toast.error("Failed to fetch departments");
      return [];
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
    return [];
  }
  //return employees;
};

 export const EmployeeButtons =  ({Id}) =>{
    const navigate = useNavigate();
     return (
        <div className="flex space-x-3">
            <button className="px-3  py-1 bg-teal-600"
            onClick={()=> navigate(`/admin-dashboard/employees/${Id}`)}
            >View

            </button>
            <button  className="px-3 py-1 bg-green-500"
             onClick={()=> navigate(`/admin-dashboard/employees/edit/${Id}`)}
            >Edit</button>

             <button 
              onClick={()=> navigate(`/admin-dashboard/employees/salary/${Id}`)}
             className="px-3 py-1 bg-yellow-500">Salary</button>

              <button onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)} className="px-3 py-1 bg-red-500">Leave</button>
        </div>
    )
      }

