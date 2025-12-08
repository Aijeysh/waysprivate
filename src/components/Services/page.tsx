/**
 * Cinematic Services Section
 * 
 * Purpose: Showcase production services with glassmorphism cards
 * and icon-based design.
 * 
 * Features:
 * - Glassmorphism card design
 * - Icon animations on hover
 * - Glow effects
 * - Smooth entrance animations
 * 
 * Used in: Homepage (/)
 */

"use client";

import { motion } from "framer-motion";
import { Film, Music, Video, FileText, Clapperboard, Sparkles } from "lucide-react";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Feature Films",
    description: "Full-scale movie production from script to screen with cinematic excellence",
    icon: <Film className="w-8 h-8" />,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Music Videos",
    description: "Creative music video production that captures the soul of your sound",
    icon: <Music className="w-8 h-8" />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Brand Content",
    description: "Compelling brand videos and commercials that tell your story",
    icon: <Video className="w-8 h-8" />,
    gradient: "from-pink-500 to-red-500",
  },
  {
    id: 4,
    title: "Theatre Productions",
    description: "Theatrical masterpieces from concept to stage performance",
    icon: <Clapperboard className="w-8 h-8" />,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    title: "Documentaries",
    description: "Authentic storytelling capturing real-life narratives with impact",
    icon: <FileText className="w-8 h-8" />,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 6,
    title: "Post Production",
    description: "Expert editing, VFX, sound design, and color grading services",
    icon: <Sparkles className="w-8 h-8" />,
    gradient: "from-cyan-500 to-blue-500",
  },
];

/**
 * Services Component
 * 
 * Displays production services in a glassmorphic card grid
 * with icon-based design and smooth animations.
 * 
 * @returns {JSX.Element} Services section with card grid
 */
const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding relative bg-gradient-to-b from-[#13131A] to-[#0A0A0F] text-white overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-purple-400 bg-purple-400/10 rounded-full border border-purple-400/20">
            What We Do
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Complete Production <span className="text-gradient-accent">Services</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From concept to completion, we handle every aspect of your production with professional expertise and creative vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="glass relative p-8 rounded-2xl h-full hover:bg-white/10 transition-all duration-300">

                {/* Gradient Border on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />

                {/* Icon Container */}
                <div className={`relative inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span className="text-sm font-medium">Learn More</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
