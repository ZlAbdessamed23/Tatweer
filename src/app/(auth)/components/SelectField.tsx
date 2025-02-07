import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { UseFormSetValue } from 'react-hook-form';

interface SelectFieldProps {
    placeholder?: string;
    Icon: IconType;
    name: string;
    setValue: UseFormSetValue<any>; // Use setValue prop
    options: { value: string; label: string; }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
    placeholder = '',
    Icon,
    name,
    setValue,
    options
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasContent, setHasContent] = useState(false);

    return (
        <div className="relative w-full mt-4">
            <AnimatePresence>
                {!isFocused && !hasContent && (
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

            <AnimatePresence>
                {(isFocused || hasContent) && (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -28, scale: 0.8 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 px-1 bg-white pointer-events-none text-purple-600"
                    >
                        {placeholder}
                    </motion.span>
                )}
            </AnimatePresence>

            <motion.select
                onChange={(e) => {
                    setHasContent(e.target.value !== '');
                    setValue(name, e.target.value);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(false);
                    setHasContent(e.target.value !== '');
                }}
                animate={{
                    paddingLeft: isFocused ? "16px" : "32px",
                }}
                transition={{ duration: 0.2 }}
                className="w-full pr-4 py-2 h-10 focus:outline-none border-transparent border-b-2 border-b-black focus:border-2 focus:border-purple-600 focus:rounded-md bg-white appearance-none"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </motion.select>
        </div>
    );
};

export default SelectField;
