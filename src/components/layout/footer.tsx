import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 sm:py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 mr-2">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white">
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
              <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-base sm:text-lg font-semibold text-white">Note Ginie</span>
        </div>
        <div className="text-gray-400 text-xs sm:text-sm text-center">
          © 2024 Note Ginie. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 