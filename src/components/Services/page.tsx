"use client";

import Image from "next/image";
import Link from "next/link";
import { easeOut, motion } from "framer-motion";

interface ServiceItem {
  id: number;
  title: string;
  overview: string;
  imageSrc: string;
  link: string;
}

const services: ServiceItem[] = [
  {
    id: 1,
    title: "Theatre Production",
    overview: "End-to-end theatre production services from concept to release.",
    imageSrc: "/Ways_Private_Limited_Logo.jpeg",
    link: "/services/theatre-production",
  },
  {
    id: 2,
    title: "Movie Production",
    overview: "Movie solutions and services from concept to production release",
    imageSrc: "/Ways_Private_Limited_Logo.jpeg",
    link: "/services/movie-production",
  },
  {
    id: 3,
    title: "Commercials & Ads",
    overview: "High-end commercial productions that elevate your brand story.",
    imageSrc: "/Ways_Private_Limited_Logo.jpeg",
    link: "/services/commercials-ads",
  },
  {
    id: 4,
    title: "Documentaries",
    overview: "Capturing real-life stories with cinematic excellence.",
    imageSrc: "/Ways_Private_Limited_Logo.jpeg",
    link: "/services/documentaries",
  },
  {
    id: 5,
    title: "Post Production",
    overview: "Editing, VFX, sound design, and color grading to perfection.",
    imageSrc: "/Ways_Private_Limited_Logo.jpeg",
    link: "/services/post-production",
  },
  {
    id: 6,
    title: "Brand Storytelling",
    overview: "Crafting immersive narratives for brands and campaigns.",
    imageSrc: "/Ways_Private_Limited_Logo.jpeg",
    link: "/services/brand-storytelling",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  hover: { scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.5)" },
};

const Services: React.FC = () => {
  return (
    <section className="w-full py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Explore our cinematic services designed to bring stories, music, and brands to life.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6 md:px-16">
        {services.map((service) => (
          <Link key={service.id} href={service.link} passHref>
            <motion.div
              className="group bg-black rounded-2xl overflow-hidden cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
              >
                <Image
                  src={service.imageSrc}
                  alt={service.title}
                  width={400}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-500"
                />
              </motion.div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm">{service.overview}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Services;
