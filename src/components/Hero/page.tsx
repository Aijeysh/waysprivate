/**
 * Epic Cinematic Hero Section
 * 
 * Purpose: Full-screen immersive hero with animated background,
 * gradient text, and compelling call-to-action.
 * 
 * Features:
 * - Animated gradient background
 * - Large dramatic headline
 * - Smooth entrance animations
 * - Scroll indicator
 * - Responsive design
 * 
 * Used in: Homepage (/)
 */

"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Cinematic Hero Component
 * 
 * Full-screen hero section with animations and dramatic visuals
 * for Ways Private Limited movie production company.
 * 
 * @returns {JSX.Element} Epic hero section
 */
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#1E3A8A] to-[#0A0A0F]">

      {/* Animated Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 gradient-animate" />

      {/* Particle Effect Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content Container */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 md:px-16 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6">
          <span className="block text-white mb-2">
            From Script to Screen
          </span>
          <span className="block text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent gradient-animate">
            We Bring Stories to Life
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Nepal's premier movie production company crafting cinematic masterpieces,
          music videos, and brand stories that captivate audiences worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
          >
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/about"
            className="px-10 py-4 border-2 border-blue-400 text-blue-400 text-lg font-semibold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300"
          >
            Our Story
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">17+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <span className="text-sm">50+ Projects Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <span className="text-sm">40+ Happy Clients</span>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute  bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 cursor-pointer group">
          <span className="text-sm uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
            Scroll to Explore
          </span>
          <div className="relative">
            {/* Icon container */}
            <div className="relative w-12 h-12 rounded-full border-2 border-blue-400 flex items-center justify-center bg-blue-400/10 backdrop-blur-sm group-hover:bg-blue-400/20 transition-all">
              <ArrowDown className="w-5 h-5 text-blue-400 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
