import React from 'react';
import { IoMdInformationCircleOutline } from 'react-icons/io'; // For information icon

const BlogHeader = () => {
    return (
        <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg text-center mb-6">
            <h1 className="text-4xl font-bold mb-4 text-green-100">🌿 Discover the Latest Blogs & Insights 🌿</h1>
            <p className="text-lg">
                🌱 Dive into a world of creativity and inspiration with blogs on various topics like tech, lifestyle, travel, and more. 🌎
                Find your favorite content, connect with passionate authors, and share your thoughts. 
                <span className="inline-block ml-2">
                    <IoMdInformationCircleOutline size={30} className="text-yellow-300 inline-block" />
                </span>
            </p>
            <div className="mt-4">
                <span className="text-green-200 text-4xl mr-4">🌿</span>
                <span className="text-green-200 text-4xl">🌱</span>
            </div>
        </div>
    );
};

export default BlogHeader;
