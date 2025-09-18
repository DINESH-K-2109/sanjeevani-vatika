import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { FaVideo, FaPhone, FaInfoCircle } from 'react-icons/fa';

function VideoCallRoom() {
    const location = useLocation();
    const roomId = location.state?.roomId;
    const videoCallRef = useRef(null);

    useEffect(() => {
        const startMeeting = async (element) => {
            const appId = 309407206;
            const serverSecret = "56ef694f0da109be85982c8420a664f4";

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "User");
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Start the call
            zp.joinRoom({
                container: element,
                sharedLinks: [
                    {
                        name: 'Personal link',
                        url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomId=${roomId}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
            });
        };

        startMeeting(videoCallRef.current);
    }, [roomId]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-50">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-green-600 flex items-center">
                    Welcome to the Video Call Room 🌿 <FaVideo className="ml-2 text-green-400" />
                </h1>
                <p className="mt-2 text-gray-700">
                    You are in room: <span className="font-semibold text-green-800">{roomId}</span> 🌱
                </p>
                <p className="mt-2 text-gray-600 flex items-center">
                    <FaInfoCircle className="mr-2 text-green-500" />
                    Ensure your microphone and camera are enabled for the best experience! 🎥🎤
                </p>
                <div ref={videoCallRef} className="mt-4 border-2 border-gray-300 rounded-lg overflow-hidden h-96">
                    {/* The video call will be rendered here 🌳 */}
                </div>
            </div>
        </div>
    );
}

export default VideoCallRoom;
