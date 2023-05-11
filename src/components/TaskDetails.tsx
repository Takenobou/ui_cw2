import React, { useState } from 'react';
import { MdLabel, MdFileDownload, MdEdit} from 'react-icons/md';

interface Task {
    id: number;
    title: string;
    status: string;
    category: string;
    creationDate: string;
    dueDate: string;
    labels: string[];
    documents: string[];
    automation: string[];
    project: string;
}

interface TaskDetailsProps {
    task: Task;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.category);
    const formattedDueDate = new Date(task.dueDate).toLocaleDateString();

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        // Here you would typically make a call to update the task status in your database
    }

    const handlePriorityChange = (newPriority: string) => {
        setPriority(newPriority);
        // Here you would typically make a call to update the task priority in your database
    }

    return (
        <div className="flex-1">
            <h1 className="text-4xl font-bold mt-4 mb-8">{task.title}</h1>

            <div className="flex space-x-2 my-4 text-sm">
                <button className="flex items-center px-2 py-1 bg-blue-500 text-white rounded">
                    <MdEdit className="mr-1" /> Edit
                </button>
                <button className="px-2 py-1 bg-blue-500 text-white rounded">Assign</button>
                <div className="inline-flex">
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

            <h2 className="text-2xl font-semibold mt-8 mb-4">Details:</h2>
            <p>{task.project}</p>
            <div className="mb-4 text-sm text-gray-500 w-1/5">
                <div className="text-sm text-gray-500 grid grid-cols-2 gap-x-4">
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
        </div>
    );
}

export default TaskDetails;
