import React from 'react';
import { GiPlantWatering } from 'react-icons/gi'; // Plant-related icon

const MessageInput = ({ message, setMessage, handleSendMessage }) => {
    return (
        <div className="bg-green-800 p-4 flex items-center rounded-lg shadow-lg">
            <input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                placeholder="Enter your message 🌱"
                className="flex-grow p-3 rounded-lg border border-green-400 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center"
            >
                <GiPlantWatering className="mr-2 text-green-200" /> Send
            </button>
        </div>
    );
};

export default MessageInput;
