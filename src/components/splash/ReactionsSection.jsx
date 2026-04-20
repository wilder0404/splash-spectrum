import React from 'react';
import { motion } from 'framer-motion';

const reactions = [
  { text: 'omg i went with my sister and we literally couldn\'t stop laughing the whole time 😭 we were COVERED', name: 'Jess M.', emoji: '😭', color: '#FF007F', delay: 0 },
  { text: 'honestly wasn\'t sure what to expect but it was so much better than i thought. the UV lights make everything look insane', name: 'Khalil R.', emoji: '🔥', color: '#9D00FF', delay: 0.15 },
  { text: 'took my 7yo for her birthday and she\'s been talking about it every single day since. she wants to go back already lol', name: 'Sarah T.', emoji: '🎉', color: '#39FF14', delay: 0.3 },
  { text: 'we did the group session for my bday and ngl it was top 3 nights of my life. no notes', name: 'Zara K.', emoji: '🤩', color: '#00F3FF', delay: 0.45 },
  { text: 'the paint smells fine and washes off easily, was worried about that. also the staff are really chill', name: 'Marcus D.', emoji: '👌', color: '#FF007F', delay: 0.6 },
  { text: 'my canvas is hanging in my living room now and people keep asking where i bought it lmaooo', name: 'Priya N.', emoji: '🎨', color: '#9D00FF', delay: 0.75 },
];

const floatingEmojis = ['❤️', '✨', '🔥', '🎨', '💜', '💚', '💗', '🌟'];

export default function ReactionsSection() {
  return (
    <section className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      {/* Floating emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none opacity-20"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + ((i * 17) % 60)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + (i * 0.5),
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          {emoji}
        </motion.span>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-green font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-green">
            Real Reactions
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            What People <span className="text-neon-pink text-glow-pink">Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reactions.map((reaction, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative bg-white/[0.04] backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center"
            >
              <span className="text-3xl mb-3 block">{reaction.emoji}</span>
              <p className="font-body text-white/80 text-sm leading-relaxed mb-3">
                {reaction.text}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: reaction.color }} />
                <span className="font-heading font-semibold text-xs" style={{ color: reaction.color }}>{reaction.name}</span>
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: reaction.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}