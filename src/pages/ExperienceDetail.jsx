import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EXPERIENCES = {
  'open-paint-sessions': {
    title: 'Open Paint Sessions',
    tagline: 'No rules. Just paint.',
    description: 'Walk in, pick your colors, and let loose. Under our iconic UV lights, every splash becomes a masterpiece. Open sessions are perfect if you just want to show up and have fun — no booking a specific theme, no pressure, just pure creative chaos.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/e8bc2829e_generated_7b2d1bf5.png",
    icon: '🎨',
    color: '#FF007F',
    duration: '60–90 min',
    groupSize: '1–20 people',
    price: '£20/person',
    includes: ['All UV paint & brushes', 'Apron & cover-up', 'Take-home canvas', 'Complementary glitter'],
    vibes: ['Solo exploration', 'Casual friend hangout', 'Walk-in friendly'],
  },
  'birthday-experiences': {
    title: 'Birthday Experiences',
    tagline: 'The most colorful birthday ever.',
    description: 'Forget boring dinner reservations. Celebrate your birthday with a full-on paint party — UV lights, your crew, custom music, and a cake moment surrounded by neon color. We set everything up so you just have to show up and have the best night of your year.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/049f6ea1d_generated_3b2a572d.png",
    icon: '🎉',
    color: '#9D00FF',
    duration: '90–120 min',
    groupSize: '5–30 people',
    price: '£28/person',
    includes: ['Dedicated session space', 'Birthday setup & decor', 'All paint & materials', 'Group photo moment', 'Custom playlist'],
    vibes: ['Birthday parties', 'Milestone celebrations', 'Group events'],
  },
  'group-friends': {
    title: 'Group & Friends',
    tagline: 'Bring your crew. Leave with memories.',
    description: 'There is no better bonding activity than getting covered in fluorescent paint together. Group sessions are high-energy, loud, and incredibly fun. Whether it\'s a friend group, a date night squad, or a celebration — this is the move.',
    image: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/2828965b7_image.png",
    icon: '👯',
    color: '#00F3FF',
    duration: '90 min',
    groupSize: '4–50 people',
    price: '£25/person',
    includes: ['Group coordination', 'All paints & tools', 'Team challenges', 'Aprons & cover-ups'],
    vibes: ['Friend groups', 'Date nights', 'Team bonding'],
  },
  'kids-experiences': {
    title: 'Kids Experiences',
    tagline: 'Safe, silly, and absolutely magical.',
    description: 'Designed specifically for younger artists aged 3–12. Fully supervised, with child-safe UV paint, smaller canvases, and activities tailored to keep little ones engaged the whole time. Parents are welcome to join the fun.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/607fecb09_generated_83edbf2d.png",
    icon: '🧸',
    color: '#39FF14',
    duration: '60 min',
    groupSize: '2–15 kids',
    price: '£18/child',
    includes: ['Child-safe UV paint', 'Supervised activities', 'Mini take-home canvas', 'Aprons & mess protection', 'Parent accompaniment welcome'],
    vibes: ['Ages 3–12', 'Supervised fun', 'Parent-friendly'],
  },
  'custom-art-figurines': {
    title: 'Custom Art & Figurines',
    tagline: 'Paint something you\'ll keep forever.',
    description: 'Move beyond canvas. In this session you\'ll paint a custom 3D figurine or intricate art piece under UV light. It\'s more precise, more personal, and results in a glowing masterpiece you can display at home.',
    image: "https://media.base44.com/images/public/69e5ef89828747441c931879/bdceac480_generated_65a48237.png",
    icon: '🎁',
    color: '#FF007F',
    duration: '90 min',
    groupSize: '1–10 people',
    price: '£35/person',
    includes: ['Custom 3D figurine or art piece', 'Specialty UV paints', 'Fine brushes & tools', 'Protective coating for take-home'],
    vibes: ['Artistic', 'Detail-focused', 'Unique keepsake'],
  },
  'special-events': {
    title: 'Special Events',
    tagline: 'We build the experience around you.',
    description: 'From corporate team days to brand activations, hen dos to anniversary surprises — we craft fully custom immersive paint events for any occasion. Tell us what you need and we\'ll make it happen.',
    image: "https://media.base44.com/images/public/user_69d7790ceb26c9be09c03a17/427586904_image.png",
    icon: '🤍',
    color: '#9D00FF',
    duration: 'Custom',
    groupSize: '10–100+ people',
    price: 'Custom quote',
    includes: ['Full venue setup', 'Custom branding options', 'Dedicated event coordinator', 'Catering coordination', 'Professional photography'],
    vibes: ['Corporate events', 'Hen parties', 'Brand activations', 'Large groups'],
  },
};

const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

export default function ExperienceDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('id') || 'open-paint-sessions';
  const exp = EXPERIENCES[slug] || EXPERIENCES['open-paint-sessions'];

  const [form, setForm] = useState({ date: '', time: '', people: '', name: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={exp.image} alt={exp.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6">
          <div className="max-w-4xl mx-auto w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <span className="text-4xl block mb-3">{exp.icon}</span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-white mb-2" style={{ textShadow: `0 0 40px ${exp.color}66` }}>
              {exp.title}
            </h1>
            <p className="font-body text-white/60 text-lg">{exp.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-body text-white/65 leading-relaxed text-base">{exp.description}</p>
            </motion.div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Clock, label: 'Duration', value: exp.duration },
                { icon: Users, label: 'Group Size', value: exp.groupSize },
                { icon: Star, label: 'From', value: exp.price },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1" style={{ color: exp.color }} />
                  <p className="text-white/30 text-xs font-body mb-0.5">{label}</p>
                  <p className="font-heading font-bold text-white text-xs">{value}</p>
                </div>
              ))}
            </div>

            {/* What's included */}
            <div>
              <h3 className="font-heading font-bold text-white text-lg mb-4">What's included</h3>
              <ul className="space-y-2">
                {exp.includes.map(item => (
                  <li key={item} className="flex items-center gap-3 font-body text-white/60 text-sm">
                    <CheckCircle className="w-4 h-4 shrink-0" style={{ color: exp.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vibes */}
            <div className="flex flex-wrap gap-2">
              {exp.vibes.map(vibe => (
                <span key={vibe} className="px-3 py-1 rounded-full border text-xs font-heading font-semibold"
                  style={{ borderColor: `${exp.color}44`, color: exp.color, background: `${exp.color}10` }}>
                  {vibe}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Booking Form */}
          <div>
            <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 md:p-8 sticky top-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="font-heading font-black text-white text-2xl mb-3">You're booked!</h3>
                  <p className="font-body text-white/60 text-sm leading-relaxed mb-4">
                    Your reservation for <span className="text-white">{exp.title}</span> is confirmed.
                  </p>
                  <div className="bg-neon-pink/10 border border-neon-pink/20 rounded-xl p-4 text-left space-y-1 mb-6">
                    <p className="text-white/80 text-sm font-body">📅 {form.date} at {form.time}</p>
                    <p className="text-white/80 text-sm font-body">👥 {form.people} {Number(form.people) === 1 ? 'person' : 'people'}</p>
                    <p className="text-white/80 text-sm font-body">👤 {form.name}</p>
                  </div>
                  <div className="bg-electric-cyan/5 border border-electric-cyan/20 rounded-xl p-4">
                    <p className="text-electric-cyan font-heading font-bold text-sm mb-1">⏰ Important reminder</p>
                    <p className="text-white/60 text-xs font-body leading-relaxed">
                      Please arrive <strong className="text-white">at least 10 minutes before</strong> your session starts. Late arrivals may reduce your paint time. We can't wait to see you get messy! 🎨
                    </p>
                  </div>
                  <Link to="/" className="mt-6 inline-block text-white/40 hover:text-white text-sm font-body transition-colors">
                    ← Back to home
                  </Link>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-heading font-bold text-white text-xl mb-6">Reserve Your Spot</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">Date</Label>
                        <Input
                          type="date"
                          required
                          value={form.date}
                          onChange={e => setForm({ ...form, date: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">Time</Label>
                        <Select required onValueChange={v => setForm({ ...form, time: v })}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm">
                            <SelectValue placeholder="Pick time" />
                          </SelectTrigger>
                          <SelectContent className="bg-obsidian border-white/10">
                            {timeSlots.map(t => (
                              <SelectItem key={t} value={t} className="text-white focus:bg-white/10 focus:text-white">{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-white/60 text-xs font-heading">Number of people</Label>
                      <Select required onValueChange={v => setForm({ ...form, people: v })}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm">
                          <SelectValue placeholder="How many?" />
                        </SelectTrigger>
                        <SelectContent className="bg-obsidian border-white/10">
                          {[1,2,3,4,5,6,7,8,9,10,'10+'].map(n => (
                            <SelectItem key={n} value={String(n)} className="text-white focus:bg-white/10 focus:text-white">
                              {n} {n === 1 ? 'person' : 'people'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-white/60 text-xs font-heading">Your name</Label>
                      <Input
                        required
                        placeholder="Full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">Email</Label>
                        <Input
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-white/60 text-xs font-heading">Phone</Label>
                        <Input
                          placeholder="Your number"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="bg-white/5 border-white/10 text-white h-11 rounded-xl text-sm placeholder:text-white/20"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-white font-heading font-bold rounded-xl text-base animate-pulse-glow"
                      style={{ backgroundColor: exp.color }}
                    >
                      🎨 Confirm Booking
                    </Button>
                    <p className="text-center text-white/20 text-xs font-body">
                      Free cancellation up to 24 hours before your session
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}