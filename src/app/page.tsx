import Hero from "@/components/Hero/page";
import LatestBlogs from "@/components/LatestBlogs/page";
import Portfolio from "@/components/Portfolio/page";
import Services from "@/components/Services/page";
import Statistics from "@/components/Statistics/page";
import Testimonials from "@/components/Testimonials/page";
import WorkWithUs from "@/components/WorkWithUs/page";

export default function Home() {
  return (
    <div className=" flex flex-col overflow-hidden">
      <Hero />
      <Portfolio />
      <Services />
      <Statistics />
      <LatestBlogs />
      <Testimonials />
      <WorkWithUs />
    </div>
  );
}
