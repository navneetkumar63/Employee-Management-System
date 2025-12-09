import React, { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react"; // 👈 eye icons


const Login = () => {

    const[email,setEmail]= useState('');
    const[password,setPassword]= useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {login } = useAuth();
const navigate = useNavigate();
  

    const handleSubmit =  async  (e) => {
           e.preventDefault();
     
        
        try{
              const response = await axios.post("http://localhost:5000/api/auth/login",
    {email,password}
    );
    if(response.data.success){
        login(response.data.user)
        localStorage.setItem('token', response.data.token);
        if(response.data.user.role === 'admin') {
            navigate('/admin-dashboard');
        toast.success(" Admin Login Successful");
    }
    else{
        navigate('/employee-dashboard');
         toast.success(" Employee Login Successful");
    }
}
 
        }
    
catch (err) {
      if (err.response && err.response.status === 401) {
        // backend returns 401 Unauthorized if password/email incorrect
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }

    }


return (
    <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 to-gray-100 space-y-6'>
      <h2 className='font-pacific text-3xl text-white'>Employee Management System</h2>
      <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4'> Login </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700'>Email</label>
            <input 
              type='email' 
              className='w-full px-3 py-2 border' 
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700'>Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className='w-full px-3 py-2 border pr-10' 
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              {/* 👇 Eye Icon Toggle */}
              <button 
                type="button" 
                className="absolute right-2 top-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between"> 
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">Forgot password?</a>
          </div>

          <div className="mb-4">
            <button 
              type="submit"
              className="w-full bg-teal-600 text-white py-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
