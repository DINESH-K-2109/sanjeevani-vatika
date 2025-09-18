import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBlogRoutes, blogsDetails } from '../../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { FaTags, FaUserCircle, FaThumbsUp, FaStar } from 'react-icons/fa';

function AllBlogsPosts() {
    const [allPostsFromDataBase, setAllPostsFromDataBase] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                if (!userDetails) {
                    navigate("/");
                } else {
                    setCurrentUser(userDetails);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserFromLocal();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${getAllBlogRoutes}`);
                setAllPostsFromDataBase(response.data.blogs);
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, []);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    const nextPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allPostsFromDataBase.length);
    };

    const prevPost = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + allPostsFromDataBase.length) % allPostsFromDataBase.length);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between container mx-auto px-4 bg-green-50 py-6">
            {/* Left Side Content */}
            <div className="w-full md:w-1/4 bg-green-100 p-4 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-green-800">🌿 Welcome to PlantDiscoveryHub 🌿</h2>
                <p className="text-green-700">
                    Dive into the world of medicinal plants! 🌱 Discover, learn, and share herbal wisdom with an engaged community of natural healing lovers.
                </p>
                <ul className="list-disc list-inside text-green-800 mt-4 space-y-1">
                    <li>📷 Scan plants with AI and get instant insights</li>
                    <li>📚 Read or share blogs about remedies and plant use</li>
                    <li>💬 Connect with herbal experts and enthusiasts</li>
                </ul>
            </div>

            {/* Blog Posts Slider */}
            <div className="flex-grow md:w-1/2 relative">
                <div className="absolute inset-0 flex justify-center items-center">
                    {allPostsFromDataBase.length > 0 && (
                        <div
                            className="border p-4 rounded bg-white shadow-md transform transition-all duration-300 cursor-pointer hover:shadow-xl"
                            onClick={() => handleBlogsDetails(allPostsFromDataBase[currentIndex]._id)}
                        >
                            <img
                                src={allPostsFromDataBase[currentIndex].imageUrl}
                                alt={allPostsFromDataBase[currentIndex].title}
                                className="w-full h-32 object-cover mb-4 rounded"
                            />
                            <h2 className="text-xl font-bold mb-2 text-green-800">
                                {allPostsFromDataBase[currentIndex].title} <FaStar className="inline-block text-yellow-500" />
                            </h2>
                            <button className="flex items-center mb-2 text-green-700">
                                <FaUserCircle className="mr-2" />
                                <p>{allPostsFromDataBase[currentIndex].author}</p>
                            </button>
                            <p className="text-green-600 mb-2">{allPostsFromDataBase[currentIndex].category}</p>
                            <div className="flex mt-4 space-x-2">
                                {allPostsFromDataBase[currentIndex].tags.slice(0, 4).map((tag, tagIndex) => (
                                    <button key={tagIndex} className="bg-green-300 hover:bg-green-400 text-green-800 py-1 px-2 rounded transition duration-300 ease-in-out">
                                        <FaTags className="inline-block mr-1" />
                                        <span className="text-xs">{tag}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
                                    <FaThumbsUp className="inline-block mr-1" /> Like
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between mt-72">
                    <button onClick={prevPost} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Previous
                    </button>
                    <button onClick={nextPost} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Next
                    </button>
                </div>
            </div>

            {/* Right Side Content */}
            <div className="w-full md:w-1/4 bg-green-100 p-4 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-green-800">🌱 Platform Features 🌱</h2>
                <ul className="text-green-700 space-y-1">
                    <li>• Scan plants with camera & get instant data</li>
                    <li>• Download herbal remedy PDFs</li>
                    <li>• Get AI-powered suggestions</li>
                    <li>• Collaborate with botanists & doctors</li>
                    <li>• Social features like DM & video calls</li>
                </ul>
            </div>
        </div>
    );
}

export default AllBlogsPosts;
