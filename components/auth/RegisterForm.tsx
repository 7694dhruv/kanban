'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { validateRegisterForm } from '@/utils/validation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UserIcon } from '@/components/ui/Icons';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
}

export function RegisterForm({ onSwitchToLogin, onSuccess }: RegisterFormProps) {
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

    const validationErrors = validateRegisterForm({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setFormErrors({});

    const success = await register({
      name: formData.name,
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
        label="Full Name"
        type="text"
        name="name"
        placeholder="Dhruv Patel"
        autoComplete="name"
        value={formData.name}
        onChange={handleChange}
        error={formErrors.name}
        leftIcon={<UserIcon className="w-5 h-5" />}
        disabled={isLoading}
      />

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
        placeholder="At least 6 characters"
        autoComplete="new-password"
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

      <Button
        type="submit"
        variant="primary"
        isLoading={isLoading}
        loadingText="Creating account..."
        className="w-full mt-2"
      >
        Create Account
      </Button>

      {onSwitchToLogin && (
        <div className="pt-2 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition-colors underline-offset-4 hover:underline"
          >
            Sign in
          </button>
        </div>
      )}
    </form>
  );
}
