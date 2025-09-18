import React from 'react';

const ImageUploader = ({ imageUrl, setImageURL }) => {
    return (
        <div className="mb-4">
            <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-2">Image URL</label>
            <input
                type="text"
                id="imageURL"
                value={imageUrl}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Enter image URL"
                className="w-full border rounded-md p-2 focus:outline-none focus:border-blue-500 transition duration-300"
            />
        </div>
    );
};

export default ImageUploader;
