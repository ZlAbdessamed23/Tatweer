import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="hidden md:flex  md:w-2/5  lg:w-1/2  flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 md:p-8">
        <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">
          Social media shared today,
        </div>
        <div className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
          tomorrow or by location
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-full md:w-3/5 lg:w-1/2 flex flex-col justify-center items-center ">
        {children}
      </div>
    </div>
  );
}
