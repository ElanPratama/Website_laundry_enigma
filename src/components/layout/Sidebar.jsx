import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, handleLogout }) => (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>
        <ul className="mt-6 space-y-2">
            {['customers', 'products', 'transactions'].map((tab) => (
                <li 
                    key={tab} 
                    className={`p-4 hover:bg-gray-700 cursor-pointer ${activeTab === tab ? 'bg-gray-600' : ''}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </li>
            ))}
            <li 
                className="p-4 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                    if (handleLogout) handleLogout();
                }}
            >
                Logout
            </li>
        </ul>
    </div>
);

export default Sidebar;
