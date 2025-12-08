/**
 * Cinematic Showcase Section
 * 
 * Purpose: Display featured projects in an engaging bento grid layout
 * with hover effects and category tags.
 * 
 * Features:
 * - Asymmetric bento grid layout
 * - Image hover effects (scale, overlay)
 * - Category badges
 * - Smooth transitions
 * - Click-through to project details
 * 
 * Used in: Homepage (/)
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Film } from "lucide-react";

interface ShowcaseItem {
  id: number;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  link: string;
  size: 'large' | 'medium' | 'small'; // for bento grid sizing
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 1,
    title: "Taraharu",
    category: "Feature Film",
    description: "A cinematic journey showcasing emotion and storytelling",
    imageSrc: "/Movie_Taraharu_by_Ways_Private_Limited.jpeg",
    link: "/portfolio/taraharu",
    size: 'large',
  },
  {
    id: 2,
    title: "Kaancho Dhaago",
    category: "Theatre",
    description: "Theatrical masterpiece exploring inner emotions",
    imageSrc: "/Kaancho_Dhaago.jpg",
    link: "/portfolio/kaancho-dhaago",
    size: 'medium',
  },
  {
    id: 3,
    title: "Sathi Sathi Aaideuna",
    category: "Theatre",
    description: "Life lessons through powerful performances",
    imageSrc: "/Sathi_Sathi_Aaideuna.jpg",
    link: "/portfolio/sath-sathi-aaideuna",
    size: 'medium',
  },
  {
    id: 4,
    title: "Dhalkeko Saalaijo",
    category: "Theatre",
    description: "Universal storytelling for all audiences",
    imageSrc: "/Dhalkeko_Saalaijo.jpg",
    link: "/portfolio/dhalkeko-saalaijo",
    size: 'small',
  },
  {
    id: 5,
    title: "Bullet and the Buddha",
    category: "Theatre",
    description: "Contrasting philosophies in dramatic form",
    imageSrc: "/Bullet_And_The_Buddha.jpg",
    link: "/portfolio/bullet-and-the-buddha",
    size: 'small',
  },
  {
    id: 6,
    title: "Katha Express",
    category: "Theatre",
    description: "Stories that move and inspire",
    imageSrc: "/Katha_Express.jpg",
    link: "/portfolio/katha-express",
    size: 'small',
  },
];

/**
 * Showcase Component
 * 
 * Displays portfolio items in a modern bento grid layout
 * with cinematic styling and smooth interactions.
 * 
 * @returns {JSX.Element} Showcase section with project grid
 */
const Showcase: React.FC = () => {
  return (
    <section className="section-padding relative bg-gradient-to-b from-[#0A0A0F] to-[#13131A] text-white overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full border border-blue-400/20">
            Our Work
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Cinematic <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From feature films to theatrical masterpieces, explore our portfolio of award-winning productions that captivate audiences.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Large Item - Spans 2 columns and 2 rows */}
          {showcaseItems.filter(item => item.size === 'large').map(item => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative md:col-span-2 md:row-span-2 h-[400px] md:h-[600px] rounded-2xl overflow-hidden hover-lift"
            >
              {/* Image */}
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="inline-block w-fit px-3 py-1 mb-3 text-xs font-semibold text-amber-300 bg-amber-500/20 rounded-full border border-amber-500/30">
                  <Film className="inline w-3 h-3 mr-1" />
                  {item.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base mb-4">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-blue-400">
                  <Play className="w-5 h-5" />
                  <span className="text-sm font-medium">View Project</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Medium Items - Span 2 columns each */}
          {showcaseItems.filter(item => item.size === 'medium').map(item => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative md:col-span-2 h-[300px] rounded-2xl overflow-hidden hover-lift"
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block w-fit px-3 py-1 mb-2 text-xs font-semibold text-purple-300 bg-purple-500/20 rounded-full border border-purple-500/30">
                  {item.category}
                </span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}

          {/* Small Items - Regular size */}
          {showcaseItems.filter(item => item.size === 'small').map(item => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative h-[300px] rounded-2xl overflow-hidden hover-lift"
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block w-fit px-2 py-1 mb-2 text-xs font-semibold text-blue-300 bg-blue-500/20 rounded-full">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full border-2 border-blue-400 hover:bg-blue-400 transition-all duration-300"
          >
            <span>View All Projects</span>
            <Play className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
