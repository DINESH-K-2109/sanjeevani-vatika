import React from 'react';
import { FaSearch, FaRegLightbulb } from 'react-icons/fa';

const IntroSection = () => {
    return (
        <div className="mb-8 text-center bg-green-50 p-4 rounded-md shadow-md">
            <h1 className="text-3xl font-bold mb-2 text-green-800">Discover Nature’s Secrets 🌿</h1>
            <p className="text-lg text-green-700 mb-4">
                Browse through a wealth of herbal insights, AI-analyzed plant data, and real remedies. Start your green journey now! 🌱💡
            </p>
            <div className="flex justify-center space-x-6">
                <div className="flex items-center">
                    <FaSearch className="text-emerald-500 w-6 h-6 mr-2" />
                    <span className="text-green-700">Use AI to explore medicinal plants & herbs.</span>
                </div>
                <div className="flex items-center">
                    <FaRegLightbulb className="text-lime-500 w-6 h-6 mr-2" />
                    <span className="text-green-700">Get natural healing ideas & share your findings.</span>
                </div>
            </div>
        </div>
    );
};

export default IntroSection;
