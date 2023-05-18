import React, { useState, useEffect, useCallback } from 'react';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import ProjectView from '../components/ProjectView';
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

interface ProjectsProps {
    initialSelectedProject?: string;
}

const Projects: React.FC<ProjectsProps> = ({ initialSelectedProject }) => {
    const [tasksData, setTasksData] = useState<Task[]>([]);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        setTasksData(taskData);if (initialSelectedProject) {
            setSelectedProject(initialSelectedProject);
        }
    }, [initialSelectedProject]);

    // Generate unique project names
    let projectNames = [...new Set(tasksData.map(task => task.project))];

    const handleSortClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortProjects = useCallback(() => {
        return projectNames.sort((a, b) => {
            const nameA = a.toUpperCase();
            const nameB = b.toUpperCase();
            if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [projectNames, sortOrder]);

    useEffect(() => {
        projectNames = sortProjects();
    }, [sortOrder, sortProjects]);

    return (
        <div className="flex min-h-full">
            <div className="w-1/5 border-r border-gray-200 pr-8">
                <div className="flex justify-between items-center mb-8">
                    <div className={`relative bg-white shadow hover:shadow-lg transition-shadow p-2 cursor-pointer rounded-lg`} onClick={handleSortClick}>
                        <div className="flex items-center space-x-2">
                            {sortOrder === 'asc' ? <FaSortAlphaDown className={`text-xl`} /> : <FaSortAlphaDownAlt className={`text-xl`} />}
                            <span>Sort</span>
                        </div>
                    </div>
                </div>
                <div>
                    {projectNames.map((project, index) => (
                        <button
                            key={index}
                            className={`w-full text-left p-4 mb-4 border rounded focus:outline-none shadow hover:shadow-lg transition-shadow duration-200 ease-in-out ${selectedProject === project ? 'border-blue-500' : ''}`}
                            onClick={() => setSelectedProject(project)}
                        >
                            <h3 className="font-bold text-lg">{project}</h3>
                        </button>
                    ))}
                </div>
            </div>
            <div className="w-4/5 ml-8">
                {selectedProject ? (
                    <ProjectView project={selectedProject} tasksData={tasksData} />
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-500 text-lg">
                        Select a project from the list
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
