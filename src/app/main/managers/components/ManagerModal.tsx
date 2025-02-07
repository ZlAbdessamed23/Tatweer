"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Manager {
  managerId?: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPassword: string;
}

interface ManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  manager?: Manager | null;
}

const ManagerModal: React.FC<ManagerModalProps> = ({
  isOpen,
  onClose,
  manager
}) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<Manager>({
    defaultValues: {
      managerId: manager?.managerId || '',
      managerFirstName: manager?.managerFirstName || '',
      managerLastName: manager?.managerLastName || '',
      managerEmail: manager?.managerEmail || '',
      managerPassword: manager?.managerPassword || ''
    }
  });

  const onSubmit = (data: Manager) => {
    try {
      // Implement submission logic here
      onClose();
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  // New error callback function for form submission errors
  const onError = (errors: Record<string, any>) => {
    Object.values(errors).forEach((error) => {
      toast.error(error.message || 'Validation error');
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9, y: '-40%', x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-main-blue">
                {manager ? 'Update Manager' : 'Add Manager'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
              <input
                {...register('managerFirstName', { required: 'First Name is required' })}
                placeholder="First Name"
                className="w-full p-2 border rounded"
              />

              <input
                {...register('managerLastName', { required: 'Last Name is required' })}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />

              <input
                {...register('managerEmail', { 
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="Email"
                type="email"
                className="w-full p-2 border rounded"
              />

              <input
                {...register('managerPassword', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                placeholder="Password"
                type="password"
                className="w-full p-2 border rounded"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-2 rounded-xl hover:opacity-90"
              >
                {manager ? 'Update' : 'Add'}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ManagerModal;
