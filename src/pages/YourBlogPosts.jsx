import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaEye, FaTag } from 'react-icons/fa'; // React icons

import axios from 'axios';
import { getBlogRoutes } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { blogsDetails } from '../../utils/apiRoutes';
import bin from "../assets/bin.png"
import edit from "../assets/edit-button.png"
import read from "../assets/read.png"

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { deleteBlog } from '../../utils/apiRoutes';




function YourBlogPosts() {



    // useState for popup models

    const [isModalOpen, setIsModalOpen] = useState(false);
    // no blogs condition 
    const [flag, setFlag] = useState(false);






    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();



    // redirect to register page if user is not register in the database

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await localStorage.getItem("blog-user");

                console.log(userDetails);
                if (!userDetails) {
                    navigate("/register");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);



    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                if (!userDetails) {
                    navigate("/register");
                } else {
                    try {
                        const response = await axios.get(`${getBlogRoutes}/${userDetails._id}`);
                        const blogsData = response.data.blogs;
                        setBlogs(blogsData);
                        if (blogsData.length === 0) {
                            const message = "Hello ! You don't have any posts yet.  Start creating your first post now.";
                            navigate('/createblog', { state: { message } });
                        }
                    } catch (err) {
                        console.log("Error fetching blogs:", err);
                    }
                }
            } catch (err) {
                console.log("Error fetching user details:", err);
            }
        };
        fetchUserFromLocal();
    }, []);


    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;

            // Navigate to the new page and pass blogDetails as state
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    }


    const handleBlogsEdit = async (id) => {
        console.log(id);

        try {

            const response = await axios.get(`${blogsDetails}/${id}`);

            console.log(response.data.blog);
            const blogDetails = response.data.blog;
            // console.log(response);

            navigate("/edit", { state: { blogDetails, id } })

        } catch (err) {
            console.log(err);
        }

    }


    // functions to handle the popups open and close buttons

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    // delete blogs code for the model

    const handleBlogDelete = async (blogId) => {

        // console.log(blogId);

        try {

            const response = await axios.post(`${deleteBlog}/${blogId}`, {
                blogId: blogId,
            });

            if (response.data.status == true) {
                toast.error(`${response.data.message}`);
            }

        } catch (err) {
            console.log(err)
        }






        closeModal();

    };




    return (
        <div className="container mx-auto mt-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, index) => (
                    <div key={index} className="border p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                        {/* Blog Image */}
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-48 object-cover mb-4 rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Blog Info */}
                        <h2 className="text-2xl font-bold mb-2 text-indigo-900">{blog.title}</h2>
                        <p className="text-gray-600 mb-2 flex items-center">
                            <FaEye className="mr-2 text-indigo-600" /> Author: {blog.author}
                        </p>
                        <p className="text-gray-500 flex items-center mb-2">
                            <FaTag className="mr-2 text-green-500" /> Category: {blog.category}
                        </p>
                        <p className="text-gray-700 mt-2">{blog.content.slice(0, 100)}...</p>

                        {/* Tags */}
                        <div className="flex flex-wrap mt-4">
                            {blog.tags.slice(0, 4).map((tag, tagIndex) => (
                                <span key={tagIndex} className="mr-2 text-green-600 bg-green-200 px-2 py-1 rounded-full text-sm">
                                    #{tag}
                                </span>
                            ))}
                            {blog.tags.length > 4 && (
                                <button className="text-blue-600 text-sm" onClick={() => alert('View more tags')}>
                                    View More
                                </button>
                            )}
                        </div>

                        {/* Featured Badge */}
                        {blog.featured && <p className="text-green-600 font-semibold mt-4">Featured Blog</p>}

                        {/* Action Buttons */}
                        <div className="flex justify-between items-center mt-6 space-x-4">
                            {/* View */}
                            <button onClick={() => handleBlogsDetails(blog._id)} className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300">
                                <FaEye className="w-6 h-6" />
                            </button>

                            {/* Edit */}
                            <button onClick={() => handleBlogsEdit(blog._id)} className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300">
                                <FaEdit className="w-6 h-6" />
                            </button>

                            {/* Delete */}
                            <button onClick={() => openModal(blog._id)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
                                <FaTrashAlt className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal for delete confirmation */}
                        {isModalOpen && selectedBlogId === blog._id && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                                    <p className="text-gray-800">Are you sure you want to delete this blog?</p>
                                    <div className="flex justify-end mt-4">
                                        <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={closeModal}>
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                            onClick={() => {
                                                handleBlogDelete(selectedBlogId);
                                                closeModal();
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <ToastContainer />
        </div>
    );
}

export default YourBlogPosts;
