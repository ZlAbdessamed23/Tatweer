"use client"

import React, { useState } from 'react'
import { FaSearch, FaPlus } from 'react-icons/fa';
import ManagerModal from '../managers/components/ManagerModal';
import DepartmentModal from './components/DepartemenetModal';

const Departements = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDepartement, setSelectedDepartement] = useState(null);


    return (
        <div className='px-8 py-4'>
            <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow mr-4">
                    <input
                        type="text"
                        placeholder="Search managers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 pl-10 pr-4 py-2 border border-main-blue rounded-xl focus:border-main-blue"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button
                    onClick={() => {
                        setSelectedDepartement(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-purple-600 text-white p-2 rounded-xl flex justify-center items-center w-24"
                >
                    <FaPlus className="mr-2" /> 
                    <span>Add</span>
                </button>
            </div>
            <DepartmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>
    )
};

export default Departements