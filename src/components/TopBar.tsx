import React, { useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';

const TopBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-14 bg-white shadow-md px-4 flex items-center justify-between">
            <h1 className="absolute left-4 text-gray-800">Task Manager</h1>
            <div className="ml-64 flex justify-between w-full pr-4">
                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-gray-800">
                        <IoArrowBack className="h-5 w-5" />
                    </button>
                    <button className="text-gray-500 hover:text-gray-800">
                        <IoArrowForward className="h-5 w-5" />
                    </button>
                    <div className="relative">
                        <button className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 h-full">
                            <FiSearch className="h-5 w-5" />
                        </button>
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="pl-10 w-80 h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Search"
                        />
                    </div>
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                    <HiOutlinePlus className="h-5 w-5 mr-2" />
                    New Item
                </button>
            </div>
        </div>
    );
};

export default TopBar;
