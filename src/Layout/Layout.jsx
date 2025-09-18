import React from 'react';
import Footer from '../pages/Footer'; // Ensure you import the Footer component
import NavBar from '../pages/NavBar'; // Import your existing NavBar component

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Fixed Navigation */}
            <NavBar /> {/* Use your NavBar component */}

            {/* Dynamic Content Area */}
            <main className="flex-grow bg-gray-100 p-4">
                {children}
            </main>

            {/* Fixed Footer */}
            <Footer />
        </div>
    );
}

export default Layout;
