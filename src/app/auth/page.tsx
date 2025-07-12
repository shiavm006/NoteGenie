import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight-new";
import AuthFormDemo from "@/components/auth-form-demo";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Spotlight Effect */}
      <Spotlight 
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(160, 100%, 85%, .12) 0, hsla(180, 100%, 55%, .06) 50%, hsla(200, 100%, 45%, 0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .08) 0, hsla(180, 100%, 55%, .04) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(160, 100%, 85%, .06) 0, hsla(200, 100%, 45%, .03) 80%, transparent 100%)"
        duration={10}
        xOffset={40}
      />
      
      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 z-50">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white hover:text-green-400 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <AuthFormDemo />
      </div>
    </div>
  );
} 