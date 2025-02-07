"use client"

import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Task {
    taskId?: string;
    taskTitle: string;
    taskDescription: string;
    taskCreatedAt: Date;
    taskDueDate: Date;
    taskStatus: string;
};

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task?: Task | null;
};

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<Task>({
        defaultValues: {
            taskId: task?.taskId || '',
            taskTitle: task?.taskTitle || '',
            taskDescription: task?.taskDescription || '',
            taskCreatedAt: task?.taskCreatedAt || new Date(),
            taskDueDate: task?.taskDueDate || new Date(),
            taskStatus: task?.taskStatus || 'Pending'
        }
    });

    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const statusDropdownRef = useRef<HTMLDivElement>(null);
    const selectedStatus = watch('taskStatus');

    // Close status dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
                setIsStatusDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onSubmit = (data: Task) => {
        try {
            // Implement submission logic here
            onClose();
            reset();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const onError = (errors: Record<string, any>) => {
        Object.values(errors).forEach((error) => {
            toast.error(error.message || 'Validation error');
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-full max-w-md"
                        initial={{ opacity: 0, scale: 0.9, y: '-40%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-main-blue">
                                {task ? 'Update Task' : 'Add Task'}
                            </h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
                            <input
                                {...register('taskTitle', { required: 'Task Title is required' })}
                                placeholder="Task Title"
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                {...register('taskDescription', { required: 'Task Description is required' })}
                                placeholder="Task Description"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="date"
                                {...register('taskDueDate', { required: 'Task Due Date is required' })}
                                className="w-full p-2 border rounded"
                            />

                            {/* Task Status Dropdown */}
                            <div className="relative" ref={statusDropdownRef}>
                                <button
                                    type="button"
                                    className="w-full flex justify-between items-center p-2 border rounded bg-white"
                                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                >
                                    {selectedStatus ? selectedStatus : 'Select Task Status'} <FaChevronDown />
                                </button>
                                {isStatusDropdownOpen && (
                                    <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                                        {['Pending', 'In Progress', 'Completed'].map((status) => (
                                            <button
                                                key={status}
                                                type="button"
                                                className="block w-full text-left p-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    setValue('taskStatus', status);
                                                    setIsStatusDropdownOpen(false);
                                                }}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-xl hover:opacity-90">
                                {task ? 'Update' : 'Add'}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default TaskModal;
