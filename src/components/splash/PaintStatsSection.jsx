import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const palette = [
  { color: '#FF007F', size: 180, x: '8%', y: '20%', rotate: -15, delay: 0 },
  { color: '#9D00FF', size: 120, x: '78%', y: '10%', rotate: 20, delay: 0.2 },
  { color: '#00F3FF', size: 90, x: '60%', y: '70%', rotate: -8, delay: 0.4 },
  { color: '#39FF14', size: 140, x: '20%', y: '65%', rotate: 12, delay: 0.15 },
];

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function PaintStatsSection() {
  const { lang } = useLang();

  const stats = [
    { value: 12000, suffix: '+', labelKey: 'stats_splashes', color: '#FF007F', icon: '🎨' },
    { value: 98, suffix: '%', labelKey: 'stats_return', color: '#39FF14', icon: '🔁' },
    { value: 3500, suffix: '+', labelKey: 'stats_sessions', color: '#00F3FF', icon: '🖌️' },
    { value: 600, suffix: '+', labelKey: 'stats_birthdays', color: '#9D00FF', icon: '🎉' },
  ];

  return (
    <section className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      {palette.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: p.delay, duration: 0.8, type: 'spring', stiffness: 120 }}
          style={{
            left: p.x, top: p.y, width: p.size, height: p.size,
            background: `radial-gradient(circle at 35% 35%, ${p.color}55, ${p.color}11 60%, transparent 80%)`,
            filter: 'blur(1px)', transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric-cyan font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-cyan">
            {tr(lang, 'stats_badge')}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            {tr(lang, 'stats_h2_1')} <span className="text-neon-pink text-glow-pink">{tr(lang, 'stats_h2_2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 150 }}
              className="relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}15, transparent 70%)` }} />
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="font-heading font-black text-3xl md:text-4xl mb-2"
                style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}66` }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-body text-white/50 text-xs md:text-sm leading-snug">{tr(lang, stat.labelKey)}</p>
            </motion.div>
          ))}
        </div>

        {/* Transformation strip — You Walk In first, then You Walk Out */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-white/5"
          style={{ background: 'linear-gradient(135deg, rgba(255,0,127,0.06) 0%, rgba(157,0,255,0.06) 50%, rgba(0,243,255,0.06) 100%)' }}
        >
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* You Walk In */}
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 text-3xl mb-4">😐</div>
              <p className="font-heading font-bold text-white/40 text-xs uppercase tracking-widest mb-2">{tr(lang, 'transform_in_label')}</p>
              <ul className="font-body text-white/30 text-sm space-y-1">
                <li>{tr(lang, 'transform_in_1')}</li>
                <li>{tr(lang, 'transform_in_2')}</li>
                <li>{tr(lang, 'transform_in_3')}</li>
                <li>{tr(lang, 'transform_in_4')}</li>
              </ul>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="h-px w-16 md:w-px md:h-20 bg-gradient-to-r md:bg-gradient-to-b from-neon-pink to-uv-purple hidden md:block" />
              <span className="font-heading font-black text-2xl md:text-4xl"
                style={{ background: 'linear-gradient(90deg, #FF007F, #9D00FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                →
              </span>
              <div className="h-px w-16 md:w-px md:h-20 bg-gradient-to-r md:bg-gradient-to-b from-uv-purple to-electric-cyan hidden md:block" />
            </div>

            {/* You Walk Out */}
            <div className="flex-1 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(255,0,127,0.2), rgba(157,0,255,0.2))', border: '1px solid rgba(255,0,127,0.3)' }}>
                🤩
              </div>
              <p className="font-heading font-bold text-neon-pink text-xs uppercase tracking-widest mb-2 text-glow-pink">{tr(lang, 'transform_out_label')}</p>
              <ul className="font-body text-white/70 text-sm space-y-1">
                <li>{tr(lang, 'transform_out_1')}</li>
                <li>{tr(lang, 'transform_out_2')}</li>
                <li>{tr(lang, 'transform_out_3')}</li>
                <li>{tr(lang, 'transform_out_4')}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}