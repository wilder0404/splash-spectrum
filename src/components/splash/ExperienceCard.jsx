import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

export default function ExperienceCard({ title, description, image, icon, color, slug, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { lang } = useLang();

  const handleLearnMore = (e) => {
    e.stopPropagation();
    navigate(`/experience?id=${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/experience?id=${slug}`)}
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-110 brightness-110' : 'scale-100 brightness-50 grayscale-[30%]'}`}
        />
        <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-70' : 'opacity-0'}`}
          style={{ background: `radial-gradient(circle at center, ${color}55, transparent 70%)` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <span className="text-2xl mb-2 block">{icon}</span>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-2">{title}</h3>
          <p className={`font-body text-white/60 text-sm leading-relaxed transition-all duration-500 ${hovered ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0'} overflow-hidden mb-3`}>
            {description}
          </p>
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          >
            <button
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-heading font-bold transition-all hover:scale-105 hover:brightness-110 shadow-lg"
              style={{ backgroundColor: color, boxShadow: `0 4px 20px ${color}55` }}>
              {tr(lang, 'learn_more')}
            </button>
          </motion.div>
        </div>
      </div>
      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ borderColor: color, boxShadow: `0 0 40px ${color}44` }} />
    </motion.div>
  );
}