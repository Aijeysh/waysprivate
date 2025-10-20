"use client";

import { motion } from "framer-motion";

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
  {
    name: "Laura Smith",
    role: "Creative Director",
    feedback:
      "They know how to bring emotion into visuals. Every frame felt purposeful and powerful.",
  },
];

export default function TestimonialsPage() {
  return (
    <section className="relative min-h-screen py-20 px-6 md:px-16 bg-gradient-to-b from-black via-slate-900 to-black text-white overflow-hidden">
      {/* Background cinematic glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-6"
        >
          Testimonials
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-slate-400 max-w-2xl mx-auto mb-16"
        >
          Stories from directors, artists, and brands who trusted{" "}
          <span className="text-blue-500">Ways Private Limited</span> to
          transform visions into cinematic reality.
        </motion.p>

        {/* Testimonials Grid */}
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-slate-800/70 border border-slate-700 shadow-lg backdrop-blur-lg text-left"
            >
              <p className="text-slate-300 italic mb-4">“{t.feedback}”</p>
              <h4 className="text-lg font-semibold">{t.name}</h4>
              <p className="text-sm text-slate-400">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
