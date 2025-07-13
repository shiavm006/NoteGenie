"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { createUserProfile } from "@/lib/firebase-db";

export default function AuthFormDemo() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password);
        
        // Create user profile for new users
        if (result.success && result.user) {
          await createUserProfile({
            uid: result.user.uid,
            email: result.user.email || "",
            displayName: `${formData.firstName} ${formData.lastName}`.trim() || result.user.displayName || "User",
            photoURL: result.user.photoURL || undefined,
            preferences: {
              theme: 'dark',
              notifications: true,
              privacy: 'private',
            },
            statistics: {
              totalBooks: 0,
              totalNotes: 0,
              readingTime: 0,
            },
          });
        }
      }

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    // Reset form when switching modes
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        // Create user profile for Google sign-in
        await createUserProfile({
          uid: result.user.uid,
          email: result.user.email || "",
          displayName: result.user.displayName || "User",
          photoURL: result.user.photoURL || undefined,
          preferences: {
            theme: 'dark',
            notifications: true,
            privacy: 'private',
          },
          statistics: {
            totalBooks: 0,
            totalNotes: 0,
            readingTime: 0,
          },
        });
        
        router.push("/dashboard");
      } else {
        setError(result.error || "Google sign-in failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
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

      {error && (
        <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

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
          className="relative group/btn bg-blue-600 hover:bg-gray-800 block w-full text-white rounded-md h-12 font-medium shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : (isLogin ? "Sign In" : "Sign Up")}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8 h-[1px] w-full" />

        <button
          className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-12 font-medium shadow-lg bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800" />
          <span className="text-neutral-700 text-sm">
            {isLoading ? "Loading..." : (isLogin ? "Sign in with Google" : "Sign up with Google")}
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