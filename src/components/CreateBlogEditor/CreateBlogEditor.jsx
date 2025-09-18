import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import { FaPen, FaRegFileAlt, FaTags } from 'react-icons/fa'; // Importing relevant icons
// import { GiPlantRoots, GiLeaf, GiFlowerPot } from 'react-icons/gi'; // Plant-related icons
import { ToastContainer, toast } from 'react-toastify';

const CreateBlogEditor = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');

    const config = {
        placeholder: "Start typing your post content... 🌿",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        toast.success('Your blog post has been created successfully! 🎉🌱'); // Notify user on submission
    };

    return (
        <div className="container mx-auto mt-8 p-6 bg-green-50 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-center text-green-600">🌿 Share Your Green Ideas! 🌱</h1>
            <p className="text-lg text-gray-600 text-center mb-6">
                Start planting the seeds of your creativity! 🌸 Whether it's an idea, a story, or an experience, your voice matters. Let's nurture it and share it with the world! 💚
            </p>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                        <FaPen className="mr-2 text-green-600" /> Post Title 🌿
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter post title 🌿"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                        <FaRegFileAlt className="mr-2 text-green-600" /> Post Content 🌱
                    </label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                        config={config}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700 flex items-center">
                        <FaTags className="mr-2 text-green-600" /> Post Category 🌸
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                        required
                    >
                        <option value="">Select a category 🌿</option>
                        <option value="category1">Herbal Remedies 🌿</option>
                        <option value="category2">Endangered Plants 🌍</option>
                        <option value="category3">Plant Care Tips 🌱</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        🌿 Create Post 🌱
                    </button>
                    <button
                        type="reset"
                        className="ml-4 bg-gray-300 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Reset 🌸
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CreateBlogEditor;
