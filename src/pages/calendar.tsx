// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import tasksData from '../data/taskdata.json';
import 'tailwindcss/tailwind.css';

const localizer = momentLocalizer(moment);

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

// Your custom Event component
const CustomEvent = ({ event }: any) => (
    <div className="bg-blue-500 text-white p-2 rounded">
        <strong>{event.title}</strong>
        <p>{event.description}</p>
    </div>
);

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        // Convert task data to event data
        const eventData = tasksData.map((task: Task) => ({
            title: task.title,
            start: new Date(task.creationDate),
            end: new Date(task.dueDate),
            allDay: false,
        }));

        setEvents(eventData);
    }, []);

    return (
        <div className="App h-full">
            <Calendar
                className="bg-white m-4 rounded shadow"
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['day', 'week', 'month']}
                components={{
                    event: CustomEvent,
                }}
            />
        </div>
    );
}

export default CalendarPage;
