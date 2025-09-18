// src/components/Message.jsx

import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Message = ({ msg, from, fromName, toName, handleEdit, handleDelete }) => {
    const isSender = msg.from === from;

    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4 px-2`}>
            <div className={`relative max-w-[75%] px-4 py-3 rounded-xl shadow-md ${
                isSender ? 'bg-green-200 text-gray-800' : 'bg-white border border-green-300'
            }`}>
                <p className="mb-2 break-words text-sm leading-snug">{msg.message}</p>
                <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>{isSender ? fromName : toName}</span>
                    {isSender && (
                        <div className="flex space-x-3 ml-4">
                            <button
                                onClick={() => handleEdit(msg)}
                                className="hover:text-green-600 transition duration-200"
                                title="Edit"
                            >
                                <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(msg)}
                                className="text-red-500 hover:text-red-700 transition duration-200"
                                title="Delete"
                            >
                                <FaTrash className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
