import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
// import { host } from "../../utils/host/host";

import { alluserProfile, host } from "../../utils/apiRoutes";
import {
    following,
    followerDetails,
    Unfollowings,
} from "../../utils/follow_following_utils/apiFollowAndFollowingRoutes";

function AllUsersProfile() {
    const socket = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.state?.id;
    const author = location.state?.author;

    const [currentUserDetails, setCurrentUserDetails] = useState(null);
    const [localStorageUser, setLocalStorageUser] = useState(null);
    const [followingOrNot, setFollowingOrNot] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user from localStorage
    const fetchLocalStorageUser = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem("blog-user"));
            if (!userDetails) {
                navigate("/register");
            } else {
                setLocalStorageUser(userDetails);
            }
        } catch (err) {
            console.error("Error fetching user from localStorage:", err);
        }
    };

    // Fetch user profile details
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${alluserProfile}/${userId}`);
            setCurrentUserDetails(response.data.response[0]);
        } catch (err) {
            console.error("Error fetching user details:", err);
            toast.error("Failed to fetch user details.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch following status
    const fetchFollowingStatus = async () => {
        try {
            const userDetails = JSON.parse(localStorage.getItem("blog-user"));
            const response = await axios.post(`${followerDetails}`, {
                from: userDetails._id,
                to: userId,
            });
            setFollowingOrNot(response.data.response[0]?.following);
        } catch (err) {
            console.error("Error fetching following status:", err);
        }
    };

    // Initialize Socket
    useEffect(() => {
        if (localStorageUser) {
            socket.current = io(host);
            socket.current.emit("add-user", localStorageUser._id);
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [localStorageUser]);

    // Load localStorage user
    useEffect(() => {
        fetchLocalStorageUser();
    }, []);

    // Load user details and following status
    useEffect(() => {
        if (userId) {
            fetchUserDetails();
            fetchFollowingStatus();
        }
    }, [userId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
            {isLoading ? (
                <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                    <p className="text-green-700">🌿 Loading user profile... Please wait! ⏳</p>
                </div>
            ) : currentUserDetails ? (
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <UserDetails userDetails={currentUserDetails} author={author} />
                    <ActionButtons
                        author={author}
                        currentUserDetails={currentUserDetails}
                        localStorageUser={localStorageUser}
                        followingOrNot={followingOrNot}
                        setFollowingOrNot={setFollowingOrNot}
                    />
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
                    <p className="text-gray-600 mb-4">🚫 User has not set their profile!</p>
                    <button disabled className="bg-gray-500 text-white py-2 px-4 rounded">
                        Message
                    </button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

const UserDetails = ({ userDetails, author }) => {
    return (
        <div className="text-center mb-6">
            <img
                src={userDetails.profileImageUrl || "https://via.placeholder.com/150"}
                alt="User"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-500"
            />
            <h3 className="text-2xl font-bold text-green-800">{userDetails.name} {author && "🌿"}</h3>
            <p className="text-xl text-gray-600">{userDetails.bio || "No bio available 🌱"}</p>
        </div>
    );
};

const ActionButtons = ({ author, currentUserDetails, localStorageUser, followingOrNot, setFollowingOrNot }) => {
    const followUnfollow = async () => {
        try {
            if (followingOrNot) {
                // Unfollow the user
                await axios.post(`${Unfollowings}`, { from: localStorageUser._id, to: currentUserDetails._id });
                setFollowingOrNot(false);
                toast.success("🌿 You unfollowed this user!");
            } else {
                // Follow the user
                await axios.post(`${following}`, { from: localStorageUser._id, to: currentUserDetails._id });
                setFollowingOrNot(true);
                toast.success("🌿 You followed this user!");
            }
        } catch (err) {
            console.error("Error updating follow status:", err);
            toast.error("❌ Something went wrong with following/unfollowing.");
        }
    };

    return (
        <div className="flex justify-center space-x-4 mt-4">
            {author ? (
                <button
                    onClick={() => toast.info("🌱 This is your profile!")}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center space-x-2">
                    🌿 <span>My Profile</span>
                </button>
            ) : (
                <button
                    onClick={followUnfollow}
                    className={`py-2 px-4 rounded-lg flex items-center space-x-2 ${followingOrNot ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"} text-white`}>
                    {followingOrNot ? "💔" : "🌿"} <span>{followingOrNot ? "Unfollow" : "Follow"}</span>
                </button>
            )}
            <button
                onClick={() => toast.success("📬 Message sent!")}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                📩 <span>Message</span>
            </button>
        </div>
    );
};

export default AllUsersProfile;
