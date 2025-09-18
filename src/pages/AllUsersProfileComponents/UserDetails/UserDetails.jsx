import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaPhone, FaUser } from 'react-icons/fa';

const UserDetails = ({ userDetails, author }) => {
    return (
        <div className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-green-100">
            <h2 className="text-3xl font-bold mb-4 flex items-center text-green-700">
                <FaUser className="mr-3 text-green-500" />
                🌿 {userDetails.about}
            </h2>

            <p className="text-pink-600 mb-3 text-lg font-medium">
                🌸 Account Type: <span className="text-black">@{author}</span>
            </p>

            <div className="text-gray-700 text-md space-y-3 leading-relaxed">
                <p><FaBriefcase className="inline mr-2 text-emerald-600" />💼 <strong>Profession:</strong> {userDetails.profession}</p>
                <p><FaMapMarkerAlt className="inline mr-2 text-rose-600" />📍 <strong>Location:</strong> {userDetails.village}, {userDetails.district}, {userDetails.state}, {userDetails.country}</p>
                <p><FaPhone className="inline mr-2 text-blue-500" />📞 <strong>Phone:</strong> {userDetails.phoneNumber}</p>
                <p>📫 <strong>Pincode:</strong> {userDetails.pincode}</p>
            </div>
        </div>
    );
};

export default UserDetails;
