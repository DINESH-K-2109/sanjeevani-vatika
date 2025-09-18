import React from 'react';

function MessageInput({ message, handleInputChange, handleSend, isEditing }) {
    return (
        <div className="bg-green-50 border-t border-green-200 p-3 rounded-t-lg shadow-inner flex items-center fixed bottom-0 left-0 right-0 z-10">
            <input
                onChange={handleInputChange}
                value={message}
                type="text"
                placeholder="🌱 Type your message..."
                className="border border-green-300 p-2 rounded-lg w-full mr-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            <button
                onClick={handleSend}
                className={`${
                    isEditing ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                } text-white px-4 py-2 rounded-lg shadow-sm transition duration-300`}
            >
                {isEditing ? 'Update 🌿' : 'Send 🌼'}
            </button>
        </div>
    );
}

export default MessageInput;
