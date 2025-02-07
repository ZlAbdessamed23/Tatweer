"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../components/InputField'
import { MdEmail, MdLock, MdBusiness, MdLocationOn, MdPeople } from 'react-icons/md'
import { IoPersonSharp } from "react-icons/io5"
import { Admin, Company } from '@/app/types/types'
import { signup } from '@/app/utils/utils'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


type SignupFormData = Omit<Admin, 'adminId' | 'adminIsActivated' | 'managedCompany' | 'emailVerificationToken' | 'assignedTasks'> & {
  confirmPassword: string;
};

type CompanyFormData = Pick<Company, 'companyName' | 'companyEmployeeNumber' | 'companyLocation' | 'companyEmail'>;

const Signup = () => {

  const router = useRouter();

  const [step, setStep] = useState<'admin' | 'company'>('admin');
  const [adminData, setAdminData] = useState<SignupFormData | null>(null);

  const adminForm = useForm<SignupFormData>();
  const companyForm = useForm<CompanyFormData>();

  const onSubmitAdmin = (data: SignupFormData) => {
    setAdminData(data);
    setStep('company');
  };

  const onSubmitCompany = async (companyData: CompanyFormData) => {
    // Check if we have admin data
    if (!adminData) {
      toast.error('Something went wrong, please try again');
      return;
    }

    const signupData = {
      adminInfo: {
        adminFirstName: adminData.adminFirstName,
        adminLastName: adminData.adminLastName,
        adminEmail: adminData.adminEmail,
        adminPassword: adminData.adminPassword,
      },
      companyInfo: companyData
    };

    const signupPromise = signup(signupData);

    await toast.promise(signupPromise, {
      loading: 'Creating your account...',
      success: (userData) => {
        router.push('/login');
        return 'Account created successfully!';
      },
      error: (err) => `Signup failed: ${err.toString()}`
    });
  };


  if (step === 'admin') {
    return (
      <form onSubmit={adminForm.handleSubmit(onSubmitAdmin)} className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
        <h1 className="text-2xl font-semibold mb-6 text-purple-600">
          Personal Information
        </h1>

        <div className='flex flex-col gap-5 w-10/12 mx-auto'>
          <InputField
            type="text"
            placeholder="First name"
            Icon={IoPersonSharp}
            name="adminFirstName"
            register={adminForm.register}
          />
          <InputField
            type="text"
            placeholder="Last name"
            Icon={IoPersonSharp}
            name="adminLastName"
            register={adminForm.register}
          />
          <InputField
            type="email"
            placeholder="Email"
            Icon={MdEmail}
            name="adminEmail"
            register={adminForm.register}
          />
          <InputField
            type="password"
            placeholder="Password"
            Icon={MdLock}
            name="adminPassword"
            register={adminForm.register}
          />
          <InputField
            type="password"
            placeholder="Confirm Password"
            Icon={MdLock}
            name="confirmPassword"
            register={adminForm.register}
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
            you already have an account?{" "}
            <a href="/signin" className="text-purple-600 hover:underline">Sign in</a>
          </p>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={companyForm.handleSubmit(onSubmitCompany)} className="flex flex-col justify-center items-center w-[70%] mx-auto h-full">
      <h1 className="text-2xl font-semibold mb-6 text-purple-600">
        Company Information
      </h1>

      <div className='flex flex-col gap-5 w-10/12 mx-auto'>
        <InputField
          type="text"
          placeholder="Company Name"
          Icon={MdBusiness}
          name="companyName"
          register={companyForm.register}
        />
        <InputField
          type="number"
          placeholder="Number of Employees"
          Icon={MdPeople}
          name="companyEmployeeNumber"
          register={companyForm.register}
        />
        <InputField
          type="text"
          placeholder="Location"
          Icon={MdLocationOn}
          name="companyLocation"
          register={companyForm.register}
        />
        <InputField
          type="email"
          placeholder="Company Email"
          Icon={MdEmail}
          name="companyEmail"
          register={companyForm.register}
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
    </form>
  );
};

export default Signup;