"use client"

import Link from 'next/link'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaHome,
    FaChartLine,
    FaUserTie,
    FaChartPie,
    FaCreditCard,
    FaHandHoldingUsd,
    FaRegWindowRestore,
    FaCog,
    FaShoppingCart
} from "react-icons/fa"
import { BsTools } from "react-icons/bs";
import { usePathname } from 'next/navigation'

interface SidebarItemType {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    url: string;
}

function SidebarItem({ itemInfos, path }: { itemInfos: SidebarItemType, path: string }): React.ReactElement {
    const isSelected = path === itemInfos.url
    return (
        <Link href={itemInfos.url}>
            <div className="flex items-center gap-6 relative h-12 w-full text-gray-500 text-opacity-70 hover:bg-purple-600 hover:text-white pr-2 pl-8">
                <AnimatePresence>
                    {isSelected && (
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '0.4rem' }}
                            exit={{ width: 0 }}
                            className="absolute left-0 top-0 bottom-0 bg-purple-600 rounded-r-md"
                        />
                    )}
                </AnimatePresence>
                <itemInfos.icon className="size-6" />
                <span>{itemInfos.title}</span>
            </div>
        </Link>
    )
}

export default function Sidebar() {
    const path = usePathname()
    const [isOpen, setIsOpen] = React.useState(false)

    const sidebarLinks: Array<SidebarItemType> = [
        {
            icon: FaHome,
            title: "Dashboard",
            url: "/main/dashboard",
        },
        {
            icon: BsTools,
            title: "Departement",
            url: "/main/departements",
        },
        {
            icon: FaChartLine,
            title: "Financial",
            url: "/financial",
        },
        {
            icon: FaUserTie,
            title: "Managers",
            url: "/main/managers",
        },
        {
            icon: FaShoppingCart,
            title: "sales",
            url: "/main/sales",
        },
        
        {
            icon: FaChartPie,
            title: "Investments",
            url: "/investments",
        },
        {
            icon: FaCreditCard,
            title: "Credit Cards",
            url: "/credit-cards",
        },
        {
            icon: FaHandHoldingUsd,
            title: "Loans",
            url: "/loans",
        },
        {
            icon: FaRegWindowRestore,
            title: "Services",
            url: "/main/services",
        },
        {
            icon: FaChartPie,
            title: "Strategies",
            url: "/main/strategies",
        },
        {
            icon: FaCog,
            title: "Settings",
            url: "/settings",
        }
    ]

    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <div className="bg-white">
            <h1 className='text-center text-2xl  font-medium mt-4 mb-6 text-main-blue '>Orca Bitches</h1>
            <div className='flex flex-col overflow-y-scroll  gap-4'>
                {sidebarLinks.map((elem) => (
                    <SidebarItem key={elem.title} itemInfos={elem} path={path} />
                ))}
            </div>

        </div>
    )
}