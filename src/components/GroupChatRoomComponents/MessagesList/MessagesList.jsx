import React from 'react';
import { characterColors } from "../../../Data/ColorData/ColorData";

const MessagesList = ({ messages, localStorageUser }) => {
    return (
        <div className="custom-scrollbar p-4">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex justify-${(msg.currentUserId === localStorageUser._id) ? 'end' : 'start'} mb-4`}
                >
                    <div
                        className={`bg-${msg.currentUserId === localStorageUser._id ? 'blue' : 'green'}-500 text-white p-4 rounded-xl shadow-md max-w-3/4`}
                    >
                        <div className="flex items-center mb-2">
                            <span className={`mr-2 text-${characterColors.get(msg.currentUserName[0])}-700`}>
                                {msg.currentUserName}
                            </span>
                            <span className="text-sm text-gray-300">🌱</span>
                        </div>
                        <p className="mb-2">{msg.messageData}</p>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center">
                                <span className="text-xs text-gray-200">{new Date(msg.date).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs text-gray-300">💬</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessagesList;
