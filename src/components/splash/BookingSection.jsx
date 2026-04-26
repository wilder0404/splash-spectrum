import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Palette, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WHATSAPP_NUMBER = '966554563447';

const experienceTypes = [
  'Open Paint Session',
  'Birthday Experience',
  'Graduation',
  'Group & Friends',
  'Kids Experience',
  'Custom Art & Figurines',
  'Special Event',
];

const WHATSAPP_ONLY = ['Birthday Experience', 'Graduation'];

export default function BookingSection() {
  const [form, setForm] = useState({
    experience: '',
    date: '',
    time: '',
    people: '',
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const isWhatsAppOnly = WHATSAPP_ONLY.includes(form.experience);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const msg = encodeURIComponent(
      `Hi! I'd like to book a *${form.experience}* at Splash Spectrum. Please help me with the details! 🎨`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <section id="booking" className="py-20 md:py-32 px-4 bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-pink/5 via-transparent to-uv-purple/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[200px]" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-neon-pink font-heading font-semibold text-sm uppercase tracking-[0.3em] mb-4 text-glow-pink">
            Ready to Splash?
          </p>
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl text-white mb-4">
            Book Your <span className="text-electric-cyan text-glow-cyan">Experience</span>
          </h2>
          <p className="text-white/50 font-body max-w-md mx-auto">
            Reserve your spot and get ready for the most colorful time of your life.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12 text-center"
          >
            <div className="text-6xl mb-5">🎉</div>
            <h3 className="font-heading font-black text-white text-2xl md:text-3xl mb-3">Booking Confirmed!</h3>
            <p className="font-body text-white/60 mb-6 leading-relaxed">
              Your <span className="text-white">{form.experience}</span> is locked in for <span className="text-white">{form.date}</span> at <span className="text-white">{form.time}</span>. We can't wait to see you get messy!
            </p>
            <div className="bg-electric-cyan/5 border border-electric-cyan/20 rounded-2xl p-5 text-left max-w-sm mx-auto mb-6">
              <p className="text-electric-cyan font-heading font-bold text-sm mb-2">⏰ Before you arrive</p>
              <p className="text-white/60 text-sm font-body leading-relaxed">
                Please be at the studio <strong className="text-white">at least 10 minutes before</strong> your session starts. Wear clothes you don't mind getting paint on — or we've got you covered with aprons!
              </p>
            </div>
            <div className="bg-neon-pink/5 border border-neon-pink/10 rounded-2xl p-4 text-left max-w-sm mx-auto mb-8">
              <p className="text-white/50 text-xs font-body space-y-1">
                <span className="block">📅 {form.date} at {form.time}</span>
                <span className="block">👥 {form.people} {Number(form.people) === 1 ? 'person' : 'people'}</span>
                <span className="block">👤 {form.name} · {form.email}</span>
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-white/30 hover:text-white/60 text-sm font-body transition-colors"
            >
              Make another booking
            </button>
          </motion.div>
        ) : (

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-3xl p-6 md:p-10 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-neon-pink" /> Experience
              </Label>
              <Select onValueChange={(v) => setForm({ ...form, experience: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Choose experience" />
                </SelectTrigger>
                <SelectContent className="bg-obsidian border-white/10">
                  {experienceTypes.map(type => (
                    <SelectItem key={type} value={type} className="text-white focus:bg-white/10 focus:text-white">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-neon-green" /> Number of People
              </Label>
              <Select onValueChange={(v) => setForm({ ...form, people: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue placeholder="How many?" />
                </SelectTrigger>
                <SelectContent className="bg-obsidian border-white/10">
                  {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => (
                    <SelectItem key={n} value={String(n)} className="text-white focus:bg-white/10 focus:text-white">{n} {typeof n === 'number' && n === 1 ? 'person' : 'people'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-uv-purple" /> Date
              </Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-electric-cyan" /> Preferred Time
              </Label>
              <Select onValueChange={(v) => setForm({ ...form, time: v })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <SelectValue placeholder="Choose time" />
                </SelectTrigger>
                <SelectContent className="bg-obsidian border-white/10">
                  {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'].map(t => (
                    <SelectItem key={t} value={t} className="text-white focus:bg-white/10 focus:text-white">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/70 font-heading text-sm">Your Name</Label>
                <Input
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 font-heading text-sm">Phone / WhatsApp</Label>
                <Input
                  placeholder="Your number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white/70 font-heading text-sm">Email</Label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl placeholder:text-white/20"
              />
            </div>
          </div>

          {isWhatsAppOnly ? (
            <div className="space-y-4">
              <div className="bg-neon-green/5 border border-neon-green/20 rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">💬</div>
                <p className="font-heading font-bold text-white text-base mb-1">
                  {form.experience} — WhatsApp Only
                </p>
                <p className="font-body text-white/50 text-sm mb-4 leading-relaxed">
                  This experience requires a personal consultation. Tap below to chat with us on WhatsApp and we'll get everything sorted for you!
                </p>
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full h-14 rounded-xl font-heading font-bold text-lg text-white flex items-center justify-center gap-3 transition-transform hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.5l5.797-1.517A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.497-5.2-1.366l-.373-.22-3.44.9.921-3.353-.242-.386A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <>
              <Button
                type="submit"
                className="w-full h-14 bg-neon-pink hover:bg-neon-pink/90 text-white font-heading font-bold text-lg rounded-xl animate-pulse-glow"
              >
                🎨 Confirm Booking
              </Button>
              <p className="text-center text-white/30 text-xs font-body">
                Free cancellation up to 24 hours before your session
              </p>
            </>
          )}
        </motion.form>
        )}
      </div>
    </section>
  );
}