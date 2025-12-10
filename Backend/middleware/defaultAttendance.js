// middleware/defaultAttendance.js
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

export const defaultAttendance = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employees = await Employee.find();

    for (const emp of employees) {
      const exists = await Attendance.findOne({ employeeId: emp._id, date: today });
      if (!exists) {
        await Attendance.create({ employeeId: emp._id, date: today });
      }
    }

    next();
  } catch (err) {
    console.error("Default Attendance error:", err);
    next(err);
  }
};

