
import User from "./Models/User.js";
import bcrypt from 'bcrypt';
import connectToDatabase from "./db/db.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdminUser = async () => {
  await connectToDatabase();

  try {
    // check if admin already exists
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin user already exists");
      return;
    }

    const hashPassword = await bcrypt.hash('adm', 10);

    const newUser = new User({
      name: "Admin",
      email: "admin@site.com",
      password: hashPassword,
      role: "admin"
    });

    await newUser.save();
    console.log("Admin user created successfully");

  } catch (err) {
    console.log(err);
  }
};

seedAdminUser();
