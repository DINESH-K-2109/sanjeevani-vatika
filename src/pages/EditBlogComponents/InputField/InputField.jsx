import React from 'react';

const InputField = ({ label, value, onChange, type = "text", placeholder }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
        </div>
    );
};

export default InputField;
