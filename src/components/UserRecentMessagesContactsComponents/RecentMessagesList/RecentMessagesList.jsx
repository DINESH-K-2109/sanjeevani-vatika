import React from 'react';
import { FaLeaf } from 'react-icons/fa'; // Importing a plant-related icon

const RecentMessagesList = ({ recentUsersMessages, handleDirectMessageToUser }) => {
    return (
        <div>
            {recentUsersMessages.length > 0 ? (
                recentUsersMessages.map((user, index) => (
                    <div key={index} className="bg-green-100 rounded-lg shadow-md p-6 mb-4">
                        <button
                            onClick={() => handleDirectMessageToUser(user)}
                            className="text-green-500 font-semibold hover:underline mb-2"
                        >
                            {user?.fromName ? user.toName : user.to} 🌱
                        </button>
                        <p className="text-gray-700">{user.message} 🌿</p>
                        <p className="text-sm text-gray-500 mt-1">
                            <FaLeaf className="inline-block mr-1 text-green-600" />
                            {new Date(user.timestamp).toLocaleString()} 🌸
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No recent messages 🌿.</p>
            )}
        </div>
    );
};

export default RecentMessagesList;
