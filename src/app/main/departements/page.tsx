"use client"

import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import DepartmentModal, { DepartmentType } from './components/DepartemenetModal';
import DepartementDisplay from './components/DepartementDisplay';

const fakeDepartments = [
    {
        departmentId: "DEP001",
        departmentName: "Sales",
        departmentType: DepartmentType.sales,
        departmentManagers: ["MGR001", "MGR002"]
    },
    {
        departmentId: "DEP002",
        departmentName: "Marketing",
        departmentType: DepartmentType.marketing,
        departmentManagers: ["MGR003"]
    },
    {
        departmentId: "DEP003",
        departmentName: "Finance",
        departmentType: DepartmentType.finance,
        departmentManagers: ["MGR004", "MGR005"]
    },
    {
        departmentId: "DEP004",
        departmentName: "Human Resources",
        departmentType: DepartmentType.humanResources,
        departmentManagers: ["MGR006"]
    },
    {
        departmentId: "DEP005",
        departmentName: "Operations",
        departmentType: DepartmentType.operations,
        departmentManagers: ["MGR007", "MGR008"]
    },
    {
        departmentId: "DEP006",
        departmentName: "Engineering",
        departmentType: DepartmentType.engineering,
        departmentManagers: ["MGR009"]
    },
    {
        departmentId: "DEP007",
        departmentName: "Product",
        departmentType: DepartmentType.product,
        departmentManagers: ["MGR010"]
    },
    {
        departmentId: "DEP008",
        departmentName: "Design",
        departmentType: DepartmentType.design,
        departmentManagers: ["MGR001", "MGR003"]
    },
    {
        departmentId: "DEP009",
        departmentName: "Customer Support",
        departmentType: DepartmentType.customerSupport,
        departmentManagers: ["MGR002"]
    },
    {
        departmentId: "DEP010",
        departmentName: "Data Science",
        departmentType: DepartmentType.dataScience,
        departmentManagers: ["MGR004", "MGR006"]
    }
];

const Departements = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDepartement, setSelectedDepartement] = useState(null);

    // Filter departments based on search input
    const filteredDepartments = fakeDepartments.filter((dep) =>
        dep.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='px-8 py-4'>
            <div className="flex justify-between items-center mb-4">
                <div className="relative flex-grow mr-4">
                    <input
                        type="text"
                        placeholder="Search departments..."
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
            <div className='flex flex-col gap-6'>
                {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((dep) => <DepartementDisplay key={dep.departmentId} props={dep} />)
                ) : (
                    <p className="text-gray-500 text-center">No departments found.</p>
                )}
            </div>
        </div>
    );
};

export default Departements;
