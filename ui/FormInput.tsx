import React from "react";

interface FormInputProps {
  id?: string;
  value: string | number;
  type: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  value,
  type,
  name,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm"
      onChange={onChange}
    />
  );
};
