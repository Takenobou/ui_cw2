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
        <div className="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-800">
                    <IoArrowBack className="h-5 w-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-800">
                    <IoArrowForward className="h-5 w-5" />
                </button>
            </div>
            <div className="w-full max-w-md relative">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    placeholder="Search"
                />
                <button className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 h-full">
                    <FiSearch className="h-5 w-5" />
                </button>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                <HiOutlinePlus className="h-5 w-5 mr-2" />
                New Item
            </button>
        </div>
    );
};

export default TopBar;
