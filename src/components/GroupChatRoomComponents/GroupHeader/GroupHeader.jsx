import React from 'react';

const GroupHeader = ({ group, navigate }) => {
    const handleGroupInformation = () => {
        navigate("/groupinformation", { state: { group } });
    };

    return (
        <div 
            onClick={handleGroupInformation} 
            className="bg-green-700 text-white p-4 flex items-center cursor-pointer rounded-lg shadow-md hover:bg-green-800 transition duration-300"
        >
            <img 
                src={group.profileLink} 
                alt="Group Profile" 
                className="h-12 w-12 rounded-full mr-4 border-2 border-green-500 shadow-md" 
            />
            <div className="flex flex-col">
                <h1 className="text-3xl font-bold flex items-center text-green-100">
                    {group.groupName}
                </h1>
                <p className="text-xs ml-2 text-green-200">Tap here for group info 🌿</p>
            </div>
        </div>
    );
};

export default GroupHeader;
