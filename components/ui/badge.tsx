import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}
export const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      className="px-2.5 py-1 w-fit border rounded-full inline-flex justify-center items-center text-gray-text-weak/70 text-sm  leading-tight"
      {...props}
    >
      {children}
    </span>
  );
};
