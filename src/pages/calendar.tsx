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

interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

const CustomEvent = ({ event }: { event: Event }) => (
    <div className="bg-blue-500 text-white p-2 rounded">
        <strong>{event.title}</strong>
    </div>
);

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        // Convert task data to event data
        const eventData = tasksData.map((task: Task) => ({
            title: task.title,
            start: new Date(task.creationDate),
            end: new Date(task.dueDate),
            allDay: true,
        }));

        setEvents(eventData);
    }, []);

    return (
        <div className="h-screen">
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
