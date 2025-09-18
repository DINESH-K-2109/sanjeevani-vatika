// import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    FaTags,
    FaUser,
    FaCalendarAlt,
    FaCommentDots,
    FaHeart,
    FaRegHeart,
    FaSave,
    FaRegSave,
    FaEdit,
    FaTrashAlt,
    FaPlusCircle,
    FaComments
} from 'react-icons/fa';
import axios from 'axios';
import { allBlogsByTagName } from '../../utils/apiRoutes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComments } from '../../utils/apiRoutes';
import { getComments } from '../../utils/apiRoutes';
import { editComments } from '../../utils/apiRoutes';
import { deleteComment } from '../../utils/apiRoutes';
import { editLikes } from '../../utils/apiRoutes';
import unlike from "../assets/love.png";
import like from "../assets/heart.png";
import { addLikes } from "../../utils/apiRoutes"
import { getLikes } from '../../utils/apiRoutes';
import CommentsReply from '../components/CommentsReply/CommentsReply';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import chat from "../assets/chat.png";

import savedPost from "../assets/saved post.png";
import unsavedPost from "../assets/unsaved post.png";
import { AddPostsToProfile } from '../../utils/PostSavingToUserProfileApiRoutes/PostSavingToUserProfileApiRoutes';


function ViewBlogInDetails() {



    const [newComment, setNewComment] = useState('');
    const [writeComments, setWriteComments] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [allComments, setAllComments] = useState([]);
    const [postId, setPostId] = useState();
    const [currentUser, setCurrentUser] = useState("");
    // this is showing the current user name of the localstorage
    // find the user id of the post 
    const [userIdOfPost, setUserIdOfPost] = useState("");
    // finding the current userId from storage location
    const [currentUserId, setCurrentUserId] = useState();

    // tru false state for handle Edit;

    const [handleEdit, setHandleEdit] = useState(false);
    // making a state of set particular comment id

    const [particularCommentId, setParticularCommentId] = useState();

    // tracking a particular comment is edited or not 
    const [commentEdited, setCommentEdited] = useState(false);

    // like unlike toggelr button 
    // states for like and unlike toggler

    const [likeToggler, setLikeToggler] = useState(false);

    // likes and likes count
    const [likesCount, setLikesCount] = useState(0);
    const [likedOrNot, setLikedOrNot] = useState(false);

    // likes initial counts from the database

    const [likesCountFromDatabase, setLikesCountsFromDataBase] = useState(0);
    const [likesTogglersFromDatabase, setLikesTogglersFromDataBase] = useState(0);
    const [loadMoreComments, setLoadMoreComments] = useState(false);
    const [savedPostFlag, setSavedPostFlag] = useState(false);

    // this in new html to text conversion things
    const [htmlContent, setHtmlContent] = useState("set Dummy");

    // end of the html conversions things



    const navigate = useNavigate();

    const location = useLocation();
    const blogDetails = location.state?.blogDetails;


    // redirect to register page if user is not register in the database

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));

                console.log(userDetails._id);
                setCurrentUserId(userDetails._id);
                if (!userDetails) {
                    navigate("/register");
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchUserFromLocal();
    }, []);


    // useState for setting the postId form the location / useNavigate

    useEffect(() => {
        setPostId(blogDetails._id);// id of the particular post
        setUserIdOfPost(blogDetails.id);// id of the pwerson who have posted it

    }, []);






    //getting likes data from the database;

    useEffect(() => {
        const fetchData = async (postId) => {
            try {
                const response = await axios.post(`${getLikes}`, {
                    blogId: postId,
                    likesCount: 1,
                    likedOrNot: true
                });
                console.log(response, postId);
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])


    // getting the cuurrent user from the local storage 

    useEffect(() => {



        const fetch = async () => {


            try {

                const localSystemUser = await JSON.parse(localStorage.getItem("blog-user"));
                // console.log(localSystemUser);

                setCurrentUser(localSystemUser.username);
                // setCurrentUserId(localSystemUser._id);



            } catch (err) {
                console.log(err);
            }


        };

        fetch();



    }, [])

















    const handleTags = async (tag) => {
        // console.log(tag, blog);

        try {

            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            // console.log(typeof response.data);
            const blogByTag = response.data.blog;


            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        }
        catch (err) {
            console.log(err)
        }


    }



    // codings for the comments sections code



    const handleCommentChange = async (e) => {
        setNewComment(e.target.value);
    };



    const handleAddComment = async () => {

        if (newComment.trim() !== '') {

            setNewComment('');
        }

        try {

            const localSystemUser = await JSON.parse(localStorage.getItem("blog-user"));
            // console.log(localSystemUser._id);

            try {
                const response = await axios.post(`${addComments}/${postId}`, {
                    id: postId,
                    author: localSystemUser.username,
                    comment: newComment,
                    date: new Date()
                });
                if (response.data.status === true) {
                    toast.success(`hello ${localSystemUser.username} your comment is posted successfully`);

                } else {
                    toast.error(`${response.data.message} try again`);
                }
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log(err);
        }


    };

    //    fetch get comments 



    // allComments



    // handling the handleComments

    const handleComments = () => {
        setWriteComments(!writeComments);
        setShowComments(true);
    }



    // function to edith the comments
    const handleEditComment = (comment, id) => {



        setHandleEdit(true);
        setNewComment(comment);
        setParticularCommentId(id);

    }

    // final function to edit the comments

    const handleFinalEdit = async (id) => {


        try {
            const response = await axios.post(`${editComments}/${id}`, {
                id: id,
                newComment: newComment,

            });

            if (response.data.status) {
                toast.success("Your Comment is Edited successfully");
                setNewComment('');
            }

        } catch (err) {
            console.log(err);
        }
        setHandleEdit(false);


    }



    // useEffect for the getting all the commentf from the database 

    useEffect(() => {
        const fetch = async () => {

            try {
                const response = await axios.get(`${getComments}/${blogDetails._id}`);

                setAllComments(response.data.comments.reverse());

            } catch (err) {
                console.log(err)
            }

        }
        fetch();
    }, [allComments, handleFinalEdit]);



    // functions to delete the comments
    const handleDeleteComment = async (id) => {
        // deleteComment
        console.log(id);

        const response = await axios.post(`${deleteComment}/${id}`, {
            id: id,
        });

        if (response.data.status) {
            toast.warn("Your comment is deleted !")
        }

    }

    // function to cncel the edit 

    const handleCancelEdit = () => {
        setNewComment('');
        setHandleEdit(false);
    }



    // handle likes button start


    // handle like button

    const handleLikes = async (blogId) => {
        // console.log(blogId);
        console.log("current user", currentUser);
        console.log(currentUserId);
        setLikeToggler((likesTogglersFromDatabase) => !likesTogglersFromDatabase)
        setLikesCount((likesCountFromDatabase) => (likesCountFromDatabase ? likesCountFromDatabase - 1 : likesCountFromDatabase + 1));


        if (!likeToggler) {
            try {
                const response = await axios.post(`${addLikes}`, {
                    currentUserId: currentUserId,
                    blogId: blogId,
                    likesCount: 1,
                    likeToggler: true,
                });

                console.log(response);
            } catch (err) {
                console.log(err);
            }

        }
        else {
            try {
                const response = await axios.post(`${editLikes}`, {
                    currentUserId: currentUserId,
                    blogId: blogId,
                    likesCount: 0,
                    likeToggler: false,
                });

                console.log(response);
            } catch (err) {
                console.log(err);
            }

        }

    }


    // handle likes button ends



    // retriving the likes infoormation from the Likes database start

    useState(() => {
        const fetch = async () => {
            // console.log(blogDetails._id);



            const CurrentPostId = blogDetails._id;
            console.log("the current user and post id", currentUserId);

            try {

                // local storage user id

                try {
                    const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                    console.log("the local:::", userDetails._id);
                    setCurrentUserId(userDetails._id);
                    const response = await axios.post(`${getLikes}`, {
                        blogId: CurrentPostId,
                        currentUserId: userDetails._id,
                    });
                    console.log(response.data.response)
                    if (response.data) {

                        setLikesCountsFromDataBase(response.data.response.likesCount);
                        setLikesTogglersFromDataBase(response.data.response.likeToggler);

                    }


                } catch (err) {
                    console.log(err);
                }





            } catch (err) {
                console.log(err);
            }

        }
        fetch();
    }, []);


    // retriving the likes infoormation from the Likes database end points








    // useState(() => {
    //     console.log(likesCount);
    // }, [handleLikes, likeToggler])


    // start of the load more commenys

    const hanldeLoadMoreComments = () => {
        console.log("clicked");
        setLoadMoreComments(true);
    }

    // eod of the load mor commesnt

    // start of the saving the post to user profile

    const handleSaveToUserProfile = async (blogDetails) => {
        try {
            const response = await axios.post(`${AddPostsToProfile}`, {

                userId: currentUserId,
                postDetails: blogDetails,
                savedStatus: true,

            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }

        // console.log(currentUserId);
    }

    //end of the saving the post to the user profile
    // Convert HTML content to plain text
    useEffect(() => {
        if (blogDetails.content) {
            const textContent = showContents(blogDetails.content);
            setHtmlContent(textContent);
        }
    }, []);

    // this is the function which will show my contents 

    const showContents = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        // setHtml_contents(doc.body.textContent);
        return doc.body.textContent || "";
    };


    // end of the function which will show my contents 




    return (
        <>
            <div className="bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10 transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105">
                {/* Blog Header */}
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center hover:text-indigo-600 transition duration-300 ease-in-out">
                    Welcome to My Blog Post
                </h1>

                {/* Short Description */}
                <p className="text-lg text-gray-700 text-center mb-6">
                    Dive into the world of technology, trends, and insightful discussions. This post covers a range of topics that will enrich your knowledge.
                </p>

                {/* Decorative Elements */}
                <div className="flex justify-center space-x-4 mt-4">
                    <span className="p-3 bg-indigo-500 text-white rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out">
                        ✍️
                    </span>
                    <span className="p-3 bg-pink-500 text-white rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out">
                        📅
                    </span>
                    <span className="p-3 bg-green-500 text-white rounded-full shadow-lg transform hover:scale-110 transition duration-300 ease-in-out">
                        💬
                    </span>
                </div>

                {/* Bottom Text */}
                <p className="mt-6 text-center text-gray-500">
                    Scroll down to explore more!
                </p>
            </div>


            <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 min-h-screen py-10 px-4">
                <div className="container mx-auto max-w-4xl p-6 bg-white shadow-lg rounded-lg transform hover:shadow-2xl transition duration-300 ease-in-out">
                    {/* Blog Image */}
                    <div className="relative group">
                        <img
                            src={blogDetails.imageUrl}
                            alt={blogDetails.title}
                            className="w-full h-64 object-cover rounded-lg mb-6 transform group-hover:scale-105 transition duration-300 ease-in-out"
                        />
                        <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg transform group-hover:scale-110 transition duration-300">
                            <FaSave
                                className="text-gray-500 cursor-pointer hover:text-blue-500 transition duration-300"
                                onClick={() => handleSaveToUserProfile(blogDetails)}
                            />
                        </div>
                    </div>

                    {/* Blog Title and Meta */}
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition duration-300 ease-in-out">
                            {blogDetails.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                                <FaUser className="inline mr-1 text-blue-500" /> {blogDetails.author}
                            </span>
                            <span className="flex items-center">
                                <FaCalendarAlt className="inline mr-1 text-blue-500" />{" "}
                                {new Date(blogDetails.date).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Blog Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blogDetails.tags.map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handleTags(tag)}
                                className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full hover:bg-indigo-300 transition duration-300 flex items-center space-x-1"
                            >
                                <FaTags />
                                <span>{tag}</span>
                            </button>
                        ))}
                    </div>

                    {/* Blog Content */}
                    <div className="text-gray-700 mb-6 leading-relaxed">
                        <p className="hover:tracking-wider transition duration-300 ease-in-out">
                            {htmlContent}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mb-6">
                        {/* Add Comment */}
                        <button
                            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                            onClick={() => handleComments(blogDetails._id)}
                        >
                            <FaCommentDots className="text-white" />
                            <span>Add Comment</span>
                        </button>

                        {/* Like/Unlike Button */}
                        <button
                            className="flex items-center space-x-2"
                            onClick={() => handleLikes(blogDetails._id)}
                        >
                            {likeToggler || likesTogglersFromDatabase ? (
                                <FaHeart className="text-red-500 transform hover:scale-110 transition duration-300" />
                            ) : (
                                <FaRegHeart className="text-gray-500 hover:text-red-500 transform hover:scale-110 transition duration-300" />
                            )}
                            <span>{likesCount}</span>
                        </button>

                        {/* Save Button */}
                        <button
                            className="text-gray-500 hover:text-blue-500 transition duration-300 transform hover:scale-110"
                            onClick={() => handleSaveToUserProfile(blogDetails)}
                        >
                            <FaSave className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Leave a Comment
                        </h2>
                        {writeComments && (
                            <form>
                                <textarea
                                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 transition duration-300 ease-in-out"
                                    rows="4"
                                    placeholder="Add your comment..."
                                    value={newComment}
                                    onChange={handleCommentChange}
                                ></textarea>
                                {handleEdit === true ? (
                                    <div className="flex mt-4 space-x-2">
                                        <button
                                            onClick={() => handleFinalEdit(particularCommentId)}
                                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Edit Comment
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleAddComment}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded transition duration-300"
                                    >
                                        Add Comment
                                    </button>
                                )}
                            </form>
                        )}

                        {/* Display Comments */}
                        {showComments && (
                            <div className="mt-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                    All Comments
                                </h2>
                                <div className="space-y-4">
                                    {!loadMoreComments &&
                                        allComments.slice(0, 3).map((comment, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border border-gray-200 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition duration-300"
                                            >
                                                <p className="font-semibold mb-2 text-indigo-800">
                                                    <FaUser className="inline mr-1 text-indigo-600" />{" "}
                                                    {comment.author}
                                                </p>
                                                <p className="text-gray-700 mb-2">{comment.comment}</p>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(comment.date).toLocaleString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })}
                                                </span>
                                                <div className="mt-4 flex space-x-4">
                                                    {currentUser === comment.author && (
                                                        <>
                                                            <button
                                                                className="text-blue-500 hover:underline"
                                                                onClick={() =>
                                                                    handleEditComment(comment.comment, comment._id)
                                                                }
                                                            >
                                                                <FaEdit /> Edit
                                                            </button>
                                                            <button
                                                                className="text-red-500 hover:underline"
                                                                onClick={() => handleDeleteComment(comment._id)}
                                                            >
                                                                <FaTrashAlt /> Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                                <CommentsReply comment={comment} />
                                            </div>
                                        ))}

                                    {/* Load More Comments Button */}
                                    {!loadMoreComments && (
                                        <button
                                            onClick={hanldeLoadMoreComments}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 mt-4"
                                        >
                                            Load All Comments
                                        </button>
                                    )}

                                    {loadMoreComments &&
                                        allComments.map((comment, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border border-gray-200 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition duration-300"
                                            >
                                                <p className="font-semibold mb-2 text-indigo-800">
                                                    <FaUser className="inline mr-1 text-indigo-600" />{" "}
                                                    {comment.author}
                                                </p>
                                                <p className="text-gray-700 mb-2">{comment.comment}</p>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(comment.date).toLocaleString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    })}
                                                </span>
                                                <div className="mt-4 flex space-x-4">
                                                    {currentUser === comment.author && (
                                                        <>
                                                            <button
                                                                className="text-blue-500 hover:underline"
                                                                onClick={() =>
                                                                    handleEditComment(comment.comment, comment._id)
                                                                }
                                                            >
                                                                <FaEdit /> Edit
                                                            </button>
                                                            <button
                                                                className="text-red-500 hover:underline"
                                                                onClick={() => handleDeleteComment(comment._id)}
                                                            >
                                                                <FaTrashAlt /> Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                                <CommentsReply comment={comment} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>

    );
} 
// comments 01


export default ViewBlogInDetails;
