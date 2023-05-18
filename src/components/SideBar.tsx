import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaHome, FaProjectDiagram, FaTasks, FaCalendarAlt, FaCaretDown } from 'react-icons/fa';
import userData from '../data/userdata.json';
import {useNavigate} from "react-router-dom";

const SideBar: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return (
        <div className="fixed left-0 w-64 h-full bg-gray-100 shadow-md p-4 top-14">
            <div className={`relative bg-white shadow hover:shadow-lg transition-shadow p-3 mb-8 cursor-pointer ${isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg'}`} onClick={toggleDropdown} ref={ref}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <FaUser className="text-xl text-gray-700"/>
                        <h2 className="text-xl font-semibold text-gray-700">{userData.name}</h2>
                    </div>
                    <FaCaretDown className={`text-xl text-gray-700 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </div>
                {isDropdownOpen && (
                    <ul className="absolute left-0 w-full space-y-2 bg-white rounded-b-lg shadow-lg mt-2 p-2">
                        <li>
                            <button className="w-full text-left py-2 hover:bg-gray-100 rounded-lg transition-colors">
                                Account settings
                            </button>
                        </li>
                        <li>
                            <button className="w-full text-left py-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Update profile
                            </button>
                        </li>
                        <li>
                            <button className="w-full text-left py-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    onClick={() => navigate("/signin")}>
                                Log out
                            </button>
                        </li>
                    </ul>
                )}
            </div>
            <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                    <button className="w-full py-2 px-4 flex items-center text-gray-700 hover:bg-gray-200 rounded-lg focus:outline-none"
                            onClick={() => navigate('/')}
                    >
                        <FaHome className="text-xl mr-2" />
                        <span className="font-medium">Home</span>
                    </button>
                </li>
                <li className="flex items-center space-x-2">
                    <button
                        className="w-full py-2 px-4 flex items-center text-gray-700 hover:bg-gray-200 rounded-lg focus:outline-none"
                        onClick={() => navigate('/tasks')}
                    >
                        <FaTasks className="text-xl mr-2" />
                        <span className="font-medium">Tasks</span>
                    </button>
                </li>
                <li className="flex items-center space-x-2">
                    <button className="w-full py-2 px-4 flex items-center text-gray-700 hover:bg-gray-200 rounded-lg focus:outline-none"
                            onClick={() => navigate('/projects')}>
                        <FaProjectDiagram className="text-xl mr-2" />
                        <span className="font-medium">Projects</span>
                    </button>
                </li>
                <li className="flex items-center space-x-2">
                    <button className="w-full py-2 px-4 flex items-center text-gray-700 hover:bg-gray-200 rounded-lg focus:outline-none"
                            onClick={() => navigate('/calendar')}>
                        <FaCalendarAlt className="text-xl mr-2" />
                        <span className="font-medium">Calendar</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;