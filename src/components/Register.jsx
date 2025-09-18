import { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaRegHandshake } from 'react-icons/fa';
import { IoMdLeaf } from 'react-icons/io';
import { GiSpade } from 'react-icons/gi';

function Register() {
    const navigate = useNavigate();

    // State variables
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [conform_password, setconform_password] = useState("");

    const handleformdata = async (e) => {
        e.preventDefault();

        if (username.length === 0 || email.length === 0 || password.length === 0 || conform_password.length === 0) {
            toast.error("🌿 All fields are required!");
            return;
        } else if (username.length < 3) {
            toast.error("🌱 Username must be at least 3 characters");
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("🍃 Invalid email format");
        } else if (password.length < 8) {
            toast.error("🍂 Password must be at least 8 characters long");
        } else if (password !== conform_password) {
            toast.error("🌺 Passwords do not match");
        } else if (!/[A-Z]/.test(password)) {
            toast.error("🌸 Password must contain at least one uppercase letter");
        } else if (!/\d/.test(password)) {
            toast.error("🌻 Password must contain at least one digit");
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            toast.error("🌼 Password must contain at least one special character");
        } else {
            try {
                const response = await axios.post(`${registerRoute}`, {
                    username: username,
                    email: email,
                    password: password,
                });

                console.log(response.data);
                if (response.data.status === false) {
                    toast.error(`${response.data.message}`);
                } else if (response.data.status === true) {
                    navigate("/login");
                    toast.success(`🌿 Account created successfully! Welcome to LibertyPost!`);
                }
            } catch (err) {
                console.log(err);
                toast.error("🍃 An error occurred. Please try again!");
            }
        }

        console.log(username, email, password, conform_password);
    }

    return (
        <>
            <section className="bg-white min-h-screen">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                                🌿 Create an Account 🌱
                            </h1>
                            <div className="flex items-center justify-center mb-4">
                                <FaRegHandshake size={30} className="text-green-600 mr-2" />
                                <p className="text-gray-600 text-center">
                                    🌟 Join LibertyPost - a platform where your voice grows! 🌿 Share your thoughts, connect, and engage in meaningful discussions! 💬
                                </p>
                            </div>

                            <form onSubmit={handleformdata} className="space-y-4 md:space-y-6">
                                {/* Username Section */}
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">🌿 Enter your Username</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                        <FaUser className="text-green-600 p-2" />
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                                            placeholder="Enter your username 🌱"
                                            onChange={(e) => setusername(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Section */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">📧 Your Email</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                        <FaEnvelope className="text-green-600 p-2" />
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                                            placeholder="username@company.com 🌼"
                                            onChange={(e) => setemail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Section */}
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">🔒 Password</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                        <FaLock className="text-green-600 p-2" />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="•••••••• 🌻"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password Section */}
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">🔐 Confirm Password</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg">
                                        <FaLock className="text-green-600 p-2" />
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            id="confirm-password"
                                            placeholder="•••••••• 🍃"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                                            onChange={(e) => setconform_password(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 shadow-md hover:shadow-lg"
                                >
                                    🌿 Create an Account 🌸
                                </button>
                                <p className="text-sm font-light text-gray-500">
                                    🌿 Already have an account? 
                                    <Link className="font-medium text-green-600 hover:underline" to="/login"> Login 🌿</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    );
}

export default Register;
