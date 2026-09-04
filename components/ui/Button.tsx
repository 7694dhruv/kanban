'use client';

import React from 'react';
import { SpinnerIcon } from './Icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:via-indigo-600 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20 active:scale-[0.98] focus:ring-indigo-500',
    secondary:
      'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs active:scale-[0.98] focus:ring-slate-400',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 active:scale-[0.98] focus:ring-rose-500',
  };

  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} px-5 py-3 text-sm ${className}`}
      disabled={isButtonDisabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <SpinnerIcon className="w-4 h-4 text-current" />
          <span>{loadingText || children}</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
}
