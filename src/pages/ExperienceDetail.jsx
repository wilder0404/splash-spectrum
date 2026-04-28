import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, CheckCircle, MessageCircle, Shield, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { useQuery } from '@tanstack/react-query';

const WHATSAPP_NUMBER = '966554563447';
const timeSlots = ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

export default function ExperienceDetail() {
  const { lang, isAr } = useLang();
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('id') || 'open-paint-sessions';

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => base44.entities.Experience.list('sortOrder', 100),
  });

  const exp = experiences.length > 0 ? (experiences.find(e => e.slug === slug) || null) : null;

  const [form, setForm] = useState({ date: '', time: '', people: '', name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await base44.entities.Booking.create({
      experienceSlug: slug,
      experienceName: isAr ? exp.title_ar : exp.title_en,
      date: form.date,
      time: form.time,
      people: form.people,
      name: form.name,
      email: form.email,
      phone: form.phone,
      status: 'pending',
    });
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const title = exp ? (isAr ? exp.title_ar : exp.title_en) : '';
    const msg = encodeURIComponent(
      `Hi! I'd like to book a *${title}* at Splash Spectrum. Please help me with the details! 🎨`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neon-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!exp) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl mb-4">Experience not found</p>
          <Link to="/" className="text-neon-pink underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const title = isAr ? exp.title_ar : exp.title_en;
  const tagline = isAr ? exp.tagline_ar : exp.tagline_en;
  const description = isAr ? exp.description_ar : exp.description_en;
  const duration = isAr ? exp.duration_ar : exp.duration_en;
  const groupSize = isAr ? exp.groupSize_ar : exp.groupSize_en;
  const price = isAr ? exp.price_ar : exp.price_en;
  const includes = isAr ? (exp.includes_ar || []) : (exp.includes_en || []);
  const rules = isAr ? (exp.rules_ar || []) : (exp.rules_en || []);
  const vibes = exp.vibes || [];
  const priceTable = exp.priceTable || [];
  const gallery = exp.gallery || [];

  return (
    <div className="min-h-screen bg-obsidian" dir={isAr ? 'rtl' : 'ltr'}>

      {/* HERO */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <img src={exp.image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,1) 100%)` }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 60%, ${exp.color}20 0%, transparent 60%)` }} />

        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6">
          <div className="max-w-5xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-body text-sm group">
              <ArrowLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${isAr ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
              {tr(lang, 'detail_back')}
            </Link>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{exp.icon}</span>
                <div className="flex flex-wrap gap-2">
                  {vibes.map(vibe => (
                    <span key={vibe} className="px-3 py-1 rounded-full text-xs font-heading font-semibold"
                      style={{ borderColor: `${exp.color}55`, color: exp.color, background: `${exp.color}15`, border: `1px solid ${exp.color}40` }}>
                      {vibe}
                    </span>
                  ))}
                </div>
              </div>
              <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-3 leading-none" style={{ textShadow: `0 0 60px ${exp.color}55` }}>
                {title}
              </h1>
              <p className="font-body text-lg md:text-xl" style={{ color: exp.color }}>{tagline}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* QUICK STATS BAR */}
      <div className="border-b border-white/5" style={{ background: `linear-gradient(90deg, ${exp.color}08, transparent)` }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-6 items-center">
          {duration && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: exp.color }} />
              <span className="font-body text-white/60 text-sm">{duration}</span>
            </div>
          )}
          {groupSize && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" style={{ color: exp.color }} />
              <span className="font-body text-white/60 text-sm">{groupSize}</span>
            </div>
          )}
          {price && (
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" style={{ color: exp.color }} />
              <span className="font-body text-white/60 text-sm">{price}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" style={{ color: exp.color }} />
            <span className="font-body text-white/60 text-sm">{isAr ? 'يُفضل من سن 3 سنوات فأكثر' : 'Preferably ages 3+'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* LEFT: Info */}
          <div className="lg:col-span-3 space-y-10">

            {/* Description */}
            {description && (
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="font-body text-white/70 leading-relaxed text-base md:text-lg border-l-2 pl-5"
                style={{ borderColor: exp.color }}>
                {description}
              </motion.p>
            )}

            {/* Pricing Table */}
            {priceTable.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                  <span style={{ color: exp.color }}>💰</span> {tr(lang, 'detail_prices')}
                </h3>
                <div className="rounded-2xl overflow-hidden border border-white/8" style={{ background: `linear-gradient(135deg, ${exp.color}06, rgba(255,255,255,0.02))` }}>
                  {priceTable.map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-5 py-4 ${i < priceTable.length - 1 ? 'border-b border-white/5' : ''}`}>
                      <div>
                        <p className="font-heading font-semibold text-white text-sm">{isAr ? row.name_ar : row.name_en}</p>
                        {(isAr ? row.desc_ar : row.desc_en) && (
                          <p className="font-body text-white/35 text-xs mt-0.5">{isAr ? row.desc_ar : row.desc_en}</p>
                        )}
                      </div>
                      <span className="font-heading font-black text-base shrink-0 ml-4" style={{ color: exp.color }}>{row.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* What's Included */}
            {includes.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                  <span style={{ color: exp.color }}>✓</span> {tr(lang, 'detail_includes')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: exp.color }} />
                      <span className="font-body text-white/65 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Rules */}
            {rules.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-2xl p-5 border"
                style={{ background: `${exp.color}08`, borderColor: `${exp.color}25` }}>
                <h3 className="font-heading font-bold text-white text-base mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: exp.color }} /> {tr(lang, 'detail_rules')}
                </h3>
                <ul className="space-y-2.5">
                  {rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-body text-white/55 text-sm leading-relaxed">
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="font-heading font-bold text-white text-xl mb-5 flex items-center gap-2">
                  <Camera className="w-5 h-5" style={{ color: exp.color }} /> {tr(lang, 'detail_gallery')}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {gallery.map((img, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.03 }} onClick={() => setLightbox(img)}
                      className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square">
                      <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Booking */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/8 overflow-hidden"
              style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))` }}>
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${exp.color}, ${exp.color}44)` }} />

              <div className="p-6 md:p-8">
                {exp.whatsappOnly ? (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
                    <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-4xl"
                      style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}>
                      💬
                    </div>
                    <h3 className="font-heading font-black text-white text-xl mb-3">{tr(lang, 'detail_whatsapp_only_title')}</h3>
                    <p className="font-body text-white/50 text-sm leading-relaxed mb-6">{tr(lang, 'detail_whatsapp_only_body')}</p>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full h-14 rounded-xl font-heading font-bold text-base text-white flex items-center justify-center gap-3 transition-all hover:scale-105 hover:brightness-110"
                      style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', boxShadow: '0 8px 30px rgba(37,211,102,0.3)' }}>
                      <MessageCircle className="w-5 h-5" />
                      {tr(lang, 'detail_whatsapp_btn')}
                    </button>
                    <p className="text-white/20 text-xs mt-4 font-body">+966 55 456 3447</p>
                  </motion.div>
                ) : submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="font-heading font-black text-white text-2xl mb-3">{tr(lang, 'detail_booked_title')}</h3>
                    <p className="font-body text-white/60 text-sm leading-relaxed mb-5">{tr(lang, 'detail_booked_sub')}</p>
                    <div className="rounded-xl p-4 text-left space-y-1.5 mb-5 border" style={{ background: `${exp.color}08`, borderColor: `${exp.color}25` }}>
                      <p className="text-white/75 text-sm font-body">📅 {form.date} — {form.time}</p>
                      <p className="text-white/75 text-sm font-body">👥 {form.people} {isAr ? 'أشخاص' : 'people'}</p>
                      <p className="text-white/75 text-sm font-body">👤 {form.name}</p>
                    </div>
                    <Link to="/" className="text-white/30 hover:text-white text-sm font-body transition-colors">{tr(lang, 'detail_back')}</Link>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="font-heading font-bold text-white text-xl mb-6">{tr(lang, 'detail_reserve')}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_date')}</Label>
                          <Input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm w-full" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_time')}</Label>
                          <Select required onValueChange={v => setForm({ ...form, time: v })}>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm w-full">
                              <SelectValue placeholder={tr(lang, 'detail_pick_time')} />
                            </SelectTrigger>
                            <SelectContent className="bg-obsidian border-white/10">
                              {timeSlots.map(t => (
                                <SelectItem key={t} value={t} className="text-white focus:bg-white/10">{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_num_people')}</Label>
                        <Select required onValueChange={v => setForm({ ...form, people: v })}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm">
                            <SelectValue placeholder={tr(lang, 'booking_how_many')} />
                          </SelectTrigger>
                          <SelectContent className="bg-obsidian border-white/10">
                            {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => (
                              <SelectItem key={n} value={String(n)} className="text-white focus:bg-white/10">{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_your_name')}</Label>
                        <Input required placeholder={tr(lang, 'booking_fullname')} value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_email')}</Label>
                          <Input type="email" required placeholder="you@email.com" value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm placeholder:text-white/20 w-full" />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-white/50 text-xs font-heading">{tr(lang, 'detail_phone')}</Label>
                          <Input placeholder="+966..." value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="bg-white/5 border-white/10 text-white h-12 rounded-xl text-sm placeholder:text-white/20 w-full" />
                        </div>
                      </div>
                      <button type="submit"
                        className="w-full h-13 py-3.5 text-white font-heading font-bold rounded-xl text-base transition-all hover:scale-[1.02] hover:brightness-110"
                        style={{ backgroundColor: exp.color, boxShadow: `0 8px 30px ${exp.color}40` }}>
                        {tr(lang, 'detail_book_btn')}
                      </button>
                      <p className="text-center text-white/20 text-xs font-body">{tr(lang, 'detail_cancel')}</p>
                    </form>
                  </>
                )}
              </div>
            </div>

            {!exp.whatsappOnly && (
              <div className="mt-4">
                <button onClick={handleWhatsApp}
                  className="w-full h-12 rounded-xl font-heading font-semibold text-sm text-white/80 flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] hover:bg-neon-green/10 hover:border-neon-green/30 hover:text-white transition-all">
                  <MessageCircle className="w-4 h-4 text-neon-green" />
                  {isAr ? 'أو تواصل عبر واتساب' : 'Or chat with us on WhatsApp'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-bold" onClick={() => setLightbox(null)}>✕</button>
          <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] rounded-2xl object-contain" />
        </motion.div>
      )}
    </div>
  );
}