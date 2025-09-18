import { useState } from 'react';
import "../index.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../../utils/apiRoutes';
import { FaLock, FaUser, FaInfoCircle, FaHandshake, FaFacebook, FaTwitter, FaGoogle, FaLeaf } from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFormData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${loginRoute}`, {
                username: username,
                password: password
            });

            if (response.data.status === false) {
                toast.error(`${response.data.message}`);
            } else {
                toast.success(`${response.data.message}`);
                const userDetailsString = JSON.stringify(response.data.userDetails);
                localStorage.setItem("blog-user", userDetailsString);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred. Please try again!");
        }
    }

    return (
        <>
            <section className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen flex flex-col items-center justify-center text-white">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                    <div className="p-6 space-y-4 md:space-y-6">
                        <h1 className="text-2xl font-bold leading-tight tracking-tight text-green-600 md:text-3xl text-center">
                            Welcome Back to LibertyPost! 🌱✨
                        </h1>
                        <div className="flex items-center justify-center mb-4">
                            <FaHandshake size={30} className="text-blue-600 mr-2" />
                            <p className="text-gray-600 text-center">
                                Join a community where your voice matters! 🌍💬 We provide a safe platform for you to express your thoughts freely. 🗣️
                            </p>
                        </div>
                        <div className="flex items-center justify-center mb-4">
                            <FaInfoCircle size={30} className="text-green-600 mr-2" />
                            <p className="text-gray-600 text-center">
                                Log in to discover diverse content, connect with like-minded individuals, and engage in meaningful discussions. 💚🌿
                            </p>
                        </div>

                        <form onSubmit={handleFormData} className="space-y-4 md:space-y-6">
                            {/* Username Section */}
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <div className="flex items-center border border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                    <FaUser className="text-blue-600 font-bold p-2" />
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="Enter your username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Section */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <div className="flex items-center border border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                    <FaLock className="text-blue-600 font-bold p-2" />
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 shadow-md hover:shadow-lg">
                                Login 🌿
                            </button>

                            <p className="text-sm font-light text-gray-500 text-center">
                                Don't have an account? 🌸
                                <Link to="/register" className="font-medium text-blue-600 hover:underline"> Register here 🌱</Link>
                            </p>
                        </form>

                        {/* Social Media Login Section */}
                        <div className="flex justify-center mt-4 space-x-4">
                            <button className="flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-shadow duration-300 hover:shadow-lg">
                                <FaFacebook className="text-blue-600 mr-2" />
                                Facebook 🌍
                            </button>
                            <button className="flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-shadow duration-300 hover:shadow-lg">
                                <FaGoogle className="text-red-600 mr-2" />
                                Google 🍃
                            </button>
                            <button className="flex items-center border border-gray-300 rounded-lg px-3 py-2 transition-shadow duration-300 hover:shadow-lg">
                                <FaTwitter className="text-blue-400 mr-2" />
                                Twitter 🐦
                            </button>
                        </div>

                        {/* Email Signup Section */}
                        <div className="flex items-center justify-center mt-4">
                            <MdAlternateEmail className="text-gray-400 mr-2" size={20} />
                            <span className="text-sm text-gray-500">Use your email to login 📧</span>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}

export default Login;
