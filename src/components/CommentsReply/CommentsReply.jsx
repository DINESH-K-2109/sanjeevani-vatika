import React, { useState } from 'react';
import axios from 'axios';
import { FaReply } from 'react-icons/fa'; // React icon for reply
import { MdSend } from 'react-icons/md';  // React icon for sending the reply

import { addReplyToComment } from '../../../utils/CommentsReplyApiRoutes/CommentsReplyApiRoutes';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import ReplyForReply from '../ReplyForReply/ReplyForReply';

function CommentsReply({ comment }) {

    const [replyFlag, setReplyFlag] = useState(false);
    const [reply, setReply] = useState("");

    // reply input 
    const handleReplyInput = (e) => {
        setReply(e.target.value);
    }

    // start of the function for comment reply
    const handleCommentsReply = () => {
        setReplyFlag(true);
    }

    // end of the function for the comments reply
    const handleReplyOnComments = async () => {
        setReply("");
        setReplyFlag(false);

        // Get the current date
        const currentDate = new Date();

        // Format the date in the local time zone
        const formattedDate = currentDate.toLocaleString();

        try {
            if (reply.length > 0) {
                const response = await axios.post(`${addReplyToComment}`, {
                    replyId: comment._id,
                    reply: reply,
                    author: comment.author,
                    date: formattedDate,
                });
                if (response) {
                    toast.success("🌿 Hey! Your reply was added successfully. 🌟");
                    setReplyFlag(false);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="p-4 bg-green-50 rounded-lg shadow-lg">
            <ReplyForReply comment={comment} />

            {/* If the reply flag is false, show the "Reply" button */}
            {replyFlag === false ? (
                <button
                    onClick={handleCommentsReply}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center justify-center gap-2"
                >
                    <FaReply className="text-white" /> Reply
                </button>
            ) : (
                <>
                    {/* If replyFlag is true, show input and reply button */}
                    <div className="p-4 mt-4 bg-green-100 rounded-lg">
                        <input
                            value={reply}
                            onChange={handleReplyInput}
                            className="border border-green-300 rounded w-full py-2 px-3 text-green-700 leading-tight focus:outline-none focus:border-green-500"
                            type="text"
                            placeholder="Enter your reply here... 🌱"
                        />
                        <button
                            onClick={handleReplyOnComments}
                            className="bg-green-600 hover:bg-green-700 text-white mt-2 font-bold py-2 px-4 rounded-lg shadow-md flex items-center justify-center gap-2"
                        >
                            <MdSend className="text-white" /> Send Reply
                        </button>
                    </div>
                </>
            )}

            <ToastContainer />
        </div>
    )
}

export default CommentsReply;
