import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { addMessage, getAllMessage } from '../../utils/apiRoutes';
import { toast } from 'react-toastify';
import { editMessage, deleteMessage } from '../../utils/message_edit_and_delete_api_routes/messageEditDeleteApiRoutes';
import { io } from 'socket.io-client';
import Message from './DirectMessageComponents/Message/Message';
import MessageInput from './DirectMessageComponents/MessageInput/MessageInput';

function DirectMessage() {
    const location = useLocation();
    const { from, to, fromName, toName, socketId } = location.state || {};
    const socket = useRef(socketId ? io(socketId) : null);
    const scrollRef = useRef();

    const [message, setMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messagesFromDatabase, setMessagesFromDatabase] = useState([]);
    const [messageId, setMessageId] = useState("");
    const [isEditingMessage, setIsEditingMessage] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post(getAllMessage, { from, to });
                setMessagesFromDatabase(response.data.response);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, [from, to]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (message) => {
                setArrivalMessage({ fromSelf: false, message });
            });
        }
    }, []);

    useEffect(() => {
        if (arrivalMessage) {
            setMessagesFromDatabase(prevMessages => [...prevMessages, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesFromDatabase]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = async () => {
        if (message.trim()) {
            try {
                await axios.post(addMessage, { from, to, message, fromName, toName });
                toast.success("Message sent");
                socket.current?.emit("send-msg", { to, from, message });
            } catch (err) {
                console.error(err);
            }
            setMessage("");
        } else {
            console.log("Message is empty");
        }
    };

    const handleEdit = (msg) => {
        setIsEditingMessage(true);
        setMessage(msg.message);
        setMessageId(msg._id);
    };

    const handleDelete = async (msg) => {
        try {
            await axios.post(deleteMessage, { msgId: msg._id });
            toast.error("Your message has been deleted");
        } catch (err) {
            console.error(err);
        }
    };

    const handleFinalEdit = async () => {
        try {
            await axios.post(editMessage, { msgId: messageId, newMessage: message });
            toast.success("Your message has been edited successfully");
        } catch (err) {
            console.error(err);
        }
        setMessage("");
        setIsEditingMessage(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <div className="flex-grow overflow-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                <div className="flex flex-col space-y-4">
                    {messagesFromDatabase.map((msg, index) => (
                        <Message
                            key={index}
                            msg={msg}
                            from={from}
                            fromName={fromName}
                            toName={toName}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                    <div ref={scrollRef} />
                </div>
            </div>
            <hr className="my-4" />
            <MessageInput
                message={message}
                handleInputChange={handleInputChange}
                handleSend={isEditingMessage ? handleFinalEdit : handleSend}
                isEditing={isEditingMessage}
            />
        </div>
    );
}

export default DirectMessage;
