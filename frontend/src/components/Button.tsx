import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className, children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-mint-500 text-white hover:bg-mint-600 rounded-pill shadow-md",
    outline: "border border-mint-500 text-mint-500 hover:bg-mint-50 rounded-pill",
    ghost: "hover:bg-gray-100 text-text-secondary rounded-lg"
  };
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg"
  };

  return (
    <button className={cn(baseStyle, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
};
