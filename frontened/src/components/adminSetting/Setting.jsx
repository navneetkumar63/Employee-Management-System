
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Setting = () => {
    const navigate = useNavigate();
    const { auth, loading } = useAuth(); // get auth object
    const user = auth?.user; // get user from auth

    const [setting, setSetting] = useState({
        userId: "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    // Update userId once user is loaded
    useEffect(() => {
        if (user) {
            setSetting(prev => ({ ...prev, userId: user._id }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.put(
                "https://employee-management-system-q86i.onrender.com/api/setting/change-password",
                setting,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success) {
                navigate("/employee-dashboard");
                toast.success("Password updated successfully");
                setError("");
            }
        } catch (err) {
            setError(err.response?.data?.err || "Something went wrong");
        }
    };

    if (loading || !user) return <div>Loading user info...</div>;

    return (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-95'>
            <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
            {error && <p className='text-red-500'>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='text-sm font-medium text-gray-700'>Old Password</label>
                    <input
                        type='password'
                        name='oldPassword'
                        placeholder='Old Password'
                        onChange={handleChange}
                        className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <div>
                    <label className='text-sm font-medium text-gray-700'>New Password</label>
                    <input
                        type='password'
                        name='newPassword'
                        placeholder='New Password'
                        onChange={handleChange}
                        className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <div>
                    <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        onChange={handleChange}
                        className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Setting;

