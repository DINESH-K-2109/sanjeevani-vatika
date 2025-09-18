import React from 'react';
import { FaSeedling } from 'react-icons/fa'; // Plant-themed icon for extra style

const WelcomeSection = () => {
    return (
        <div className="bg-green-100 p-6 rounded-lg mb-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-600">Welcome Back! 🌿</h2>
            <p className="text-gray-800">
                This is your hub for recent conversations and calls. 
                Stay connected with your friends and family! <span role="img" aria-label="wave">👋</span>
                <FaSeedling className="inline-block ml-2 text-green-500" />
            </p>
        </div>
    );
};

export default WelcomeSection;
