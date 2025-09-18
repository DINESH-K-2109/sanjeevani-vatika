import React from 'react';
import { FaLeaf } from 'react-icons/fa'; // Importing the leaf icon for a more plant-themed design

const WelcomeSection = () => {
    return (
        <div className="bg-green-100 p-6 rounded-lg mb-4 shadow-lg">
            <h2 className="text-2xl font-semibold text-green-800">
                🌱 Welcome to PlantDiscoveryHub! 🌿
            </h2>
            <p className="text-gray-700 mt-2">
                Here you can view the users who have called you. 🌸 
                Connect with your contacts instantly! <span role="img" aria-label="wave">👋</span>
            </p>
            <div className="flex items-center mt-4">
                <FaLeaf className="text-green-600 mr-2" />
                <span className="text-green-600 font-bold">Let's grow together! 🌱</span>
            </div>
        </div>
    );
};

export default WelcomeSection;
