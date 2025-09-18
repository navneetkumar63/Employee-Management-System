import React from 'react'
import { useAuth } from '../../context/authContext.jsx'

const NavBar = () => {
    const {user, logout} = useAuth();
  return (
    <div className='flex justify-between items-center h-12  px-5 bg-teal-600 text-white '>
      <p>Welcome {user.name} </p>
      <button onClick={logout} className='px-4 py-1 bg-teal-700   rounded hover-bg-900'>LogOut</button>
    </div>
  )
}

export default NavBar
