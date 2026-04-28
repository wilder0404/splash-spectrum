import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function ExperiencesSection() {
  const { lang, isAr } = useLang();

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => base44.entities.Experience.list('sortOrder', 100),
  });

  const activeExperiences = experiences.filter(e => e.isActive);

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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeExperiences.map((exp, i) => (
              <ExperienceCard
                key={exp.id}
                title={isAr ? exp.title_ar : exp.title_en}
                description={isAr ? exp.tagline_ar : exp.tagline_en}
                image={exp.image}
                icon={exp.icon}
                color={exp.color}
                slug={exp.slug}
                delay={i * 0.1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}