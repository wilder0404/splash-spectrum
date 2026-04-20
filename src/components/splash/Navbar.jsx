import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";

const navLinks = [
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Why Us', href: '#why' },
  { label: 'Location', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-obsidian/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Splash Spectrum" className="w-10 h-10 md:w-12 md:h-12 rounded-full" />
            <span className="font-heading font-extrabold text-lg md:text-xl text-white tracking-tight">
              SPLASH <span className="text-neon-pink text-glow-pink">SPECTRUM</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                className="text-white/70 hover:text-neon-pink transition-colors font-body text-sm tracking-wide uppercase">
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#booking')}
              className="px-6 py-2.5 bg-neon-pink text-white font-heading font-bold rounded-full text-sm animate-pulse-glow hover:scale-105 transition-transform">
              Book Now
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <button key={link.href} onClick={() => scrollTo(link.href)}
                  className="block w-full text-left text-white/80 hover:text-neon-pink font-body text-base py-2 uppercase tracking-wide">
                  {link.label}
                </button>
              ))}
              <button onClick={() => scrollTo('#booking')}
                className="w-full px-6 py-3 bg-neon-pink text-white font-heading font-bold rounded-full text-base animate-pulse-glow">
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}