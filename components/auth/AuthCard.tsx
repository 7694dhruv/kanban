'use client';

import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { KanbanIcon, ShieldCheckIcon } from '@/components/ui/Icons';

type Tab = 'login' | 'register';

export function AuthCard() {
  const [activeTab, setActiveTab] = useState<Tab>('login');

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-2xl shadow-indigo-950/5 backdrop-blur-xl">
        {/* Subtle top glowing line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/25 mb-3.5 ring-4 ring-indigo-500/10">
            <KanbanIcon className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Kanban<span className="text-indigo-600">Flow</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to organize your boards and boost your workflow
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="relative p-1 bg-slate-100 rounded-2xl border border-slate-200/80 mb-6 flex">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Active Form */}
        <div className="transition-all duration-300">
          {activeTab === 'login' ? (
            <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
        </div>

        {/* Trust & Security Badge */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-400 text-xs">
          <ShieldCheckIcon className="w-4 h-4 text-indigo-600" />
          <span>Secured with JWT & Encrypted Password Hashing</span>
        </div>
      </div>
    </div>
  );
}
