import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { Sparkles, Users, Shield, Home } from 'lucide-react';

const REASONS = [
  {
    titleKey: 'why_1_title',
    descKey: 'why_1_desc',
    color: '#FF007F',
    icon: Sparkles,
    emoji: '🎨',
  },
  {
    titleKey: 'why_2_title',
    descKey: 'why_2_desc',
    color: '#39FF14',
    icon: Users,
    emoji: '💥',
  },
  {
    titleKey: 'why_3_title',
    descKey: 'why_3_desc',
    color: '#9D00FF',
    icon: Shield,
    emoji: '🧘',
  },
  {
    titleKey: 'why_4_title',
    descKey: 'why_4_desc',
    color: '#00F3FF',
    icon: Home,
    emoji: '🏠',
  },
];

export default function WhySection() {
  const { lang, isAr } = useLang();

  return (
    <section id="why" className="py-28 md:py-40 px-4 bg-obsidian relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,0,127,0.04) 0%, transparent 60%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-neon-pink font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-4 text-glow-pink">
            {tr(lang, 'why_badge')}
          </p>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white">
            {isAr
              ? 'لماذا اختر سبلاش سبيكتروم؟'
              : 'Why Choose Splash Spectrum?'}
          </h2>
        </motion.div>

        {/* Four reason boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-3xl p-8 overflow-hidden border-2 transition-all duration-500 hover:scale-105 hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${reason.color}10 0%, ${reason.color}05 100%)`,
                borderColor: `${reason.color}40`,
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: reason.color, filter: 'blur(60px)' }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-5">{reason.emoji}</div>

                {/* Title */}
                <h3
                  className="font-heading font-black text-xl md:text-lg text-white mb-4 leading-tight uppercase tracking-wide"
                  style={{ color: reason.color }}
                >
                  {tr(lang, reason.titleKey)}
                </h3>

                {/* Description */}
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  {tr(lang, reason.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission — below boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-32 pt-20 border-t border-white/10">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="absolute -top-4 left-0 w-2 h-12 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #FF007F, transparent)' }}
            />
            <div className="pl-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">👁️</span>
                <h3
                  className="font-heading font-black text-2xl md:text-3xl text-white"
                  style={{ color: '#FF007F' }}
                >
                  {isAr ? 'رؤيتنا' : 'Our Vision'}
                </h3>
              </div>
              <p className="font-body text-white/50 text-base leading-relaxed mb-5">
                {isAr
                  ? 'مجتمع حيث الفن ليس حكراً على المحترفين. كل شخص فنان. كل تجربة تخلق ذكرى، وكل لوحة تحكي قصة فريدة.'
                  : 'A world where art belongs to everyone. Every person is an artist. Every moment creates a memory that lasts forever.'}
              </p>
              <ul className="space-y-2 text-sm font-body text-white/40">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF007F' }} />
                  {isAr ? 'إبداع بلا حدود' : 'Unlimited creativity'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF007F' }} />
                  {isAr ? 'فن للجميع' : 'Art for everyone'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FF007F' }} />
                  {isAr ? 'ذكريات لا تُنسى' : 'Unforgettable moments'}
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div
              className="absolute -top-4 left-0 w-2 h-12 rounded-full"
              style={{ background: 'linear-gradient(to bottom, #39FF14, transparent)' }}
            />
            <div className="pl-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-4xl">🎯</span>
                <h3
                  className="font-heading font-black text-2xl md:text-3xl text-white"
                  style={{ color: '#39FF14' }}
                >
                  {isAr ? 'مهمتنا' : 'Our Mission'}
                </h3>
              </div>
              <p className="font-body text-white/50 text-base leading-relaxed mb-5">
                {isAr
                  ? 'نوفر تجربة فنية خالية من الضغط والحكم. مساحة آمنة حيث الفوضى الملونة تصبح علاجاً والإبداع يصبح قوة.'
                  : 'Provide a judgment-free, pressure-free creative space. Where colorful chaos becomes healing and every brushstroke builds confidence.'}
              </p>
              <ul className="space-y-2 text-sm font-body text-white/40">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#39FF14' }} />
                  {isAr ? 'بلا ضغط ولا حكم' : 'Zero pressure, zero judgment'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#39FF14' }} />
                  {isAr ? 'إبداع علاجي' : 'Therapeutic creativity'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#39FF14' }} />
                  {isAr ? 'مساحة آمنة للجميع' : 'A safe space for all'}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-24 pt-16 border-t border-white/10"
        >
          <p className="font-heading font-bold text-lg md:text-xl text-white mb-6">
            {isAr
              ? 'مستعد تصبح جزء من القصة؟'
              : 'Ready to create your masterpiece?'}
          </p>
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-block px-10 py-4 bg-neon-pink text-white font-heading font-bold rounded-full text-base hover:scale-110 active:scale-95 transition-transform"
            style={{ boxShadow: '0 0 30px rgba(255,0,127,0.4)' }}
          >
            {isAr ? 'احجز الآن 🎨' : 'Book Now 🎨'}
          </a>
        </motion.div>

      </div>
    </section>
  );
}