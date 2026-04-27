import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const OPEN_PAINT_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/e8bc2829e_generated_7b2d1bf5.png";
const BIRTHDAY_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/049f6ea1d_generated_3b2a572d.png";
const GROUP_IMG = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png";
const KIDS_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png";
const FIGURINES_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png";
const EVENTS_IMG = "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png";
const GRADUATION_IMG = "https://media.base44.com/images/public/69e5ef89828747441c931879/11d7bf5be_image.png";

export default function ExperiencesSection() {
  const { lang } = useLang();

  const experiences = [
    { titleKey: 'exp_open_title', descKey: 'exp_open_desc', image: OPEN_PAINT_IMG, icon: '🎨', color: '#FF007F', slug: 'open-paint-sessions' },
    { titleKey: 'exp_birthday_title', descKey: 'exp_birthday_desc', image: BIRTHDAY_IMG, icon: '🎉', color: '#9D00FF', slug: 'birthday-experiences' },
    { titleKey: 'exp_graduation_title', descKey: 'exp_graduation_desc', image: GRADUATION_IMG, icon: '🎓', color: '#00F3FF', slug: 'graduation' },
    { titleKey: 'exp_group_title', descKey: 'exp_group_desc', image: GROUP_IMG, icon: '👯', color: '#00F3FF', slug: 'group-friends' },
    { titleKey: 'exp_kids_title', descKey: 'exp_kids_desc', image: KIDS_IMG, icon: '🧸', color: '#39FF14', slug: 'kids-experiences' },
    { titleKey: 'exp_figurines_title', descKey: 'exp_figurines_desc', image: FIGURINES_IMG, icon: '🎁', color: '#FF007F', slug: 'custom-art-figurines' },
    { titleKey: 'exp_phonecase_title', descKey: 'exp_phonecase_desc', image: "https://media.base44.com/images/public/69e5ef89828747441c931879/906f677bf_image.png", icon: '📱', color: '#00F3FF', slug: 'phone-case' },
    { titleKey: 'exp_events_title', descKey: 'exp_events_desc', image: EVENTS_IMG, icon: '🤍', color: '#9D00FF', slug: 'special-events' },
  ];

  return (
    <section id="experiences" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
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
            {tr(lang, 'exp_badge')}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white">
            {tr(lang, 'exp_h2_1')} <span className="text-neon-pink text-glow-pink">{tr(lang, 'exp_h2_2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.slug}
              title={tr(lang, exp.titleKey)}
              description={tr(lang, exp.descKey)}
              image={exp.image}
              icon={exp.icon}
              color={exp.color}
              slug={exp.slug}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}