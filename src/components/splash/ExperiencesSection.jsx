import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';

const OPEN_PAINT_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/e8bc2829e_generated_7b2d1bf5.png";
const BIRTHDAY_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/049f6ea1d_generated_3b2a572d.png";
const GROUP_IMG = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png";
const KIDS_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png";
const FIGURINES_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png";
const EVENTS_IMG = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png";

const experiences = [
  {
    title: 'Open Paint Sessions',
    description: 'Walk in, pick your colors, and let loose. No rules, no limits — just pure creative freedom under UV lights.',
    image: OPEN_PAINT_IMG,
    icon: '🎨',
    color: '#FF007F',
  },
  {
    title: 'Birthday Experiences',
    description: 'The most unforgettable birthday party ever. Cake, paint, music, and memories that glow.',
    image: BIRTHDAY_IMG,
    icon: '🎉',
    color: '#9D00FF',
  },
  {
    title: 'Group & Friends',
    description: 'Bring your crew and get messy together. Perfect for team bonding, friend nights, and celebrations.',
    image: GROUP_IMG,
    icon: '👯',
    color: '#00F3FF',
  },
  {
    title: 'Kids Experiences',
    description: 'A safe, supervised paint playground where kids can splash, create, and explore without limits.',
    image: KIDS_IMG,
    icon: '🧸',
    color: '#39FF14',
  },
  {
    title: 'Custom Art & Figurines',
    description: 'Paint your own custom figurine or art piece. Take home a one-of-a-kind glowing masterpiece.',
    image: FIGURINES_IMG,
    icon: '🎁',
    color: '#FF007F',
  },
  {
    title: 'Special Events',
    description: 'Corporate events, date nights, collaborations — we create custom immersive experiences for any occasion.',
    image: EVENTS_IMG,
    icon: '🤍',
    color: '#9D00FF',
  },
];

export default function ExperiencesSection() {
  return (
    <section id="experiences" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-uv-purple/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-uv-purple font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-purple">
            Our Experiences
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white">
            Choose Your <span className="text-neon-pink text-glow-pink">Adventure</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.title} {...exp} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}