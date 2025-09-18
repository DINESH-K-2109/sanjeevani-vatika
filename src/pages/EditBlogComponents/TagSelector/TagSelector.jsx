import React from 'react';

const TagSelector = ({ tags, setTags }) => {
    const tagOptions = [
        'Technology',
        'Sports',
        'Current Affairs',
        'World Wide',
        'Plants',
        'Animals',
        'Health',
        'Food',
        'Travel',
        'Fashion',
        'Science',
    ];

    const handleTagChange = (tag) => {
        const updatedTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
        setTags(updatedTags);
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Tags</label>
            <div className="flex flex-wrap">
                {tagOptions.map((tag) => (
                    <label key={tag} className="inline-flex items-center mr-4 mb-2">
                        <input
                            type="checkbox"
                            checked={tags.includes(tag)}
                            onChange={() => handleTagChange(tag)}
                            className="form-checkbox h-5 w-5 text-blue-500"
                        />
                        <span className="ml-2">{tag}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default TagSelector;
