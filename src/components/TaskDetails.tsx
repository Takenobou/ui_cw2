import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MdLabel, MdFileDownload, MdEdit, MdSave, MdClose} from 'react-icons/md';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDropzone } from 'react-dropzone';
import {FaProjectDiagram} from "react-icons/fa";


interface Task {
    id: number;
    title: string;
    status: string;
    category: string;
    creationDate: string;
    dueDate: string;
    description: string;
    labels: string[];
    documents: string[];
    automation: string[];
    project: string;
    priority: string;
}

interface TaskDetailsProps {
    task: Task;
    projects: string[];
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, projects }) => {
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString();
    const [isEditMode, setIsEditMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleEditClick = useCallback(() => {
        setIsEditMode(prevMode => !prevMode);
    }, []);

    const handleSaveClick = useCallback(() => {
        setIsEditMode(prevMode => !prevMode);
    }, []);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        // Here you would typically make a call to update the task status in your database
    }

    const handlePriorityChange = (newPriority: string) => {
        setPriority(newPriority);
        // Here you would typically make a call to update the task priority in your database
    }


    const handleTitleChange = () => {
        // Here you would typically make a call to update the task title in your database
    }


    useEffect(() => {
        const clickListener = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', clickListener);
        return () => {
            document.removeEventListener('mousedown', clickListener);
        };
    }, []);

    // react-dropzone setup
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
    });


    return (
        <div className="container mx-auto">
            <div className="flex flex-col">
                <div>
                    <h1 className="text-4xl font-bold outline-amber-600 mt-4 mb-8">
                        {isEditMode ? (
                            <textarea
                                className="shadow appearance-none border rounded w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                style={{lineHeight: '4rem'}}
                                rows={1}
                                value={task.title}
                                onChange={() => handleTitleChange()}
                            />
                        ) : (
                            task.title
                        )}
                    </h1>
                    <div className="flex space-x-2 my-4 text-sm">
                        {!isEditMode ? (
                            <button className="flex items-center px-2 py-1 bg-blue-500 text-white rounded" onClick={handleEditClick}>
                                <MdEdit className="mr-1" /> Edit
                            </button>
                        ) : (
                            <button className="flex items-center px-2 py-1 bg-red-500 text-white rounded" onClick={handleEditClick}>
                                <MdClose className="mr-1" /> Cancel
                            </button>
                        )}
                        {isEditMode && (
                            <button className="flex items-center px-2 py-1 bg-green-500 text-white rounded" onClick={handleSaveClick}>
                                <MdSave className="mr-1" /> Save
                            </button>
                        )}
                        <button className="relative flex items-center px-2 py-1 bg-blue-500 text-white rounded" onClick={() => setDropdownOpen(prev => !prev)}>
                            <FaProjectDiagram className="mr-1" /> Assign
                            {dropdownOpen && (
                                <div ref={dropdownRef} className="absolute left-0 mt-2 w-48 rounded-md text-black shadow-lg bg-white z-50">
                                    {projects.map(project => (
                                        <div
                                            key={project}
                                            className={`cursor-pointer px-4 py-2 text-sm hover:bg-blue-500 hover:text-white ${project === selectedProject ? 'bg-blue-500 text-white' : ''}`}
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            {project}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </button>                <div className="inline-flex">
                    {['To do', 'In Progress', 'Done'].map((s, index) => (
                        <button
                            className={`flex items-center px-2 py-1 ${index === 0 ? 'rounded-l-md' : index === 2 ? 'rounded-r-md' : 'rounded-none'} ${s === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => handleStatusChange(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="inline-flex">
                    {['Low', 'Normal', 'High'].map((p, index) => (
                        <button
                            className={`flex items-center px-2 py-1 ${index === 0 ? 'rounded-l-md' : index === 2 ? 'rounded-r-md' : 'rounded-none'} ${p === priority ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => handlePriorityChange(p)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <button className="flex items-center px-2 py-1 bg-blue-500 text-white rounded">
                    <MdLabel className="mr-1" /> Add Label
                </button>
                <button className="flex items-center px-2 py-1 bg-blue-500 text-white rounded">
                    <MdFileDownload className="mr-1" /> Export
                </button>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="w-1/2 pr-4">
                        <h2 className="text-2xl font-semibold mt-8 mb-4">Details:</h2>
            <div className="mb-4 text-sm text-gray-500">
                <div className="text-sm text-gray-500 grid grid-cols-2 gap-x-4 w-1/2">
                    <p className="font-medium">Project:</p>
                    <p>{task.project}</p>

                    <p className="font-medium">Category:</p>
                    <p>{task.category}</p>

                    <p className="font-medium">Status:</p>
                    <p>{status}</p>

                    <p className="font-medium">Priority:</p>
                    <p>{priority}</p>

                    <p className="font-medium">Labels:</p>
                    <p>{task.labels.join(", ")}</p>

                    <p className="font-medium">Task Due Date:</p>
                    <p>{formattedDueDate}</p>
                </div>
            </div>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">Description:</h2>
                        {isEditMode ? (
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={task.description}
                            />
                        ) : (
                            <p>{task.description}</p>
                        )}
                    </div>
                    <div className="w-1/3 pl-4">
                        <DateRange
                            className="custom-date-range-picker"
                            ranges={[
                                {
                                    startDate: new Date(task.creationDate),
                                    endDate: new Date(task.dueDate),
                                    key: 'selection'
                                }
                            ]}
                            moveRangeOnFirstSelection={false}
                            direction="horizontal"
                            editableDateInputs={false}
                        />
                    </div>
                </div>
            </div>
            <div className="w-1/2">
                <h2 className="text-2xl font-semibold mt-8 mb-4">Attach:</h2>
                <div {...getRootProps()} className={` ${isDragActive ? 'border-blue-500' : 'border-gray-500'} rounded p-4 mt-4 cursor-pointer bg-gray-300 hover:bg-gray-400 transition-colors`}>
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p className="text-center">Drop files here</p> :
                            <p className="text-center">Drop files here, or click to attach files</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default TaskDetails;
