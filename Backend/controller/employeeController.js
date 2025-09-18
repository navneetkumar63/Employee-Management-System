import path from "path";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import multer from 'multer'
import Department from '../models/Department.js'
 

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null, "public/uploads")
  },

  filename: (req,file,cb) =>{
    cb(null, Date.now() + path.extname(file.originalname))
  }

})
const upload = multer({storage: storage});



  const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('userId',{password: 0}).populate('department')
       res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
//view code 
const getEmployee = async (req, res) => {
const { id } = req.params;

  try {
    let employee;
     employee = await Employee.findById({_id: id}).populate('userId',{password: 0}).populate('department')
if(!employee){
     employee = await Employee.findOne({userId: id}).populate('userId',{password: 0}).populate('department')
}
       res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const addEmployee = async (req,res) =>{
  try{
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
} = req.body;

const user = await User.findOne({email})
if(user){
  return res.status(400).json({success: false , error:"User already register"});
}

const hashPassword = await bcrypt.hash(password,10);

const newUser = new User({
  name,

  email,
  password:hashPassword,
  role,
  profileImage : req.file ? req.file.filename : ""
})
 const savedUser = await newUser.save();


const newEmployee =  new Employee({
  userId: savedUser._id,
  employeeId,
  dob,
  gender,
  maritalStatus,
  designation,
  department,
  salary,
})
  await newEmployee.save();
  return res.status(200).json({success: true, message: "employee created"})
}
catch(err){
  return res.status(500).json({success: false, err: "server error  in adding employee"})
}
}


const updateEmployee = async (req,res)=>{
     try{
const {id} =req.params;
 const {
      name,
      maritalStatus,
      designation,
      department,
      salary,
    } = req.body;

    const employee = await Employee.findById(id);
    if(!employee){
        return res.status(404).json({success: false, err: "employee not found"})
    }

const user = await User.findById(employee.userId);
 if(!user){
        return res.status(404).json({success: false, err: "user not found"})
    }

    const updateUser = await User.findByIdAndUpdate( employee.userId,{name},{new:true, runValidators: true})
    const updateEmployee = await Employee.findByIdAndUpdate(id,{
      maritalStatus,
      designation,
      salary,
      department
    },
  {new:true, runValidators: true})
  if(!updateEmployee || !updateUser){
         return res.status(404).json({success: false, err: "document not found"})
  }

  return res.status(200).json({success:true,message:"employee updated"})

     }
     catch(err){
      console.log(err);
      return res.status(500).json({success: false, err: "server error  in updating employee"})
     }
}



const fetchEmployeesByDepId = async(req,res) =>{
  const {id} = req.params;
 try {
    const employees = await Employee.find({department: id})
       res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ success: false, message: " Server error" });
  }
}

export { getEmployees,addEmployee, upload, getEmployee, updateEmployee, fetchEmployeesByDepId};




