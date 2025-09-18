import React from 'react';

const SelectField = ({ label, value, onChange }) => {
    const categories = [
        "Technology",
        "Sports",
        "Current Affairs",
        "World Wide",
        "Plants",
        "Animals",
        "Health",
        "Food",
        "Travel",
        "Fashion",
        "Science"
    ];

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300"
            >
                <option value="" disabled>Select one</option>
                {categories.map((category) => (
                    <option key={category.toLowerCase()} value={category.toLowerCase()}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
