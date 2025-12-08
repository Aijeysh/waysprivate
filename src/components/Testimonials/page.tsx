/**
 * Cinematic Testimonials Section
 * 
 * Purpose: Showcase client testimonials with photos in a carousel format.
 * Designed for easy manual editing - simply update the testimonials array.
 * 
 * Features:
 * - Auto-play carousel
 * - Manual navigation (prev/next)
 * - Client photos with glow effects
 * - Quote styling
 * - Responsive design
 * 
 * HOW TO ADD/EDIT TESTIMONIALS:
 * 1. Add client photo to /public folder
 * 2. Update the testimonials array below
 * 3. Fill in: name, role, company, feedback, photo path
 * 
 * Used in: Homepage (/)
 */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

/**
 * TESTIMONIALS DATA
 * 
 * ✏️ EDIT THIS ARRAY to add/remove/modify testimonials
 * 
 * Format:
 * - name: Client's full name
 * - role: Job title
 * - company: Company/Organization name
 * - feedback: Testimonial quote
 * - photo: Path to photo in /public folder (e.g., "/client-photo.jpg")
 *          Use "/Ways_Private_Limited_Logo.jpeg" as placeholder if no photo
 */
const testimonials = [
  {
    name: "John Carter",
    role: "Film Director",
    company: "Carter Productions",
    feedback:
      "Ways Private Limited transformed my script into a cinematic masterpiece. Their team truly understands storytelling and brings unmatched creativity to every frame.",
    photo: "/Ways_Private_Limited_Logo.jpeg", // Replace with actual client photo
  },
  {
    name: "Aisha Khan",
    role: "Music Artist",
    company: "Independent Artist",
    feedback:
      "They turned my vision into a music video that exceeded all expectations. The professionalism, creativity, and passion they bring is simply outstanding!",
    photo: "/Ways_Private_Limited_Logo.jpeg", // Replace with actual client photo
  },
  {
    name: "Rajiv Sharma",
    role: "Brand Manager",
    company: "Himalayan Ventures",
    feedback:
      "Our brand film not only boosted awareness but gave us a cinematic identity. The world-class execution and attention to detail was remarkable.",
    photo: "/Ways_Private_Limited_Logo.jpeg", // Replace with actual client photo
  },
  {
    name: "Emily Brown",
    role: "Executive Producer",
    company: "Global Media Group",
    feedback:
      "From concept to final edit, the dedication and artistry blew us away. Ways Private Limited is now our go-to creative team for all productions.",
    photo: "/Ways_Private_Limited_Logo.jpeg", // Replace with actual client photo
  },
];

/**
 * Testimonials Carousel Component
 * 
 * Auto-rotating carousel with manual controls.
 * Displays client testimonials with photos.
 * 
 * @returns {JSX.Element} Testimonials section with carousel
 */
export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to next testimonial
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Navigate to previous testimonial
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play carousel (changes every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="section-padding relative bg-gradient-to-b from-[#0A0A0F] to-[#13131A] text-white overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl transform -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-16">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-amber-400 bg-amber-400/10 rounded-full border border-amber-400/20">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What Our Clients <span className="text-gradient-accent">Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real stories from directors, brands, and artists who trusted Ways Private Limited to bring their vision to life.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center">

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-4 glass rounded-full hover:bg-white/10 transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
          </button>

          {/* Testimonial Card with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-4xl mx-16"
            >
              <div className="glass p-10 md:p-14 rounded-3xl relative">

                {/* Quote Icon */}
                <div className="absolute top-8 left-8 text-blue-400/20">
                  <Quote className="w-16 h-16" />
                </div>

                {/* Content Layout */}
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

                  {/* Client Photo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-400/30 shadow-lg glow">
                      <Image
                        src={currentTestimonial.photo}
                        alt={currentTestimonial.name}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400/20 animate-ping" />
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg md:text-xl text-slate-300 italic mb-6 leading-relaxed">
                      {`"{currentTestimonial.feedback}"`}
                    </p>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-blue-400 font-medium mb-1">
                        {currentTestimonial.role}
                      </p>
                      <p className="text-slate-400 text-sm">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-4 glass rounded-full hover:bg-white/10 transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "w-12 bg-blue-400"
                  : "w-2 bg-slate-600 hover:bg-slate-500"
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="/testimonials"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full border-2 border-blue-400 hover:bg-blue-400 transition-all duration-300"
          >
            View All Testimonials
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
