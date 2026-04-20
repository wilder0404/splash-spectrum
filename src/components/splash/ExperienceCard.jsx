import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ExperienceCard({ title, description, image, icon, color, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'scale-110 brightness-110' : 'scale-100 brightness-50 grayscale-[30%]'}`}
        />
        
        {/* Glow overlay on hover */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? 'opacity-60' : 'opacity-0'}`}
          style={{ background: `radial-gradient(circle at center, ${color}44, transparent 70%)` }} />
        
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <span className="text-2xl mb-2 block">{icon}</span>
          <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-2">{title}</h3>
          <p className={`font-body text-white/60 text-sm leading-relaxed transition-all duration-500 ${hovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'} overflow-hidden`}>
            {description}
          </p>
          
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            className="mt-3"
          >
            <span className="inline-block px-5 py-2 rounded-full text-white text-sm font-heading font-semibold"
              style={{ backgroundColor: color }}>
              Learn More →
            </span>
          </motion.div>
        </div>
      </div>

      {/* Border glow on hover */}
      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ borderColor: color, boxShadow: `0 0 30px ${color}33` }} />
    </motion.div>
  );
}