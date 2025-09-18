import User from "./Models/User.js";
import bcrypt from 'bcrypt'
import connectToDatabase from "./db/db.js";

import dotenv from "dotenv";
dotenv.config();


const userRegister = async () =>{
    connectToDatabase();
    try{
        const hashPassword = await bcrypt.hash('adm',10);
  const newUser = new User({
    name:"Adm",
    email:'adm.com',
    password:hashPassword,
 role:'admin'
})

await newUser.save()

    }
    catch(err)
{
console.log(err);   
}
}
userRegister();
