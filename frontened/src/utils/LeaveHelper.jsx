import { useNavigate } from "react-router-dom"


export const colummn =[
{
    name:"S No",
    selector: (row) => row.sno,
    width:"70px",
},
{
    name:"Emp ID",
    selector: (row) => row.employeeId,
    width:"120px",
},
{
    name:"Name",
    selector: (row) => row.name,
    width:"120px",
},
{
    name:"Leave Type",
    selector: (row) => row.leaveType,
    width:"120px",
},
{
    name:"Department",
    selector: (row) => row.dep_name,
    width:"120px",
},
{
    name:"Days",
    selector: (row) => row.days,
    width:"80px",
},
{
    name:"Status",
    selector: (row) => row.status,
    width:"120px",
},{
    name:"Action",
    selector: (row) => row.action,
    width:"120px",
}

];

export const LeaveButton =({Id}) =>{
    const naviagte = useNavigate();

    const handleView = (id) =>{
        naviagte(`/admin-dashboard/leaves/${id}`);
    };

    return (
        <button className=" px-4 py-1 bg-teal-500 rounded text-white hover-bg-teal-600"
        onClick={()=> handleView(Id)}>
            View
        </button>
    );
}
