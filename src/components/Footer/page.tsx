/**
 * Cinematic Footer
 * 
 * Purpose: Premium footer with company info, links, and social media.
 * 
 * Features:
 * - Gradient background
 * - Organized link sections
 * - Social media icons with effects
 * - Newsletter signup
 * - Dynamic copyright year
 * 
 * Used in: All pages (via layout)
 */

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Send } from "lucide-react";

/**
 * Footer Component
 * 
 * Comprehensive footer with company information,
 * navigation, social links, and newsletter signup.
 * 
 * @returns {JSX.Element} Footer section
 */
export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#13131A] to-[#0A0A0F] text-white overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16 py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                <Image
                  src="/Ways_Private_Limited_Logo.jpeg"
                  alt="Ways Private Limited Logo"
                  width={40}
                  height={40}
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ways</h3>
                <p className="text-xs text-slate-400">Private Limited</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {`Nepal's premier movie production company crafting cinematic masterpieces since 2007.`}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/waysprivate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
              <a
                href="https://www.instagram.com/waysprivate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-pink-600 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
              <a
                href="mailto:waysprivateltd@gmail.com"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-purple-600 transition-all duration-300 group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/film-production" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                  Film Production
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-px bg-blue-400 group-hover:w-4 transition-all duration-300" />
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:waysprivateltd@gmail.com"
                  className="flex items-start gap-3 text-slate-400 hover:text-blue-400 transition-colors group"
                >
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">waysprivateltd@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+9779803008298"
                  className="flex items-start gap-3 text-slate-400 hover:text-blue-400 transition-colors group"
                >
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+977 9803008298</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-400 transition-colors text-sm"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group"
                aria-label="Subscribe to newsletter"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Ways Private Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
