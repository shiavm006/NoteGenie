import Link from "next/link";
import GlobeDemo from "@/components/globe-demo";
import { Spotlight } from "@/components/ui/spotlight-new";
import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards-demo";
import { FeaturesSectionDemo } from "@/components/ui/features-section-demo";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Spotlight Effect - Now placed at the top level */}
      <Spotlight />
      
      {/* Header Navigation - Exact match */}
      <header className="flex items-center justify-between px-8 py-6 relative z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-6 h-6 mr-3">
            <svg viewBox="0 0 24 24" className="w-full h-full text-white">
              <circle cx="12" cy="12" r="3" fill="currentColor"/>
              <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-xl font-semibold text-white">Note Ginie</span>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-8">
          <span className="text-gray-700 hover:text-white cursor-pointer font-medium text-base">Overview</span>
          <span className="text-gray-700 hover:text-white cursor-pointer font-medium text-base">Plans</span>
          
          {/* Get the app button - Now links to auth page */}
          <Link
            href="/auth"
            className="bg-white text-black px-5 py-2.5 rounded-xl font-medium hover:bg-gray-800 hover:text-white transition-colors text-sm border border-white"
          >
            Login/Signup
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-start px-8 pt-24 pb-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading - Adjusted smaller sizes */}
          <h1 className="font-bold mb-8 leading-tight tracking-tight">
            <div className="text-white text-6xl lg:text-7xl mb-4">Understand</div>
            <div className="text-6xl lg:text-7xl bg-gradient-to-r from-green-400 via-teal-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Anything
            </div>
          </h1>

          {/* Subheading - Adjusted size */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
            Your research and thinking partner, grounded in the information you trust, built with the latest Gemini models.
          </p>

          {/* CTA Button - Refined sizing */}
          <Link
            href="/auth"
            className="inline-block bg-white text-black px-7 py-3 rounded-xl text-base font-medium hover:bg-gray-800 hover:text-white transition-colors"
          >
            Join Now
          </Link>
        </div>

        {/* Bottom Section - Adjusted positioning and size */}
        <div className="text-center mt-32">
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
            Effortless Smart Notes, Instantly Organized
          </h2>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full relative z-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to take your studies to the next level
          </p>
        </div>
        <FeaturesSectionDemo />
      </section>

      {/* Globe Section */}
      <section className="w-full relative z-10">
        <GlobeDemo />
      </section>

      {/* Testimonials Section */}
      <section className="w-full relative z-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover how Note Ginie is transforming the way people learn and organize their knowledge.
          </p>
        </div>
        <InfiniteMovingCardsDemo />
      </section>
    </div>
  );
}
