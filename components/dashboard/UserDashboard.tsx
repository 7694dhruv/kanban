'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { KanbanIcon, LogOutIcon, ShieldCheckIcon, UserIcon } from '@/components/ui/Icons';
import { API_CONFIG } from '@/config/api';

export function UserDashboard() {
  const { user, token, logout } = useAuth();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 md:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-500/10">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900">
                  Welcome back, {user?.name}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {user?.role || 'user'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Backend Connected</span>
            </div>

            <Button
              variant="secondary"
              onClick={logout}
              leftIcon={<LogOutIcon className="w-4 h-4" />}
              className="text-rose-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50"
            >
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board Teaser & Session Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Backlog / To Do */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              To Do
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-100 text-slate-700">
              3
            </span>
          </div>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 hover:bg-white hover:shadow-xs transition-all">
              <p className="text-xs font-medium text-slate-800">
                Setup Mongoose Models & Schemas
              </p>
              <div className="flex items-center justify-between mt-2.5 text-[10px] text-emerald-600 font-medium">
                <span>✓ Completed in Backend</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-indigo-300 hover:bg-white hover:shadow-xs transition-all">
              <p className="text-xs font-medium text-slate-800">
                Connect Next.js Frontend with Auth API
              </p>
              <div className="flex items-center justify-between mt-2.5 text-[10px] text-emerald-600 font-medium">
                <span>✓ Active & Connected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              In Progress
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-amber-50 text-amber-700">
              1
            </span>
          </div>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:border-amber-300 hover:bg-white hover:shadow-xs transition-all">
              <p className="text-xs font-medium text-slate-800">
                Interactive Kanban Task Boards
              </p>
              <div className="flex items-center justify-between mt-2.5 text-[10px] text-amber-600 font-medium">
                <span>Ready for columns & drag-and-drop</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Done
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700">
              2
            </span>
          </div>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:shadow-xs transition-all">
              <p className="text-xs font-medium text-slate-800">
                Bcrypt Password Encryption
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Verified on Express backend</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-white hover:shadow-xs transition-all">
              <p className="text-xs font-medium text-slate-800">
                JWT Auth & Token Session State
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Stored securely in client state</p>
            </div>
          </div>
        </div>
      </div>

      {/* Backend & Security Status Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xs backdrop-blur-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
          <ShieldCheckIcon className="w-4 h-4 text-indigo-600" />
          <span>Active Session Details (Clean Architecture Proof)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-slate-500 block text-[11px]">Backend API Target:</span>
            <code className="text-indigo-600 font-mono font-medium">{API_CONFIG.BASE_URL}</code>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-slate-500 block text-[11px]">JWT Bearer Token:</span>
            <code className="text-emerald-700 font-mono font-medium truncate block">
              {token ? `${token.substring(0, 24)}...` : 'None'}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
