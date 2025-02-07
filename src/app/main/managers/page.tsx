"use client"


import React, { useMemo, useState } from 'react'
import ManagersTable from './components/ManagersTable';
import { FaSearch, FaPlus } from 'react-icons/fa';
import ManagerModal from './components/ManagerModal';

const Managers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);



  const fakeManagers = [
    {
      managerId: "MGR001",
      managerFirstName: "Alice",
      managerLastName: "Johnson",
      managerEmail: "alice.johnson@example.com",
      managerPassword: "password123"
    },
    {
      managerId: "MGR002",
      managerFirstName: "Bob",
      managerLastName: "Smith",
      managerEmail: "bob.smith@example.com",
      managerPassword: "securepass456"
    },
    {
      managerId: "MGR003",
      managerFirstName: "Charlie",
      managerLastName: "Brown",
      managerEmail: "charlie.brown@example.com",
      managerPassword: "mypassword789"
    },
    {
      managerId: "MGR004",
      managerFirstName: "Diana",
      managerLastName: "Prince",
      managerEmail: "diana.prince@example.com",
      managerPassword: "wonderwoman321"
    },
    {
      managerId: "MGR005",
      managerFirstName: "Edward",
      managerLastName: "Norton",
      managerEmail: "edward.norton@example.com",
      managerPassword: "edwardpass654"
    },
    {
      managerId: "MGR006",
      managerFirstName: "Fiona",
      managerLastName: "Green",
      managerEmail: "fiona.green@example.com",
      managerPassword: "fionapass987"
    },
    {
      managerId: "MGR007",
      managerFirstName: "George",
      managerLastName: "Miller",
      managerEmail: "george.miller@example.com",
      managerPassword: "georgepass123"
    },
    {
      managerId: "MGR008",
      managerFirstName: "Hannah",
      managerLastName: "White",
      managerEmail: "hannah.white@example.com",
      managerPassword: "hannahpass456"
    },
    {
      managerId: "MGR009",
      managerFirstName: "Ian",
      managerLastName: "Black",
      managerEmail: "ian.black@example.com",
      managerPassword: "ianpass789"
    },
    {
      managerId: "MGR010",
      managerFirstName: "Julia",
      managerLastName: "Roberts",
      managerEmail: "julia.roberts@example.com",
      managerPassword: "juliapass321"
    }
  ];

  const filteredManagers = useMemo(() => {
    return fakeManagers.filter(manager =>
      `${manager.managerFirstName} ${manager.managerLastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [fakeManagers, searchTerm]);


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
            setSelectedManager(null);
            setIsModalOpen(true);
          }}
          className="bg-purple-600 text-white p-2 rounded-xl flex items-center"
        >
          <FaPlus className="mr-2" /> Add
        </button>
      </div>
      <ManagerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ManagersTable managers={filteredManagers} />

    </div>
  )
};

export default Managers;