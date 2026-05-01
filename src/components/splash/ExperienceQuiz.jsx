import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';

const questions = [
  {
    id: 1,
    text: "What kind of experience are you in the mood for?",
    options: [
      { label: "Something energetic and a bit chaotic", scores: { splash: 2, spin: 0, pouring: 0 } },
      { label: "Something focused and satisfying", scores: { splash: 0, spin: 2, pouring: 0 } },
      { label: "Something calm and expressive", scores: { splash: 0, spin: 0, pouring: 2 } },
    ],
  },
  {
    id: 2,
    text: "How do you usually like to create?",
    options: [
      { label: "Fast, messy, and intuitive", scores: { splash: 2, spin: 0, pouring: 0 } },
      { label: "Controlled, precise, and repetitive", scores: { splash: 0, spin: 2, pouring: 0 } },
      { label: "Slow, thoughtful, and detailed", scores: { splash: 0, spin: 0, pouring: 2 } },
    ],
  },
  {
    id: 3,
    text: "What sounds most fun right now?",
    options: [
      { label: "Throwing paint and not overthinking it", scores: { splash: 2, spin: 0, pouring: 0 } },
      { label: "Watching patterns form as you move", scores: { splash: 0, spin: 2, pouring: 0 } },
      { label: "Creating something aesthetic and meaningful", scores: { splash: 0, spin: 0, pouring: 2 } },
    ],
  },
  {
    id: 4,
    text: "What's your ideal vibe?",
    options: [
      { label: "Loud, fun, and a little wild", scores: { splash: 2, spin: 0, pouring: 0 } },
      { label: "Rhythmic and hypnotic", scores: { splash: 0, spin: 2, pouring: 0 } },
      { label: "Chill, creative, and aesthetic", scores: { splash: 0, spin: 0, pouring: 2 } },
    ],
  },
  {
    id: 5,
    text: "Who are you coming with?",
    options: [
      { label: "Friends / group — we want to have fun", scores: { splash: 2, spin: 0, pouring: 1 } },
      { label: "Solo or one other person", scores: { splash: 0, spin: 2, pouring: 1 } },
      { label: "Doesn't matter, I just want the experience", scores: { splash: 1, spin: 1, pouring: 1 } },
    ],
  },
];

const results = {
  splash: {
    title: "You're Made for Splash",
    body: "You're not here to overthink — you're here to let go. Splash is all about energy, movement, and creating something in the moment. It's messy, fun, and unpredictable — in the best way.",
    cta: "Book Splash Now",
    color: '#FF007F',
    emoji: '🎨',
    experienceName: 'Splash',
  },
  spin: {
    title: "Spin is Your Perfect Match",
    body: "You enjoy the process just as much as the result. Spin gives you that satisfying, controlled motion where every movement creates something unique.",
    cta: "Book Spin Now",
    color: '#9D00FF',
    emoji: '🌀',
    experienceName: 'Spin',
  },
  pouring: {
    title: "Pouring Fits You Best",
    body: "You appreciate detail, flow, and expression. Pouring lets you slow down and create something visually stunning and intentional.",
    cta: "Book Pouring Now",
    color: '#00F3FF',
    emoji: '🫗',
    experienceName: 'Pouring',
  },
};

const SLIDE_VARIANTS = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function ExperienceQuiz({ onBookWithExperience }) {
  const { isAr } = useLang();
  const [stage, setStage] = useState('intro'); // intro | quiz | result
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ splash: 0, spin: 0, pouring: 0 });
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState(null);

  const handleStart = () => {
    setStage('quiz');
    setCurrentQ(0);
    setScores({ splash: 0, spin: 0, pouring: 0 });
    setSelected(null);
    setDirection(1);
  };

  const handleOption = (option) => {
    setSelected(option.label);
    const newScores = {
      splash: scores.splash + option.scores.splash,
      spin: scores.spin + option.scores.spin,
      pouring: scores.pouring + option.scores.pouring,
    };

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setDirection(1);
        setScores(newScores);
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        // Calculate result
        const winner = Object.entries(newScores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
        setResult(winner);
        setStage('result');
      }
    }, 350);
  };

  const handleBook = () => {
    if (onBookWithExperience) onBookWithExperience(result);
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRetake = () => {
    setStage('intro');
    setResult(null);
    setSelected(null);
  };

  return (
    <section className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-uv-purple/5 via-transparent to-neon-pink/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-uv-purple/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <AnimatePresence mode="wait" custom={direction}>

          {/* INTRO */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-6xl mb-6"
              >
                🎯
              </motion.div>
              <p className="text-uv-purple font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-purple">
                Discover Your Experience
              </p>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-white mb-5 leading-tight">
                Not Sure Where<br />
                <span className="text-uv-purple text-glow-purple">to Start?</span>
              </h2>
              <p className="font-body text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
                Every experience here feels different. Answer a few quick questions and we'll match you with the one you'll enjoy the most.
              </p>
              <button
                onClick={handleStart}
                className="px-10 py-4 bg-uv-purple text-white font-heading font-bold text-lg rounded-full hover:scale-105 active:scale-95 transition-transform"
                style={{ boxShadow: '0 0 30px rgba(157,0,255,0.4)' }}
              >
                Start the Quiz ✨
              </button>
              <p className="text-white/25 text-xs font-body mt-4">5 quick questions · takes ~30 seconds</p>
            </motion.div>
          )}

          {/* QUIZ */}
          {stage === 'quiz' && (
            <motion.div
              key={`q-${currentQ}`}
              custom={direction}
              variants={SLIDE_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/40 font-body text-xs">Question {currentQ + 1} of {questions.length}</span>
                  <span className="text-white/40 font-body text-xs">{Math.round(((currentQ) / questions.length) * 100)}% done</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-uv-purple"
                    initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-8 leading-snug text-center">
                {questions[currentQ].text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQ].options.map((option, i) => (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => handleOption(option)}
                    disabled={selected !== null}
                    className={`w-full text-left px-6 py-4 rounded-2xl border font-body text-base transition-all duration-200 ${
                      selected === option.label
                        ? 'border-uv-purple bg-uv-purple/20 text-white scale-[0.99]'
                        : selected !== null
                        ? 'border-white/5 bg-white/[0.02] text-white/30'
                        : 'border-white/10 bg-white/[0.03] text-white hover:border-uv-purple/50 hover:bg-uv-purple/10 active:scale-[0.98]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                        selected === option.label ? 'border-uv-purple bg-uv-purple' : 'border-white/20'
                      }`}>
                        {selected === option.label && <span className="w-2 h-2 bg-white rounded-full block" />}
                      </span>
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {stage === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Result card */}
              <motion.div
                className="rounded-3xl p-8 md:p-10 mb-6 border relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${results[result].color}12, ${results[result].color}06)`,
                  borderColor: `${results[result].color}30`,
                }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${results[result].color}20, transparent 60%)` }}
                />

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-5 relative z-10"
                >
                  {results[result].emoji}
                </motion.div>

                <p
                  className="font-heading font-semibold text-xs uppercase tracking-[0.3em] mb-3 relative z-10"
                  style={{ color: results[result].color }}
                >
                  Your Match
                </p>

                <h2
                  className="font-heading font-black text-3xl md:text-4xl text-white mb-5 leading-tight relative z-10"
                >
                  {results[result].title}
                </h2>

                <p className="font-body text-white/65 text-base leading-relaxed relative z-10">
                  {results[result].body}
                </p>
              </motion.div>

              {/* Urgency nudge */}
              <p className="text-white/40 font-body text-sm mb-5">
                ⚡ Spots fill up quickly — grab yours now
              </p>

              {/* Book CTA */}
              <motion.button
                onClick={handleBook}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full h-14 rounded-2xl font-heading font-bold text-lg text-white mb-4 transition-all"
                style={{
                  background: `linear-gradient(135deg, ${results[result].color}, ${results[result].color}bb)`,
                  boxShadow: `0 8px 30px ${results[result].color}44`,
                }}
              >
                {results[result].cta} →
              </motion.button>

              <button
                onClick={handleRetake}
                className="text-white/25 hover:text-white/60 font-body text-sm transition-colors"
              >
                Retake the quiz
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}