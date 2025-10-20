"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const WorkWithUs: React.FC = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white flex items-center justify-center">
      <motion.div
        className="max-w-4xl text-center px-6 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Let’s Bring Your Vision to Life
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-slate-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          At Ways Private Limited, we transform scripts, ideas, and music into cinematic experiences. Collaborate with us to create something unforgettable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/contact"
            className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full text-lg transition-transform transform hover:scale-105 hover:bg-blue-500 hover:text-white duration-300"
          >
            Work With Us
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkWithUs;
