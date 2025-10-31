"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "John Carter",
    role: "Film Director",
    feedback:
      "Ways Private Limited transformed my script into a cinematic masterpiece. Their team truly understands storytelling.",
  },
  {
    name: "Aisha Khan",
    role: "Music Artist",
    feedback:
      "They turned my vision into a music video that exceeded expectations. Professional, creative, and passionate!",
  },
  {
    name: "Rajiv Sharma",
    role: "Brand Manager",
    feedback:
      "Our brand film not only boosted awareness but gave us a cinematic identity. Truly world-class execution.",
  },
  {
    name: "Emily Brown",
    role: "Producer",
    feedback:
      "From concept to final edit, the dedication and artistry blew us away. They are our go-to creative team now.",
  },
  {
    name: "Sanjay Mehta",
    role: "Entrepreneur",
    feedback:
      "Our corporate documentary was shot and edited with cinematic brilliance. Exceeded expectations on all fronts.",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // ✅ Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // change slide every 6s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6"
        >
          What Our Clients Say
        </motion.h2>

        {/* Subtitle */}
        <p className="text-slate-400 max-w-2xl mx-auto mb-12">
          Real stories from directors, brands, and artists who trusted{" "}
          <span className="text-blue-500">Ways Private Limited</span>.
        </p>

        {/* Slider Container */}
        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 p-3 bg-slate-800/70 hover:bg-slate-700 rounded-full shadow-lg transition"
            aria-label="Go to previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="p-8 max-w-xl mx-10 rounded-xl bg-slate-800/70 border border-slate-700 shadow-xl backdrop-blur-lg"
          >
            <p className="text-slate-300 italic mb-6">
              “{testimonials[index].feedback}”
            </p>
            <h3 className="text-lg font-semibold">{testimonials[index].name}</h3>
            <p className="text-sm text-slate-400">{testimonials[index].role}</p>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 p-3 bg-slate-800/70 hover:bg-slate-700 rounded-full shadow-lg transition"
            aria-label="Go to next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <a
            href="/testimonials"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg transition"
          >
            View More Testimonials →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
