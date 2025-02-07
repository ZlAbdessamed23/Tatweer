"use client"

import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import TaskDisplay from './components/TaskDisplay';
import TaskModal from './components/TaskModal';

const fakeTasks = [
    {
        taskId: "TASK001",
        taskTitle: "Client Outreach",
        taskDescription: "Reach out to potential clients and pitch our services.",
        taskCreatedAt: new Date(),
        taskDueDate: new Date(),
        taskStatus: "Pending"
    },
    {
        taskId: "TASK002",
        taskTitle: "Social Media Campaign",
        taskDescription: "Plan and execute a new marketing campaign on social media.",
        taskCreatedAt: new Date(),
        taskDueDate: new Date(),
        taskStatus: "In Progress"
    },
    {
        taskId: "TASK003",
        taskTitle: "Budget Analysis",
        taskDescription: "Review the company's financial statements and prepare a report.",
        taskCreatedAt: new Date(),
        taskDueDate: new Date(),
        taskStatus: "Completed"
    }
];

const Tasks = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    // Filter tasks based on search input
    const filteredTasks = fakeTasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-8 py-4'>
            <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow mr-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 pl-10 pr-4 py-2 border border-main-blue rounded-xl focus:border-main-blue"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={() => {
                        setSelectedTask(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-purple-600 text-white p-2 rounded-xl flex justify-center items-center w-24"
                >
                    <FaPlus className="mr-2" />
                    <span>Add</span>
                </button>
            </div>
            <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className='flex flex-col gap-6'>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => <TaskDisplay key={task.taskId} props={task} />)
                ) : (
                    <p className="text-gray-500 text-center">No tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default Tasks;
