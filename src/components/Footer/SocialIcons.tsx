// src/components/Footer/SocialIcons.tsx
"use client"; // ⚠️ This is mandatory

import { motion } from "framer-motion";

const socialIcons = [
  { name: "Facebook", url: "https://facebook.com/waysprivate", svg: <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z" /> },
  { name: "Instagram", url: "https://instagram.com/waysprivate/", svg: <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" /> },
  { name: "WhatsApp", url: "https://wa.me/9779803008298", svg: 
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.472-.149-.672.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-1.758-.867-2.908-1.54-4.073-3.455-.297-.498.297-.462.857-1.538.095-.198.048-.372-.024-.521-.073-.149-.672-1.612-.92-2.21-.242-.579-.487-.5-.672-.51-.173-.007-.372-.009-.571-.009-.198 0-.522.074-.796.372s-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074.148.198 2.095 3.198 5.076 4.486.709.306 1.262.434 1.722.44.722.01 1.397-.297 1.897-.595.516-.31.915-.684 1.046-1.063.13-.372.13-.684.092-.744-.039-.061-.141-.096-.296-.145zM12 2C6.486 2 2 6.486 2 12c0 1.828.594 3.523 1.588 4.875L2 22l5.063-1.583A10.025 10.025 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z" /> },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/ways-private-limited/", svg: <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M8 17v-7H5v7h3m-1.5-8.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6M20 17v-4.5c0-2.5-1.3-3.7-3-3.7-1.4 0-2.1.8-2.5 1.5V10h-3v7h3v-4.1c0-1 .2-2 1.5-2s1.5 1.1 1.5 2.1V17h3z" /> },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-4 mt-2">
      {socialIcons.map((icon) => (
        <motion.a
          key={icon.name}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="transition-opacity hover:opacity-80"
          about={icon.name + " Link"}
          content={icon.name + " profile"}
          aria-label={"Go to" + icon.name}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            {icon.svg}
          </svg>
        </motion.a>
      ))}
    </div>
  );
}
