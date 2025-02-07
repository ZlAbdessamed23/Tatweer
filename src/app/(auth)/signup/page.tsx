// components/Signup.tsx

"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { MdEmail, MdLock } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

// -------------------------
// InputField Component
// -------------------------
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  Icon?: IconType;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  Icon,
  error,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const showLabel = isFocused || hasContent;

  // Update local state and propagate changes to parent.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(e.target.value !== "");
    if (rest.onChange) {
      rest.onChange(e);
    }
  };




  return (
    <div className="relative w-full mt-4">
      <AnimatePresence>
        {!isFocused && Icon && (
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-0"
          >
            <Icon className="text-black text-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.span
        initial={{ y: 0, x: 32 }}
        animate={{
          y: showLabel ? -28 : 0,
          x: showLabel ? 0 : 32,
          scale: showLabel ? 0.8 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute left-0 px-1 bg-white pointer-events-none ${
          showLabel ? "text-purple-600" : "text-gray-500"
        }`}
      >
        {placeholder}
      </motion.span>

      <motion.input
  type={type}
  name={rest.name}
  value={rest.value}
  onChange={handleChange}
  onFocus={(e) => {
    setIsFocused(true);
    if (rest.onFocus) rest.onFocus(e);
  }}
  onBlur={(e) => {
    setIsFocused(false);
    if (rest.onBlur) rest.onBlur(e);
  }}
  animate={{ paddingLeft: isFocused ? "0px" : "32px" }}
  transition={{ duration: 0.2 }}
  className="w-full pr-4 py-2 focus:outline-none border-transparent border-b-2 border-b-black focus:border-2 focus:border-purple-600 focus:rounded-md"
/>


      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

// -------------------------
// Signup Component
// -------------------------
const Signup = () => {
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Form data state (ensure these keys match what your API expects)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Administrator/Company Information
    companyName: "",
    companyLocation: "",
    employerNumber: "",
    companyGmail: "",
    companyPhoneNumber: "",
  });

  // Generic change handler for inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate personal information (step 1)
  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate company/administrator information (step 2)
  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.companyLocation.trim()) newErrors.companyLocation = "Company Location is required";
    if (!formData.employerNumber.trim()) newErrors.employerNumber = "Employer Number is required";
    if (!formData.companyGmail.trim()) newErrors.companyGmail = "Company Gmail is required";
    if (!formData.companyPhoneNumber.trim()) newErrors.companyPhoneNumber = "Company Phone Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Advance from step 1 to step 2
  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep2()) {
      setErrors({});
      
      // Transform formData to match backend expectations
      const transformedData = {
        adminFirstName: formData.firstName,
        adminLastName: formData.lastName,
        adminEmail: formData.email,
        adminPassword: formData.password,
        adminPhoneNumber: formData.companyPhoneNumber,
        companyName: formData.companyName,
        companyLocation: formData.companyLocation,
        companyEmployeeNumber: parseInt(formData.employerNumber, 10), // Convert to integer
        companyEmail: formData.companyGmail,
        companyPhoneNumber: formData.companyPhoneNumber,
        planName: "Free"
      };
  
      // Validate that employerNumber was successfully converted to an integer
      if (isNaN(transformedData.companyEmployeeNumber)) {
        setErrors((prev) => ({
          ...prev,
          employerNumber: "Le nombre d'employés doit être un nombre valide"
        }));
        return;
      }
  
      console.log("Data to be sent:", transformedData);
  
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transformedData),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setErrors((prev) => ({
            ...prev,
            submit: data.message || "Une erreur s'est produite lors de l'inscription"
          }));
          return;
        }
  
        console.log("Data submitted successfully:", data);
      
      } catch (error) {
        console.error("Error submitting data:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Une erreur de connexion s'est produite. Veuillez réessayer."
        }));
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[70%] mx-auto h-full py-8">
      {step === 1 ? (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-purple-600">
            Personal Information
          </h1>
          <form onSubmit={handleNext} className="flex flex-col gap-5 w-full max-w-md">
            <InputField
              type="text"
              name="firstName"
              placeholder="First name"
              Icon={IoPersonSharp}
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <InputField
              type="text"
              name="lastName"
              placeholder="Last name"
              Icon={IoPersonSharp}
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              Icon={MdEmail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              Icon={MdLock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              Icon={MdLock}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 mt-6"
            >
              Next
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-purple-600">
            Company Information
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-md">
            <InputField
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              error={errors.companyName}
            />
            <InputField
              type="text"
              name="companyLocation"
              placeholder="Company Location"
              value={formData.companyLocation}
              onChange={handleChange}
              error={errors.companyLocation}
            />
            <InputField
              type="text"
              name="employerNumber"
              placeholder="Employer Number"
              value={formData.employerNumber}
              onChange={handleChange}
              error={errors.employerNumber}
            />
            <InputField
              type="email"
              name="companyGmail"
              placeholder="Company Gmail"
              value={formData.companyGmail}
              onChange={handleChange}
              error={errors.companyGmail}
            />
            <InputField
              type="tel"
              name="companyPhoneNumber"
              placeholder="Company Phone Number"
              value={formData.companyPhoneNumber}
              onChange={handleChange}
              error={errors.companyPhoneNumber}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-200 mt-6"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Signup;
