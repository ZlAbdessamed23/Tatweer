import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='grid grid-cols-[20%,80%] w-screen min-h-screen font-sans bg-slate-100 '>
            <Sidebar />
            <div>
                <Navbar />
                <div className='px-6 py-8'>
                    {children}
                </div>
            </div>
        </div>
    )
};