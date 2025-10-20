// src/components/Footer/page.tsx
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-black/90 via-neutral-900/80 to-black/90 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div className="space-y-4">
          <h5 className="text-2xl font-bold text-white">Ways Private Limited</h5>
          <p className="text-slate-400 max-w-sm">
            We craft cinematic experiences — from feature films and music videos to creative content for brands and artists worldwide.
          </p>
          <SocialIcons /> {/* Client component */}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-10">
          <div>
            <h6 className="font-semibold text-white mb-4">Company</h6>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-semibold text-white mb-4">Resources</h6>
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
          <h6 className="font-semibold text-white mb-4">Contact</h6>
          <p className="text-slate-400 text-sm">Email: contact@waysprivatelimited.com</p>
          <p className="text-slate-400 text-sm">Phone: +977 980-XXXXXXX</p>
          <p className="text-slate-400 text-sm">Kathmandu, Nepal</p>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
        © 2024 Ways Private Limited. All Rights Reserved.
      </div>
    </footer>
  );
}
