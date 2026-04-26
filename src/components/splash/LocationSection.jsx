import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Instagram, Mail, Phone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';

const faqsEn = [
  { q: 'What should I wear?', a: "Wear clothes you don't mind getting paint on! We provide aprons and cover-ups, but paint can splash anywhere. That's the fun part!" },
  { q: 'Is there an age limit?', a: 'All ages are welcome — preferably from 3 years and above. Children under 16 must be accompanied by a trusted adult at all times. Any additional guardian beyond one requires a paid entry.' },
  { q: 'How messy does it get?', a: "VERY messy. That's the whole point! Our UV paint is water-based and washes off skin easily. Clothes may stain." },
  { q: 'Do I need to bring anything?', a: 'Just yourself and your energy! We provide all materials, paint, canvases, aprons, and cleaning supplies.' },
  { q: 'Can I book for a large group?', a: 'Absolutely! We host groups of 2–50+. Contact us for custom packages for corporate events, parties, or special occasions.' },
  { q: 'How long is a session?', a: 'Standard sessions are 60–90 minutes. Private events and birthday packages can be customized.' },
];

const faqsAr = [
  { q: 'ماذا أرتدي؟', a: 'ارتدِ ملابس لا تمانع تلطيخها! نوفر مرايل وأغطية واقية، لكن الألوان قد ترش في أي مكان. وهذا هو الجزء الممتع!' },
  { q: 'هل هناك حد عمري؟', a: 'جميع الأعمار مرحب بها — ويُفضل من سن 3 سنوات فأكثر. يجب أن يرافق الأطفال دون 16 سنة شخص بالغ موثوق في جميع الأوقات. أي مرافق إضافي يتطلب رسوم دخول.' },
  { q: 'كم تكون الفوضى؟', a: 'كثيرة جداً! وهذه هي النقطة! ألوان UV لدينا على أساس مائي وتنسل من الجلد بسهولة. قد تتلطخ الملابس.' },
  { q: 'هل أحتاج أن أحضر شيئاً؟', a: 'فقط نفسك وطاقتك! نوفر نحن جميع المواد والألوان واللوحات والمرايل ومستلزمات التنظيف.' },
  { q: 'هل يمكنني الحجز لمجموعة كبيرة؟', a: 'بالتأكيد! نستضيف مجموعات من 2–50 شخصاً أو أكثر. تواصل معنا للحصول على باقات مخصصة.' },
  { q: 'كم تستغرق الجلسة؟', a: 'الجلسات العادية من 60–90 دقيقة. يمكن تخصيص الفعاليات الخاصة وباقات أعياد الميلاد.' },
];

export default function LocationSection() {
  const { lang } = useLang();
  const faqs = lang === 'ar' ? faqsAr : faqsEn;

  return (
    <section id="location" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric-cyan/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-electric-cyan font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-cyan">
            {tr(lang, 'location_badge')}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            {tr(lang, 'location_h2_1')} <span className="text-neon-pink text-glow-pink">{tr(lang, 'location_h2_2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-pink/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">{tr(lang, 'location_studio')}</h3>
                  <p className="text-white/50 font-body mt-1">{tr(lang, 'location_address')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="https://wa.me/966554563447" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-neon-green/10 border border-neon-green/20 rounded-xl p-4 hover:bg-neon-green/20 transition-colors group">
                  <MessageCircle className="w-5 h-5 text-neon-green" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-neon-green transition-colors">WhatsApp</span>
                </a>
                <a href="https://www.instagram.com/splashspectrumksa?igsh=MjZhaDI1ZjQzeDdm" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-uv-purple/10 border border-uv-purple/20 rounded-xl p-4 hover:bg-uv-purple/20 transition-colors group">
                  <Instagram className="w-5 h-5 text-uv-purple" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-uv-purple transition-colors">Instagram</span>
                </a>
                <a href="https://www.facebook.com/share/1CTYsJivME/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-electric-cyan/10 border border-electric-cyan/20 rounded-xl p-4 hover:bg-electric-cyan/20 transition-colors group">
                  <Mail className="w-5 h-5 text-electric-cyan" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-electric-cyan transition-colors">Facebook</span>
                </a>
                <a href="tel:+966554563447"
                  className="flex items-center gap-3 bg-neon-pink/10 border border-neon-pink/20 rounded-xl p-4 hover:bg-neon-pink/20 transition-colors group">
                  <Phone className="w-5 h-5 text-neon-pink" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-neon-pink transition-colors">{tr(lang, 'location_call')}</span>
                </a>
              </div>
            </div>

            <a href="https://maps.app.goo.gl/k831NSf6TbGm4Ui46?g_st=ic" target="_blank" rel="noopener noreferrer"
              className="rounded-2xl overflow-hidden border border-white/5 h-[250px] bg-white/[0.02] flex flex-col items-center justify-center gap-3 hover:border-neon-pink/30 transition-all group cursor-pointer">
              <MapPin className="w-10 h-10 text-neon-pink group-hover:scale-110 transition-transform" />
              <p className="font-heading font-bold text-white text-sm">{lang === 'ar' ? 'افتح في خرائط Google' : 'Open in Google Maps'}</p>
              <p className="text-white/40 text-xs font-body">{lang === 'ar' ? 'انقر لعرض الموقع' : 'Click to view location'}</p>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-xl text-white mb-6">{tr(lang, 'location_faq_title')}</h3>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white/[0.03] border border-white/5 rounded-xl overflow-hidden px-5">
                  <AccordionTrigger className="text-white/90 font-heading font-semibold text-sm md:text-base hover:text-neon-pink hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/50 font-body text-sm leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}