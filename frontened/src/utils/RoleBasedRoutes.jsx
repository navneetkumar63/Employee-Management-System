import React from 'react'
import { useAuth } from '../context/authContext.jsx'
import { Navigate } from 'react-router-dom';



const RoleBasedRoutes = ({children, requiredRole}) => {

    const {user, loading} = useAuth();  

    if(loading){
       return <div>Loading ..</div>
    }

    if(!requiredRole.includes(user.role)){
       < Navigate to="/unauthorized" />

    }
    
       if(user){
           return children
       }
       else{
           <Navigate to="/login" />
       }
    }
 



export default RoleBasedRoutes
