import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const Section = ({ title, children }) => (
  <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-4">
    <h3 className="font-heading font-bold text-white text-sm uppercase tracking-wider text-neon-pink">{title}</h3>
    {children}
  </div>
);

const Field = ({ label, children }) => (
  <div className="space-y-1.5">
    <Label className="text-white/50 text-xs font-heading">{label}</Label>
    {children}
  </div>
);

const inputCls = "bg-white/5 border-white/10 text-white rounded-xl placeholder:text-white/20";
const textareaCls = "w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm font-body resize-none focus:outline-none focus:border-neon-pink/50 placeholder:text-white/20";

export default function ExperienceEditor({ experience, onBack }) {
  const qc = useQueryClient();
  const isNew = !experience;

  const [form, setForm] = useState(experience || {
    slug: '', title_en: '', title_ar: '', tagline_en: '', tagline_ar: '',
    description_en: '', description_ar: '', image: '', gallery: [],
    icon: '🎨', color: '#FF007F', duration_en: '', duration_ar: '',
    group_size_en: '', group_size_ar: '', price_en: '', price_ar: '',
    price_table: [], includes_en: [], includes_ar: [], rules_en: [], rules_ar: [],
    vibes: [], whatsapp_only: false, is_active: true, sort_order: 0,
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const save = useMutation({
    mutationFn: async () => {
      if (isNew) {
        // For now, just show alert - create would need admin privileges
        alert('Creating new experiences requires database admin access');
      } else {
        await db.updateExperience(experience.id, form);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-experiences'] });
      onBack();
    },
  });

  const addPriceRow = () => set('price_table', [...(form.price_table || []), { name_en: '', name_ar: '', price: '' }]);
  const updatePriceRow = (i, key, val) => {
    const rows = [...(form.price_table || [])];
    rows[i] = { ...rows[i], [key]: val };
    set('price_table', rows);
  };
  const removePriceRow = (i) => set('price_table', (form.price_table || []).filter((_, idx) => idx !== i));

  const editList = (key, i, val) => {
    const arr = [...(form[key] || [])];
    arr[i] = val;
    set(key, arr);
  };
  const addToList = (key) => set(key, [...(form[key] || []), '']);
  const removeFromList = (key, i) => set(key, (form[key] || []).filter((_, idx) => idx !== i));

  return (
    <div className="pb-16">
      <button onClick={onBack} className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors font-body text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Experiences
      </button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-black text-white text-2xl">{isNew ? 'New Experience' : `Edit: ${form.title_en}`}</h2>
        <Button
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="bg-neon-pink hover:bg-neon-pink/80 text-white font-heading font-bold rounded-xl px-6"
        >
          {save.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="space-y-5">
        {/* Basic Info */}
        <Section title="Basic Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Slug (URL ID)">
              <Input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. splash" className={inputCls} />
            </Field>
            <Field label="Icon (emoji)">
              <Input value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="🎨" className={inputCls} />
            </Field>
            <Field label="Accent Color (hex)">
              <div className="flex gap-2 items-center">
                <input type="color" value={form.color} onChange={e => set('color', e.target.value)} className="w-10 h-10 rounded-lg border-0 bg-transparent cursor-pointer" />
                <Input value={form.color} onChange={e => set('color', e.target.value)} className={inputCls + ' flex-1'} />
              </div>
            </Field>
            <Field label="Sort Order">
              <Input type="number" value={form.sort_order} onChange={e => set('sort_order', Number(e.target.value))} className={inputCls} />
            </Field>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.whatsapp_only} onChange={e => set('whatsapp_only', e.target.checked)} className="w-4 h-4 accent-neon-pink" />
              <span className="text-white/70 text-sm font-body">WhatsApp Only Booking</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4 accent-neon-green" />
              <span className="text-white/70 text-sm font-body">Active (visible on site)</span>
            </label>
          </div>
        </Section>

        {/* English Content */}
        <Section title="English Content">
          <Field label="Title">
            <Input value={form.title_en} onChange={e => set('title_en', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Tagline">
            <Input value={form.tagline_en} onChange={e => set('tagline_en', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea rows={4} value={form.description_en} onChange={e => set('description_en', e.target.value)} className={textareaCls} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Duration"><Input value={form.duration_en} onChange={e => set('duration_en', e.target.value)} className={inputCls} /></Field>
            <Field label="Group Size"><Input value={form.group_size_en} onChange={e => set('group_size_en', e.target.value)} className={inputCls} /></Field>
            <Field label="Price"><Input value={form.price_en} onChange={e => set('price_en', e.target.value)} className={inputCls} /></Field>
          </div>
        </Section>

        {/* Arabic Content */}
        <Section title="Arabic Content">
          <Field label="Title">
            <Input dir="rtl" value={form.title_ar} onChange={e => set('title_ar', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Tagline">
            <Input dir="rtl" value={form.tagline_ar} onChange={e => set('tagline_ar', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea dir="rtl" rows={4} value={form.description_ar} onChange={e => set('description_ar', e.target.value)} className={textareaCls} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Duration"><Input dir="rtl" value={form.duration_ar} onChange={e => set('duration_ar', e.target.value)} className={inputCls} /></Field>
            <Field label="Group Size"><Input dir="rtl" value={form.group_size_ar} onChange={e => set('group_size_ar', e.target.value)} className={inputCls} /></Field>
            <Field label="Price"><Input dir="rtl" value={form.price_ar} onChange={e => set('price_ar', e.target.value)} className={inputCls} /></Field>
          </div>
        </Section>

        {/* Pricing Table */}
        <Section title="Pricing Table">
          <div className="space-y-3">
            {(form.price_table || []).map((row, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <Input placeholder="Name EN" value={row.name_en} onChange={e => updatePriceRow(i, 'name_en', e.target.value)} className={inputCls + ' text-xs'} />
                <Input placeholder="Name AR" dir="rtl" value={row.name_ar} onChange={e => updatePriceRow(i, 'name_ar', e.target.value)} className={inputCls + ' text-xs'} />
                <Input placeholder="Price" value={row.price} onChange={e => updatePriceRow(i, 'price', e.target.value)} className={inputCls + ' text-xs'} />
                <button onClick={() => removePriceRow(i)} className="w-8 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-3 h-3 text-red-400" /></button>
              </div>
            ))}
          </div>
          <button onClick={addPriceRow} className="flex items-center gap-2 text-neon-pink text-sm font-heading font-semibold hover:text-neon-pink/80 transition-colors mt-2">
            <Plus className="w-4 h-4" /> Add Price Row
          </button>
        </Section>

        {/* What's Included */}
        <Section title="What&apos;s Included">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-xs font-heading mb-2">English</p>
              <div className="space-y-2">
                {(form.includes_en || []).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={item} onChange={e => editList('includes_en', i, e.target.value)} className={inputCls + ' text-xs flex-1'} />
                    <button onClick={() => removeFromList('includes_en', i)} className="w-8 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-3 h-3 text-red-400" /></button>
                  </div>
                ))}
                <button onClick={() => addToList('includes_en')} className="flex items-center gap-1 text-electric-cyan text-xs font-heading"><Plus className="w-3 h-3" /> Add</button>
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs font-heading mb-2">Arabic</p>
              <div className="space-y-2">
                {(form.includes_ar || []).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input dir="rtl" value={item} onChange={e => editList('includes_ar', i, e.target.value)} className={inputCls + ' text-xs flex-1'} />
                    <button onClick={() => removeFromList('includes_ar', i)} className="w-8 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-3 h-3 text-red-400" /></button>
                  </div>
                ))}
                <button onClick={() => addToList('includes_ar')} className="flex items-center gap-1 text-electric-cyan text-xs font-heading"><Plus className="w-3 h-3" /> Add</button>
              </div>
            </div>
          </div>
        </Section>

        <div className="flex justify-end pt-2">
          <Button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="bg-neon-pink hover:bg-neon-pink/80 text-white font-heading font-bold rounded-xl px-8 h-12 text-base"
          >
            {save.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
