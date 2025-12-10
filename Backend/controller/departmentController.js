import Department from "../models/Department.js";



 const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
    res.status(200).json({ success: true, departments })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}


 const createDepartment = async (req, res) => {
  try {
   
    const newDepartment = new Department({
     name: req.body.name, 
      description: req.body.description,
    });
   

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDepartment = async(req,res)=>{
try{
const {id} = req.params;
const department = await Department.findById(id)
if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" })
    }
 res.status(200).json({ success: true, department })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
}
}

const updateDepartment = async (req,res)=>{
try{
  const {id} = req.params;
  const {name , description} = req.body
  const updateDep = await Department.findByIdAndUpdate({_id: id},{
    name,
    description
  })
res.status(200).json({ success: true, updateDepartment })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
}
}

const deleteDepartment = async(req,res) =>{
  try{
  const {id} = req.params;
  
   const deleteDep = await Department.findById(id)
   await deleteDep.deleteOne();

    
   res.status(200).json({ success: true, deleteDep })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
}
}



export {createDepartment, getDepartments,getDepartment, updateDepartment, deleteDepartment}


 