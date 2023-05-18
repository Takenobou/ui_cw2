import React, { useState, useEffect } from 'react';
import taskData from "../data/taskdata.json";

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
}

const Home: React.FC = () => {

    const [tasksData, setTasksData] = useState<Task[]>([]);

    useEffect(() => {
        setTasksData(taskData);
    }, []);

    const projectNames = [...new Set(tasksData.map(task => task.project))];

    // Helper function to format date strings
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }




    // Get tasks due soon (within next 7 days)
    const tasksDueSoon = tasksData.filter(task => {
        const dueDate = new Date(task.dueDate);
        const now = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(now.getDate() + 7);
        return now <= dueDate && dueDate <= oneWeekFromNow;
    });

    return (
        <div className="flex flex-col min-h-full">
            <div className="flex-1 flex overflow-auto pb-4">
                <div className="w-1/2 border-r border-gray-200 pr-8">
                    <h2 className="text-xl font-bold mb-4">Tasks Due Soon</h2>
                    {tasksDueSoon.map(task => (
                        <div key={task.id} className="mb-4 p-4 border rounded shadow">
                            <h3 className="font-bold text-lg mb-2">{task.title}</h3>
                            <p className="text-gray-500">{formatDate(task.dueDate)}</p>
                        </div>
                    ))}
                </div>
                <div className="w-1/2 ml-8">
                    <h2 className="text-xl font-bold mb-4">Projects</h2>
                    {projectNames.map((project, index) => (
                        <div key={index} className="mb-4 p-4 border rounded shadow">
                            <h3 className="font-bold text-lg">{project}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-4">
                <h2 className="text-xl font-bold mb-4">Statistics</h2>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded shadow">
                        <p className="text-sm text-gray-500">Total Tasks</p>
                        <p className="text-lg font-bold">{tasksData.length}</p>
                    </div>
                    <div className="p-4 border rounded shadow">
                        <p className="text-sm text-gray-500">TasksDue Soon</p>
                        <p className="text-lg font-bold">{tasksDueSoon.length}</p>
                    </div>
                    <div className="p-4 border rounded shadow">
                        <p className="text-sm text-gray-500">Total Projects</p>
                        <p className="text-lg font-bold">{projectNames.length}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;