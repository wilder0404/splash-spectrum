import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
  { src: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/64a9b5ac5_image.png", span: 'row-span-2' },
  { src: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/a9569b78f_image.png", span: '' },
  { src: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png", span: '' },
  { src: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png", span: 'row-span-2' },
  { src: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/6c3b5dcdf_image.png", span: '' },
  { src: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/dde171c53_image.png", span: '' },
];

export default function GallerySection() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-uv-purple/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-green font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-green">
            The Mess Is the Masterpiece
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white">
            Gallery of <span className="text-electric-cyan text-glow-cyan">Chaos</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${img.span}`}
              onClick={() => setSelected(img.src)}
            >
              <img src={img.src} alt="Splash Spectrum gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-pink/40 rounded-xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-white/60 hover:text-white" onClick={() => setSelected(null)}>
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={selected}
              alt="Gallery"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}