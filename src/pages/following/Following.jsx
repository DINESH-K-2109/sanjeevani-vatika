import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { followings, deleteFollower } from '../../../utils/follow_following_utils/apiFollowAndFollowingRoutes';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserAltSlash, FaUserAlt } from 'react-icons/fa';
import { MdPersonRemove, MdPersonAddAlt1 } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsPersonSquare } from 'react-icons/bs';

function Following() {
    const [followingLists, setFollowingsLists] = useState([]);
    const location = useLocation();
    const user = location.state?.user;

    // Handle removing a following user
    const handleRemove = async (from, to) => {
        console.log("Unfollow clicked", from, to);

        try {
            const response = await axios.post(`${deleteFollower}`, {
                from: from,
                to: to,
            });

            if (response) {
                toast.info("🌿 You have unfollowed this user.");
                setFollowingsLists(prevList => prevList.filter(user => user.to !== to));
            }

        } catch (err) {
            console.log(err);
            toast.error("❌ Failed to unfollow. Please try again.");
        }
    };

    // Fetching the list of users the current user is following
    useEffect(() => {
        const fetchFollowings = async () => {
            try {
                const response = await axios.post(`${followings}`, {
                    from: user._id,
                });

                setFollowingsLists(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFollowings();
    }, [user]);

    return (
        <div className="container mx-auto p-6 bg-green-50 min-h-screen">
            {/* Page Purpose Section */}
            <div className="bg-green-100 border border-green-200 p-4 rounded-xl mb-6 shadow-sm">
                <div className="flex items-center mb-2">
                    <AiOutlineInfoCircle className="text-green-600 text-3xl mr-3" />
                    <h2 className="text-2xl font-semibold text-green-900">🍃 About This Page</h2>
                </div>
                <p className="text-green-800 text-sm leading-relaxed">
                    🌼 This page shows the people you're following in the garden of connections. 🌿 View their profiles and unfollow if you want to prune your social circle. 💬
                </p>
            </div>

            <div className="flex items-center mb-6">
                <MdPersonAddAlt1 className="text-green-600 text-4xl mr-3" />
                <h1 className="text-3xl font-bold text-green-900">🌱 You're Following</h1>
            </div>

            {followingLists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {followingLists.map((followingUser) => (
                        <div key={followingUser._id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-green-100">
                            <img
                                src={followingUser.profilePicture}
                                alt={`${followingUser.toName}'s Profile`}
                                className="w-16 h-16 object-cover rounded-full mx-auto mb-4 shadow"
                            />
                            <p className="text-lg font-bold text-center mb-1 text-green-800">
                                🌿 {followingUser.toName}
                            </p>
                            <p className="text-sm text-green-600 text-center mb-2 italic">
                                {followingUser.bio || "🌱 No bio added yet"}
                            </p>
                            <div className="text-center text-green-700 mb-4 text-xs">
                                <BsPersonSquare className="inline text-xl mr-1" />
                                <span>{followingUser.to}</span>
                            </div>
                            {/* Unfollow Button */}
                            <button
                                onClick={() => handleRemove(followingUser.from, followingUser.to)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition duration-300 w-full"
                            >
                                <FaUserAltSlash className="inline mr-2" /> Unfollow ❌
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-green-700 text-lg">
                        🪴 You are not following anyone yet. Start growing your community! 🌸
                    </p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Following;
