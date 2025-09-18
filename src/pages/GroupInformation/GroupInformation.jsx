import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUsers, FaUserShield, FaCog, FaUserPlus, FaTrashAlt, FaArrowCircleRight, FaTimesCircle, FaUserCircle, FaWrench, FaInfoCircle } from 'react-icons/fa';
import AllUsers from '../../components/AllUsers/AllUsers';
import AddNewMembersToGroup from '../AddNewMembersToGroup/AddNewMembersToGroup';
import { removeUserFromGroup } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';
import axios from 'axios';

function GroupInformation() {
    const location = useLocation();
    const group = location.state?.group;
    const [addMembersFlags, setAddMembersFlags] = useState(false);
    const [localStorageUser, setLocalStorageUser] = useState();

    // Modal State
    const [isOpen, setIsOpen] = useState(false);

    // Fetch local storage user data
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('blog-user'));
        setLocalStorageUser(localUser);
    }, []);

    // Toggle modal visibility
    const toggleModal = () => setIsOpen(!isOpen);
    const closeModal = () => setIsOpen(false);

    // Add new members to group
    const handleAddNewUserToGroup = (group) => {
        setAddMembersFlags(true);
    };

    // Remove a member from group
    const handleRemoveMemberFromGroup = async (member) => {
        try {
            const response = await axios.post(`${removeUserFromGroup}`, {
                groupId: group._id,
                memberId: member._id,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    // Handle group settings
    const handleGroupSettings = () => {
        console.log("Group settings clicked!");
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-green-50 shadow-lg rounded-lg overflow-hidden">
                {/* Group Header */}
                <div className="bg-green-800 text-white p-4 flex items-center justify-center relative">
                    <img
                        src={group.profileLink}
                        alt="Group Profile"
                        className="h-32 w-32 object-cover rounded-full border-4 border-white shadow-md"
                    />
                    <FaCog
                        onClick={toggleModal}
                        className="absolute top-2 right-2 text-2xl text-white cursor-pointer hover:text-yellow-500 transition"
                    />
                </div>

                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-green-800 mb-2 flex items-center">
                        <FaUsers className="mr-2 text-green-500" /> {group.groupName}
                    </h2>
                    <p className="text-green-600 mb-4">
                        <FaInfoCircle className="text-green-500 mr-2" />
                        {group.groupDescription}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-green-800 flex items-center">
                            <FaUserCircle className="mr-2 text-green-500" /> Group Members 🌿
                        </h3>
                        <button
                            onClick={() => handleAddNewUserToGroup(group)}
                            className="bg-green-500 text-white px-3 py-2 rounded-full flex items-center space-x-1 hover:bg-green-600 transition"
                        >
                            <FaUserPlus className="mr-1" /> Add Members 🌱
                        </button>
                    </div>

                    <ul>
                        {Object.values(group.allMembersDetails).map(member => (
                            <li key={member._id} className="flex items-center justify-between py-2 border-b">
                                <div className="flex items-center">
                                    {group.admins.includes(member.username) ? (
                                        <div className="flex items-center">
                                            <FaUserShield className="text-green-500 mr-2" />
                                            <p className="font-semibold text-green-800 hover:text-green-600 cursor-pointer">
                                                {member.username} (Admin 🍃)
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-green-800">{member.username}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition">
                                        View Profile 🌸
                                    </button>

                                    {group.admins === localStorageUser?.username && (
                                        <button onClick={() => handleRemoveMemberFromGroup(member)}>
                                            <FaTrashAlt className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Group Settings Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    <FaTimesCircle className="text-xl" />
                                </button>
                                <h2 className="text-xl font-bold text-green-800 mb-4">🌱 Group Settings 🌿</h2>
                                {/* Add Group Settings Content Here */}
                                <div className="space-y-4">
                                    <p className="text-green-600 flex items-center">
                                        <FaWrench className="mr-2 text-green-500" /> Change group name, description, and profile picture 🍃.
                                    </p>
                                    <p className="text-green-600 flex items-center">
                                        <FaUserShield className="mr-2 text-green-500" /> Manage admins and group permissions 🌸.
                                    </p>
                                </div>
                                <button
                                    onClick={handleGroupSettings}
                                    className="bg-green-500 text-white mt-4 px-4 py-2 rounded-lg hover:bg-green-600 transition w-full flex items-center justify-center"
                                >
                                    <FaArrowCircleRight className="mr-2" /> Go to Settings 🌿
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Members Section */}
            <div className="p-4 bg-green-100 rounded-md shadow-md mt-6">
                {addMembersFlags ? (
                    <AddNewMembersToGroup group={group} />
                ) : (
                    <div className="text-center">
                        <h2 className="text-lg text-green-700 mb-4">🌱 Want to add new members? 🌸</h2>
                        <button
                            onClick={() => handleAddNewUserToGroup(group)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition"
                        >
                            <FaUserPlus className="mr-1" /> Add Members 🌿
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GroupInformation;
