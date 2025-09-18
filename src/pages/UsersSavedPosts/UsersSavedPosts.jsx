import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getPostsOfProfile } from '../../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';
import { blogsDetails } from '../../../utils/apiRoutes';
import { deleteUserSavedPostsFromUserProfile } from '../../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';
import { AddPostsToProfile } from '../../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaStar, FaClipboardList, FaHeart, FaRegTrashAlt, FaUndo } from 'react-icons/fa'; // Importing relevant icons

const IntroductionSection = () => {
    return (
        <div className="bg-green-50 p-6 rounded-md shadow-md mb-4">
            <h2 className="text-3xl font-bold text-green-600 mb-4 flex items-center">
                <FaBookmark className="mr-3 text-4xl" /> 🌿 Your Saved Posts 🌱
            </h2>
            <p className="text-lg text-gray-700 mb-2">
                Welcome to your saved posts section! 🌱 Here you can find all the articles you’ve bookmarked for later reading.
                Keep track of your favorite content and never miss out on insightful posts again! 📚💚
            </p>
            <p className="text-lg text-gray-700 mb-4">
                Below, you will see a curated list of your saved posts, complete with details about each one, including the author, date, and a brief description.
                Feel free to explore or remove any posts you no longer wish to keep. 🌿
            </p>
            <div className="flex space-x-6">
                <div className="flex items-center text-green-600">
                    <FaStar className="text-3xl mr-2" />
                    <span>⭐ Mark your favorites 🌟</span>
                </div>
                <div className="flex items-center text-green-600">
                    <FaClipboardList className="text-3xl mr-2" />
                    <span>📝 Review your notes 📖</span>
                </div>
                <div className="flex items-center text-green-600">
                    <FaHeart className="text-3xl mr-2" />
                    <span>❤️ Show some love to great content! 🌿</span>
                </div>
            </div>
        </div>
    );
};

function UsersSavedPosts() {
    const [savedPostsFromDataBase, setSavedPostsFromDataBase] = useState([]);
    const [deleteButtonFlags, setDeleteButtonFlags] = useState([]); // Array of flags for each post
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localStorageUserDetails = JSON.parse(localStorage.getItem("blog-user"));
                const response = await axios.get(`${getPostsOfProfile}/${localStorageUserDetails._id}`);
                if (response.data && response.data.response) {
                    setSavedPostsFromDataBase(response.data.response);
                }
            } catch (err) {
                console.log("Error fetching saved posts:", err);
            }
        };
        fetchData();
    }, []);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId.postDetails._id}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemovePost = async (postIndex, postId) => {
        // Copy the current array of flags
        const newFlags = [...deleteButtonFlags];
        newFlags[postIndex] = true; // Set the flag for the clicked post to true
        setDeleteButtonFlags(newFlags); // Update the flags array

        try {
            const response = await axios.delete(`${deleteUserSavedPostsFromUserProfile}/${postId}`);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    // Handling the saving post again in the data undo system
    const hanldeSavingPostAgain = async (postIndex, post) => {
        const { userId, postDetails, savedStatus } = post;

        const newFlags = [...deleteButtonFlags];
        newFlags[postIndex] = false;
        setDeleteButtonFlags(newFlags);

        try {
            const response = await axios.post(`${AddPostsToProfile}`, {
                userID: userId,
                postDetails: postDetails,
                savedStatus: savedStatus,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <IntroductionSection /> {/* Add the introduction section here */}
            <h2 className="text-3xl font-bold mb-4 text-green-600">✨ Saved Posts 🌿</h2>
            {savedPostsFromDataBase.length > 0 ? (
                <div>
                    {savedPostsFromDataBase.map((post, index) => (
                        <div key={index} className="bg-white shadow-md rounded-md p-4 mb-4 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="flex items-center mb-4">
                                <img src={post.postDetails.imageUrl} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">{post.postDetails.title}</h3>
                                    <p className="text-gray-600 mb-2">Author: {post.postDetails.author} 🌿</p>
                                    <p className="text-gray-600 mb-2">Date: {new Date(post.postDetails.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <button onClick={() => handleBlogsDetails(post)} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center">
                                    <FaClipboardList className="mr-2" /> Read More 📖
                                </button>
                                {deleteButtonFlags[index] ? (
                                    <div>
                                        <button
                                            onClick={() => hanldeSavingPostAgain(index, post)}
                                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center">
                                            <FaUndo className="mr-2" /> Undo 🔄
                                        </button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleRemovePost(index, post._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center">
                                        <FaRegTrashAlt className="mr-2" /> Remove Post ❌
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-800">No saved posts found. 🌿🛑</p>
            )}
        </div>
    );
}

export default UsersSavedPosts;
