import React from 'react';

function ChatRoomLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-green-50">
            <div className="flex-grow overflow-auto p-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-100">
                {/* Chat messages will go here */}
                {children}
            </div>
            {/* Footer / Input area will be included below and can be styled as needed */}
        </div>
    );
}

export default ChatRoomLayout;
