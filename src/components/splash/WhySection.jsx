import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const PILLARS = [
  { number: '01', titleKey: 'why_1_title', descKey: 'why_1_desc', color: '#FF007F', emoji: '🎨' },
  { number: '02', titleKey: 'why_2_title', descKey: 'why_2_desc', color: '#39FF14', emoji: '💥' },
  { number: '03', titleKey: 'why_3_title', descKey: 'why_3_desc', color: '#9D00FF', emoji: '🧘' },
  { number: '04', titleKey: 'why_4_title', descKey: 'why_4_desc', color: '#00F3FF', emoji: '🏠' },
];

const VISION_EN = [
  'A vibrant community where individuals of all ages come together.',
  'Artists and non-artists equally welcome — no experience needed.',
  'Create something beautiful and take it home, every single time.',
  'The foremost destination for artistic inspiration in the region.',
];

const VISION_AR = [
  'مجتمع نابض يلتقي فيه أفراد من جميع الأعمار.',
  'الفنانون وغير الفنانون سواء — لا خبرة مطلوبة.',
  'اصنع شيئاً جميلاً وخذه للمنزل في كل مرة.',
  'الوجهة الأولى للإلهام الفني في المنطقة.',
];

const MISSION_EN = [
  'Harness the psychological benefits of painting as therapy.',
  'Provide a nurturing space for self-discovery and expression.',
  'Promote mental wellness through the joy of creating.',
  'Celebrate Saudi culture through the universal language of art.',
];

const MISSION_AR = [
  'الاستفادة من الفوائد النفسية للرسم كعلاج نفسي.',
  'توفير مساحة داعمة للاكتشاف الذاتي والتعبير.',
  'تعزيز الصحة النفسية من خلال متعة الإبداع.',
  'الاحتفاء بالثقافة السعودية عبر لغة الفن العالمية.',
];

function BulletList({ items, color }) {
  return (
    <ul className="space-y-3 mt-5">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="flex items-start gap-3"
        >
          <span
            className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
          <span className="font-body text-white/60 text-[15px] leading-relaxed">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

export default function WhySection() {
  const { lang, isAr } = useLang();

  return (
    <section id="why" className="py-24 md:py-36 px-4 bg-obsidian relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,0,127,0.04) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-[150px]"
          style={{ background: 'rgba(157,0,255,0.05)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-24"
        >
          <p className="text-neon-pink font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-5 text-glow-pink">
            {tr(lang, 'why_badge')}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
              {tr(lang, 'why_h2_1')}{' '}
              <span className="text-neon-green text-glow-green">{tr(lang, 'why_h2_2')}</span>
            </h2>
            <p className="font-body text-white/30 text-sm max-w-xs leading-relaxed">
              {isAr ? 'أربعة أسباب تجعلنا مختلفين.' : 'Four reasons we\'re unlike anywhere else.'}
            </p>
          </div>
          <div className="mt-8 h-px" style={{ background: 'linear-gradient(90deg, #FF007F44, #9D00FF22, transparent)' }} />
        </motion.div>

        {/* Pillars */}
        <div className="space-y-0 mb-24 md:mb-32">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group relative flex items-center gap-6 md:gap-10 py-7 md:py-8 border-b border-white/[0.05] cursor-default"
            >
              {/* Side glow on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: `linear-gradient(to bottom, ${p.color}, transparent)` }}
              />

              {/* Number */}
              <span
                className="font-heading font-black text-5xl md:text-6xl leading-none shrink-0 tabular-nums select-none pl-4 md:pl-6"
                style={{ color: `${p.color}18`, WebkitTextStroke: `1px ${p.color}28` }}
              >
                {p.number}
              </span>

              {/* Emoji + text */}
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-xl leading-none">{p.emoji}</span>
                  <h3 className="font-heading font-black text-lg md:text-xl text-white">
                    {tr(lang, p.titleKey)}
                  </h3>
                </div>
                <p className="font-body text-white/40 text-sm md:text-base leading-relaxed max-w-lg">
                  {tr(lang, p.descKey)}
                </p>
              </div>

              {/* Color dot */}
              <div
                className="w-2 h-2 rounded-full shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300 mr-2"
                style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission — side by side, immersive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FF007F22, #9D00FF22, #00F3FF22)' }}>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#060606] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full blur-[100px] opacity-30"
              style={{ background: '#FF007F' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👁️</span>
                <span
                  className="font-heading font-black text-xs uppercase tracking-[0.3em]"
                  style={{ color: '#FF007F' }}
                >
                  {isAr ? 'رؤيتنا' : 'Our Vision'}
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-2 leading-tight">
                {isAr ? 'الفن للجميع،\nبلا استثناء' : 'Art for everyone,\nno exceptions'}
              </h3>
              <BulletList items={isAr ? VISION_AR : VISION_EN} color="#FF007F" />
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-[#060606] p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[100px] opacity-25"
              style={{ background: '#39FF14' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎯</span>
                <span
                  className="font-heading font-black text-xs uppercase tracking-[0.3em]"
                  style={{ color: '#39FF14' }}
                >
                  {isAr ? 'مهمتنا' : 'Our Mission'}
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-2 leading-tight">
                {isAr ? 'الإبداع كعلاج،\nلا كواجب' : 'Creating as therapy,\nnot a task'}
              </h3>
              <BulletList items={isAr ? MISSION_AR : MISSION_EN} color="#39FF14" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}