import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

export default function ExperienceCard({ title, description, image, icon, color, slug, delay = 0 }) {
  const [pressed, setPressed] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLang();

  const handleNav = () => navigate(`/experience?id=${slug}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.3) }}
      onClick={handleNav}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-60"
        />
        {/* Color overlay — always subtle, stronger on hover/press */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-400"
          style={{ background: `radial-gradient(circle at center, ${color}55, transparent 70%)` }}
        />
        {/* Mobile press overlay */}
        {pressed && (
          <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle at center, ${color}55, transparent 70%)` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="text-2xl mb-2 block">{icon}</span>
          <h3 className="font-heading font-bold text-lg md:text-2xl text-white mb-2 leading-tight">{title}</h3>
          <p className="font-body text-white/60 text-sm leading-relaxed mb-3 line-clamp-2 md:hidden">{description}</p>
          <p className="font-body text-white/60 text-sm leading-relaxed mb-3 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-400">{description}</p>
          <button
            onClick={(e) => { e.stopPropagation(); handleNav(); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-heading font-bold shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: color, boxShadow: `0 4px 20px ${color}44` }}>
            {tr(lang, 'learn_more')}
          </button>
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ borderColor: color }}
      />
    </motion.div>
  );
}