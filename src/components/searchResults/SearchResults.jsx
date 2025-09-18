import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { searchResults } from '../../../utils/searchResultsApis/searchResultsApis';
import IntroSection from '../BlogSearchResultsComponents/IntroSection/IntroSection';
import SearchResultCard from '../BlogSearchResultsComponents/SearchResultCard/SearchResultCard';
import { blogsDetails } from '../../../utils/apiRoutes';
import { FaSearch, FaArrowRight, FaFilter, FaSortAmountDown, FaTimes, FaInfoCircle } from 'react-icons/fa';

function SearchResults() {
    const location = useLocation();
    const searchData = location.state?.searchData;
    const [searchResultsFromDataBase, setSearchResultsFromDataBase] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchMetadata, setSearchMetadata] = useState(null);
    const [filters, setFilters] = useState({
        category: 'all',
        author: 'all',
        sortBy: 'relevance',
        minScore: 0
    });
    const [availableFilters, setAvailableFilters] = useState({
        categories: new Set(),
        authors: new Set(),
        scoreRanges: []
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.post(`${searchResults}`, {
                    searchData: searchData,
                });
                if (response.data.response) {
                    const results = response.data.response;
                    setSearchResultsFromDataBase(results);
                    setSearchMetadata(response.data.searchMetadata);
                    
                    // Extract available filters
                    const categories = new Set(results.map(result => result.category));
                    const authors = new Set(results.map(result => result.author));
                    
                    // Calculate score ranges
                    const scores = results.map(r => r.relevanceScore);
                    const maxScore = Math.max(...scores);
                    const scoreRanges = [
                        { label: 'All', value: 0 },
                        { label: 'Good Matches', value: maxScore * 0.3 },
                        { label: 'Better Matches', value: maxScore * 0.5 },
                        { label: 'Best Matches', value: maxScore * 0.7 }
                    ];

                    setAvailableFilters({ categories, authors, scoreRanges });
                    
                    // Initial filtering
                    applyFilters(results, filters);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch search results. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, [searchData]);

    useEffect(() => {
        const fetchUserFromLocal = async () => {
            try {
                const userDetails = await JSON.parse(localStorage.getItem("blog-user"));
                if (!userDetails) {
                    navigate("/");
                } else {
                    setCurrentUser(userDetails);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserFromLocal();
    }, [navigate]);

    const applyFilters = (results, currentFilters) => {
        let filtered = [...results];

        // Apply minimum score filter
        if (currentFilters.minScore > 0) {
            filtered = filtered.filter(result => result.relevanceScore >= currentFilters.minScore);
        }

        // Apply category filter
        if (currentFilters.category !== 'all') {
            filtered = filtered.filter(result => result.category === currentFilters.category);
        }

        // Apply author filter
        if (currentFilters.author !== 'all') {
            filtered = filtered.filter(result => result.author === currentFilters.author);
        }

        // Apply sorting
        switch (currentFilters.sortBy) {
            case 'relevance':
                filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
                break;
            case 'recent':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        setFilteredResults(filtered);
    };

    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        applyFilters(searchResultsFromDataBase, newFilters);
    };

    const handleBlogsDetails = async (blogId) => {
        try {
            const response = await axios.get(`${blogsDetails}/${blogId}`);
            const blogDetails = response.data.blog;
            navigate('/blogdetails', { state: { blogDetails } });
        } catch (err) {
            console.error(err);
        }
    };

    const clearFilters = () => {
        const defaultFilters = { category: 'all', author: 'all', sortBy: 'relevance', minScore: 0 };
        setFilters(defaultFilters);
        applyFilters(searchResultsFromDataBase, defaultFilters);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto mt-10 px-4 text-center">
                <p className="text-red-500">{error}</p>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-4 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-10 px-4">
            <IntroSection />
            
            <div className="mt-8">
                {/* Search Info */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-green-600">
                            🌱 Search Results for "{searchData}"
                        </h2>
                        <div className="text-gray-600">
                            <span className="font-semibold">{filteredResults.length}</span> results found
                        </div>
                    </div>
                    {searchMetadata && (
                        <div className="mt-2 text-sm text-gray-500 flex items-center">
                            <FaInfoCircle className="mr-2" />
                            Showing results sorted by relevance score (max score: {searchMetadata.topScore.toFixed(1)})
                        </div>
                    )}
                </div>
                
                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex flex-wrap gap-4 items-center">
                        <select
                            value={filters.minScore}
                            onChange={(e) => handleFilterChange('minScore', parseFloat(e.target.value))}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            {availableFilters.scoreRanges.map(range => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Categories</option>
                            {[...availableFilters.categories].map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>

                        <select
                            value={filters.author}
                            onChange={(e) => handleFilterChange('author', e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">All Authors</option>
                            {[...availableFilters.authors].map(author => (
                                <option key={author} value={author}>{author}</option>
                            ))}
                        </select>

                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="relevance">Sort by Relevance</option>
                            <option value="recent">Sort by Recent</option>
                        </select>

                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
                        >
                            <FaTimes className="text-gray-600" />
                            <span>Clear Filters</span>
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result) => (
                            <SearchResultCard
                                key={result._id}
                                result={result}
                                currentUser={currentUser}
                                onBlogDetails={handleBlogsDetails}
                                searchQuery={searchData}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p className="text-lg text-gray-600 mb-4">
                                No results found! 🌿 Please try a different search or adjust your filters. 🌼
                            </p>
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-green-500 hover:bg-green-700 text-white py-2 px-6 rounded-full shadow-md transition duration-200"
                            >
                                Return to Home
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
