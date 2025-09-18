import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAllBlogRoutes, blogsDetails, allBlogsByTagName } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import SuggestedUsers from '../components/HomePageSplittedComponents/SuggestedUsers/SuggestedUsers';
import BlogList from '../components/HomePageSplittedComponents/BlogList/BlogList';
import RecentUsers from '../components/HomePageSplittedComponents/RecentUsers/RecentUsers';
import BlogHeader from '../components/HomePageSplittedComponents/BlogHeader/BlogHeader';
import AboutPageForLibertyPost from '../components/AboutPageForLibertyPost/AboutPageForLibertyPost';
import DifferenceFromOtherSocialMedia from './DifferenceFromOtherSocialMedia/DifferenceFromOtherSocialMedia';
import SliderHome from './SliderHome/SliderHome';

function Home() {
    const [blogs, setBlogs] = useState([]);
    const [likesMap, setLikesMap] = useState({});
    const [likeCountMap, setLikeCountMap] = useState({});
    const [currentUser, setCurrentUser] = useState();
    const [expandedTagPosts, setExpandedTagPosts] = useState({});
    const [visiblePosts, setVisiblePosts] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            const storedUser = localStorage.getItem("blog-user");
            if (!storedUser) {
                navigate("/");
                return;
            }
            const userDetails = JSON.parse(storedUser);
            setCurrentUser(userDetails);
        };
        fetchUserFromLocal();
    }, []);

    const getAllBlogs = async () => {
        try {
            const response = await axios.get(getAllBlogRoutes);
            const blogsData = response.data.blogs;
            setBlogs(blogsData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    useEffect(() => {
        if (visiblePosts < blogs.length) {
            const timer = setTimeout(() => {
                setVisiblePosts(prev => prev + 3);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visiblePosts, blogs.length]);

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.log(err);
        }
    };

    const handleTags = async (tag) => {
        try {
            const response = await axios.get(`${allBlogsByTagName}/${tag}`);
            const blogByTag = response.data.blog;
            navigate(`/tag/${tag}`, { state: { blogByTag, tag } });
        } catch (err) {
            console.log(err);
        }
    };

    const handleLikes = (blogId) => {
        setLikesMap(prev => ({ ...prev, [blogId]: !prev[blogId] }));
        setLikeCountMap(prev => {
            const currentLikes = prev[blogId] || 0;
            return { ...prev, [blogId]: likesMap[blogId] ? currentLikes - 1 : currentLikes + 1 };
        });
    };

    const handleAuthorProfile = (blog) => {
        if (currentUser && blog.id === currentUser._id) {
            navigate('/userprofile');
        } else {
            navigate("/allusersprofiles", {
                state: {
                    id: blog.id,
                    currentUserId: currentUser ? currentUser._id : null,
                    author: blog.author,
                }
            });
        }
    };

    const toggleShowMoreTags = (blogId) => {
        setExpandedTagPosts((prevState) => ({
            ...prevState,
            [blogId]: !prevState[blogId],
        }));
    };

    return (
        <>

            <AboutPageForLibertyPost />
            <SliderHome />

            <div className="container mx-auto flex flex-col md:flex-row md:space-x-6 mt-6">
                {/* Left Side - Suggested Users */}
                <div className="hidden md:block w-1/4 bg-green-100 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center text-green-700">🌱 Suggested Users</h2>
                    <div className="flex flex-col space-y-4">
                        <SuggestedUsers />
                    </div>
                </div>

                {/* Center - Blog Content */}
                <div className="w-full md:w-1/2 bg-green-50 rounded-lg shadow-lg p-6 overflow-y-auto h-screen">
                    <BlogHeader />
                    <BlogList
                        blogs={blogs}
                        visiblePosts={visiblePosts}
                        handleBlogsDetails={handleBlogsDetails}
                        handleTags={handleTags}
                        handleLikes={handleLikes}
                        likeCountMap={likeCountMap}
                        handleAuthorProfile={handleAuthorProfile}
                        toggleShowMoreTags={toggleShowMoreTags}
                        expandedTagPosts={expandedTagPosts}
                    />
                </div>

                {/* Right Side - Recent Users */}
                <div className="hidden md:block w-1/4 bg-green-100 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center text-green-700">🌿 Recent Users</h2>
                    <div className="flex flex-col space-y-4">
                        <RecentUsers />
                    </div>
                </div>
            </div>
            <DifferenceFromOtherSocialMedia />
        </>
    );
}

export default Home;
