"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../components/InputField'
import { MdEmail, MdLock, MdBusiness, MdLocationOn, MdPeople } from 'react-icons/md'
import { IoPersonSharp } from "react-icons/io5"
import { signup } from '@/app/utils/utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type SignupData = {
  // Admin fields
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  confirmPassword: string;
  // Company fields
  companyName: string;
  companyEmployeeNumber: number;
  companyLocation: string;
  companyEmail: string;
  companyPhoneNumber: string;
};

const Signup = () => {

  const router = useRouter();

  const [step, setStep] = useState<'admin' | 'company'>('admin');

  const { setValue, watch, handleSubmit } = useForm<SignupData>();

  const formData = watch();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onSubmit = async (data: SignupData) => {
    if (step === 'admin') {
      // Move to company step
      setStep('company');
    } else {
      // We are on company step, submit the data
      const signupData = {
        adminInfo: {
          adminFirstName: data.adminFirstName,
          adminLastName: data.adminLastName,
          adminEmail: data.adminEmail,
          adminPassword: data.adminPassword,
        },
        companyInfo: {
          companyName: data.companyName,
          companyEmployeeNumber: data.companyEmployeeNumber,
          companyLocation: data.companyLocation,
          companyEmail: data.companyEmail,
          companyPhoneNumber: data.companyPhoneNumber,
        }
      };

      console.log('Final Signup Data:', signupData);

      const signupPromise = signup(signupData);

      await toast.promise(signupPromise, {
        loading: 'Creating your account...',
        success: (userData) => {
          router.push('/login');
          return 'Account created successfully!';
        },
        error: (err) => `Signup failed: ${err.toString()}`
      });

    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
      {step === 'admin' ? (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-purple-600">
            Personal Information
          </h1>

          <div className='flex flex-col gap-5 w-10/12 mx-auto'>
            <InputField
              type="text"
              placeholder="First name"
              Icon={IoPersonSharp}
              name="adminFirstName"
              setValue={setValue}
            />
            <InputField
              type="text"
              placeholder="Last name"
              Icon={IoPersonSharp}
              name="adminLastName"
              setValue={setValue}
            />
            <InputField
              type="email"
              placeholder="Email"
              Icon={MdEmail}
              name="adminEmail"
              setValue={setValue}
            />
            <InputField
              type="password"
              placeholder="Password"
              Icon={MdLock}
              name="adminPassword"
              setValue={setValue}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              Icon={MdLock}
              name="confirmPassword"
              setValue={setValue}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6"
          >
            Next
          </button>

          <div className='w-full flex justify-end'>
            <p className="text-sm text-gray-600 mt-4">
              You already have an account?{" "}
              <a href="/signin" className="text-purple-600 hover:underline">Sign in</a>
            </p>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-purple-600">
            Company Information
          </h1>

          <div className='flex flex-col gap-5 w-10/12 mx-auto'>
            <InputField
              type="text"
              placeholder="Company Name"
              Icon={MdBusiness}
              name="companyName"
              setValue={setValue}
            />
            <InputField
              type="number"
              placeholder="Number of Employees"
              Icon={MdPeople}
              name="companyEmployeeNumber"
              setValue={setValue}
            />
            <InputField
              type="text"
              placeholder="Location"
              Icon={MdLocationOn}
              name="companyLocation"
              setValue={setValue}
            />
            <InputField
              type="email"
              placeholder="Company Email"
              Icon={MdEmail}
              name="companyEmail"
              setValue={setValue}
            />
            <InputField
              type="text"
              placeholder="Company Phone Number"
              Icon={MdEmail}
              name="companyPhoneNumber"
              setValue={setValue}
            />
          </div>

          <div className="flex gap-4 w-full mt-6">
            <button
              type="button"
              onClick={() => setStep('admin')}
              className="w-full bg-white text-purple-600 border-2 border-purple-600 py-2 rounded-md hover:bg-purple-50 transition-colors duration-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Signup;
