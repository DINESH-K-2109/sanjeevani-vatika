import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { allCallLogsFromOthers, deleteRecentCallLogs } from '../../../utils/VideoCallApiRoutes/VideoCallApiRoutes';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaPhoneSlash } from 'react-icons/fa'; // Added React Icons
import WelcomeSection from '../UserCalledTheCurrentLocalUserComponents/WelcomeSection/WelcomeSection';
import CallLogsList from '../UserCalledTheCurrentLocalUserComponents/CallLogsList/CallLogsList';

function UserCalledTheCurrentLocalUser({ user }) {
    const [allCallLogsFromOtherUsers, setAllCallLogsFromOtherUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCallLogs = async () => {
            try {
                const response = await axios.post(allCallLogsFromOthers, { userId: user._id });
                if (response) {
                    setAllCallLogsFromOtherUsers(response.data.response);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchCallLogs();
    }, [user._id]);

    const handleJoinCall = (callLog) => {
        navigate("/videocallroom", {
            state: { roomId: callLog.callId.toString() },
        });
    };

    const handleLeaveCall = async (callLog) => {
        try {
            const response = await axios.post(deleteRecentCallLogs, {
                meetId: callLog.from,
                callLog: callLog,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto p-6 bg-green-50 rounded-lg shadow-lg">
            <WelcomeSection />
            <h1 className="text-3xl font-semibold mb-6 text-green-600">📞 Users Who Called You 🌿</h1>
            <CallLogsList
                allCallLogsFromOtherUsers={allCallLogsFromOtherUsers}
                handleJoinCall={handleJoinCall}
                handleLeaveCall={handleLeaveCall}
            />
            <div className="mt-6 flex items-center justify-between text-gray-700">
                <button 
                    onClick={() => navigate("/videocallroom")} 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    <FaPhoneAlt className="inline-block mr-2" />
                    Join Call
                </button>
                <button 
                    onClick={() => navigate("/")} 
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    <FaPhoneSlash className="inline-block mr-2" />
                    Leave Call
                </button>
            </div>
        </div>
    );
}

export default UserCalledTheCurrentLocalUser;
