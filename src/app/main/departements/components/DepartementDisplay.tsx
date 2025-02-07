import { DepartmentType } from '@/app/types/constant';
import React from 'react'
import { GiReceiveMoney } from "react-icons/gi";

interface Department {
    departmentId?: string;
    departmentName: string;
    departmentType: DepartmentType;
    departmentManagers: string[];
};

const DepartementDisplay = ({ props }: { props: Department }) => {
    return (
        <div className='flex items-center justify-between w-11/12 mx-auto p-4 rounded-xl bg-white'>
            <div>
                <span>
                    <GiReceiveMoney className='size-11 p-4 bg-purple-300 text-purple-500 rounded-xl' />
                </span>
                <span>
                    <p className='text-lg text-black font-semibold'>Departement Name</p>
                    <p className='text-main-blue text-base font-light'>{props.departmentName}</p>
                </span>
            </div>
            <div>
                <span>
                    <p className='text-lg text-black font-semibold'>Departement Type</p>
                    <p className='text-main-blue text-base font-light'>{props.departmentType}</p>
                </span>
            </div>
            <div>
                <span>
                    <p className='text-lg text-black font-semibold'>Departement Manager</p>
                    <p className='text-main-blue text-base font-light'>{props.departmentManagers[0]}</p>
                </span>
            </div>
            <div>
                <button className='w-24 h-12 p-2 text-[#16DBCC] border-[#16DBCC]'>
                    View Details
                </button>
            </div>
        </div>
    )
};

export default DepartementDisplay;