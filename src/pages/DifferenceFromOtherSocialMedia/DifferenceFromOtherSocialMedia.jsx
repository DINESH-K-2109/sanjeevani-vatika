import React from 'react';
import { FaRegThumbsUp, FaComments, FaShieldAlt, FaUsers } from 'react-icons/fa';

export default function DifferenceFromOtherSocialMedia() {
    return (
        <div className="bg-gradient-to-br from-green-50 to-white py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-green-700 tracking-wide">
                    🍀 Why LibertyPost Stands Out! 🌟
                </h1>
                <p className="text-lg text-center mb-10 text-gray-700 max-w-2xl mx-auto">
                    LibertyPost is not just another social media platform. We’re a 🌸 community garden 🌸 where every thought blossoms and every voice is nurtured! 🗣️💬✨
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition duration-300">
                        <FaRegThumbsUp size={50} className="text-blue-500 mb-4" />
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Freedom to Express! ✊</h2>
                        <p className="text-gray-600 text-center">
                            🌿 Celebrate every thought 🌿 — share freely without fear. Your voice matters here.
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition duration-300">
                        <FaComments size={50} className="text-green-600 mb-4" />
                        <h2 className="text-xl font-semibold text-green-700 mb-2">No Censorship! 🚫</h2>
                        <p className="text-gray-600 text-center">
                            💬 Speak openly 💬 — constructive vibes only, no silencing here!
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition duration-300">
                        <FaShieldAlt size={50} className="text-red-500 mb-4" />
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Safe Community! 🔒</h2>
                        <p className="text-gray-600 text-center">
                            🛡️ Feel protected 🛡️ — we moderate the weeds, so your ideas bloom safely.
                        </p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-xl border border-green-100 hover:shadow-2xl transition duration-300">
                        <FaUsers size={50} className="text-purple-600 mb-4" />
                        <h2 className="text-xl font-semibold text-green-700 mb-2">Connect & Collaborate! 🤝</h2>
                        <p className="text-gray-600 text-center">
                            🌈 Grow together 🌈 — build connections and spark creativity with kindred spirits!
                        </p>
                    </div>
                </div>
                <p className="mt-12 text-center text-green-800 text-lg font-medium">
                    🌻 Embrace the freedom of expression & join the platform where your voice blossoms! 🚀✨
                </p>
            </div>
        </div>
    );
}
