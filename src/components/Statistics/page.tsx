"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface StatItem {
  id: number;
  label: string;
  value: number;
  emoji: string;
}

const stats: StatItem[] = [
  { id: 1, label: "Completed Projects", value: 85, emoji: "🎬" },
  { id: 2, label: "Ongoing Projects", value: 12, emoji: "🎥" },
  { id: 3, label: "Happy Clients", value: 50, emoji: "😊" },
];

// Hook to animate number count up
const useCounter = (target: number, duration = 2): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60); // ~60fps
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 60);
    return () => clearInterval(interval);
  }, [target, duration]);

  return count;
};

// Individual Stat Card
const StatCard: React.FC<{ stat: StatItem; delay?: number }> = ({ stat, delay = 0 }) => {
  const count = useCounter(stat.value, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="bg-neutral-900/60 p-8 rounded-3xl flex flex-col items-center justify-center border border-gray-700 hover:scale-105 transition-transform relative z-10 shadow-lg"
    >
      <div className="text-5xl mb-4">{stat.emoji}</div>
      <div className="text-4xl font-bold">{count >= 50 ? `${count}+` : count}</div>
      <p className="text-slate-300 mt-2 text-base">{stat.label}</p>
    </motion.div>
  );
};

// Diagonal moving light streaks
const LightStreak: React.FC<{ className?: string; duration?: number; rotate?: number }> = ({ className, duration = 8, rotate = -25 }) => (
  <motion.div
    className={`absolute w-1 h-48 bg-gradient-to-b from-white/20 to-transparent rounded-full ${className}`}
    style={{ rotate }}
    animate={{ y: ["-100%", "120%"] }}
    transition={{ repeat: Infinity, duration, ease: "linear", repeatType: "loop" }}
  />
);

// Moving film reel strips
const FilmReelStrip: React.FC<{ top: string; speed?: number }> = ({ top, speed = 30 }) => (
  <motion.div
    className={`absolute w-[200%] h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-full opacity-20`}
    style={{ top }}
    animate={{ x: ["0%", "-50%"] }}
    transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
  />
);

const Statistics: React.FC = () => {
  return (
    <section className="w-full py-24 bg-gradient-to-t from-black via-neutral-900 to-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          Bringing Stories to Life
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 relative z-10">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} delay={index * 0.3} />
          ))}
        </div>
      </div>

      {/* Cinematic gradient flares */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-800/40 to-purple-900/30 filter blur-3xl opacity-40"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-800/30 to-red-900/20 filter blur-3xl opacity-40"></div>

      {/* Diagonal cinematic light streaks */}
      <LightStreak className="top-0 left-1/4" duration={10} rotate={-20} />
      <LightStreak className="top-0 right-1/3" duration={12} rotate={15} />
      <LightStreak className="top-0 left-2/3" duration={14} rotate={-10} />
      <LightStreak className="bottom-0 right-1/4" duration={16} rotate={25} />

      {/* Subtle moving film reel strips */}
      <FilmReelStrip top="30%" speed={35} />
      <FilmReelStrip top="60%" speed={50} />
      <FilmReelStrip top="80%" speed={45} />
    </section>
  );
};

export default Statistics;
