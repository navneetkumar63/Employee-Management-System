
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Summary = () => {
  const { auth, loading } = useAuth();
  const user = auth?.user;

  if (loading) return <div>Loading user info...</div>; // show while verifying
  if (!user) return <div>No user info available</div>;  // fallback if no user

  return (
    <div className='p-6'>
      <div className='rounded flex bg-white'>
        <div className='text-3xl flex items-center justify-center bg-teal-600 px-4 text-white'>
          <FaUser />
        </div>
        <div className='pl-4 py-1'>
          <p className='text-lg font-semibold'>Welcome Back</p>
          <p className='text-2xl font-bold'>{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;

