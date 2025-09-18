import React from "react";
import { FaComments, FaPenFancy, FaShieldAlt, FaUsers } from "react-icons/fa";

function AboutPageForPlantDiscoveryHub() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=1170')",
      }}
    >
      {/* Full-width transparent background */}
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg max-w-5xl w-full mx-4">
        <h1 className="text-5xl font-bold mb-4 text-green-800 text-center">
          Welcome to
          <ul>
            
              Sanjeevani vatika
            
          </ul>
          🌿
        </h1>
        <p className="text-lg mb-6 text-green-900 text-center">
          Discover the power of nature with our AI-based virtual herbal garden.
          Whether you're a curious learner, a botanist, or a health seeker —
          we've got something natural and powerful for you! 🌱✨
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center p-4 bg-green-100 bg-opacity-40 rounded-lg shadow-md">
            <FaComments size={50} className="text-green-600 mb-2" />
            <h2 className="text-xl font-semibold text-green-800">
              AI-Powered Herbal Chat 💬
            </h2>
            <p className="text-green-700">
              Interact with botanists and health experts. Ask questions, share
              remedies, and grow with the green community.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-green-100 bg-opacity-40 rounded-lg shadow-md">
            <FaPenFancy size={50} className="text-emerald-600 mb-2" />
            <h2 className="text-xl font-semibold text-green-800">
              Share Herbal Knowledge ✍️
            </h2>
            <p className="text-green-700">
              Contribute your knowledge about local herbs or traditional
              remedies. Let the world learn from your roots!
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-green-100 bg-opacity-40 rounded-lg shadow-md">
            <FaShieldAlt size={50} className="text-lime-600 mb-2" />
            <h2 className="text-xl font-semibold text-green-800">
              Safe & Verified Remedies 🔒
            </h2>
            <p className="text-green-700">
              AI suggestions are validated by experts to ensure you're getting
              safe, age-appropriate, and effective herbal treatments.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-green-100 bg-opacity-40 rounded-lg shadow-md">
            <FaUsers size={50} className="text-teal-600 mb-2" />
            <h2 className="text-xl font-semibold text-green-800">
              Connect & Collaborate 👥
            </h2>
            <p className="text-green-700">
              Meet fellow enthusiasts, botanists, and healers. Exchange ideas,
              conserve endangered plants, and grow together!
            </p>
          </div>
        </div>

        <p className="mt-8 text-green-900 text-center">
          Let’s heal naturally, connect deeply, and grow green together with
          PlantDiscoveryHub 🍀💚
        </p>
      </div>
    </div>
  );
}

export default AboutPageForPlantDiscoveryHub;
