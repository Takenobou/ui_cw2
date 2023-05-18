import React from 'react';

interface Task {
    id: number;
    title: string;
    status: string;
    project: string;
    labels: string[];
}

interface ProjectViewProps {
    project: string;
    tasksData: Task[];
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, tasksData }) => {
    const statusCategories = ['To do', 'In Progress', 'Done'];
    const statusDotColors = ['bg-red-600', 'bg-yellow-600', 'bg-green-600'];

    const projectTasks = tasksData.filter(task => task.project === project);

    return (
        <div className="h-full p-8 flex flex-col">
            <div className="flex-grow grid grid-cols-3 gap-8">
                {statusCategories.map((status, index) => (
                    <div key={index} className="p-4 bg-gray-200 rounded-xl shadow-lg flex flex-col">
                        <h2 className="text-xl font-semibold mb-8 flex items-center">
                            <span className={`mr-2 rounded-full h-4 w-4 inline-block ${statusDotColors[index]}`}></span>
                            {status}
                        </h2>
                        {projectTasks
                            .filter(task => task.status === status)
                            .map(task => (
                                <button key={task.id} className="w-full text-left p-6 mb-6 border-gray-300 rounded-xl focus:outline-none shadow hover:shadow-lg transition-shadow duration-200 ease-in-out bg-white text-gray-700">
                                    <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
                                    <div className="flex items-center space-x-2 mt-2">
                                        {task.labels.map((label, index) => (
                                            <span key={index} className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">{label}</span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        {projectTasks.filter(task => task.status === status).length === 0 &&
                            <div className="text-lg text-gray-500 mt-4 text-center">No tasks to display.</div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectView;
