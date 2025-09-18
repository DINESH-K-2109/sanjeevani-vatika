import React from 'react';
import BlogPost from '../BlogPost/BlogPost';

const BlogList = ({ blogs, visiblePosts, handleBlogsDetails, handleTags, handleLikes, likeCountMap, handleAuthorProfile, toggleShowMoreTags, expandedTagPosts }) => {

    return (
        <div className="mt-8 grid grid-cols-1 gap-6">
            {blogs.slice(0, visiblePosts).map((blog) => (
                <BlogPost
                    key={blog._id}
                    blog={blog}
                    handleBlogsDetails={handleBlogsDetails}
                    handleTags={handleTags}
                    handleLikes={handleLikes}
                    likeCount={likeCountMap[blog._id]}
                    handleAuthorProfile={handleAuthorProfile}
                    toggleShowMoreTags={toggleShowMoreTags}
                    expandedTagPosts={expandedTagPosts}
                />
            ))}
        </div>
    );
};

export default BlogList;
