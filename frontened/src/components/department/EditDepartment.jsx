import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({ name: "", description: "" })
    const [depLoading, setDepLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })



                if (response.data.success && response.data.department) {
                    setDepartment(response.data.department)
                    setName(response.data.department.name)
                    setDescription(response.data.department.description)
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
            } finally {
                setDepLoading(false);
            }
        }
        fetchDepartments();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(name, description);
            const response = await axios.put(`http://localhost:5000/api/department/${id}`,
                { name, description },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
        {/*    console.log("Data is saved");
            toast.success("Department is Added");
            navigate("/admin-dashboard/departments"); */}
             if(response.data.success){
        console.log("data is saved");
        toast.success("Department is Updated");
        navigate("/admin-dashboard/departments");
      }  


        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // backend se aaya message
            } else {
                toast.error("Something went wrong!"); // fallback message
            }
        }
    }


    return (
        <>{depLoading ? <div>Loading....</div> :
            <div>
                <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>

                    <h2 className='text-2xl font-bold mb-6'> Edit Department</h2>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'> Department Name </label>
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Dept Name ' className='mt-1 w-full p-2 border border-gray-300 rounded-md' />

                        </div>
                        <div>
                            <label htmlFor=' description' className='text-sm font-medium text-gray-700' >Description</label>
                            <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="description" placeholder='Enter Description' className='mt-1 w-full p-2 border border-gray-300 rounded-md'></textarea>
                        </div>
                        <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-2  rounded">   Edit Department</button>
                    </form>
                </div>
            </div>
        }</>
    )
}

export default EditDepartment
