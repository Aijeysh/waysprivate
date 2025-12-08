/**
 * Cinematic Team Card Component
 * 
 * Purpose: Showcase team members with premium card design
 * matching the website's cinematic aesthetic.
 * 
 * Features:
 * - Glassmorphism effect
 * - Profile photo with glow
 * - Gradient accent on hover
 * - Social icon buttons
 * - Smooth animations
 * 
 * Used in: About page
 */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Linkedin, Mail } from "lucide-react";

interface TeamProps {
  name: string;
  role: string;
  bio: string;
  facebook: string;
  linkedin: string;
  email: string;
  photo: string;
}

/**
 * TeamCard Component
 * 
 * Premium card design for team member profiles.
 * Features glassmorphism, hover effects, and social links.
 * 
 * @param {TeamProps} props - Team member information
 * @returns {JSX.Element} Team member card
 */
export default function TeamCard({ name, role, bio, facebook, linkedin, email, photo }: TeamProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="glass relative p-8 rounded-3xl overflow-hidden">

        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center">

          {/* Profile Photo with Glow */}
          <div className="relative mb-6">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500" />

            {/* Photo container */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
              <Image
                src={photo}
                alt={name}
                fill
                sizes="160px"
                className="object-cover"
                priority
              />
            </div>

            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
          </div>

          {/* Name */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {name}
          </h3>

          {/* Role with gradient */}
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold mb-4">
            {role}
          </p>

          {/* Bio */}
          <p className="text-slate-300 leading-relaxed mb-6">
            {bio}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-blue-600 transition-all duration-300 group/btn"
              aria-label={`${name}'s Facebook`}
            >
              <Facebook className="w-5 h-5 text-slate-400 group-hover/btn:text-white" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass hover:bg-blue-700 transition-all duration-300 group/btn"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin className="w-5 h-5 text-slate-400 group-hover/btn:text-white" />
            </a>
            <a
              href={`mailto:${email}`}
              className="p-3 rounded-full glass hover:bg-purple-600 transition-all duration-300 group/btn"
              aria-label={`Email ${name}`}
            >
              <Mail className="w-5 h-5 text-slate-400 group-hover/btn:text-white" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
