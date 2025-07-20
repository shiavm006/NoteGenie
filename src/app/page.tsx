import Link from "next/link";
import GlobeDemo from "@/components/globe-demo";
import { Spotlight } from "@/components/ui/spotlight-new";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
import { FeaturesSectionDemo } from "@/components/ui/features-section-demo";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Spotlight Effect - Now placed at the top level */}
      <Spotlight />
      
      {/* Header Navigation - Responsive */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 relative z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-6 h-6 mr-3">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white">
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
              <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-lg sm:text-xl font-semibold text-white">Note Ginie</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
          <span className="text-gray-700 hover:text-white cursor-pointer font-medium text-sm lg:text-base">Overview</span>
          <span className="text-gray-700 hover:text-white cursor-pointer font-medium text-sm lg:text-base">Plans</span>
          
          {/* Get the app button - Now links to auth page */}
          <Link
            href="/auth"
            className="bg-gray-700 text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm border border-gray-700"
          >
            Login/Signup
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden">
          <Link
            href="/auth"
            className="bg-gray-700 text-white px-3 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm border border-gray-700"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-start px-4 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading - Responsive sizing */}
          <h1 className="font-bold mb-6 sm:mb-8 leading-tight tracking-tight">
            <div className="text-white text-4xl sm:text-6xl lg:text-7xl mb-2 sm:mb-4">Understand</div>
            <div className="text-4xl sm:text-6xl lg:text-7xl bg-gradient-to-r from-green-400 via-teal-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Anything
            </div>
          </h1>

          {/* Subheading - Responsive sizing */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-normal px-4">
            Your research and thinking partner, grounded in the information you trust, built with the latest Gemini models.
          </p>

          {/* CTA Button - Responsive sizing */}
          <Link
            href="/auth"
            className="inline-block bg-gray-700 text-white px-6 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Join Now
          </Link>
        </div>

        {/* Bottom Section - Responsive positioning and sizing */}
        <div className="text-center mt-20 sm:mt-32 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Effortless Smart Notes, Instantly Organized
          </h2>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full relative z-10 py-8 sm:py-12 px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Everything you need to take your studies to the next level
          </p>
        </div>
        <FeaturesSectionDemo />
      </section>

      {/* Globe Section */}
      <section className="w-full relative z-10 py-8 sm:py-12 px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
            Explore the World of Notes
          </h2>
        </div>
        <GlobeDemo />
      </section>

      {/* Testimonials Section */}
      <section className="w-full relative z-10 py-8 sm:py-12 px-4">
        <div className="text-center mb-4 sm:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-2">
            What Our Users Say
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-0 px-4">
            Discover how Note Ginie is transforming the way people learn and organize their knowledge.
          </p>
        </div>
        <InfiniteMovingCardsDemo />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
