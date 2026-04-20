import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Shield } from 'lucide-react';

const reasons = [
  {
    icon: Sparkles,
    title: 'No Art Skills Required',
    desc: 'Seriously. If you can throw paint, you\'re already an artist here.',
    color: '#FF007F',
  },
  {
    icon: Zap,
    title: 'No Rules',
    desc: 'Splash it, pour it, throw it, drip it. There\'s no wrong way to create.',
    color: '#39FF14',
  },
  {
    icon: Heart,
    title: 'No Pressure',
    desc: 'This isn\'t a class. It\'s a playground. Just have fun and be yourself.',
    color: '#9D00FF',
  },
  {
    icon: Shield,
    title: 'Take It Home',
    desc: 'Every session ends with something you made — a canvas, a shirt, a figurine.',
    color: '#00F3FF',
  },
];

export default function WhySection() {
  return (
    <section id="why" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-pink font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-pink">
            Why Splash Spectrum
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white mb-4">
            Just Fun, Freedom <br className="hidden md:block" />& <span className="text-neon-green text-glow-green">Memories</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                style={{ backgroundColor: reason.color }} />
              
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${reason.color}15` }}>
                <reason.icon className="w-6 h-6" style={{ color: reason.color }} />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">{reason.title}</h3>
              <p className="font-body text-white/50 leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}