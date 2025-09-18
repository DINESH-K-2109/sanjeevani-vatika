import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaTag, FaUser, FaFolder } from 'react-icons/fa';

const SearchResultCard = ({ result, currentUser, onBlogDetails, searchQuery }) => {
    const navigate = useNavigate();
    const [showAllTags, setShowAllTags] = useState(false);

    const handleTags = (e, tag) => {
        e.stopPropagation();
        navigate(`/tag/${tag}`);
    };

    const handleAuthorProfile = (e, blog) => {
        e.stopPropagation();
        if (blog.id === currentUser._id) {
            navigate('/userprofile');
        } else {
            navigate("/allusersprofiles", {
                state: {
                    id: blog.id,
                    currentUserId: currentUser._id,
                    author: blog.author,
                }
            });
        }
    };

    const handleCardClick = () => {
        onBlogDetails(result._id);
    };

    const toggleTags = (e) => {
        e.stopPropagation();
        setShowAllTags(prev => !prev);
    };

    // Function to get relevance indicator color
    const getRelevanceColor = (score) => {
        if (score >= 50) return 'bg-green-500'; // High relevance
        if (score >= 30) return 'bg-green-400'; // Medium-high relevance
        if (score >= 20) return 'bg-green-300'; // Medium relevance
        return 'bg-green-200'; // Lower relevance
    };

    // Function to highlight matching text
    const highlightText = (text, searchTerms) => {
        if (!searchTerms) return text;
        const terms = searchTerms.toLowerCase().split(' ');
        let highlightedText = text;
        terms.forEach(term => {
            if (term.length > 0) {
                const regex = new RegExp(`(${term})`, 'gi');
                highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 rounded">$1</mark>');
            }
        });
        return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
    };

    return (
        <div 
            className={`relative border p-4 rounded shadow hover:shadow-lg transition duration-300 cursor-pointer ${
                result.matchDetails?.exactPhraseMatch ? 'bg-green-50' : 'bg-white'
            }`}
            onClick={handleCardClick}
        >
            {/* Relevance Score Indicator */}
            <div className="absolute top-0 right-0 mt-2 mr-2 flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${getRelevanceColor(result.relevanceScore)}`}></div>
                <span className="text-xs text-gray-500">
                    {result.relevanceScore.toFixed(1)}
                </span>
            </div>

            {/* Image */}
            <div className="relative">
                <img 
                    src={result.imageUrl} 
                    alt={result.title} 
                    className="w-full h-40 object-cover rounded-lg shadow-sm" 
                />
                {result.matchDetails?.exactPhraseMatch && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Best Match
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="mt-4">
                <h2 className="text-xl font-bold mb-2 text-green-800">
                    {highlightText(result.title, searchQuery)}
                </h2>

                <div className="flex items-center gap-2 mb-2">
                    <FaUser className="text-green-600" />
                    <button 
                        onClick={(e) => handleAuthorProfile(e, result)}
                        className="text-green-600 hover:underline"
                    >
                        {highlightText(result.author, searchQuery)}
                    </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <FaFolder className="text-green-600" />
                    <span className="text-green-600 italic">
                        {highlightText(result.category, searchQuery)}
                    </span>
                </div>

                {/* Match Details */}
                {result.matchDetails && (
                    <div className="mb-3 text-sm">
                        <div className="flex flex-wrap gap-2">
                            {result.matchDetails.matchesAllWords && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                    Matches All Words
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    <FaTag className="text-green-600 mt-1" />
                    {result.tags.slice(0, showAllTags ? result.tags.length : 3).map((tag, tagIndex) => (
                        <button
                            key={tagIndex}
                            onClick={(e) => handleTags(e, tag)}
                            className="bg-green-100 hover:bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm transition duration-200"
                        >
                            {highlightText(tag, searchQuery)}
                        </button>
                    ))}
                    {result.tags.length > 3 && (
                        <button 
                            onClick={toggleTags}
                            className="text-green-600 text-sm hover:underline"
                        >
                            {showAllTags ? 'Show Less' : `+${result.tags.length - 3} more`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultCard;
