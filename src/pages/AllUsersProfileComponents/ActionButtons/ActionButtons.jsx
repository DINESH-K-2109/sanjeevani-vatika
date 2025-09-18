import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllusers } from '../../../utils/apiRoutes';
import { addANewMemberToGroup } from '../../../utils/GroupChatRoomApi/GroupChatRoomApi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Icons
import { FaUserPlus, FaUserTimes, FaUsers, FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { BsFillPeopleFill } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';
import { RiGroupLine } from 'react-icons/ri';

function AddNewMembersToGroup({ group }) {
    const [AllusersFromDataBase, setAllUsersFromDataBase] = useState([]);
    const [AddUserFlag, setAddUserFlag] = useState([]);
    const [usersArray, setUsersArray] = useState([]);
    const [alreadyGroupsMembers, setAlreadyGroupsMembers] = useState([]);
    const [GroupData, setGroupData] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(getAllusers);
                setAllUsersFromDataBase(response.data.response);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const handleAddNewMember = (user, index) => {
        const newFlags = [...AddUserFlag];
        newFlags[index] = true;
        setAddUserFlag(newFlags);
        setUsersArray(prev => [...prev, user]);
    };

    const addMemberToGroup = async () => {
        try {
            const response = await axios.post(`${addANewMemberToGroup}`, {
                usersArray: usersArray,
                groupId: group._id,
            });
            if (response) {
                toast.success("🌼 Member added successfully!");
            }
        } catch (err) {
            console.log(err);
            toast.error("🌧️ Failed to add member. Please try again!");
        }
        navigate("/userprofile");
    };

    return (
        <>
            <section className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen p-8">
                <div className="flex items-center justify-center mb-8">
                    <MdGroupAdd className="text-green-600 text-4xl mr-3" />
                    <h1 className="text-3xl font-extrabold text-green-800 drop-shadow">
                        🌱 Add New Members to Your Group 🌼
                    </h1>
                </div>

                <p className="text-center text-green-700 font-medium mb-8">
                    🍃 Invite amazing people to join <strong>{group.groupName}</strong> and make your community bloom! 🌸
                    <BsFillPeopleFill className="inline text-green-500 text-2xl ml-2" />
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {AllusersFromDataBase && AllusersFromDataBase.map((user, index) => (
                        <div key={index} className="bg-white border border-green-200 shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300">
                            <div className="flex items-center">
                                <FaUserCircle className="text-green-500 text-4xl mr-4" />
                                <div>
                                    <p className="font-semibold text-green-900 text-lg">{user.username} 🌿</p>
                                    <p className="text-green-600 text-sm">{user.email}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                {AddUserFlag[index] === true ? (
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all"
                                        onClick={() => {
                                            const newFlags = [...AddUserFlag];
                                            newFlags[index] = false;
                                            setAddUserFlag(newFlags);
                                            setUsersArray(usersArray.filter(u => u._id !== user._id));
                                        }}
                                    >
                                        <FaUserTimes className="inline mr-2" /> ❌ Remove
                                    </button>
                                ) : (
                                    <button
                                        className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-all"
                                        onClick={() => handleAddNewMember(user, index)}
                                    >
                                        <FaUserPlus className="inline mr-2" /> 🌸 Add
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    {usersArray.length > 0 ? (
                        <>
                            <AiFillCheckCircle className="text-green-500 text-4xl mb-3 inline" />
                            <p className="text-green-800 font-bold text-lg">
                                🌟 You’ve selected {usersArray.length} member(s) to join the garden! 🌼
                            </p>
                            <button
                                className="bg-emerald-600 text-white px-8 py-3 mt-4 rounded-lg shadow-md hover:bg-emerald-700 transition duration-200"
                                onClick={addMemberToGroup}
                            >
                                <FaUsers className="inline mr-2" /> ✅ Confirm & Add Members
                            </button>
                        </>
                    ) : (
                        <p className="text-green-600 italic">
                            🍂 No one selected yet... Let's add someone and make the group bloom!
                        </p>
                    )}
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default AddNewMembersToGroup;
