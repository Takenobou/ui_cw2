import React from 'react';

interface Task {
    id: number;
    title: string;
    status: string;
    project: string;
}

interface ProjectViewProps {
    project: string;
    tasksData: Task[];
}

const ProjectView: React.FC<ProjectViewProps> = ({ project, tasksData }) => {
    const statusCategories = ['To do', 'In Progress', 'Done'];

    // Filter tasks of the selected project
    const projectTasks = tasksData.filter(task => task.project === project);

    return (
        <div>
            <h1 className="text-4xl font-bold mt-4 mb-8">{project}</h1>

            <div className="grid grid-cols-3 gap-4">
                {statusCategories.map((status, index) => (
                    <div key={index}>
                        <h2 className="text-2xl font-semibold mb-4">{status}:</h2>
                        {projectTasks
                            .filter(task => task.status === status)
                            .map(task => (
                                <button key={task.id} className="bg-blue-500 text-white rounded px-2 py-1 my-1">
                                    {task.title}
                                </button>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectView;
