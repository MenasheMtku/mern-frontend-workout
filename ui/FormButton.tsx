import React from "react";

interface FormButtonProps {
  // Type for the button
  type: "button" | "submit" | "reset";
  // Optional className
  className?: string;
  // Children content (anything inside the button)
  children: React.ReactNode;
}
const FormButton: React.FC<FormButtonProps> = ({
  type,
  // className,
  children,
  ...props
}) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default FormButton;
