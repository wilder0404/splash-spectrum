import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const PILLARS = [
  {
    number: '01',
    titleKey: 'why_1_title',
    descKey: 'why_1_desc',
    color: '#FF007F',
    emoji: '🎨',
  },
  {
    number: '02',
    titleKey: 'why_2_title',
    descKey: 'why_2_desc',
    color: '#39FF14',
    emoji: '💥',
  },
  {
    number: '03',
    titleKey: 'why_3_title',
    descKey: 'why_3_desc',
    color: '#9D00FF',
    emoji: '🧘',
  },
  {
    number: '04',
    titleKey: 'why_4_title',
    descKey: 'why_4_desc',
    color: '#00F3FF',
    emoji: '🏠',
  },
];

export default function WhySection() {
  const { lang, isAr } = useLang();

  return (
    <section id="why" className="py-24 md:py-36 px-4 bg-obsidian relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neon-pink/4 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-uv-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28"
        >
          <p className="text-neon-pink font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-5 text-glow-pink">
            {tr(lang, 'why_badge')}
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
              {tr(lang, 'why_h2_1')}{' '}
              <span className="text-neon-green text-glow-green">{tr(lang, 'why_h2_2')}</span>
            </h2>
            <p className="font-body text-white/35 text-sm md:text-base max-w-xs md:text-right leading-relaxed">
              {isAr
                ? 'أربعة أسباب تجعل سبلاش سبيكتروم مختلفاً عن أي مكان آخر.'
                : 'Four reasons Splash Spectrum is unlike anywhere else.'}
            </p>
          </div>
          {/* Thin separator line */}
          <div className="mt-10 h-px w-full" style={{ background: 'linear-gradient(90deg, #FF007F33, #9D00FF22, transparent)' }} />
        </motion.div>

        {/* Pillar rows — alternating layout */}
        <div className="space-y-0">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.05 }}
              className="group relative"
            >
              {/* Hover glow that bleeds from the side */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at ${i % 2 === 0 ? '0%' : '100%'} 50%, ${p.color}0A 0%, transparent 60%)` }}
              />

              <div className={`flex items-start gap-6 md:gap-10 py-8 md:py-10 border-b border-white/[0.06] ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                {/* Big number */}
                <div
                  className="font-heading font-black text-5xl md:text-7xl leading-none shrink-0 tabular-nums select-none"
                  style={{ color: `${p.color}20`, WebkitTextStroke: `1px ${p.color}30` }}
                >
                  {p.number}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <h3
                      className="font-heading font-black text-xl md:text-2xl text-white group-hover:transition-colors duration-300"
                      style={{ '--hover-color': p.color }}
                    >
                      {tr(lang, p.titleKey)}
                    </h3>
                  </div>
                  <p className="font-body text-white/45 text-base leading-relaxed max-w-lg">
                    {tr(lang, p.descKey)}
                  </p>
                </div>

                {/* Color accent bar on the side */}
                <div
                  className="hidden md:block w-0.5 self-stretch rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shrink-0"
                  style={{ background: `linear-gradient(to bottom, ${p.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission — clean two-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 md:mt-28">
          {[
            {
              label: isAr ? 'رؤيتنا' : 'Our Vision',
              color: '#FF007F',
              text: isAr
                ? 'في SS، نتخيل مجتمعاً نابضاً بالحياة يلتقي فيه أفراد من جميع الأعمار والخلفيات — فنانون وغير فنانين — للتعبير عن إبداعهم. لا مهارات مطلوبة لصنع أعمال فنية جميلة تأخذها للمنزل!'
                : 'At SS, we envision a vibrant community where individuals of all ages and backgrounds — artists and non-artists — come together to unleash creativity. No skills required to create something beautiful and take it home.',
            },
            {
              label: isAr ? 'مهمتنا' : 'Our Mission',
              color: '#39FF14',
              text: isAr
                ? 'مهمتنا هي تسخير الفوائد النفسية للرسم كتجربة علاجية وإثرائية. نسعى لتوفير مساحة داعمة يستكشف فيها الأفراد الجوانب الشفائية للفن، ويعززون صحتهم النفسية ضمن النسيج الثقافي للمملكة.'
                : "Our mission is to harness the psychological benefits of painting as a therapeutic experience. We provide a space where individuals explore art's healing aspects, promoting mental wellness within the vibrant tapestry of Saudi culture.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${item.color}18` }}
            >
              {/* Corner glow */}
              <div
                className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-[80px] opacity-40"
                style={{ background: item.color }}
              />
              {/* Label pill */}
              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-heading font-bold tracking-widest uppercase mb-5 relative z-10"
                style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
              >
                {item.label}
              </div>
              <p className="font-body text-white/55 leading-relaxed text-[15px] relative z-10">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}