"use client"

import React from 'react'
import InputField from '../components/InputField'
import { MdEmail, MdLock } from 'react-icons/md'
import { IoPersonSharp } from "react-icons/io5";

const Signup = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
      <h1 className="text-2xl font-semibold mb-6 text-purple-600">
        Personal Information
      </h1>

      <div className='flex flex-col gap-5 w-10/12 mx-auto'>
        <InputField type="text" placeholder="First name" Icon={IoPersonSharp} />
        <InputField type="text" placeholder="Last name" Icon={IoPersonSharp} />
        <InputField type="email" placeholder="Email" Icon={MdEmail} />
        <InputField type="password" placeholder="Password" Icon={MdLock} />
        <InputField type="password" placeholder="Confirm Password" Icon={MdLock} />
      </div>

      <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6">
        Next
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        You already have an account?{" "}
        <a href="#" className="text-purple-600 hover:underline">Sign in</a>
      </p>
    </div>
  )
}

export default Signup