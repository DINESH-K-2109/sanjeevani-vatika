import React from 'react';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CreateBlog from './components/CreateBlog';
import Layout from './Layout/Layout';
import YourBlogPosts from './pages/YourBlogPosts';
import ViewBlogInDetails from './pages/ViewBlogInDetails';
import ViewBlogsByTags from './pages/ViewBlogsByTags';
import AllUsersProfile from './pages/AllUsersProfile';
import EditBlog from './pages/EditBlog';
import UserProfile from './pages/UserProfile';
import DirectMessage from './pages/DirectMessage';
import ErrorPage from './components/ErrorPage';
import Followers from './pages/followers/Followers';
import Following from './pages/following/Following';
import SearchResults from './components/searchResults/SearchResults';
import UserRecentMessagesContacts from './components/UserRecentMessagesContacts/UserRecentMessagesContacts';
import VideoCall from './components/VideoCall/VideoCall';
import VideoCallRoom from './components/VideoCall/VideoCallRoom';
import GroupChatRoom from './components/GroupChatRoom/GroupChatRoom';
import GroupsListAll from './pages/GroupsListAll/GroupsListAll';
import GroupInformation from './pages/GroupInformation/GroupInformation';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import UsersSavedPosts from './pages/UsersSavedPosts/UsersSavedPosts';
import AllBlogsPosts from './components/AllBlogsPosts/AllBlogsPosts';
import CreateBlogEditor from './components/CreateBlogEditor/CreateBlogEditor';
import ChatRoomLayout from './ChatRoomLayout/ChatRoomLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Direct message route inside the ChatRoomLayout */}
        <Route path="/directmessage" element={
          <ChatRoomLayout>
            <DirectMessage />
          </ChatRoomLayout>
        } />

        {/* Other routes inside the standard Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/createblog" element={<Layout><CreateBlog /></Layout>} />
        <Route path="/myblogs" element={<Layout><YourBlogPosts /></Layout>} />
        <Route path="/blogdetails" element={<Layout><ViewBlogInDetails /></Layout>} />
        <Route path="/tag/:tag" element={<Layout><ViewBlogsByTags /></Layout>} />
        <Route path="/edit" element={<Layout><EditBlog /></Layout>} />
        <Route path="/userprofile" element={<Layout><UserProfile /></Layout>} />
        <Route path="/allusersprofiles" element={<Layout><AllUsersProfile /></Layout>} />
        <Route path="/followers" element={<Layout><Followers /></Layout>} />
        <Route path="/followings" element={<Layout><Following /></Layout>} />
        <Route path="/searchresults" element={<Layout><SearchResults /></Layout>} />
        <Route path="/userrecentmessages" element={<Layout><UserRecentMessagesContacts /></Layout>} />
        <Route path="/videocall" element={<Layout><VideoCall /></Layout>} />
        <Route path="/videocallroom" element={<Layout><VideoCallRoom /></Layout>} />
        <Route path="/groupchatroom" element={<Layout><GroupChatRoom /></Layout>} />
        <Route path="/myallgroups" element={<Layout><GroupsListAll /></Layout>} />
        <Route path="/groupinformation" element={<Layout><GroupInformation /></Layout>} />
        <Route path="/profilesettings" element={<Layout><ProfileSettings /></Layout>} />
        <Route path="/mysavedposts" element={<Layout><UsersSavedPosts /></Layout>} />
        <Route path="/allblogsposts" element={<Layout><AllBlogsPosts /></Layout>} />
        <Route path="/createblogeditor" element={<Layout><CreateBlogEditor /></Layout>} />
        <Route path="*" element={<Layout><ErrorPage /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
