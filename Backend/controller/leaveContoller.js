import Employee from '../models/Employee.js';
import Leave from '../models/Leave.js'
import mongoose from 'mongoose';

const addLeave = async (req,res)=>{

try{
   
const {userId, leaveType, startDate, endDate, reason } = req.body;

const employee = await Employee.findOne({userId});


const newLeave= new Leave({
  employeeId: employee._id, leaveType, startDate, endDate, reason
})

await newLeave.save();
return res.status(200).json({success:true} )

}
catch(err){
    console.log(err.message);
res.status(500).json({success: false, err: "Leave added server err"})
}
}




 
const getLeave = async (req, res) => {
  try {
    const { id } = req.params;

    // Try as employeeId
    let leaves = await Leave.find({ employeeId: id });

    // If no leaves found, try as userId
    if (!leaves || leaves.length === 0) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        leaves = await Leave.find({ employeeId: employee._id });
      }
    }

    return res.status(200).json({ success: true, leaves });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, err: "Leave fetch server error" });
  }
};







const  getLeaves = async (req,res) =>{
   try
   {    
    
    const leaves = await Leave.find().populate({
      path: "employeeId", populate: [{
      path: 'department',
      select : 'dep_name'
    },
  {
path :'userId',
select:'name'
  }
  ]

    })
    
    return res.status(200).json({success:true, leaves})
  }
     catch(err){
    console.log(err.message);
res.status(500).json({success: false, err: "Leave added server err"})
}
}


const getLeaveDetail = async (req,res) =>{
 try
   {    
    const {id} = req.params;
    const leave = await Leave.findById({_id: id}).populate({
      path: "employeeId", populate: [{
      path: 'department',
      select : 'dep_name'
    },
  {
path :'userId',
select:'name , profileImage'
  }
  ]

    })
    
    return res.status(200).json({success:true, leave})
  }
     catch(err){
    console.log(err.message);
res.status(500).json({success: false, err: "Leave added server err"})
}
}

const updateLeave = async (req,res) =>{
  try{
    const {id} = req.params;
    const leave = await Leave.findByIdAndUpdate({_id : id}, {status: req.body.status})
    if(!leave){
      res.status(404).json({success: false, err: "Leave not founded it"})
    }
    return res.status(200).json({success:true});
  }
  
  catch(err){
    console.log(err.message);
res.status(500).json({success: false, err: "Leave update server err"})
}
}
 
export {addLeave, getLeave, getLeaves, getLeaveDetail,updateLeave}