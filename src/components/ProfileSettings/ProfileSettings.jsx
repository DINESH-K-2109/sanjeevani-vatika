import React from 'react';
import { FaUserCog } from 'react-icons/fa';  // Adding a gear icon for settings

const ProfileSettings = () => {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-xl h-full border border-gray-300">
            <h2 className="text-2xl font-bold text-green-600 flex items-center">
                <FaUserCog className="inline-block mr-2 text-green-500" /> Profile Settings 🌿
            </h2>
            <p className="text-gray-700 mt-4">
                🌱 Customize your profile, update preferences, and manage your settings for a more personalized experience! 🌸
            </p>
            <div className="mt-6 text-center">
                <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                    Update Profile 🌟
                </button>
            </div>
        </div>
    );
};

export default ProfileSettings;
