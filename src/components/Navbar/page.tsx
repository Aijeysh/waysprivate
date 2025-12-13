/**
 * Cinematic Navigation Bar
 * 
 * Purpose: Premium navigation with glassmorphism effect and smooth animations.
 * 
 * Features:
 * - Glassmorphism backdrop blur
 * - Animated logo
 * - Smooth hover effects
 * - Enhanced mobile menu
 * - Scroll-based background opacity
 * 
 * Used in: All pages (via layout)
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

/**
 * Navigation Links Configuration
 * Edit this array to add/remove navigation items
 */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

/**
 * Navbar Component
 * 
 * Responsive navigation bar with glassmorphism effect.
 * Changes opacity based on scroll position.
 * 
 * @returns {JSX.Element} Navigation bar
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll position for background effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if link is active
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/" && href.includes(pathname);
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-black/80 backdrop-blur-xl shadow-lg"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 group-hover:scale-110 transition-transform duration-300" />
              {/* Logo Image */}
              <div className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden glow">
                <Image
                  src="/Ways-Private-Limited-Logo.jpeg"
                  alt="Ways Private Limited Logo"
                  width={48}
                  height={48}
                  className="object-contain p-1"
                  priority
                />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Ways
              </span>
              <p className="text-xs text-slate-400 -mt-1">Private Limited</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors group ${isActive(link.href)
                  ? "text-white"
                  : "text-slate-300 hover:text-white"
                  }`}
              >
                {link.label}
                {/* Underline animation - always visible on active page */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${isActive(link.href)
                  ? "w-full"
                  : "w-0 group-hover:w-full"
                  }`} />
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-lg hover:translate-x-2 transition-all ${isActive(link.href)
                  ? "text-white font-semibold"
                  : "text-slate-300 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full mt-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
