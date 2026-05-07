import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddReviewModal from './AddReviewModal';

const floatingEmojis = ['❤️', '✨', '🔥', '🎨', '💜', '💚', '💗', '🌟'];

// Fallback seed reviews shown if no DB reviews exist yet
const seedReviews = [
  { text: "omg i went with my sister and we literally couldn't stop laughing the whole time 😭 we were COVERED", name: 'Jess M.', emoji: '😭', color: '#FF007F' },
  { text: "honestly wasn't sure what to expect but it was so much better than i thought. the UV lights make everything look insane", name: 'Khalil R.', emoji: '🔥', color: '#9D00FF' },
  { text: "took my 7yo for her birthday and she's been talking about it every single day since. she wants to go back already lol", name: 'Sarah T.', emoji: '🎉', color: '#39FF14' },
  { text: "we did the group session for my bday and ngl it was top 3 nights of my life. no notes", name: 'Zara K.', emoji: '🤩', color: '#00F3FF' },
  { text: "the paint smells fine and washes off easily, was worried about that. also the staff are really chill", name: 'Marcus D.', emoji: '👌', color: '#FF007F' },
  { text: "my canvas is hanging in my living room now and people keep asking where i bought it lmaooo", name: 'Priya N.', emoji: '🎨', color: '#9D00FF' },
];

const seedReviewsAr = [
  { text: 'ذهبت مع أختي وما قدرنا نوقف الضحك طول الوقت 😭 كنا مغطّين بالألوان بالكامل', name: 'جيس م.', emoji: '😭', color: '#FF007F' },
  { text: 'ما كنت متوقع كثير بس كانت أحسن بكثير مما توقعت. أضواء UV تخلّي كل شيء يبدو مجنون', name: 'خليل ر.', emoji: '🔥', color: '#9D00FF' },
  { text: 'اخذت طفلتي عيد ميلادها وهي تحكي عنها كل يوم من يومها. تبغى ترجع مرة ثانية 😂', name: 'سارة ت.', emoji: '🎉', color: '#39FF14' },
  { text: 'عملنا جلسة جماعية ليلة عيد ميلادي وبصراحة كانت من أفضل 3 ليالي في حياتي', name: 'زارا ك.', emoji: '🤩', color: '#00F3FF' },
  { text: 'الألوان ريحتها كويسة وتنسل بسهولة من الجلد، كنت قلقان على هذا. والطاقم كانوا رهيبين', name: 'ماركس د.', emoji: '👌', color: '#FF007F' },
  { text: 'لوحتي معلّقة الحين في الصالة وكل الناس يسألون من وين اشتريتها 😂', name: 'بريا ن.', emoji: '🎨', color: '#9D00FF' },
];

export default function ReactionsSection() {
  const { lang, isAr } = useLang();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [reviewAdded, setReviewAdded] = useState(false);

  const { data: dbReviews = [], refetch } = useQuery({
    queryKey: ['reviews-public'],
    queryFn: async () => {
      const { data } = await db.getApprovedReviews();
      return data || [];
    },
  });

  // Transform DB reviews to match display format
  const transformedReviews = dbReviews.map(r => ({
    text: r.comment,
    name: r.name,
    emoji: '🎨',
    color: '#FF007F'
  }));

  // Show DB reviews if available, else show seed data
  const reviews = transformedReviews.length > 0 ? transformedReviews : (isAr ? seedReviewsAr : seedReviews);

  return (
    <section className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      {floatingEmojis.map((emoji, i) => (
        <motion.span key={i} className="absolute text-2xl pointer-events-none opacity-20"
          style={{ left: `${10 + (i * 12)}%`, top: `${20 + ((i * 17) % 60)}%` }}
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3 + (i * 0.5), repeat: Infinity, delay: i * 0.4 }}>
          {emoji}
        </motion.span>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16">
          <p className="text-neon-green font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-green">
            {tr(lang, 'reactions_badge')}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            {tr(lang, 'reactions_h2_1')} <span className="text-neon-pink text-glow-pink">{tr(lang, 'reactions_h2_2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          {reviews.map((reaction, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              className="relative bg-white/[0.04] backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center">
              <span className="text-3xl mb-3 block">{reaction.emoji}</span>
              <p className="font-body text-white/80 text-sm leading-relaxed mb-3">&quot;{reaction.text}&quot;</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: reaction.color }} />
                <span className="font-heading font-semibold text-xs" style={{ color: reaction.color }}>{reaction.name}</span>
                <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: reaction.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to add review */}
        <div className="text-center">
          {user ? (
            reviewAdded ? (
              <p className="text-neon-green font-heading font-semibold text-sm">
                {isAr ? '🎉 شكراً! سيتم مراجعة تقييمك قريباً' : '🎉 Thanks! Your review will be live once approved'}
              </p>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowModal(true)}
                className="px-8 py-3 rounded-full font-heading font-bold text-white border border-neon-pink/50 hover:bg-neon-pink/10 text-sm transition-all"
              >
                ✍️ {isAr ? 'شاركنا تجربتك' : 'Share Your Experience'}
              </motion.button>
            )
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/auth?mode=login')}
              className="px-8 py-3 rounded-full font-heading font-bold text-white/50 border border-white/10 hover:border-neon-pink/30 hover:text-white text-sm transition-all"
            >
              {isAr ? '🔑 سجّل دخول لإضافة تقييم' : '🔑 Log in to leave a review'}
            </motion.button>
          )}
        </div>
      </div>

      {showModal && (
        <AddReviewModal
          onClose={() => setShowModal(false)}
          onSuccess={() => { setReviewAdded(true); refetch(); }}
          userName={user?.user_metadata?.full_name}
        />
      )}
    </section>
  );
}
