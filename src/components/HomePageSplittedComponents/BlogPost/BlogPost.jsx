import React from 'react';
import { FaThumbsUp, FaUserCircle, FaTags } from 'react-icons/fa';

const BlogPost = ({ blog, handleBlogsDetails, handleTags, handleLikes, likeCount, handleAuthorProfile, toggleShowMoreTags, expandedTagPosts }) => {
    return (
        <div
            key={blog._id}
            className="border p-4 rounded-lg bg-white shadow-md transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
            onClick={() => handleBlogsDetails(blog._id)}
        >
            <img src={blog.imageUrl || 'default-image.jpg'} alt={blog.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <button onClick={(e) => { e.stopPropagation(); handleAuthorProfile(blog); }} className="flex items-center mb-2 text-gray-600 hover:text-gray-800">
                <FaUserCircle size={20} className="mr-2" />
                {blog.author}
            </button>
            <p className="text-gray-500 mb-2">{blog.category}</p>

            {/* Tag Section with Show More functionality */}
            <div className="flex flex-wrap mt-4 space-x-2">
                {(expandedTagPosts[blog._id] ? blog.tags : blog.tags.slice(0, 4)).map((tag, tagIndex) => (
                    <button
                        key={tagIndex}
                        onClick={(e) => { e.stopPropagation(); handleTags(tag); }}
                        className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out flex items-center mb-2"
                    >
                        <FaTags size={14} className="mr-1" />
                        <span className="text-xs">{tag}</span>
                    </button>
                ))}
            </div>

            {/* Show More/Show Less button */}
            {blog.tags.length > 4 && (
                <button
                    onClick={(e) => { e.stopPropagation(); toggleShowMoreTags(blog._id); }}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                >
                    {expandedTagPosts[blog._id] ? 'Show Less' : 'Show More'}
                </button>
            )}

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={(e) => { e.stopPropagation(); handleLikes(blog._id); }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    <FaThumbsUp className="mr-2" /> {likeCount || 0} Likes
                </button>
            </div>
        </div>
    );
};

export default BlogPost;
