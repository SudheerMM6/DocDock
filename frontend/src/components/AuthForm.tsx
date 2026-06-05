"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  isLogin?: boolean;
  onToggleMode?: () => void;
}

export default function AuthForm({
  onSubmit,
  isLogin = false,
  onToggleMode,
}: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-card bg-[var(--surface)] p-6 md:p-8 border border-[var(--border)]">
      <h2 className="text-2xl font-semibold text-[var(--ink)]">
        {isLogin ? "Welcome back" : "Create account"}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--ink-secondary)]">
        {isLogin
          ? "Sign in to view appointments and manage your profile."
          : "Create a patient account to book and manage appointments."}
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" name="firstname" placeholder="Priya" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" name="lastname" placeholder="Sharma" type="text" required />
            </LabelInputContainer>
          </div>
        )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" placeholder="priya@email.com" type="email" required />
        </LabelInputContainer>

        <LabelInputContainer className="mb-6">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Minimum 8 characters"
            type="password"
            minLength={8}
            required
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-11 w-full rounded-feature bg-[var(--accent)] font-medium text-[var(--color-canvas-white)] hover:bg-[var(--ink)] transition-colors"
          type="submit"
        >
          {isLogin ? "Sign in" : "Sign up"}
        </button>

        {onToggleMode && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--ink-secondary)]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-[var(--accent)] hover:underline font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer = ({ children, className }: LabelInputContainerProps) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
