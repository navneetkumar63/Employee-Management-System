import express from "express";
import { defaultAttendance } from "../middleware/defaultAttendance.js";

import authMiddleware from "../middleware/authMiddleware.js";
import { attendanceReport, getAttendance, updateAttendance } from "../controller/AttendanceController.js";

const router = express.Router();
router.get('/',authMiddleware,defaultAttendance,getAttendance);
router.put('/update/:employeeId',authMiddleware, updateAttendance)
router.get('/report',authMiddleware,attendanceReport)

export default router;