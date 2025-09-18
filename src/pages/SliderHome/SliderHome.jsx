import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { getAllBlogRoutes } from "../../../utils/apiRoutes";
import { blogsDetails } from "../../../utils/apiRoutes";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaComments, FaHeart, FaUserFriends, FaPen } from 'react-icons/fa'; // Added more icons for user engagement

const SliderHome = () => {
    const [allPostsFromDataBase, setAllPostsFromDataBase] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(getAllBlogRoutes);
                setAllPostsFromDataBase(response.data.blogs);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Function to handle viewing the full post
    const handleViewFullPost = async (post) => {
        try {
            const response = await axios.get(`${blogsDetails}/${post._id}`);
            const blogDetails = response.data.blog;

            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full bg-green-100 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-green-600 mb-8 text-center">
                    🌿📚 The Trending Posts of Today 🌱📅
                </h1>
                <p className="text-lg text-gray-700 text-center mb-4">
                    Discover the latest insights and stories from our vibrant community. 🌱
                    Dive into topics that matter, engage with writers, and share your thoughts! 📝❤️
                </p>
                <Slider {...settings}>
                    {allPostsFromDataBase.slice(0, 5).map((post) => (
                        <div
                            onClick={() => handleViewFullPost(post)}
                            key={post.id}
                            className="px-4 transition-transform duration-300 ease-in-out hover:cursor-pointer transform hover:-translate-y-1 shadow-md"
                        >
                            <div className="bg-white rounded-lg shadow-md p-8 transition duration-300 hover:shadow-lg">
                                <h3 className="text-xl font-semibold mb-4">
                                    <FaPen className="inline-block text-green-500 mr-2" />
                                    {post.title.substring(0, 20)}...
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    <FaComments className="inline-block text-gray-500 mr-2" />
                                    {post.content.substring(0, 25)}...
                                </p>
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <div className="flex items-center justify-end">
                                    <span className="text-green-500 font-semibold">Read More 🍃</span>
                                    <FaArrowRight className="text-green-500 ml-2" />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Join our community of passionate writers and readers! 🌿📖
                        Connect with friends, share your ideas, and get inspired! 🤝💬❤️
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SliderHome;
