import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'


const PrivateRoutes = ({children}) =>{
  const {user, loading} = useAuth();


  if(loading){
   return  <div>Loading...</div>;
}

if(user){
    return children
}
else{
  return  <Navigate to="/login" replace />
}
}

export default PrivateRoutes

