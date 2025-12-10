import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export const columns = [
    {
        name:"S No",
        selector :(row) => row.sno
    },
     {
        name:"Department Name",
        selector :(row) => row.dep_name,
        sortable: true
    },
     {
        name:"Action",
        selector :(row) => row.action
    },

]

 export const DepartmentButton =  ({id, refreshDepartments}) =>{
    const navigate = useNavigate();


  const handleDelete = async (id) =>{
    const confirm = window.confirm("Do you want to delete?")
    if(!confirm) return 
  try {
    
                const response = await axios.delete(`https://employee-management-system-q86i.onrender.com/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })

                   
              
if (response.data.success) {
        toast.success("Department deleted successfully");
        refreshDepartments(); // ✅ directly re-fetch from API
      }


          
            }
            catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                    console.log("error") // backend se aaya message
                } else {
                    console.log(error);
                    toast.error("Something went wrong!"); // fallback message
                }
            }
        }


    return (
        <div className="flex space-x-3">
            <button className="px-3  py-1 bg-teal-600"
            onClick={()=> navigate(`/admin-dashboard/department/${id}`)}
            >Edit

            </button>
            <button onClick={() => handleDelete(id)} className="px-3 py-1 bg-red-500">Delete</button>
        </div>
    )
}