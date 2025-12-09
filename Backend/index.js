import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import fixRoutes from "./routes/fixRoutes.js";
import attendanceRouter from "./routes/attendance.js";

import connectToDatabase from "./db/db.js";

dotenv.config();          // Load environment variables
connectToDatabase();      // Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public/uploads"));

// API routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", fixRoutes);
app.use("/api/attendance", attendanceRouter);

// Safe PORT setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
