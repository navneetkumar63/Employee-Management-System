import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'


const Summary = () => {
    const {user} = useAuth();
  return (

    <div className='p-6'>
         <div className='rounded flex bg-white'>
      <div className={`text-3xl  flex items-center justify-center  bg-teal-500 px-4 bg-teal-600 text-white `}>
<FaUser/>
      </div>
<div className='pl-4 py-1'>
    <p className='text-lg  font-semibold'>
Welcome Back
    </p>
    <p className='text-2xl font-bold'>
{user.name}
    </p>
</div>

    </div>
    </div>
  )
}

export default Summary
