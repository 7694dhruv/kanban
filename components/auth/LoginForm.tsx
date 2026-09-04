'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { validateLoginForm } from '@/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, LogOutIcon } from '@/components/ui/Icons';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onSwitchToRegister, onSuccess }: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error as user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side pure validation
    const validationErrors = validateLoginForm({
      email: formData.email,
      password: formData.password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormErrors({});

    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={clearError}
          className="mb-2"
        />
      )}

      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="name@example.com"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        error={formErrors.email}
        leftIcon={<MailIcon className="w-5 h-5" />}
        disabled={isLoading}
      />

      <Input
        label="Password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        placeholder="••••••••"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        error={formErrors.password}
        leftIcon={<LockIcon className="w-5 h-5" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        }
        disabled={isLoading}
      />

      <div className="flex items-center justify-between text-xs pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-800">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
          />
          <span>Remember me</span>
        </label>

        <a
          href="#forgot"
          onClick={(e) => {
            e.preventDefault();
            alert('Password reset link will be sent to your registered email.');
          }}
          className="text-indigo-600 hover:text-indigo-700 transition-colors font-medium"
        >
          Forgot password?
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        loadingText="Signing in..."
        className="w-full mt-2"
      >
        Sign In
      </Button>

      {onSwitchToRegister && (
        <div className="pt-2 text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition-colors underline-offset-4 hover:underline"
          >
            Create account
          </button>
        </div>
      )}
    </form>
  );
}
