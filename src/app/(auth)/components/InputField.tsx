import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  Icon: IconType;
  name: string;
  register: UseFormRegister<any>;
}

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',
  placeholder = '',
  Icon,
  name,
  register
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const showLabel = isFocused || hasContent;

  return (
    <div className="relative w-full mt-4">
      <AnimatePresence>
        {!isFocused && (
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-2 left-0"
          >
            <Icon className="text-black size-6" />
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
        className={`absolute left-0 px-1 bg-white pointer-events-none
          ${showLabel ? 'text-purple-600' : 'text-gray-500'}`}
      >
        {placeholder}
      </motion.span>

      <motion.input
        type={type}
        {...register(name, {
          onChange: (e) => setHasContent(e.target.value !== '')
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        animate={{
          paddingLeft: isFocused ? "0px" : "32px",
        }}
        transition={{ duration: 0.2 }}
        className={`w-full pr-4 py-2 focus:outline-none border-transparent border-b-2 border-b-black focus:border-2 focus:border-purple-600 focus:rounded-md`}
      />
    </div>
  );
};

export default InputField;