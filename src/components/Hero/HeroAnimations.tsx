"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Streak {
  width: number;
  height: number;
  top: number;
  left: number;
  delay: number;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function HeroAnimations() {
  const images = [
    { src: "/Movie_Taraharu_by_Ways_Private_Limited.jpeg", alt: "Nepali Movie Tarharu Poster" },
    { src: "/Kaancho_Dhaago.jpg", alt: "Nepali Play Kaancho Dhaago Poster" },
    { src: "/Daraudi_Ko_Paani.jpg", alt: "Nepali Play Daraudi Ko Paani Poster" },
    { src: "/Dhalkeko_Saalaijo.jpg", alt: "Neplai Play Dhalkeko Saalaijo Poster" },
  ];

  // Client-side only streaks
  const [streaks, setStreaks] = useState<Streak[]>([]);

  useEffect(() => {
    const generated = [...Array(15)].map(() => ({
      width: random(10, 30),
      height: random(10, 30),
      top: random(0, 100),
      left: random(0, 100),
      delay: random(0, 2),
    }));
    setStreaks(generated);
  }, []);

  return (
    <>
      {/* Floating Images */}
      {images.map((img, idx) => {
        const xRange = idx % 2 === 0 ? [-10, 10] : [-8, 12];
        const yRange = idx < 2 ? [-5, 15] : [-10, 10];
        const duration = random(6, 10);
        const delay = random(0, 3);
        const rotate = random(-2, 2);

        return (
          <motion.div
            key={idx}
            animate={{
              y: yRange,
              x: xRange,
              rotate: [rotate, -rotate, rotate],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: delay,
            }}
            whileHover={{ scale: 1.05 }}
            className="flex rounded-xl shadow-lg overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={250}
              height={250}
              className="object-cover rounded-xl"
            />
          </motion.div>
        );
      })}

      {/* Client-side only light streaks */}
      {streaks.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-blue-500/20 blur-xl animate-light-streak"
          style={{
            width: `${s.width}px`,
            height: `${s.height}px`,
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}
