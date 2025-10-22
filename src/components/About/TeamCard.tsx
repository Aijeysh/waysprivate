// src/components/About/TeamCard.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamProps {
  name: string;
  role: string;
  bio: string;
  facebook: string;
  linkedin: string;
  email: string;
  photo: string; // path to image
}

export default function TeamCard({ name, role, bio, facebook, linkedin, email, photo }: TeamProps) {
  return (
    <motion.div
      className="bg-[#1b1b22]/80 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 shadow-xl hover:shadow-indigo-900/40 transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4">
          <Image src={photo} alt={name} fill className="rounded-full object-cover" />
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="text-indigo-400 font-medium">{role}</p>
        <p className="text-slate-300 mt-2">{bio}</p>

        {/* Social icons */}
        <div className="flex gap-4 mt-4">
          <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600 transition-colors">FB</a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600 transition-colors">LinkedIn</a>
          <a href={`mailto:${email}`} className="text-indigo-400 hover:text-indigo-600 transition-colors">Email</a>
        </div>
      </div>
    </motion.div>
  );
}
