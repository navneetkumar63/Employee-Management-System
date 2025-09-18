import Users from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const login = async (req, res) => {

    try{
          
const  { email, password } = req.body;

  console.log("Received body:", req.body);
  
const user = await Users.findOne({email});
if(!user){
return res.status(402).json({message: 'User not found'});
}
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    console.log("Passsword is nopt match")
   return res.status(401).json({ success: false, message: "Password does not match" });

}
const token = jwt.sign({_id: user._id , role:user.role},
    process.env.JWT_SECRET,{expiresIn: '10d'});
    
res.status(200).json({success:true , token, user: {
    _id: user._id, name: user.name, role: user.role}}); 
    console.log("Login successful:");
}
    catch(error){
     res.status(500).json({message: err.message});
    }
}


const verify = async (req, res) => {
    return res.status(200).json({success: true, user: req.user});
}

export {login,verify} ;