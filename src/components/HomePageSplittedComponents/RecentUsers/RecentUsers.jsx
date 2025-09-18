import React from 'react';
import { FaCoffee, FaUserCircle, FaRocket, FaRegStar } from 'react-icons/fa';

const RecentUsers = () => {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-xl h-full border border-gray-300">
            <h2 className="text-3xl font-bold mb-4 flex items-center text-green-600">
                <FaCoffee className="inline-block mr-2 text-green-500" /> Recent Users
            </h2>
            {/* Dummy recent users */}
            {["Recent User1", "Recent User2", "Recent User3", "Recent User4", "Recent User5"].map((user, index) => (
                <div key={index} className="flex items-center mb-3 p-2 border rounded hover:bg-green-100 cursor-pointer transition duration-200 ease-in-out">
                    <FaUserCircle size={40} className="mr-2 text-green-600" />
                    <span className="text-lg font-medium text-gray-800">{user}</span>
                </div>
            ))}

            <h2 className="text-3xl font-bold mt-6 mb-2 flex items-center text-green-600">
                <FaRocket className="inline-block mr-2 text-green-500" /> Join Us
            </h2>
            <p className="text-gray-700 mb-4 text-sm">
                🌱 **Explore, Create, and Share!** We’re more than a blog; we're a community where ideas flourish and creativity knows no bounds! ✨
            </p>
            <div className="flex items-center mt-2">
                <FaRegStar className="text-yellow-500 mr-2" />
                <span className="text-sm text-gray-600">Join us today and let your voice be heard! 🎤</span>
            </div>
        </div>
    );
};

export default RecentUsers;
