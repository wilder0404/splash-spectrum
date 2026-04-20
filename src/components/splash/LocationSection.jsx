import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Instagram, Mail, Phone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'What should I wear?', a: 'Wear clothes you don\'t mind getting paint on! We provide aprons and cover-ups, but paint can splash anywhere. That\'s the fun part!' },
  { q: 'Is there an age limit?', a: 'Kids 3+ are welcome with a guardian. We have dedicated kids sessions and family-friendly time slots.' },
  { q: 'How messy does it get?', a: 'VERY messy. That\'s the whole point! Our UV paint is water-based and washes off skin easily. Clothes may stain.' },
  { q: 'Do I need to bring anything?', a: 'Just yourself and your energy! We provide all materials, paint, canvases, aprons, and cleaning supplies.' },
  { q: 'Can I book for a large group?', a: 'Absolutely! We host groups of 2-50+. Contact us for custom packages for corporate events, parties, or special occasions.' },
  { q: 'How long is a session?', a: 'Standard sessions are 60-90 minutes. Private events and birthday packages can be customized.' },
];

export default function LocationSection() {
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
            Find Us
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white">
            Visit <span className="text-neon-pink text-glow-pink">Splash Spectrum</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact & Map */}
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
                  <h3 className="font-heading font-bold text-white text-lg">Our Studio</h3>
                  <p className="text-white/50 font-body mt-1">123 Creative Lane, Art District<br />City, State 12345</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-neon-green/10 border border-neon-green/20 rounded-xl p-4 hover:bg-neon-green/20 transition-colors group">
                  <MessageCircle className="w-5 h-5 text-neon-green" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-neon-green transition-colors">WhatsApp</span>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-uv-purple/10 border border-uv-purple/20 rounded-xl p-4 hover:bg-uv-purple/20 transition-colors group">
                  <Instagram className="w-5 h-5 text-uv-purple" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-uv-purple transition-colors">Instagram</span>
                </a>
                <a href="mailto:hello@splashspectrum.com"
                  className="flex items-center gap-3 bg-electric-cyan/10 border border-electric-cyan/20 rounded-xl p-4 hover:bg-electric-cyan/20 transition-colors group">
                  <Mail className="w-5 h-5 text-electric-cyan" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-electric-cyan transition-colors">Email Us</span>
                </a>
                <a href="tel:+1234567890"
                  className="flex items-center gap-3 bg-neon-pink/10 border border-neon-pink/20 rounded-xl p-4 hover:bg-neon-pink/20 transition-colors group">
                  <Phone className="w-5 h-5 text-neon-pink" />
                  <span className="text-white/80 font-heading text-sm group-hover:text-neon-pink transition-colors">Call Us</span>
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-[250px] bg-white/[0.02]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1,-0.1,0.1,0.1&layer=mapnik"
                className="w-full h-full opacity-60 grayscale invert"
                title="Location map"
              />
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-heading font-bold text-xl text-white mb-6">Frequently Asked Questions</h3>
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