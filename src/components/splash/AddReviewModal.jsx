import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { useLang } from '@/lib/LanguageContext';
import { Input } from '@/components/ui/input';

const COLORS = ['#FF007F', '#9D00FF', '#39FF14', '#00F3FF'];
const EMOJIS = ['🎨', '🔥', '🤩', '😭', '✨', '🎉', '💜', '👌'];

export default function AddReviewModal({ onClose, onSuccess, userName }) {
  const { lang, isAr } = useLang();
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('🎨');
  const [color, setColor] = useState('#FF007F');

  const submit = useMutation({
    mutationFn: () => base44.entities.Review.create({
      text,
      name: userName || (isAr ? 'مجهول' : 'Anonymous'),
      emoji,
      color,
      isApproved: false,
      lang,
    }),
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-xl flex items-center justify-center p-4"
        onClick={onClose}>
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
          className="bg-card border border-white/10 rounded-3xl p-6 w-full max-w-md space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-black text-white text-xl">
              {isAr ? '✍️ شاركنا تجربتك' : '✍️ Share Your Experience'}
            </h3>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={isAr ? 'اكتب تجربتك...' : 'Tell us about your session...'}
            rows={4}
            dir={isAr ? 'rtl' : 'ltr'}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm resize-none focus:outline-none focus:border-neon-pink/50 placeholder:text-white/20 font-body"
          />

          <div>
            <p className="text-white/40 text-xs font-heading mb-2">{isAr ? 'اختر رمزًا' : 'Pick an emoji'}</p>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map(e => (
                <button key={e} onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-xl transition-all ${emoji === e ? 'bg-neon-pink/20 ring-2 ring-neon-pink/50' : 'bg-white/5 hover:bg-white/10'}`}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/40 text-xs font-heading mb-2">{isAr ? 'اختر لونًا' : 'Pick a color'}</p>
            <div className="flex gap-3">
              {COLORS.map(c => (
                <button key={c} onClick={() => setColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-8 h-8 rounded-full transition-all ${color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-obsidian scale-110' : ''}`} />
              ))}
            </div>
          </div>

          <button
            onClick={() => submit.mutate()}
            disabled={!text.trim() || submit.isPending}
            className="w-full h-12 rounded-xl font-heading font-bold text-white bg-neon-pink hover:bg-neon-pink/80 disabled:opacity-40 transition-all"
          >
            {submit.isPending ? '...' : (isAr ? '💾 إرسال التقييم' : '💾 Submit Review')}
          </button>
          <p className="text-white/25 text-xs text-center font-body">
            {isAr ? 'سيتم مراجعة تقييمك قبل نشره' : 'Your review will be reviewed before publishing'}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}