// src/components/Footer/page.tsx
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-black/90 via-neutral-900/80 to-black/90 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Ways Private Limited</h2>
          <p className="text-slate-400 max-w-sm">
            We craft cinematic experiences — from movies, feature films and music videos to creative content for brands and artists worldwide.
          </p>
          <SocialIcons /> {/* Client component */}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <p className="font-semibold text-white mb-4">Company</p>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white mb-4">Resources</p>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#">Blogs</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <p className="font-semibold text-white mb-4">Contact</p>
          <p className="text-slate-400 text-sm">Email: waysprivateltd@gmail.com</p>
          <p className="text-slate-400 text-sm">Phone: +977 9803008298</p>
          <p className="text-slate-400 text-sm">Kathmandu, Nepal</p>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
        © 2024 Ways Private Limited. All Rights Reserved.
      </div>
    </footer>
  );
}
