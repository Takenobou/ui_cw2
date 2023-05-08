import React from 'react';

const SideBar: React.FC = () => {
    return (
        <div className="fixed top-14 left-0 w-64 h-full bg-white shadow-md p-4">
            <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                        Tasks
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-700 hover:text-gray-900">
                        Settings
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;
