import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";
{/*
 const getAttendance=async(req,res)=>{
    try {
        const date = new Date().toISOString().split("T")[0];
        const attendance=await Attendance.find({date}).populate({
            path:'employeeId',
             populate: [
          { path: "department", model: "Department", select: "dep_name" },
          { path: "userId", model: "User", select: "name" },
        ],
        })
res.status(200).json({
    success:true,
    attendance
})
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
*/}

 const getAttendance = async (req, res) => {
  try {
    // Get today's date (without time)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Fetch attendance with nested population
    const attendance = await Attendance.find({
      date: { $gte: todayStart, $lte: todayEnd }
    })
      .populate({
        path: "employeeId",
        populate: [
          { path: "department", model: "Department", select: "name" }, // <-- 'name' here
          { path: "userId", model: "User", select: "name" },
        ],
      });

    // Map to structured response for frontend
 const mappedAttendance = attendance.map(att => ({
  employeeId: att.employeeId?.employeeId || "N/A",
  name: att.employeeId?.userId?.name || "N/A",
  department: att.employeeId?.department?.name || "N/A",  // this will fallback to "N/A" if department is null
  status: att.status || "not mark"
}));

    return res.status(200).json({
      success: true,
      attendance: mappedAttendance
    });

  } catch (error) {
    console.error("Attendance fetch error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 const updateAttendance = async (req, res) => {
    try {
       const {employeeId}=req.params
       const {status}=req.body
       const date=new Date().toISOString().split('T')[0]
       const employee=await Employee.findOne({employeeId})
       const attendance=await Attendance.findOneAndUpdate({
        employeeId:employee._id,
        date
       },
    {status},
{new:true}) 
return res.status(200).json({
    success:true,
    attendance
})
    } catch (error) {
        return res.status(500).json({
            success:false,
           message: error.message
        })
    }
}
{/*
  const attendanceReport=async(req,res)=>{
    try {
        const {date,limit=5,skip=0}=req.query
        const query={}
        if(date){
            query.date=date

        }
        const attendanceData = await Attendance.find(query).populate({
          path: "employeeId",
          populate: ["department", "userId"],
        }).sort({date:-1}).limit(parseInt(limit)).skip(parseInt(skip))
      const groupData=attendanceData.reduce((result,record)=>{
if(!result[record.date]){
    result[record.date]=[]
}

result[record.date].push({
    employeeId:record.employeeId.employeeId,
    employeeName:record.employeeId.userId.name,
    departmentName:record.employeeId.department.dep_name,
    status:record.status || 'not mark'
      })
return result
      },{})
      return res.status(200).json({
        success: true,
        groupData,
      });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
*/}
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

    // Debug log to check population
    attendanceData.forEach(a => {
      console.log({
        employeeId: a.employeeId?.employeeId,
        employeeName: a.employeeId?.userId?.name,
        departmentName: a.employeeId?.department?.name
      });
    });

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

export {  getAttendance ,updateAttendance,attendanceReport}