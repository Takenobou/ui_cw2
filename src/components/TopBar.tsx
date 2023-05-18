import React, { useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { HiOutlinePlus } from 'react-icons/hi';
import taskData from '../data/taskdata.json';

interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    category: string;
    creationDate: string;
    dueDate: string;
    labels: string[];
    documents: string[];
    automation: string[];
    project: string;
    priority: string;
}


const TopBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<Task[]>([]);
    const [popupOpen, setPopupOpen] = useState(false);
    const [newItemValue, setNewItemValue] = useState('');
    const [newItemType, setNewItemType] = useState<'task' | 'project' | 'category'>('task');


    const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemValue(e.target.value);
    };

    const handleCreateNewItem = () => {
        console.log(`Creating new ${newItemType}: ${newItemValue}`);

        // Close the popup and reset the input value and item type.
        setPopupOpen(false);
        setNewItemValue('');
        setNewItemType('task');
    };


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        const filteredTasks = taskData.filter(task =>
            task.title.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setSearchResults(filteredTasks);
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
                        {searchValue && (
                            <div className="absolute left-0 mt-2 w-80 border border-gray-300 bg-white shadow-lg rounded-md">
                                {searchResults.map(task => (
                                    <div key={task.id} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                        {task.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center" onClick={() => setPopupOpen(true)}>
                    <HiOutlinePlus className="h-5 w-5 mr-2" />
                    New Item
                </button>
                {popupOpen && (
                    <div className="absolute right-0 top-14 w-64 border border-gray-300 bg-white shadow-lg rounded-md p-4">
                        <div className="flex justify-between mb-4">
                            <button onClick={() => setNewItemType('task')} className={`px-2 py-1 ${newItemType === 'task' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}>Task</button>
                            <button onClick={() => setNewItemType('project')} className={`px-2 py-1 ${newItemType === 'project' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}>Project</button>
                            <button onClick={() => setNewItemType('category')} className={`px-2 py-1 ${newItemType === 'category' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}>Category</button>
                        </div>
                        <input
                            type="text"
                            value={newItemValue}
                            onChange={handleNewItemChange}
                            className="mb-4 w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            placeholder="Enter name"
                        />
                        <button onClick={handleCreateNewItem} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Create {newItemType}</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
