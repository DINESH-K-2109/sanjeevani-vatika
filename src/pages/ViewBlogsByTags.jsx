import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { blogsDetails } from '../../utils/apiRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaTag, FaUser, FaCalendarAlt } from 'react-icons/fa'; // React Icons

function ViewBlogsByTags() {
    const navigate = useNavigate();
    const location = useLocation();
    const blogByTag = location.state?.blogByTag;
    const tag = location.state?.tag;

    // Redirect to register page if user is not registered
    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await localStorage.getItem("blog-user");
                if (!userDetails) {
                    navigate("/register");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserFromLocal();
    }, [navigate]);

    // Function to truncate long blog content
    const truncateContent = (content, maxLength) => {
        return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
    };

    // Navigate to blog details page
    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container mx-auto my-12 px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-indigo-900">
                <FaTag className="inline-block mr-2" /> All Blogs Related to <span className="text-red-500">{tag}</span> Tag!
            </h2>

            {blogByTag && blogByTag.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogByTag.map((blog, index) => (
                        <div
                            key={index}
                            className="relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
                            onClick={() => handleBlogsDetails(blog._id)} // Clicking the card navigates to blog details
                        >
                            {/* Blog Image */}
                            <div className="h-56 sm:h-64 overflow-hidden">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            {/* Blog Info */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-indigo-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {truncateContent(blog.content, 150)}
                                </p>
                                <div className="text-gray-500 flex items-center space-x-2 mb-3">
                                    <FaUser className="mr-1" /> <span>{blog.author}</span>
                                    <FaCalendarAlt className="ml-4" /> <span>{new Date(blog.date).toLocaleDateString()}</span>
                                </div>
                                {/* Tags */}
                                <div className="flex flex-wrap mt-4 space-x-2">
                                    {blog.tags.slice(0, 4).map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="bg-green-200 hover:bg-green-300 text-green-800 py-1 px-3 rounded-full text-sm font-medium transition duration-300 ease-in-out mb-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {blog.tags.length > 4 && (
                                        <button
                                            className="bg-blue-200 hover:bg-blue-300 text-blue-800 py-1 px-3 rounded-full text-sm font-medium transition duration-300 ease-in-out mb-2"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Stop card click event
                                                alert('View more tags!'); // Logic for showing more tags
                                            }}
                                        >
                                            +{blog.tags.length - 4} more
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No blogs found for the specified tag.</p>
            )}
        </div>
    );
}

export default ViewBlogsByTags;
