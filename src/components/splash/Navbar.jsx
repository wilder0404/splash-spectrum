import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, isAr } = useLang();
  const { user, isAdmin: contextIsAdmin, signOut } = useAuth();
  // Only show admin button when logged in AND is admin email
  const isAdmin = user && (contextIsAdmin || user?.email === 'splash.spectrum10000@gmail.com');

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

  const navLinks = [
    { label: tr(lang, 'nav_experiences'), href: '#experiences' },
    { label: tr(lang, 'nav_gallery'), href: '#gallery' },
    { label: tr(lang, 'nav_why'), href: '#why' },
    { label: tr(lang, 'nav_location'), href: '#location' },
  ];

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

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)}
                className="text-white/70 hover:text-neon-pink transition-colors font-body text-sm tracking-wide uppercase">
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#booking')}
              className="px-6 py-2.5 bg-neon-pink text-white font-heading font-bold rounded-full text-sm animate-pulse-glow hover:scale-105 transition-transform">
              {tr(lang, 'nav_book')}
            </button>
            {/* Auth Buttons */}
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin-panel"
                    className="px-4 py-2 border border-uv-purple/50 text-uv-purple hover:bg-uv-purple/10 rounded-full text-xs font-heading font-semibold transition-all"
                  >
                    {isAr ? 'لوحة التحكم' : 'Admin'}
                  </Link>
                )}
                <Link
                  to="/account"
                  className="px-4 py-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-full text-xs font-heading font-semibold transition-all flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  {isAr ? 'حسابي' : 'Account'}
                </Link>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 border border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 rounded-full text-xs font-heading font-semibold transition-all"
              >
                {isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Login / Sign Up'}
              </Link>
            )}
            {/* Language Toggle */}
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="px-3 py-1.5 border border-white/20 text-white/70 hover:text-white hover:border-neon-pink/50 rounded-full text-xs font-heading font-semibold transition-all"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="px-3 py-1 border border-white/20 text-white/70 rounded-full text-xs font-heading font-semibold"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button className="text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                {tr(lang, 'nav_book')}
              </button>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin-panel"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full px-6 py-3 border border-uv-purple/50 text-uv-purple font-heading font-semibold rounded-full text-base text-center"
                    >
                      {isAr ? 'لوحة التحكم' : 'Admin Dashboard'}
                    </Link>
                  )}
                  <Link
                    to="/account"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full px-6 py-3 border border-white/20 text-white/70 font-heading font-semibold rounded-full text-base text-center"
                  >
                    {isAr ? 'حسابي' : 'My Account'}
                  </Link>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-6 py-3 border border-neon-pink/50 text-neon-pink font-heading font-semibold rounded-full text-base text-center"
                >
                  {isAr ? 'تسجيل الدخول / إنشاء حساب' : 'Login / Sign Up'}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
