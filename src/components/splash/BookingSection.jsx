import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Palette, Sparkles, AlertCircle, Gift } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/lib/LanguageContext';
import { tr } from '@/lib/translations.js';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/AuthContext';

const WHATSAPP_NUMBER = '966554563447';

export default function BookingSection({ preSelectedExperience }) {
  const { lang, isAr } = useLang();
  const { user, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ experience: '', subExperience: '', date: '', time: '', people: '', name: '', email: '', phone: '' });
  const [birthdayPack, setBirthdayPack] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Availability state: { bookedPerSlot: {time: count}, maxCapacity: number } | null
  const [availability, setAvailability] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  // Auto-fill from logged in user
  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        name: f.name || user.full_name || '',
        email: f.email || user.email || '',
      }));
    }
  }, [user]);

  const { data: settingsList = [] } = useQuery({
    queryKey: ['booking-settings'],
    queryFn: () => base44.entities.BookingSettings.list(),
  });
  const settings = settingsList[0] || null;

  const { data: experiences = [] } = useQuery({
    queryKey: ['experiences-booking'],
    queryFn: () => base44.entities.Experience.list('sortOrder', 100),
  });

  const timeSlots = settings?.timeSlots?.length
    ? settings.timeSlots
    : ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

  const activeExperiences = experiences.filter(e => e.isActive !== false);
  const experienceNames = activeExperiences.map(e => isAr ? e.title_ar : e.title_en);

  // Pre-select from quiz result
  useEffect(() => {
    if (!preSelectedExperience || activeExperiences.length === 0) return;
    const keyword = preSelectedExperience.toLowerCase(); // 'splash' | 'spin' | 'pouring'
    const matched = activeExperiences.find(e =>
      (e.title_en || '').toLowerCase().includes(keyword) ||
      (e.slug || '').toLowerCase().includes(keyword)
    );
    if (matched) {
      const name = isAr ? matched.title_ar : matched.title_en;
      setForm(f => ({ ...f, experience: name, subExperience: '', time: '', people: '' }));
    }
  }, [preSelectedExperience, activeExperiences.length]);

  const selectedExpObj = activeExperiences.find(e => (isAr ? e.title_ar : e.title_en) === form.experience);
  const subExps = selectedExpObj?.priceTable || [];

  // Birthday pack logic: "20+" or ≥20 people must use WhatsApp
  const peopleCount = parseInt(form.people) || 0;
  const birthdayWhatsAppOnly = birthdayPack && (form.people === '20+' || peopleCount >= 20);

  // If birthday pack is selected and group < 20, allow online booking even for whatsappOnly experiences
  const isWhatsAppOnly = (selectedExpObj?.whatsappOnly || false) && !(birthdayPack && !birthdayWhatsAppOnly);

  // Fetch availability whenever experience + date + subExperience change
  const shouldFetchAvailability = selectedExpObj?.slug && form.date && (subExps.length === 0 || form.subExperience);

  useEffect(() => {
    if (!shouldFetchAvailability) {
      setAvailability(null);
      return;
    }
    setLoadingAvailability(true);
    setForm(f => ({ ...f, time: '', people: '' }));
    base44.functions.invoke('getSlotAvailability', {
      experienceSlug: selectedExpObj.slug,
      date: form.date,
      subExperience: form.subExperience,
    }).then(res => {
      setAvailability(res.data);
    }).catch(() => {
      setAvailability(null);
    }).finally(() => {
      setLoadingAvailability(false);
    });
  }, [selectedExpObj?.slug, form.date, form.subExperience, subExps.length]);

  const getSlotRemaining = (slot) => {
    if (!availability || availability.maxCapacity === null) return null;
    const booked = availability.bookedPerSlot?.[slot] || 0;
    return Math.max(0, availability.maxCapacity - booked);
  };

  const handleExperienceChange = (v) => {
    setForm({ ...form, experience: v, subExperience: '', people: '', time: '' });
    setBookingError('');
    setAvailability(null);
    setBirthdayPack(false);
  };
  const handleSubChange = (v) => setForm({ ...form, subExperience: v, time: '', people: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');
    setIsSubmitting(true);

    try {
      const res = await base44.functions.invoke('createBookingWithCapacityCheck', {
        experienceSlug: selectedExpObj?.slug || form.experience,
        experienceName: form.experience,
        subExperience: birthdayPack ? `${form.subExperience ? form.subExperience + ' + ' : ''}Birthday Pack` : form.subExperience,
        date: form.date,
        time: form.time,
        people: form.people,
        name: form.name,
        email: form.email,
        phone: form.phone,
        userId: user?.id || '',
        status: 'confirmed',
      });

      if (res.data?.error === 'not_enough_seats') {
        setBookingError(res.data.message);
        // Refresh availability after conflict
        if (selectedExpObj?.slug && form.date) {
          base44.functions.invoke('getSlotAvailability', {
            experienceSlug: selectedExpObj.slug,
            date: form.date,
            subExperience: form.subExperience,
          }).then(r => setAvailability(r.data)).catch(() => {});
        }
        return;
      }

      const booking = res.data?.booking;
      if (!booking) {
        setBookingError('Something went wrong. Please try again.');
        return;
      }

      // Send confirmation email
      try {
        await base44.functions.invoke('sendBookingConfirmation', { bookingId: booking.id });
      } catch {}

      // Append to Google Sheet
      try {
        await base44.functions.invoke('appendToSheet', {
          name: form.name,
          email: form.email,
          phone: form.phone,
        });
      } catch {}

      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = (isBirthday = false) => {
    const msg = isBirthday
      ? encodeURIComponent(`Hi! I'd like to book a *Birthday Pack* for *${form.people || '20+'}* people at Splash Spectrum. Please help me with the details! 🎂🎨`)
      : encodeURIComponent(`Hi! I'd like to book a *${form.experience}* at Splash Spectrum. Please help me with the details! 🎨`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section id="booking" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-neon-pink/5 via-transparent to-uv-purple/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[200px]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-neon-pink font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-pink">
            {tr(lang, 'booking_badge')}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white mb-4">
            {tr(lang, 'booking_h2_1')} <span className="text-electric-cyan text-glow-cyan">{tr(lang, 'booking_h2_2')}</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">{tr(lang, 'booking_sub')}</p>
        </motion.div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 text-center">
            <div className="text-6xl mb-5">🎉</div>
            <h3 className="font-heading font-black text-white text-2xl md:text-3xl mb-3">{tr(lang, 'booking_confirmed_title')}</h3>
            <p className="font-body text-white/60 mb-6 leading-relaxed">
              <span className="text-white">{form.experience}{form.subExperience ? ` — ${form.subExperience}` : ''}</span> · <span className="text-white">{form.date}</span> · <span className="text-white">{form.time}</span>. {tr(lang, 'booking_confirmed_sub')}
            </p>
            <div className="bg-electric-cyan/5 border border-electric-cyan/20 rounded-2xl p-5 text-left max-w-sm mx-auto mb-6">
              <p className="text-electric-cyan font-heading font-bold text-sm mb-2">{tr(lang, 'booking_arrive_title')}</p>
              <p className="text-white/60 text-sm font-body leading-relaxed">{tr(lang, 'booking_arrive_body')}</p>
            </div>
            <div className="bg-neon-pink/5 border border-neon-pink/10 rounded-2xl p-4 text-left max-w-sm mx-auto mb-8">
              <p className="text-white/50 text-xs font-body space-y-1">
                <span className="block">📅 {form.date} — {form.time}</span>
                <span className="block">👥 {form.people} {isAr ? 'أشخاص' : 'people'}</span>
                <span className="block">👤 {form.name} · {form.email}</span>
              </p>
            </div>
            <button onClick={() => setSubmitted(false)} className="text-white/30 hover:text-white/60 text-sm font-body transition-colors">
              {tr(lang, 'booking_another')}
            </button>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl p-5 sm:p-8 md:p-10 space-y-5">

            {/* Experience Type */}
            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-neon-pink shrink-0" /> {tr(lang, 'booking_experience')}
              </Label>
              <Select value={form.experience} onValueChange={handleExperienceChange}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl w-full">
                  <SelectValue placeholder={tr(lang, 'booking_choose_exp')} />
                </SelectTrigger>
                <SelectContent className="bg-obsidian border-white/10">
                  {experienceNames.length > 0 ? (
                    experienceNames.map(name => (
                      <SelectItem key={name} value={name} className="text-white focus:bg-white/10 focus:text-white">{name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled className="text-white/40">No experiences available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Sub-experience/Activity */}
            {subExps.length > 0 && (
              <div className="space-y-2">
                <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-electric-cyan shrink-0" />
                  {isAr ? 'اختر النشاط' : 'Choose Activity'}
                </Label>
                <Select value={form.subExperience} onValueChange={handleSubChange}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl w-full">
                    <SelectValue placeholder={isAr ? 'اختر النشاط' : 'Pick an activity'} />
                  </SelectTrigger>
                  <SelectContent className="bg-obsidian border-white/10">
                    {subExps.map(s => {
                      const name = isAr ? s.name_ar : s.name_en;
                      return (
                        <SelectItem key={name} value={name} className="text-white focus:bg-white/10 focus:text-white">
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-uv-purple shrink-0" /> {tr(lang, 'booking_date')}
                </Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: '', people: '' })}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-electric-cyan shrink-0" /> {tr(lang, 'booking_time')}
                  {loadingAvailability && <span className="text-white/30 text-xs font-body">{isAr ? 'جارٍ التحقق...' : 'Checking...'}</span>}
                </Label>
                <Select value={form.time} onValueChange={(v) => { setForm({ ...form, time: v, people: '' }); setBookingError(''); }}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl w-full">
                    <SelectValue placeholder={tr(lang, 'booking_choose_time')} />
                  </SelectTrigger>
                  <SelectContent className="bg-obsidian border-white/10">
                    {timeSlots.map(t => {
                      const remaining = getSlotRemaining(t);
                      const isFull = remaining !== null && remaining === 0;
                      return (
                        <SelectItem
                          key={t}
                          value={t}
                          disabled={isFull}
                          className="text-white focus:bg-white/10 focus:text-white"
                        >
                          <span className="flex items-center justify-between w-full gap-3">
                            <span>{t}</span>
                            {remaining !== null && (
                              isFull
                                ? <span className="text-xs text-red-400 font-heading">{isAr ? 'محجوز بالكامل' : 'Fully Booked'}</span>
                                : <span className="text-xs text-neon-green/80 font-heading">{remaining} {isAr ? 'مقعد' : 'left'}</span>
                            )}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* People */}
            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-neon-green shrink-0" /> {tr(lang, 'booking_people')}
              </Label>
              <Select value={form.people} onValueChange={(v) => { setForm({ ...form, people: v }); setBookingError(''); }}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl w-full">
                  <SelectValue placeholder={tr(lang, 'booking_how_many')} />
                </SelectTrigger>
                <SelectContent className="bg-obsidian border-white/10">
                  {(() => {
                    const remaining = form.time ? getSlotRemaining(form.time) : null;
                    // When birthday pack is on, allow up to 19 online + "20+" for WhatsApp
                    const onlineMax = birthdayPack ? 19 : 10;
                    const max = remaining !== null ? Math.min(remaining, onlineMax) : onlineMax;
                    const options = Array.from({ length: max }, (_, i) => i + 1);
                    if (options.length === 0) return (
                      <SelectItem value="none" disabled className="text-red-400">
                        {isAr ? 'لا توجد مقاعد متاحة' : 'No seats available'}
                      </SelectItem>
                    );
                    return options.map(n => (
                      <SelectItem key={n} value={String(n)} className="text-white focus:bg-white/10 focus:text-white">{n}</SelectItem>
                    ));
                  })()}
                  {/* "20+" option for birthday pack — triggers WhatsApp flow */}
                  {birthdayPack && (
                    <SelectItem value="20+" className="text-neon-pink focus:bg-white/10 focus:text-white">
                      20+ {isAr ? '(واتساب)' : '(WhatsApp)'}
                    </SelectItem>
                  )}
                  {/* Allow 10+ only if no capacity constraint and no birthday pack */}
                  {!birthdayPack && form.time && getSlotRemaining(form.time) === null && (
                    <SelectItem value="10+" className="text-white focus:bg-white/10 focus:text-white">10+</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Birthday Pack Add-on */}
            {form.people && (
              <div
                onClick={() => { setBirthdayPack(v => !v); setForm(f => ({ ...f, people: '' })); }}
                className={`flex items-center gap-3 cursor-pointer rounded-2xl border p-4 transition-all ${
                  birthdayPack
                    ? 'bg-neon-pink/10 border-neon-pink/40'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                  birthdayPack ? 'bg-neon-pink border-neon-pink' : 'border-white/30'
                }`}>
                  {birthdayPack && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <Gift className={`w-4 h-4 shrink-0 ${birthdayPack ? 'text-neon-pink' : 'text-white/40'}`} />
                <div>
                  <p className={`font-heading font-semibold text-sm ${birthdayPack ? 'text-white' : 'text-white/70'}`}>
                    {isAr ? 'إضافة باقة عيد الميلاد 🎂' : 'Add Birthday Pack 🎂'}
                  </p>
                  <p className="text-white/40 text-xs font-body">
                    {isAr ? 'للمجموعات أقل من 20: احجز أونلاين. 20 فأكثر: عبر واتساب' : 'Under 20 people: book online. 20+ people: via WhatsApp'}
                  </p>
                </div>
              </div>
            )}

            {/* Birthday large group — WhatsApp only */}
            {birthdayWhatsAppOnly && (
              <div className="bg-neon-pink/5 border border-neon-pink/20 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">🎂</div>
                <p className="font-heading font-bold text-white text-base mb-1">
                  {isAr ? 'مجموعات 20+ تحجز عبر واتساب' : 'Groups of 20+ Book via WhatsApp'}
                </p>
                <p className="font-body text-white/50 text-sm mb-4 leading-relaxed">
                  {isAr
                    ? 'للمجموعات الكبيرة وباقات أعياد الميلاد الخاصة، تواصل معنا مباشرة لنخطط لك تجربة مثالية.'
                    : 'For large birthday groups, contact us directly so we can plan the perfect experience for you.'}
                </p>
                <button type="button" onClick={() => handleWhatsAppRedirect(true)}
                  className="w-full h-14 rounded-xl font-heading font-bold text-lg text-white flex items-center justify-center gap-3 transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.5l5.797-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.497-5.2-1.366l-.373-.22-3.44.9.921-3.353-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  {isAr ? 'تحدث على واتساب' : 'Chat on WhatsApp'}
                </button>
              </div>
            )}

            {/* Booking error */}
            {bookingError && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm font-body">{bookingError}</p>
              </div>
            )}

            {/* Contact info */}
            <div className="border-t border-white/5 pt-5 space-y-4">
              {isAuthenticated && (
                <p className="text-neon-green text-xs font-body">✓ {isAr ? 'تم ملء معلوماتك تلقائياً' : 'Your info has been auto-filled'}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/70 font-heading text-sm">{tr(lang, 'booking_name')}</Label>
                  <Input placeholder={tr(lang, 'booking_fullname')} value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/20 w-full" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/70 font-heading text-sm">{tr(lang, 'booking_phone')}</Label>
                  <Input placeholder={tr(lang, 'booking_your_number')} value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/20 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 font-heading text-sm">{tr(lang, 'booking_email')}</Label>
                <Input type="email" placeholder="your@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/20 w-full" />
              </div>
            </div>

            {isWhatsAppOnly ? (
              <div className="bg-neon-green/5 border border-neon-green/20 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">💬</div>
                <p className="font-heading font-bold text-white text-base mb-1">
                  {form.experience} {tr(lang, 'booking_whatsapp_title')}
                </p>
                <p className="font-body text-white/50 text-sm mb-4 leading-relaxed">
                  {tr(lang, 'booking_whatsapp_body')}
                </p>
                <button type="button" onClick={handleWhatsAppRedirect}
                  className="w-full h-14 rounded-xl font-heading font-bold text-lg text-white flex items-center justify-center gap-3 transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.5l5.797-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.497-5.2-1.366l-.373-.22-3.44.9.921-3.353-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  {tr(lang, 'booking_whatsapp_btn')}
                </button>
              </div>
            ) : !birthdayWhatsAppOnly ? (
              <>
                <Button type="submit" disabled={isSubmitting}
                  className="w-full h-14 bg-neon-pink hover:bg-neon-pink/90 text-white font-heading font-bold text-lg rounded-xl animate-pulse-glow disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? (isAr ? 'جارٍ الحجز...' : 'Booking...') : tr(lang, 'booking_confirm')}
                </Button>
                <p className="text-center text-white/30 text-xs font-body">{tr(lang, 'booking_cancel_note')}</p>
              </>
            ) : null}
          </motion.form>
        )}
      </div>
    </section>
  );
}