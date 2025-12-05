"use client";

import Image from "next/image";
import Link from "next/link";

interface PortfolioItem {
  id: number;
  title: string;
  overview: string;
  imageSrc: string;
  link: string; // Page to navigate on click
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Movie \"Taraharu\"",
    overview: "A cinematic journey showcasing emotion and storytelling.",
    imageSrc: "/Movie_Taraharu_by_Ways_Private_Limited.jpeg",
    link: "/portfolio/taraharu",
  },
  {
    id: 2,
    title: "Kaancho Dhaago",
    overview: "A theatre play showcasing inner emotion",
    imageSrc: "/Kaancho_Dhaago.jpg",
    link: "/portfolio/kaancho-dhaago",
  },
  {
    id: 3,
    title: "Sathi Sathi Aaideuna",
    overview: "A theatre play showcasing life learning lesson",
    imageSrc: "/Sathi_Sathi_Aaideuna.jpg",
    link: "/portfolio/sath-sathi-aaideuna",
  },
  {
    id: 4,
    title: "Dhalkeko Saalaijo",
    overview: "A theatre play for everyone",
    imageSrc: "/Dhalkeko_Saalaijo.jpg",
    link: "/portfolio/dhalkeko-saalaijo",
  },
  {
    id: 5,
    title: "Bullet and the Buddha",
    overview: "A theatre play contrasting Bullet and Buddha",
    imageSrc: "/Bullet_And_The_Buddha.jpg",
    link: "/portfolio/bullet-and-the-buddha",
  },
  {
    id: 6,
    title: "Katha Express",
    overview: "A theatre play showcasing bla bla",
    imageSrc: "/Katha_Express.jpg",
    link: "/portfolio/katha-express",
  },
];

const Portfolio: React.FC = () => {
  return (
    <section className="w-full py-24 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Discover a selection of our cinematic projects, music videos, and creative storytelling work.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-6 md:px-16">
        {portfolioItems.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="relative group cursor-pointer overflow-hidden rounded-2xl bg-neutral-800"
          >
            <Image
              src={item.imageSrc}
              alt={item.title}
              width={400}
              height={400}
              className="w-full h-full  object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300">{item.overview}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
