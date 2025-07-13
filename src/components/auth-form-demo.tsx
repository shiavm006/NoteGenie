"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function AuthFormDemo() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to dashboard after form submission
    router.push("/dashboard");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form when switching modes
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-2xl p-8 shadow-2xl bg-black border border-gray-800">
      <div className="text-center mb-8">
        <h2 className="font-bold text-2xl text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-400 text-sm">
          {isLogin 
            ? "Sign in to continue to Note Ginie" 
            : "Join Note Ginie to get started"}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {!isLogin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          >
            <LabelInputContainer>
              <Label htmlFor="firstName" className="text-gray-300">First name</Label>
              <Input
                id="firstName"
                placeholder="John"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastName" className="text-gray-300">Last name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600"
              />
            </LabelInputContainer>
          </motion.div>
        )}

        <LabelInputContainer>
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input
            id="email"
            placeholder="john@example.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-600"
          />
        </LabelInputContainer>

        <button
          className="relative group/btn bg-blue-600 hover:bg-gray-800 block w-full text-white rounded-md h-12 font-medium shadow-lg transition-all duration-200"
          type="submit"
        >
          {isLogin ? "Sign In" : "Sign Up"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8 h-[1px] w-full" />

        <button
          className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-12 font-medium shadow-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          type="button"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800" />
          <span className="text-neutral-700 text-sm">
            {isLogin ? "Sign in with Google" : "Sign up with Google"}
          </span>
          <BottomGradient />
        </button>
      </form>

      <div className="text-center mt-8">
        <p className="text-gray-400 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={toggleMode}
            className="text-blue-400 hover:text-blue-300 ml-1 font-medium transition-colors"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
}; 