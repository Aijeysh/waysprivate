// src/components/Hero/page.tsx
import Link from "next/link";
import HeroAnimations from "./HeroAnimations";

export default function Hero() {
  return (
    <section className="mt-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
          From Script to Screen —
          <span className="text-blue-500"> We Bring Stories, Songs & Dreams to Life.</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-xl">
          We are a full-service Nepali movie production company creating movies, feature films, music videos, and cinematic content for brands and artists worldwide.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition">
            Work with us
          </Link>
        </div>
      </div>

      {/* Image Collage Section */}
      <div className="flex-1 grid grid-cols-2 gap-4 overflow-hidden">
        <HeroAnimations />
      </div>
    </section>
  );
}
