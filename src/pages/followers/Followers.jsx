import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { followers, deleteFollower } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserMinus, FaUserAlt } from 'react-icons/fa';
import { MdPeople } from 'react-icons/md';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai';

function Followers() {
    const location = useLocation();
    const user = location.state?.user;
    const [followerList, setFollowerList] = useState([]);

    const handleRemove = async (from, to) => {
        try {
            const response = await axios.post(`${deleteFollower}`, { from, to });
            if (response) {
                toast.success("🌱 Follower removed successfully!");
                setFollowerList(prev => prev.filter(f => f.from !== from));
            }
        } catch (err) {
            console.log(err);
            toast.error("❌ Failed to remove follower. Please try again.");
        }
    };

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await axios.post(`${followers}`, { to: user._id });
                setFollowerList(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFollowers();
    }, [user]);

    return (
        <div className="container mx-auto p-6 bg-green-50 min-h-screen">
            {/* About Section */}
            <div className="bg-green-100 border border-green-200 p-4 rounded-xl mb-8 shadow-sm">
                <div className="flex items-center mb-2">
                    <AiOutlineInfoCircle className="text-green-600 text-2xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">🌿 About This Page</h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                    This page helps you manage your followers. Remove unwanted followers while staying connected with those who inspire you. 🌱
                </p>
            </div>

            {/* Greeting */}
            <div className="flex items-center mb-4">
                <MdPeople className="text-green-600 text-3xl mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">Hello, {user.username}! 👋</h1>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-6">
                🌼 People who follow you:
                <BsFillPersonLinesFill className="inline ml-2 text-green-600 text-xl" />
            </h3>

            {/* Follower List */}
            {followerList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {followerList.map((follower) => (
                        <div key={follower._id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="flex items-center mb-3">
                                <FaUserAlt className="text-green-600 text-xl mr-3" />
                                <div>
                                    <p className="text-md font-bold text-gray-800">{follower.fromName}</p>
                                    <p className="text-gray-500 text-sm">ID: {follower.from}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(follower.from, follower.to)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 w-full rounded-lg text-sm transition"
                            >
                                <FaUserMinus className="inline mr-2" /> Remove Follower
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-600 text-lg">🪴 No followers yet. Let your community grow naturally!</p>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Followers;
