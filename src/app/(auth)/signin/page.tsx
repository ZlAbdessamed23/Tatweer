"use client"

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import InputField from '../components/InputField'
import SelectField from '../components/SelectField'
import { MdEmail, MdLock, MdPersonOutline } from 'react-icons/md'
import { login } from '@/app/utils/utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { User } from '@/app/api/auth/signin/types'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();

  const userTypeOptions = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" }
  ];

  const router = useRouter();

  const onSubmit: SubmitHandler<User> = async (data) => {
    const loginPromise = login(data);

    await toast.promise(loginPromise, {
      loading: 'Logging in...',
      success: (userData) => {
        router.push('/dashboard'); // or wherever you want to redirect after login
        return 'Logged in successfully!';
      },
      error: (err) => `Login failed: ${err.toString()}`
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
      <h1 className="text-2xl font-semibold mb-6 text-purple-600">
        Login to Your Account
      </h1>

      <div className='flex flex-col gap-5 w-10/12 mx-auto'>
        <InputField
          type="email"
          placeholder="Email"
          Icon={MdEmail}
          name="userEmail"
          register={register}
        />
        <InputField
          type="password"
          placeholder="Password"
          Icon={MdLock}
          name="password"
          register={register}
        />
        <SelectField
          placeholder="User Type"
          Icon={MdPersonOutline}
          name="userType"
          register={register}
          options={userTypeOptions}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6"
      >
        Login
      </button>

      <div className='w-full flex justify-end'>
        <p className="text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">Sign up</a>
        </p>
      </div>
    </form>
  );
};

export default Login;