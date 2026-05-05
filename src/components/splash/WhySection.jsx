import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { Sparkles, Users, Shield, Home } from 'lucide-react';

const REASONS = [
  { titleKey: 'why_1_title', descKey: 'why_1_desc', color: '#FF007F', icon: Sparkles },
  { titleKey: 'why_2_title', descKey: 'why_2_desc', color: '#39FF14', icon: Users },
  { titleKey: 'why_3_title', descKey: 'why_3_desc', color: '#9D00FF', icon: Shield },
  { titleKey: 'why_4_title', descKey: 'why_4_desc', color: '#00F3FF', icon: Home },
];

export default function WhySection() {
  const { lang, isAr } = useLang();

  return (
    <section id="why" className="py-28 md:py-40 px-4 bg-obsidian relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[200px]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,0,127,0.05) 0%, transparent 60%)' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Hero statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-28 text-center"
        >
          <p className="text-neon-pink font-heading font-semibold text-xs uppercase tracking-[0.35em] mb-6 text-glow-pink">
            {tr(lang, 'why_badge')}
          </p>
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
            {isAr
              ? 'ليس مجرد رسم عادي،\nإنها تجربة تغيّر كل شيء'
              : 'Not just painting.\nIt\'s your moment.'}
          </h2>
          <p className="font-body text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {isAr
              ? 'نحول لوحة بيضاء إلى تجربة لا تُنسى. بلا قواعد، بلا ضغط، فقط أنت وإبداعك.'
              : 'We turn a blank canvas into an unforgettable moment. No rules, no pressure, just you and your creativity.'}
          </p>
        </motion.div>

        {/* Vision & Mission — HERO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 md:mb-32">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative group overflow-hidden rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(255,0,127,0.1) 0%, rgba(255,0,127,0.02) 100%)' }}
          >
            {/* Hover bloom */}
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              style={{ background: '#FF007F', filter: 'blur(80px)' }} />

            <div className="relative z-10 p-10 md:p-12">
              <div className="mb-6 text-5xl">👁️</div>
              <h3
                className="font-heading font-black text-3xl md:text-4xl text-white mb-4 leading-tight"
                style={{ color: '#FF007F' }}
              >
                {isAr ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="font-body text-white/45 text-base leading-relaxed mb-6">
                {isAr
                  ? 'مجتمع حيث الفن ليس للمحترفين فقط — بل للجميع. حيث كل شخص يشعر بالإبداع بداخله ويستطيع أن يعبّر عنه.'
                  : 'A world where art isn\'t just for the talented it\'s for everyone. Where every person discovers the artist within.'}
              </p>
              <div className="w-12 h-1 rounded-full"
                style={{ background: '#FF007F', boxShadow: '0 0 12px #FF007F' }} />
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative group overflow-hidden rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(57,255,20,0.1) 0%, rgba(57,255,20,0.02) 100%)' }}
          >
            {/* Hover bloom */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-700"
              style={{ background: '#39FF14', filter: 'blur(80px)' }} />

            <div className="relative z-10 p-10 md:p-12">
              <div className="mb-6 text-5xl">🎯</div>
              <h3
                className="font-heading font-black text-3xl md:text-4xl text-white mb-4 leading-tight"
                style={{ color: '#39FF14' }}
              >
                {isAr ? 'مهمتنا' : 'Our Mission'}
              </h3>
              <p className="font-body text-white/45 text-base leading-relaxed mb-6">
                {isAr
                  ? 'نوفر مساحة آمنة وممتعة حيث الإبداع يحرر الروح. حيث الفوضى الملونة تصبح علاجاً، والضحك يصبح دواء.'
                  : 'Create a safe, joyful space where creativity heals. Where colorful chaos becomes therapy and laughter becomes medicine.'}
              </p>
              <div className="w-12 h-1 rounded-full"
                style={{ background: '#39FF14', boxShadow: '0 0 12px #39FF14' }} />
            </div>
          </motion.div>
        </div>

        {/* Why it matters — 4 pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-white/30 font-heading font-semibold text-xs uppercase tracking-[0.3em] text-center">
            {isAr ? 'لماذا سبلاش سبيكتروم' : 'Why Choose Us'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                  style={{ background: reason.color }} />

                <div className="relative z-10">
                  <Icon className="w-8 h-8 mb-4" style={{ color: reason.color }} />
                  <h4 className="font-heading font-bold text-white text-sm mb-2">
                    {tr(lang, reason.titleKey)}
                  </h4>
                  <p className="font-body text-white/40 text-xs leading-relaxed">
                    {tr(lang, reason.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="font-body text-white/35 text-sm mb-5">
            {isAr ? 'هل أنت مستعد للحظة التي تغيّر كل شيء؟' : 'Ready for a moment that changes everything?'}
          </p>
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-block px-10 py-4 bg-neon-pink text-white font-heading font-bold rounded-full text-lg hover:scale-105 active:scale-95 transition-transform"
            style={{ boxShadow: '0 0 30px rgba(255,0,127,0.4)' }}
          >
            {isAr ? 'احجز تجربتك 🎨' : 'Book Your Moment 🎨'}
          </a>
        </motion.div>

      </div>
    </section>
  );
}