import React from 'react';
import { FaUserCircle, FaUsers } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { MdChat } from 'react-icons/md';
import { BiBookmarks } from 'react-icons/bi';

const SuggestedUsers = () => {
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow-xl h-full border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 flex items-center text-green-600">
                <FaUsers className="inline-block mr-2 text-green-500" /> Suggested Users 🌿
            </h2>

            {/* Dummy user profiles */}
            {["User1", "User2", "User3", "User4"].map((user, index) => (
                <div key={index} className="flex items-center mb-2 p-2 border rounded hover:bg-green-100 cursor-pointer transition duration-200 ease-in-out">
                    <FaUserCircle size={40} className="mr-2 text-green-600" />
                    <span className="text-lg text-gray-800">{user} 🌱</span>
                </div>
            ))}

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center text-green-600">
                    <GiNotebook className="inline-block mr-2 text-green-500" /> Discover LibertyPost! 🌍
                </h3>
                <p className="text-sm text-gray-700 mb-1">
                    📖 **Write & Share!** Unleash your creativity with ease! ✍️
                </p>
                <p className="text-sm text-gray-700 mb-1">
                    💬 **Engage!** Connect through comments and discussions! 🗨️
                </p>
                <p className="text-sm text-gray-700 mb-1">
                    🔔 **Stay Updated!** Follow your favorite writers! 📬
                </p>
                <p className="text-sm text-gray-700 mb-1">
                    📚 **Bookmark!** Save your top picks for later! 💾
                </p>
                <p className="text-sm text-gray-700 mb-1">
                    💌 **Chat with Friends!** Direct messages are here! 📲
                </p>
                <p className="text-sm text-gray-700 mb-1">
                    🛡️ **Respect Voices!** Share your thoughts responsibly! 🌟
                </p>
            </div>

            {/* Footer Section with Nature Feel */}
            <div className="mt-6 text-center text-green-600">
                🌸 Join our 🌿 community and blossom with your ideas! 🌱
            </div>
        </div>
    );
};

export default SuggestedUsers;
