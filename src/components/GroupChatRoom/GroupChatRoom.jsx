import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageInput from '../GroupChatRoomComponents/MessageInput/MessageInput';
import MessagesList from '../GroupChatRoomComponents/MessagesList/MessagesList';
import GroupHeader from '../GroupChatRoomComponents/GroupHeader/GroupHeader';
import { getGroupMessageToDataBase, addGroupMessageToDataBase } from '../../../utils/GroupMessagesApiRoutes/GroupMessagesApiRoutes';
import { GiPlantRoots } from 'react-icons/gi'; // Plant-related icons

function GroupChatRoom() {
    const location = useLocation();
    const group = location.state?.group;

    const [message, setMessage] = useState("");
    const [messagesFromDataBase, setMessagesFromDataBase] = useState([]);
    const [localStorageUser, setLocalStorageUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem('blog-user'));
        setLocalStorageUser(localUser);
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${getGroupMessageToDataBase}?groupId=${group._id}`);
                if (response.data.response) {
                    setMessagesFromDataBase(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchMessages();
    }, [group._id]);

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Avoid sending empty messages
        try {
            await axios.post(`${addGroupMessageToDataBase}`, {
                groupId: group._id,
                currentUserId: localStorageUser._id,
                currentUserName: localStorageUser.username,
                messageData: message,
                date: new Date().toLocaleString('en-US'),
            });
            setMessage(""); // Clear input after sending
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-green-50">
            <GroupHeader group={group} navigate={navigate} />
            <div className="bg-green-100 p-4 flex-grow overflow-y-auto">
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-semibold text-green-600">
                        Welcome to the {group.groupName} Group Chat! 🌱
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Connect with your group members, share thoughts, and collaborate on ideas. 🌿
                        Use the input box below to send messages to your group. 💬
                        <span role="img" aria-label="sparkle"> ✨</span>
                    </p>
                </div>
                <MessagesList messages={messagesFromDataBase} localStorageUser={localStorageUser} />
            </div>
            <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
            <div className="bg-green-200 p-2 flex justify-center items-center">
                <GiPlantRoots className="text-green-600 text-2xl mr-2" />
                <p className="text-gray-700 font-semibold">Let your ideas grow like a plant! 🌱</p>
            </div>
        </div>
    );
}

export default GroupChatRoom;
