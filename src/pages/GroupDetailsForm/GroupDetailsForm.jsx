import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addGroupChatRoomMessage } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserShield, FaInfoCircle, FaCheck, FaLink } from 'react-icons/fa';
import { AiOutlineUsergroupAdd, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';

function GroupDetailsForm({ addedUsers, localStorageUser }) {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [profileLink, setProfileLink] = useState('');
    const [admins, setAdmins] = useState('');
    const [isAdminOnlyMessage, setIsAdminOnlyMessage] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post(`${addGroupChatRoomMessage}`, {
            groupName: groupName,
            groupDescription: groupDescription,
            profileLink: profileLink,
            admins: admins,
            isAdminOnlyMessage: isAdminOnlyMessage,
            allMembersDetails: addedUsers,
            GroupCreatorId: localStorageUser._id,
        });

        if (response) {
            toast.success("🎉 Group created successfully! Time to chat and have fun! 🌸");
            navigate("/groupchatroom", {
                state: {
                    groupName: groupName,
                    groupDescription: groupDescription,
                    profileLink: profileLink,
                    admins: admins,
                    isAdminOnlyMessage: isAdminOnlyMessage,
                    allMembersDetails: addedUsers,
                }
            });
        } else {
            toast.error("😔 Oops! Something went wrong. Please try again. 🌿");
        }
    };

    useEffect(() => {
        console.log("GroupDetailsForm loaded with added users:", addedUsers);
    }, [addedUsers]);

    return (
        <div className="max-w-md mx-auto bg-green-50 rounded-lg shadow-xl p-6">
            {/* Header */}
            <div className="text-center mb-6">
                <BsFillChatSquareDotsFill className="text-4xl text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-green-900 mt-2">🌱 Create Your Awesome Group 🌻</h2>
                <p className="text-green-600 mt-1">🌿 Fill in the details below and start your epic group chat adventure! 💬</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Group Name */}
                <div className="mb-4">
                    <label htmlFor="groupName" className="block text-sm font-medium text-green-700 flex items-center">
                        <AiOutlineUsergroupAdd className="mr-2" /> Group Name 🌿
                    </label>
                    <input
                        type="text"
                        id="groupName"
                        className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Give your group an awesome name! 😎"
                        required
                    />
                    <small className="text-green-500">Make it fun, make it memorable! 🌸</small>
                </div>

                {/* Group Description */}
                <div className="mb-4">
                    <label htmlFor="groupDescription" className="block text-sm font-medium text-green-700 flex items-center">
                        <MdOutlineDescription className="mr-2" /> Group Description 🍃
                    </label>
                    <textarea
                        id="groupDescription"
                        className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        value={groupDescription}
                        onChange={(e) => setGroupDescription(e.target.value)}
                        placeholder="What's your group all about? 📣"
                        required
                    />
                    <small className="text-green-500">Let everyone know what they'll be chatting about! 🌼</small>
                </div>

                {/* Profile Link */}
                <div className="mb-4">
                    <label htmlFor="profileLink" className="block text-sm font-medium text-green-700 flex items-center">
                        <FaLink className="mr-2" /> Profile Link 🌿
                    </label>
                    <input
                        type="url"
                        id="profileLink"
                        className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        value={profileLink}
                        onChange={(e) => setProfileLink(e.target.value)}
                        placeholder="Add a cool profile pic link! 📸"
                        required
                    />
                    <small className="text-green-500">A group isn't complete without a fun profile pic! 🎨</small>
                </div>

                {/* Admins */}
                <div className="mb-4">
                    <label htmlFor="admins" className="block text-sm font-medium text-green-700 flex items-center">
                        <FaUserShield className="mr-2" /> Admin's Username 👑
                    </label>
                    <input
                        type="text"
                        id="admins"
                        className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                        value={admins}
                        onChange={(e) => setAdmins(e.target.value)}
                        placeholder="Who's the boss? 🛡️"
                        required
                    />
                    <small className="text-green-500">Add the usernames of the almighty admins! 🌱</small>
                </div>

                {/* Admin-Only Message Option */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        id="isAdminOnlyMessage"
                        className="mr-2 rounded focus:ring-green-500 text-green-500"
                        checked={isAdminOnlyMessage}
                        onChange={(e) => setIsAdminOnlyMessage(e.target.checked)}
                    />
                    <label htmlFor="isAdminOnlyMessage" className="text-sm font-medium text-green-700 flex items-center">
                        <FaCheck className="mr-2 text-green-500" /> Only Admin Can Send Messages 📝
                    </label>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <AiOutlineCheckCircle className="inline-block mr-2" /> Create Group 🌿🎉
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

export default GroupDetailsForm;
