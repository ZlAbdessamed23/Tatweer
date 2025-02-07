import React from 'react';
import { IconType } from 'react-icons';  // Import IconType from react-icons

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  Icon?: IconType;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
  type = 'text',       // Default value for type
  placeholder = '',    // Default value for placeholder
  Icon,                // Icon is optional, so we don't need a default
  value = '',          // Default value for value
  onChange,            // Handle change of input value
}) => {
  return (
    <div className="relative w-full flex flex-row items-end mt-4">
      {Icon && <Icon className="text-black text-xl" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pr-4 py-2 border-b-2 border-black focus:outline-none"
      />
    </div>
  );
};

export default InputField;
