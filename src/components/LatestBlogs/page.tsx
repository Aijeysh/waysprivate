"use client";

import Image from "next/image";
import Link from "next/link";
import { easeOut, motion } from "framer-motion";

interface BlogItem {
  id: number;
  title: string;
  overview: string;
  coverImage: string;
  link: string;
}

const blogs: BlogItem[] = [
  {
    id: 1,
    title: "Behind the Scenes of Our Latest Music Video",
    overview: "Take a peek at the creative process, from concept to final cut, for our newest music video project.",
    coverImage: "/Ways_Private_Limited_Logo.jpeg",
    link: "/blogs/behind-the-scenes-music-video",
  },
  {
    id: 2,
    title: "Cinematic Storytelling for Brands",
    overview: "Discover how cinematic visuals can elevate brand storytelling and connect with audiences on a deeper level.",
    coverImage: "/Ways_Private_Limited_Logo.jpeg",
    link: "/blogs/cinematic-storytelling-brands",
  },
  {
    id: 3,
    title: "Top Trends in Music Video Production",
    overview: "Explore the latest trends shaping the music video industry and how we incorporate them into our projects.",
    coverImage: "/Ways_Private_Limited_Logo.jpeg",
    link: "/blogs/music-video-production-trends",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  hover: { scale: 1.03, boxShadow: "0px 20px 40px rgba(0,0,0,0.4)" },
};

const LatestBlogs: React.FC = () => {
  return (
    <section className="w-full py-24 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Latest Blogs</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Insights, stories, and behind-the-scenes from Ways Private Limited. Stay updated with our cinematic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
        {blogs.map((blog) => (
          <Link key={blog.id} href={blog.link} passHref>
            <motion.div
              className="group bg-black rounded-2xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <motion.div
                className="overflow-hidden"
                whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
              >
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover transition-transform duration-500"
                />
              </motion.div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{blog.overview}</p>
                <span className="text-blue-500 font-semibold hover:underline">
                  Read More →
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestBlogs;
