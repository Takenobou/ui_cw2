import React, {useState, useEffect, useCallback} from 'react';
import { FaSortAlphaDown, FaSortAlphaDownAlt, FaCaretDown } from 'react-icons/fa';
import taskData from '../data/taskdata.json';
import TaskDetails from "../components/TaskDetails.tsx";

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

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [labels, setLabels] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        setTasks(taskData);

        const allLabels = new Set<string>();
        const allStatuses = new Set<string>();

        taskData.forEach(task => {
            task.labels.forEach(label => allLabels.add(label));
            allStatuses.add(task.status);
        });

        setLabels(Array.from(allLabels));
        setStatuses(Array.from(allStatuses));
    }, []);

    const selectTask = (task: Task) => {
        setSelectedTask(task);
    };

    const handleCategorySelect = (category: string, type: 'label' | 'status') => {
        const filteredTasks = taskData.filter(task => {
            if (type === 'label') {
                return task.labels.includes(category);
            } else {
                return task.status === category;
            }
        });

        setTasks(filteredTasks);
        setIsDropdownOpen(false);
    };

    const resetFilters = () => {
        setTasks(taskData);
        setIsDropdownOpen(false);
    };

    const calculateTaskAge = (date: string) => {
        const taskDate = new Date(date);
        const now = new Date();
        const differenceInDays = Math.floor((now.getTime() - taskDate.getTime()) / (1000 * 3600 * 24));
        return `${differenceInDays} day${differenceInDays !== 1 ? 's' : ''} ago`;
    };

    const handleSortClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortTasks = useCallback(() => {
        return [...tasks].sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tasks, sortOrder]);

    useEffect(() => {
        setTasks(sortTasks());
    }, [sortOrder, sortTasks, tasks]);

    useEffect(() => {
        resetFilters(); // Reset filters on initial load
    }, []);

    return (
        <div className="flex min-h-full">
            <div className="w-1/5 border-r border-gray-200 pr-8">
                <div className="flex justify-between items-center">
                    <div className={`relative bg-white shadow hover:shadow-lg transition-shadow p-2 mb-8 cursor-pointer ${isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg'}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="flex items-center space-x-2">
                            <FaCaretDown className={`text-xl ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                            <span>Categories</span>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute left-0 w-full bg-white rounded-b-lg shadow-lg mt-2 p-4">
                                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2 border-b border-gray-300 pb-2">Statuses</p>
                                {statuses.map(status => (
                                    <button
                                        key={status}
                                        className="w-full text-left py-2 hover:bg-gray-200 rounded-lg transition-colors mb-1"
                                        onClick={() => handleCategorySelect(status, 'status')}
                                    >
                                        {status}
                                    </button>
                                ))}

                                <p className="text-gray-500 text-sm uppercase tracking-wide mb-2 mt-4 border-b border-gray-300 pb-2">Labels</p>
                                {labels.map(label => (
                                    <button
                                        key={label}
                                        className="w-full text-left py-2 hover:bg-gray-200 rounded-lg transition-colors mb-1"
                                        onClick={() => handleCategorySelect(label, 'label')}
                                    >
                                        {label}
                                    </button>
                                ))}

                                <button
                                    className="w-full text-center text-white py-3 mt-6 mb-4 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </button>
                            </div>
                        )}
                    </div>
                    <div className={`relative bg-white shadow hover:shadow-lg transition-shadow p-2 mb-8 cursor-pointer rounded-lg`} onClick={handleSortClick}>
                        <div className="flex items-center space-x-2">
                            {sortOrder === 'asc' ? <FaSortAlphaDown className={`text-xl`} /> : <FaSortAlphaDownAlt className={`text-xl`} />}
                            <span>Sort</span>
                        </div>
                    </div>
                </div>
                <div>
                    {tasks.map(task => (
                        <button
                            key={task.id}
                            className={`w-full text-left p-4 mb-4 border rounded focus:outline-none shadow hover:shadow-lg transition-shadow duration-200 ease-in-out ${selectedTask && selectedTask.id === task.id ? 'border-blue-500' : ''}`}
                            onClick={() => selectTask(task)}
                        >
                            <h3 className="font-bold text-lg">{task.title}</h3>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm">{task.status}</span>
                                <span className="text-sm text-gray-500">{calculateTaskAge(task.creationDate)}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            {selectedTask ? (
                <div className="w-4/5 ml-8">
                    <TaskDetails task={selectedTask} />
                </div>
            ) : (
                <div className="w-4/5 ml-8 flex justify-center items-center">
                    <p className="text-lg text-gray-500">Please select a task from the list or create a new task.</p>
                </div>
            )}
        </div>
    );
};

export default Tasks;
