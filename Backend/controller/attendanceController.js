
import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// Fetch all attendance for today
const getAttendance = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const isAdmin = req.user.role === "admin";

    let query = {
      date: { $gte: todayStart, $lte: todayEnd },
    };

    if (!isAdmin) {
      // employee sees only their own
      const emp = await Employee.findOne({ userId: req.user._id });
      if (!emp) return res.status(404).json({ success: false, message: "Employee not found" });
      query.employeeId = emp._id;
    }

    const attendance = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [
          { path: "userId", model: "User", select: "name" },
          { path: "department", model: "Department", select: "name" },
        ],
      });

    const mappedAttendance = attendance.map((att) => ({
      employeeId: att.employeeId?._id,
      name: att.employeeId?.userId?.name || "N/A",
      department: att.employeeId?.department?.name || "N/A",
      status: att.status || "not mark",
    }));

    res.status(200).json({ success: true, attendance: mappedAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE attendance status (admin only)
const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;

    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const employee = await Employee.findOne({ _id: employeeId });
    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date: { $gte: todayStart, $lte: todayEnd } },
      { status },
      { new: true, upsert: true } // create if not exist
    );

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
 const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};

    // Filter by date if provided
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.date = { $gte: start, $lte: end };
    }

    // Fetch attendance with nested population
    const attendanceData = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", model: "Department", select: "name" },
          { path: "userId", model: "User", select: "name" },
        ],
      })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));



    // Group by date
    const groupData = attendanceData.reduce((result, record) => {
      const recordDate = new Date(record.date).toISOString().split("T")[0];
      if (!result[recordDate]) result[recordDate] = [];

      result[recordDate].push({
        employeeId: record.employeeId?.employeeId || "N/A",
        employeeName: record.employeeId?.userId?.name || "N/A",
        departmentName: record.employeeId?.department?.name || "N/A",
        status: record.status || "not mark",
      });

      return result;
    }, {});

    return res.status(200).json({
      success: true,
      groupData,
    });

  } catch (error) {
    console.error("Attendance report error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAttendance, updateAttendance, attendanceReport };
