import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { recentMessage } from '../../../utils/RecentMessages/RecentMessages';
import UsersRecentVideoCalls from '../UsersRecentVideoCalls/UsersRecentVideoCalls';
import UserCalledTheCurrentLocalUser from '../UsersRecentVideoCalls/UserCalledTheCurrentLocalUser';
import RecentMessagesList from '../UserRecentMessagesContactsComponents/RecentMessagesList/RecentMessagesList';
import WelcomeSection from '../UserRecentMessagesContactsComponents/WelcomeSection/WelcomeSection';
import { FaVideo, FaPhoneAlt } from 'react-icons/fa'; // Adding video and phone icons

function UserRecentMessagesContacts() {
    const [recentUsersMessages, setRecentUsersMessages] = useState([]);
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecentMessages = async () => {
            try {
                const response = await axios.post(`${recentMessage}`, { userId: user._id });
                if (response) {
                    setRecentUsersMessages(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchRecentMessages();
    }, [user._id]);

    const handleDirectMessageToUser = (user) => {
        navigate("/directmessage", {
            state: {
                from: user.from,
                to: user.to,
                fromName: user.fromName,
                toName: user.toName,
            },
        });
    };

    return (
        <div className="max-w-screen-lg mx-auto p-6">
            <WelcomeSection />
            <h1 className="text-2xl font-bold mb-6 text-green-800">🌿 Recent Conversations 🌸</h1>
            <RecentMessagesList
                recentUsersMessages={recentUsersMessages}
                handleDirectMessageToUser={handleDirectMessageToUser}
            />
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-green-700">
                    <FaVideo className="inline-block mr-2 text-green-600" /> Recent Video Calls 🎥
                </h2>
                <p className="text-gray-600 mb-4">
                    Check out the latest video calls from your contacts! <span role="img" aria-label="video call">📹</span>
                </p>
                <UsersRecentVideoCalls />
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold text-green-700">
                    <FaPhoneAlt className="inline-block mr-2 text-green-600" /> Calls Made to You 📞
                </h2>
                <p className="text-gray-600 mb-4">
                    Here are the users who have tried to contact you. <span role="img" aria-label="incoming call">📞</span>
                </p>
                <UserCalledTheCurrentLocalUser user={user} />
            </div>
        </div>
    );
}

export default UserRecentMessagesContacts;
