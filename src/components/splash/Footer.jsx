import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Facebook, Phone } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const LOGO_URL = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/0677e9ccc_image.png";
const WHATSAPP_NUMBER = '966554563447';

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

const SnapchatIcon = () => (
  <img src="https://media.base44.com/images/public/69e5ef89828747441c931879/16fe4f09f_image.png" alt="Snapchat" className="w-5 h-5 invert brightness-110" style={{ filter: 'invert(1) brightness(1.1)' }} />
);

const SOCIAL_COLORS = {
  Instagram: { glow: '#9D00FF', bg: 'hover:bg-uv-purple/20 hover:border-uv-purple/60', text: 'hover:text-uv-purple' },
  WhatsApp:  { glow: '#39FF14', bg: 'hover:bg-neon-green/20 hover:border-neon-green/60', text: 'hover:text-neon-green' },
  Facebook:  { glow: '#00F3FF', bg: 'hover:bg-electric-cyan/20 hover:border-electric-cyan/60', text: 'hover:text-electric-cyan' },
  TikTok:    { glow: '#ffffff', bg: 'hover:bg-white/10 hover:border-white/40', text: 'hover:text-white' },
  Snapchat:  { glow: '#FFD700', bg: 'hover:bg-yellow-400/20 hover:border-yellow-400/60', text: 'hover:text-yellow-400' },
};

const PAINT_BLOBS = [
  { color: '#FF007F', x: '8%',  size: 120, blur: 80 },
  { color: '#9D00FF', x: '50%', size: 160, blur: 100 },
  { color: '#00F3FF', x: '88%', size: 110, blur: 70 },
];

export default function Footer() {
  const { lang } = useLang();

  const socials = [
    { href: 'https://www.instagram.com/splashspectrumksa?igsh=MjZhaDI1ZjQzeDdm', icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
    { href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp' },
    { href: 'https://www.facebook.com/share/1CTYsJivME/?mibextid=wwXIfr', icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
    { href: 'https://www.tiktok.com/@splashspectrumksa?_r=1&_t=ZS-95rwxJdSMum', icon: <TikTokIcon />, label: 'TikTok' },
    { href: 'https://www.snapchat.com/add/spectrumksa', icon: <SnapchatIcon />, label: 'Snapchat' },
  ];

  return (
    <footer className="relative bg-obsidian overflow-hidden pt-16 pb-8 px-4">
      {/* Ambient paint blobs */}
      {PAINT_BLOBS.map((blob, i) => (
        <div
          key={i}
          className="absolute -top-8 pointer-events-none"
          style={{
            left: blob.x,
            transform: 'translateX(-50%)',
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color}22 0%, transparent 70%)`,
            filter: `blur(${blob.blur}px)`,
          }}
        />
      ))}

      {/* Top neon border line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #FF007F, #9D00FF, #00F3FF, transparent)' }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Logo + tagline centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{ background: 'radial-gradient(circle, #FF007F 0%, #9D00FF 60%, transparent 100%)' }} />
            <img src={LOGO_URL} alt="Splash Spectrum" className="w-16 h-16 rounded-full relative z-10" />
          </div>
          <h3 className="font-heading font-black text-2xl text-white tracking-widest">
            SPLASH <span className="text-neon-pink" style={{ textShadow: '0 0 16px #FF007F88' }}>SPECTRUM</span>
          </h3>
          <p className="text-white/30 font-body text-xs tracking-[0.25em] uppercase mt-1">Where color comes alive</p>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-3 mb-8 flex-wrap"
        >
          {socials.map((s, i) => {
            const colors = SOCIAL_COLORS[s.label];
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/40 transition-colors ${colors.bg} ${colors.text}`}
              >
                {s.icon}
              </motion.a>
            );
          })}

          <motion.a
            href="tel:+966554563447"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-neon-pink/10 border border-neon-pink/30 hover:bg-neon-pink/20 hover:border-neon-pink/70 rounded-xl text-neon-pink transition-all font-heading font-semibold text-sm"
            style={{ boxShadow: '0 0 0 0 #FF007F' }}
          >
            <Phone className="w-4 h-4" />
            <span>Call Us</span>
          </motion.a>
        </motion.div>

        {/* Divider with paint splat dots */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/5" />
          {['#FF007F', '#9D00FF', '#00F3FF', '#39FF14'].map((c, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c, boxShadow: `0 0 6px ${c}` }} />
          ))}
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-white/20 font-body text-xs"
        >
          © {new Date().getFullYear()} Splash Spectrum. All rights reserved. Made with 🎨 and ❤️
        </motion.p>
      </div>
    </footer>
  );
}