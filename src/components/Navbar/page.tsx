"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-black/90 via-neutral-900/80 to-black/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-white">Ways</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-semibold text-white">
          <Link href="/">Home</Link>
          <Link href="/">Services</Link>
          <Link href="/">About</Link>
          <Link href="/">Blogs</Link>
          <Link href="/">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md w-full text-white flex flex-col items-center py-4 space-y-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
