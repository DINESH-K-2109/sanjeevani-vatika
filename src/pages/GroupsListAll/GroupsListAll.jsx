import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUsers, FaUserShield, FaArrowRight, FaComments, FaCrown, FaInfoCircle, FaLeaf, FaHandPaper } from 'react-icons/fa'; // Added relevant icons
import { getAllGroupsDetails } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';

function GroupsListAll() {
    const location = useLocation();
    const user = location.state?.user;
    const [groupListFromDataBase, setGroupListFromDataBase] = useState([]); // Initialized as an empty array

    const navigate = useNavigate();

    // Fetching group list on component mount
    useEffect(() => {
        const fetchGroupList = async () => {
            try {
                const response = await axios.post(getAllGroupsDetails, {
                    GroupCreatorId: user?._id, // Check if user is defined before accessing _id
                });
                if (response) {
                    setGroupListFromDataBase(response.data.response || []); // Ensure it's an array
                    console.log(response.data.response);
                }
            } catch (error) {
                console.error('Error fetching group list:', error);
            }
        };
        if (user) {
            fetchGroupList();
        }
    }, [user]);

    // Handle group direct messaging
    const handleGroupDirectMessage = (group) => {
        console.log(group);
        navigate("/groupchatroom", {
            state: { group }
        });
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center space-x-2">
                <FaUsers className="text-green-500" /> <span>🌿 All Groups 🌿</span>
            </h1>

            {/* New Descriptive Content Section */}
            <div className="bg-green-50 p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center mb-2">
                    <FaInfoCircle className="text-green-400 text-3xl mr-2" />
                    <h2 className="text-2xl font-semibold">Welcome to the Groups Overview! 🌱</h2>
                </div>
                <p className="text-gray-700 mb-4">
                    Here, you can explore all the groups you are part of and manage your interactions with them.
                    Whether you are looking to catch up on group discussions or collaborate with fellow members, this page is your gateway to seamless communication.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🔍 Find Your Groups:</strong> Click on any group to dive into conversations, view member details, and more!
                    You can also see the admins and the total number of members in each group, making it easier to identify your connections.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>✨ Enhance Your Experience:</strong> Each group has its unique purpose and discussions.
                    Don't hesitate to explore and engage! Your input is valuable in building a vibrant community. 💬
                </p>
                <p className="text-gray-700 mb-4">
                    If you wish to create new groups or join existing ones, navigate to the relevant sections to start collaborating with others! 🌟
                </p>
            </div>

            <p className="text-center text-gray-600 mb-8 text-lg">Browse through your groups and connect with members. 💚</p>

            <ul className="divide-y divide-gray-200">
                {groupListFromDataBase?.length > 0 ? ( // Added optional chaining for safe access
                    groupListFromDataBase.map((group) => (
                        <li
                            key={group._id}
                            className="py-4 cursor-pointer"
                            onClick={() => handleGroupDirectMessage(group)}
                        >
                            <div className="flex items-center space-x-4 hover:bg-green-100 transition duration-300 ease-in-out rounded-lg p-4 shadow-md">
                                <img
                                    src={group.profileLink}
                                    alt="Group Profile"
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-grow">
                                    <p className="text-lg font-semibold flex items-center space-x-2">
                                        <FaCrown className="text-yellow-500" /> <span>{group.groupName}</span>
                                    </p>
                                    <p className="text-gray-600 flex items-center space-x-2">
                                        <FaUserShield className="text-green-500" /> <span>Created by: {group.admins}</span>
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        <FaComments className="text-blue-400 mr-1" /> {group?.members?.length || 0} members 🌿
                                    </p>
                                </div>
                                <FaArrowRight className="text-gray-500 hover:text-blue-500 transition text-2xl" />
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-10 text-lg">
                        No groups available. Create or join a group to start collaborating! 🌱
                    </p>
                )}
            </ul>
        </div>
    );
}

export default GroupsListAll;
