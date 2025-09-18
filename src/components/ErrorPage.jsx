import React from 'react';
import { FaExclamationTriangle, FaHome, FaSmileBeam, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-green-600 text-white text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                <FaExclamationTriangle className="text-red-600 text-6xl mb-4 animate-bounce" />
                <h1 className="text-3xl font-bold mb-2 text-green-600">🌱 Oops! Something Went Wrong! 🌱</h1>
                <p className="text-gray-800 mb-4">
                    We couldn't find the page you were looking for. 😕
                    It might have been moved, or the URL could be incorrect. 🔍
                </p>
                <p className="text-gray-800 mb-4">
                    Don't worry! You can go back to the home page or explore other parts of our plant world. 🌿
                </p>
                <Link to="/" className="bg-green-500 text-white px-6 py-3 rounded-md transition duration-300 hover:bg-green-600 shadow-md transform hover:scale-105 flex items-center justify-center">
                    <FaHome className="mr-2" /> 🏡 Go to Home
                </Link>
                <div className="mt-4">
                    <p className="text-lg text-gray-800">Need help? Contact us! 🌱</p>
                    <a href="mailto:support@example.com" className="text-blue-500 hover:text-blue-400 transition duration-300">
                        support@example.com 📧
                    </a>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-lg text-gray-800">While we fix things, enjoy this smile! 😄</p>
                <FaSmileBeam className="text-yellow-400 text-5xl animate-spin" />
            </div>
            <div className="mt-6 text-green-500">
                <p className="text-xl">Feeling green? 🌿 Check out our amazing plant discoveries! 🌱</p>
                <FaLeaf className="text-6xl animate-bounce" />
            </div>
        </div>
    );
}

export default ErrorPage;
