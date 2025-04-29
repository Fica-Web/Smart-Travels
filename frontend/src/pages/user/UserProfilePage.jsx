import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfilePage = () => {
    const { user } = useAuth(); // Access the user from context
    console.log('user data:', user); // Log the user data to check if it's being fetched correctly
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6 mt-28">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            ) : (
                <p className="text-gray-500">Loading user profile...</p>
            )}
        </div>
    )
}

export default UserProfilePage
