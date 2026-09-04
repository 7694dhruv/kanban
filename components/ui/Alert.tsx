'use client';

import React from 'react';
import { AlertCircleIcon, CheckIcon } from './Icons';

export interface AlertProps {
  type?: 'error' | 'success' | 'info';
  message: string;
  onClose?: () => void;
  className?: string;
}

export function Alert({ type = 'error', message, onClose, className = '' }: AlertProps) {
  if (!message) return null;

  const styles = {
    error: {
      container: 'bg-rose-50 border-rose-200 text-rose-800 shadow-xs',
      icon: <AlertCircleIcon className="w-5 h-5 text-rose-600 shrink-0" />,
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs',
      icon: <CheckIcon className="w-5 h-5 text-emerald-600 shrink-0" />,
    },
    info: {
      container: 'bg-indigo-50 border-indigo-200 text-indigo-800 shadow-xs',
      icon: <AlertCircleIcon className="w-5 h-5 text-indigo-600 shrink-0" />,
    },
  };

  const current = styles[type];

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-xl border p-3.5 text-sm backdrop-blur-md transition-all duration-200 ${current.container} ${className}`}
    >
      {current.icon}
      <div className="flex-1 font-medium leading-relaxed">{message}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-current opacity-70 hover:opacity-100 transition-opacity p-0.5"
          aria-label="Dismiss alert"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
