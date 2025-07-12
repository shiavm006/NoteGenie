"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`${isLogin ? 'Login' : 'Signup'} form submitted`);
    
    // Simulate authentication and redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-200">
        {isLogin ? "Welcome Back" : "Welcome to Note Genie"}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-300">
        {isLogin 
          ? "Sign in to continue organizing your notes with AI-powered smart organization"
          : "Join thousands of students organizing their notes with AI-powered smart organization"
        }
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input id="firstname" placeholder="John" type="text" />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input id="lastname" placeholder="Doe" type="text" />
            </LabelInputContainer>
          </div>
        )}
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="john@example.com" type="email" />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        
        {!isLogin && (
          <LabelInputContainer className="mb-8">
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <Input
              id="confirmpassword"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>
        )}

        {isLogin && (
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-300">
                Remember me
              </label>
            </div>
            <button type="button" className="text-sm text-green-600 hover:text-green-700 font-medium">
              Forgot password?
            </button>
          </div>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-green-600 to-teal-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] hover:from-green-700 hover:to-teal-700 transition-all duration-200"
          type="submit"
        >
          {isLogin ? "Sign In" : "Create Account"} &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-zinc-900 px-4 font-medium text-white hover:bg-zinc-800 transition-colors shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => {
              console.log("Google login clicked");
              setTimeout(() => router.push('/dashboard'), 1000);
            }}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
            <span className="text-sm text-neutral-300">
              Continue with Google
            </span>
            <BottomGradient />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-neutral-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              type="button"
              onClick={toggleMode}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {isLogin ? "Sign up here" : "Sign in here"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
}; 