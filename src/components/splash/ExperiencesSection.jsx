import React from 'react';
import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

// Hardcoded experiences data
const experiences = [
  {
    slug: 'splash',
    title_en: 'Splash',
    title_ar: 'سبلاش',
    tagline_en: 'Throw, splash, and create chaos on canvas',
    tagline_ar: 'ارمي، اسكبي، وابدعي فوضى على اللوحة',
    icon: '🎨',
    color: '#FF1493',
    image: '/splash-hero.jpg',
    isActive: true,
  },
  {
    slug: 'spin',
    title_en: 'Spin',
    title_ar: 'سبين',
    tagline_en: 'Watch colors dance on a spinning canvas',
    tagline_ar: 'شاهدي الألوان ترقص على لوحة دوّارة',
    icon: '🌀',
    color: '#00FFFF',
    image: '/spin-hero.jpg',
    isActive: true,
  },
  {
    slug: 'pour',
    title_en: 'Pour',
    title_ar: 'صب',
    tagline_en: 'Pour vibrant colors on 3D figurines',
    tagline_ar: 'اسكبي ألوان نابضة على مجسمات ثلاثية الأبعاد',
    icon: '🫗',
    color: '#9400D3',
    image: '/pour-hero.jpg',
    isActive: true,
  },
  {
    slug: 'phone-case',
    title_en: 'Phone Case',
    title_ar: 'كفر جوال',
    tagline_en: 'Design your own unique phone case',
    tagline_ar: 'صممي كفر جوالك الخاص',
    icon: '📱',
    color: '#FF6B35',
    image: '/phone-case-hero.jpg',
    isActive: true,
  },
  {
    slug: 'group-splash',
    title_en: 'Group Splash',
    title_ar: 'سبلاش جماعي',
    tagline_en: 'Big canvas for groups and friends',
    tagline_ar: 'لوحة كبيرة للمجموعات والأصدقاء',
    icon: '👥',
    color: '#32CD32',
    image: '/group-splash-hero.jpg',
    isActive: true,
  },
  {
    slug: 'kids',
    title_en: 'School Packages',
    title_ar: 'باقات المدارس',
    tagline_en: 'Fun art experiences for school trips',
    tagline_ar: 'تجارب فنية ممتعة للرحلات المدرسية',
    icon: '🎒',
    color: '#FFD700',
    image: '/kids-hero.jpg',
    isActive: true,
  },
  {
    slug: 'birthday',
    title_en: 'Birthday Party',
    title_ar: 'حفلة عيد ميلاد',
    tagline_en: 'Celebrate with paint and fun',
    tagline_ar: 'احتفلي بالألوان والمرح',
    icon: '🎂',
    color: '#FF69B4',
    image: '/birthday-hero.jpg',
    whatsappOnly: true,
    isActive: true,
  },
  {
    slug: 'graduation',
    title_en: 'Graduation Party',
    title_ar: 'حفلة تخرج',
    tagline_en: 'Celebrate your achievement in style',
    tagline_ar: 'احتفلي بإنجازك بأسلوب مميز',
    icon: '🎓',
    color: '#4169E1',
    image: '/graduation-hero.jpg',
    whatsappOnly: true,
    isActive: true,
  },
  {
    slug: 'special-events',
    title_en: 'Special Events',
    title_ar: 'مناسبات خاصة',
    tagline_en: 'Corporate events and private parties',
    tagline_ar: 'فعاليات الشركات والحفلات الخاصة',
    icon: '✨',
    color: '#8B008B',
    image: '/special-events-hero.jpg',
    whatsappOnly: true,
    isActive: true,
  },
];

export default function ExperiencesSection() {
  const { lang, isAr } = useLang();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeExperiences.map((exp, i) => (
            <ExperienceCard
              key={exp.slug}
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
      </div>
    </section>
  );
}
