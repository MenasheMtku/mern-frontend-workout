import React from "react";

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode | string | number;
  // className?: string;
}

export const FormLable: React.FC<FormLabelProps> = ({
  htmlFor,
  children,
  // className,
}) => {
  return (
    <label
      className="block text-sm font-medium  text-gray-700"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
