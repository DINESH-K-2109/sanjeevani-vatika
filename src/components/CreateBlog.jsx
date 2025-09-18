import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { addBlogRoutes } from '../../utils/apiRoutes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Introduction from './CreateBlogComponents/Introduction/Introduction';
import { FaImage, FaUser, FaCalendarAlt, FaTags, FaPencilAlt, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

function CreateBlog() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [imageUrl, setImageURL] = useState('');
    const [featured, setFeatured] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const editor = useRef(null);

    // Check user registration
    useEffect(() => {
        const fetchUserFromLocal = async () => {
            const userDetails = await localStorage.getItem("blog-user");
            if (!userDetails) {
                navigate("/register");
            }
        };
        fetchUserFromLocal();
    }, []);

    const validateForm = () => {
        if (!title.trim()) {
            toast.error('Please enter a title');
            return false;
        }
        if (!author.trim()) {
            toast.error('Please enter an author name');
            return false;
        }
        if (!date) {
            toast.error('Please select a date');
            return false;
        }
        if (!category) {
            toast.error('Please select a category');
            return false;
        }
        if (!content.trim()) {
            toast.error('Please enter some content');
            return false;
        }
        if (tags.length === 0) {
            toast.error('Please select at least one tag');
            return false;
        }
        if (!imageUrl.trim()) {
            toast.error('Please enter an image URL');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const userDetails = await JSON.parse(localStorage.getItem('blog-user'));
            if (!userDetails) {
                navigate("/register");
                return;
            }

            // Construct the URL correctly
            const url = `${addBlogRoutes}/${userDetails._id}`;
            
            const blogData = {
                id: userDetails._id,
                title: title.trim(),
                author: author.trim(),
                date,
                category,
                content: content.trim(),
                tags,
                imageUrl: imageUrl.trim(),
                featured
            };

            console.log('Submitting blog data:', blogData);
            console.log('To URL:', url);

            const response = await axios.post(url, blogData);
            console.log('Server response:', response.data);

            if (response.data.status) {
                toast.success(`${response.data.message} 🌱`);
                setTimeout(() => {
                    navigate("/myblogs");
                }, 2000);
            } else {
                toast.error(`${response.data.message} ❌`);
            }
        } catch (err) {
            console.error('Error creating blog:', err);
            const errorMessage = err.response?.data?.message || 'Error creating blog post 😞';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTagChange = (tag) => {
        const updatedTags = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
        setTags(updatedTags);
    };

    const tagOptions = [
        'Technology',
        'Sports',
        'Current Affairs',
        'World Wide',
        'Plants',
        'Animals',
        'Health',
        'Food',
        'Travel',
        'Fashion',
        'Science',
    ];

    return (
        <>
            <Introduction />
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                {/* Left and Right Sections */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {/* Left Section: What to Write */}
                    <div className="flex-1 bg-green-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-green-600">📝 What to Write</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Share your unique experiences and insights! 🌟</li>
                            <li>Engage with readers through questions and discussions! 💬</li>
                            <li>Use high-quality images to enhance your content! 🖼️</li>
                            <li>Be clear and concise in your writing! ✍️</li>
                        </ul>
                    </div>

                    {/* Right Section: What Not to Write */}
                    <div className="flex-1 bg-red-50 p-4 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2 text-red-600">🚫 What Not to Write</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Avoid plagiarism or copying others' work! 🚫</li>
                            <li>Do not share false information or rumors! ❌</li>
                            <li>Refrain from using offensive or discriminatory language! 🚫</li>
                            <li>Keep your content free of spammy links! 🔗</li>
                        </ul>
                    </div>
                </div>

                {/* Center Section: Blog Form */}
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">📚 Create a New Blog</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaPencilAlt className="mr-2 text-green-600" /> Title
                            </label>
                            <input 
                                type="text" 
                                id="title" 
                                value={title}
                                placeholder="Enter blog title" 
                                onChange={(e) => setTitle(e.target.value)} 
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 transition duration-300 shadow-md" 
                            />
                        </div>

                        {/* Author Input */}
                        <div>
                            <label htmlFor="author" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaUser className="mr-2 text-green-600" /> Author
                            </label>
                            <input 
                                type="text" 
                                id="author" 
                                value={author}
                                placeholder="Enter author name" 
                                onChange={(e) => setAuthor(e.target.value)} 
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 transition duration-300 shadow-md" 
                            />
                        </div>

                        {/* Date Input */}
                        <div>
                            <label htmlFor="date" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaCalendarAlt className="mr-2 text-green-600" /> Date
                            </label>
                            <input 
                                type="date" 
                                id="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)} 
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 transition duration-300 shadow-md" 
                            />
                        </div>

                        {/* Category Select */}
                        <div>
                            <label htmlFor="category" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaTags className="mr-2 text-green-600" /> Category
                            </label>
                            <select 
                                id="category" 
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} 
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 transition duration-300 shadow-md"
                            >
                                <option value="">Select one</option>
                                {tagOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <label htmlFor="content" className="block text-gray-700 font-bold mb-1">Content</label>
                            <JoditEditor 
                                ref={editor} 
                                value={content} 
                                onChange={newContent => setContent(newContent)} 
                            />
                        </div>

                        {/* Tags Selection */}
                        <div>
                            <label className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaTags className="mr-2 text-green-600" /> Tags
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {tagOptions.map((tag) => (
                                    <label key={tag} className="inline-flex items-center cursor-pointer bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200">
                                        <input 
                                            type="checkbox" 
                                            checked={tags.includes(tag)} 
                                            onChange={() => handleTagChange(tag)} 
                                            className="form-checkbox h-4 w-4 text-green-500 rounded" 
                                        />
                                        <span className="ml-2 text-sm">{tag}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Image URL Input */}
                        <div>
                            <label htmlFor="imageURL" className="block text-gray-700 font-bold mb-1 flex items-center">
                                <FaImage className="mr-2 text-green-600" /> Image URL
                            </label>
                            <input 
                                type="text" 
                                id="imageURL" 
                                value={imageUrl}
                                placeholder="🖼️ Enter image URL" 
                                onChange={(e) => setImageURL(e.target.value)} 
                                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-500 transition duration-300 shadow-md" 
                            />
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="featured" 
                                checked={featured} 
                                onChange={() => setFeatured(!featured)} 
                                className="form-checkbox h-5 w-5 text-green-500 rounded" 
                            />
                            <label htmlFor="featured" className="ml-2 text-gray-700 font-bold">🌟 Featured</label>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Creating Blog...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle className="mr-2" /> Submit Blog
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default CreateBlog;
