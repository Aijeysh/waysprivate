/**
 * Dramatic Call-to-Action Section
 * 
 * Purpose: Final conversion section encouraging visitors to start
 * their project with Ways Private Limited.
 * 
 * Features:
 * - Full-width dramatic gradient
 * - Large compelling headline
 * - Animated entrance
 * - Multiple CTA options
 * - Contact preview
 * 
 * Used in: Homepage (/)
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone } from "lucide-react";

/**
 * WorkWithUs Component
 * 
 * Dramatic CTA section with gradient background and
 * clear action buttons for user engagement.
 * 
 * @returns {JSX.Element} CTA section
 */
const WorkWithUs: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 gradient-animate" />

      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl transform -translate-y-1/2" />

      {/* Content */}
      <motion.div
        className="relative max-w-5xl mx-auto text-center px-6 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-block mb-6"
        >
          <span className="px-5 py-2 text-sm font-semibold text-white bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            Ready to Create?
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Let's Bring Your Vision
          <br />
          <span className="text-gradient bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
            To Life
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Transform your story into a cinematic masterpiece. Our award-winning team is ready to collaborate and create something extraordinary.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="group relative px-10 py-5 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/about"
            className="px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300"
          >
            Learn More About Us
          </Link>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-slate-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="mailto:waysprivateltd@gmail.com"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm">waysprivateltd@gmail.com</span>
          </a>
          <a
            href="tel:+9779803008298"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm">+977 9803008298</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkWithUs;
