import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaSearch, FaHeart, FaComment, FaHome, FaPlus, FaBell, FaCog } from "react-icons/fa";
import { GiPlantRoots, GiLeaf } from "react-icons/gi"; // Nature-related icons
import { MdNotificationsActive } from "react-icons/md"; // Notifications icon

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-green-50">
            <header className="fixed top-0 left-0 w-full bg-white z-50 border-b border-gray-200 py-2 px-4 md:px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <FaInstagram className="w-8 h-8 text-green-500" />
                    <span className="sr-only">Instagram</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search 🌿"
                            className="pl-10 pr-4 py-2 rounded-full bg-green-100 text-green-700 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-green-100">
                            <FaHeart className="w-6 h-6 text-red-500" />
                            <span className="sr-only">Notifications</span>
                        </button>
                        <button className="p-2 rounded-full hover:bg-green-100">
                            <FaComment className="w-6 h-6 text-blue-500" />
                            <span className="sr-only">Messages</span>
                        </button>
                        <div className="w-8 h-8 border rounded-full overflow-hidden">
                            <img
                                src="/placeholder-user.jpg"
                                alt="@shadcn"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 pt-20 pb-24 md:pb-0">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6">
                    <div className="col-span-2 grid gap-4 md:gap-6">
                        {/* Main content will go here */}
                    </div>
                    <aside className="hidden md:block">
                        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 border rounded-full overflow-hidden">
                                        <img
                                            src="/placeholder-user.jpg"
                                            alt="@shadcn"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-medium text-green-600">Acme Inc 🌱</div>
                                        <div className="text-gray-500 text-sm">@acmeinc</div>
                                    </div>
                                </div>
                                <button className="p-2 rounded-full hover:bg-green-100">
                                    <FaCog className="w-4 h-4 text-gray-500" />
                                    <span className="sr-only">Settings</span>
                                </button>
                            </div>
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-medium text-green-600">Suggested 🌿</div>
                                    <Link to="#" className="text-sm text-blue-500">See all</Link>
                                </div>
                                <div className="mt-2 space-y-2">
                                    {/* Suggested users list goes here */}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <footer className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 flex justify-between">
                <button className="p-2 rounded-full hover:bg-green-100">
                    <FaHome className="w-6 h-6 text-green-500" />
                    <span className="sr-only">Home</span>
                </button>
                <button className="p-2 rounded-full hover:bg-green-100">
                    <FaSearch className="w-6 h-6 text-green-500" />
                    <span className="sr-only">Search</span>
                </button>
                <button className="p-2 rounded-full hover:bg-green-100">
                    <FaPlus className="w-6 h-6 text-green-500" />
                    <span className="sr-only">Create Post</span>
                </button>
                <button className="p-2 rounded-full hover:bg-green-100">
                    <MdNotificationsActive className="w-6 h-6 text-red-500" />
                    <span className="sr-only">Notifications</span>
                </button>
                <div className="w-6 h-6 border rounded-full overflow-hidden">
                    <img
                        src="/placeholder-user.jpg"
                        alt="@shadcn"
                        className="w-full h-full object-cover"
                    />
                </div>
            </footer>
        </div>
    );
}
