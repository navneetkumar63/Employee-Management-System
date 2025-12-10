import express from "express";
import User from "../models/User.js";
import Employee from "../models/Employee.js";

const router = express.Router();

// 👉 Fix Employee userId if mismatched
router.post("/fix-employee-link", async (req, res) => {
  try {
    const { userId } = req.body;

   

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "❌ User not found" });
    }

    // Check if employee with correct userId exists
    let employee = await Employee.findOne({ userId: userId });

    if (!employee) {
      console.log("❌ Employee with correct userId not found, fixing...");

      // Example fallback: try to find employee by employeeId = user.name
      employee = await Employee.findOne({ employeeId: user.name.toLowerCase() });

      if (employee) {
        // Update employee.userId to correct user._id
        employee.userId = user._id;
        await employee.save();
       
      } else {
        return res.status(404).json({ success: false, message: "❌ Employee record not found for this user" });
      }
    }

    res.json({ success: true, message: "✅ Employee link verified/fixed", employee });
  } catch (error) {
    console.error("⚠️ Fix employee link error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
