import Employee from "../models/Employee.js";
import Salary from "../models/Salary.js";
import User from "../models/User.js";

const addSalary = async (req ,res) =>{
try{
    console.log(req.body);
const {employeeId, basicSalary, allowances, deductions, payDate} = req.body;
const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
const newSalary = await Salary({
    employeeId,
    basicSalary,
    allowances,
    deductions,
    netSalary : totalSalary,
    payDate
})

await newSalary.save();
return res.status(200).json({success:true})

}
catch(err){
res.status(500).json({success: false, err: "salary added server err"})
}
}


const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary;

    

    // Step 1: Try salary with employeeId directly
    salary = await Salary.find({ employeeId: id })
      .populate("employeeId", "employeeId name firstName lastName");

    // Step 2: If salary not found → check Employee by userId
    if (!salary || salary.length < 1) {
      console.log("❌ Salary not found with employeeId, checking Employee collection...");

      let employee = await Employee.findOne({ userId: id });

      if (!employee) {
        console.log("❌ Employee not found with userId, trying to auto-fix...");

        // Try to find User (to verify the id belongs to a user)
        const user = await User.findById(id);

        if (user) {
          // Try to find employee by employeeId = username (or other logic as per your DB)
          employee = await Employee.findOne({ employeeId: user.name.toLowerCase() });

          if (employee) {
            // Fix employee.userId
            employee.userId = user._id;
            await employee.save();
           
          }
        }
      }

      if (!employee) {
        return res.status(404).json({
          success: false,
          error: "Employee not found (even after auto-fix attempt)",
        });
      }

      // Step 3: Now fetch salary with correct employeeId
      salary = await Salary.find({ employeeId: employee._id })
        .populate("employeeId", "employeeId name firstName lastName");
    }

    return res.status(200).json({
      success: true,
      salary,
    });
  } catch (err) {
    console.error("Salary fetch error:", err);
    res.status(500).json({
      success: false,
      error: "Server error while fetching salary data",
    });
  }
};




 export {addSalary,getSalary}