import React from 'react';

const FeaturedToggle = ({ featured, setFeatured }) => {
    return (
        <div className="mb-4 flex items-center">
            <input
                type="checkbox"
                checked={featured}
                onChange={() => setFeatured(!featured)}
                className="mr-2 h-5 w-5 text-blue-500"
            />
            <span className="text-gray-700 font-bold">Featured</span>
        </div>
    );
};

export default FeaturedToggle;
