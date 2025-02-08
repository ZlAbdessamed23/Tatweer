"use client"

import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IFormInputs {
    department: string;
    url: string;
}

const Settings = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<IFormInputs>({
        defaultValues: {
            department: '',
            url: ''
        }
    });

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
        reset();
    };

    const handleAddUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = {
            department: watch('department'),
            url: watch('url')
        };
        console.log('Added URL:', formData);
        reset(); // Reset form after adding URL
    };

    return (
        <div className="w-full p-4">
            <div className='flex flex-col gap-6 w-full'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex items-start gap-8 w-full'>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="department">Department</label>
                        <input
                            id="department"
                            type="text"
                            {...register("department", {
                                required: "Department is required",
                                minLength: {
                                    value: 2,
                                    message: "Department must be at least 2 characters"
                                }
                            })}
                            className='border border-main-blue rounded-xl p-4 h-11 w-full placeholder:text-main-blue placeholder:text-opacity-70'
                            placeholder='Enter department name'
                        />
                        {errors.department && (
                            <span className="text-red-500 text-sm">{errors.department.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="url">URL</label>
                        <div className="relative flex items-center w-full">
                            <input
                                id="url"
                                type="text"
                                {...register("url", {
                                    required: "URL is required",
                                    pattern: {
                                        value: /^(http|https):\/\/[^ "]+$/,
                                        message: "Please enter a valid URL"
                                    }
                                })}
                                className='border border-main-blue rounded-xl p-4 h-11 w-full placeholder:text-main-blue placeholder:text-opacity-70'
                                placeholder='Enter URL'
                            />
                            <button
                                onClick={handleAddUrl}
                                className='absolute right-2 bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition-colors'
                                aria-label="Add URL"
                            >
                                <FaPlus className="text-white text-sm" />
                            </button>
                        </div>
                        {errors.url && (
                            <span className="text-red-500 text-sm">{errors.url.message}</span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;