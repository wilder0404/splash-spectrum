import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';
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
    groupSize_en: '', groupSize_ar: '', price_en: '', price_ar: '',
    priceTable: [], includes_en: [], includes_ar: [], rules_en: [], rules_ar: [],
    vibes: [], whatsappOnly: false, isActive: true, sortOrder: 0,
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const save = useMutation({
    mutationFn: () => isNew
      ? base44.entities.Experience.create(form)
      : base44.entities.Experience.update(experience.id, form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-experiences'] });
      onBack();
    },
  });

  const handleImageUpload = async (e, target) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    if (target === 'main') {
      set('image', file_url);
    } else {
      set('gallery', [...(form.gallery || []), file_url]);
    }
    setUploading(false);
  };

  const addPriceRow = () => set('priceTable', [...(form.priceTable || []), { name_en: '', name_ar: '', price: '', desc_en: '', desc_ar: '' }]);
  const updatePriceRow = (i, key, val) => {
    const rows = [...(form.priceTable || [])];
    rows[i] = { ...rows[i], [key]: val };
    set('priceTable', rows);
  };
  const removePriceRow = (i) => set('priceTable', (form.priceTable || []).filter((_, idx) => idx !== i));

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
          {save.isPending ? 'Saving...' : '💾 Save Changes'}
        </Button>
      </div>

      <div className="space-y-5">
        {/* Basic Info */}
        <Section title="Basic Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Slug (URL ID)">
              <Input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="e.g. open-paint-sessions" className={inputCls} />
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
              <Input type="number" value={form.sortOrder} onChange={e => set('sortOrder', Number(e.target.value))} className={inputCls} />
            </Field>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.whatsappOnly} onChange={e => set('whatsappOnly', e.target.checked)} className="w-4 h-4 accent-neon-pink" />
              <span className="text-white/70 text-sm font-body">WhatsApp Only Booking</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e => set('isActive', e.target.checked)} className="w-4 h-4 accent-neon-green" />
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
            <Field label="Group Size"><Input value={form.groupSize_en} onChange={e => set('groupSize_en', e.target.value)} className={inputCls} /></Field>
            <Field label="Price (if custom)"><Input value={form.price_en} onChange={e => set('price_en', e.target.value)} className={inputCls} /></Field>
          </div>
        </Section>

        {/* Arabic Content */}
        <Section title="Arabic Content (محتوى عربي)">
          <Field label="Title (العنوان)">
            <Input dir="rtl" value={form.title_ar} onChange={e => set('title_ar', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Tagline (الشعار)">
            <Input dir="rtl" value={form.tagline_ar} onChange={e => set('tagline_ar', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Description (الوصف)">
            <textarea dir="rtl" rows={4} value={form.description_ar} onChange={e => set('description_ar', e.target.value)} className={textareaCls} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Duration (المدة)"><Input dir="rtl" value={form.duration_ar} onChange={e => set('duration_ar', e.target.value)} className={inputCls} /></Field>
            <Field label="Group Size (حجم المجموعة)"><Input dir="rtl" value={form.groupSize_ar} onChange={e => set('groupSize_ar', e.target.value)} className={inputCls} /></Field>
            <Field label="Price Arabic"><Input dir="rtl" value={form.price_ar} onChange={e => set('price_ar', e.target.value)} className={inputCls} /></Field>
          </div>
        </Section>

        {/* Images */}
        <Section title="Images">
          <Field label="Main Image">
            <div className="flex gap-3 items-center">
              {form.image && <img src={form.image} alt="" className="w-20 h-20 rounded-xl object-cover" />}
              <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-body hover:bg-white/10 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload Main Image'}
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'main')} />
              </label>
            </div>
          </Field>
          <Field label="Gallery Images">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {(form.gallery || []).map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="" className="w-full aspect-square object-cover rounded-xl" />
                  <button onClick={() => set('gallery', form.gallery.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
            <label className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-body hover:bg-white/10 transition-colors cursor-pointer w-fit">
              <Plus className="w-4 h-4" /> Add Gallery Photo
              <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'gallery')} />
            </label>
          </Field>
        </Section>

        {/* Pricing Table */}
        <Section title="Pricing Table">
          <div className="space-y-3">
            {(form.priceTable || []).map((row, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <Input placeholder="Name EN" value={row.name_en} onChange={e => updatePriceRow(i, 'name_en', e.target.value)} className={inputCls + ' text-xs'} />
                <Input placeholder="اسم عربي" dir="rtl" value={row.name_ar} onChange={e => updatePriceRow(i, 'name_ar', e.target.value)} className={inputCls + ' text-xs'} />
                <Input placeholder="Price (e.g. 149 SAR)" value={row.price} onChange={e => updatePriceRow(i, 'price', e.target.value)} className={inputCls + ' text-xs'} />
                <Input placeholder="Desc EN" value={row.desc_en} onChange={e => updatePriceRow(i, 'desc_en', e.target.value)} className={inputCls + ' text-xs'} />
                <div className="flex gap-2">
                  <Input placeholder="وصف" dir="rtl" value={row.desc_ar} onChange={e => updatePriceRow(i, 'desc_ar', e.target.value)} className={inputCls + ' text-xs flex-1'} />
                  <button onClick={() => removePriceRow(i)} className="w-8 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-3 h-3 text-red-400" /></button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addPriceRow} className="flex items-center gap-2 text-neon-pink text-sm font-heading font-semibold hover:text-neon-pink/80 transition-colors mt-2">
            <Plus className="w-4 h-4" /> Add Price Row
          </button>
        </Section>

        {/* What's Included */}
        <Section title="What's Included">
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
              <p className="text-white/40 text-xs font-heading mb-2">Arabic (عربي)</p>
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

        {/* Rules */}
        <Section title="Rules / Good To Know">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-white/40 text-xs font-heading mb-2">English</p>
              <div className="space-y-2">
                {(form.rules_en || []).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={item} onChange={e => editList('rules_en', i, e.target.value)} className={inputCls + ' text-xs flex-1'} />
                    <button onClick={() => removeFromList('rules_en', i)} className="w-8 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-3 h-3 text-red-400" /></button>
                  </div>
                ))}
                <button onClick={() => addToList('rules_en')} className="flex items-center gap-1 text-electric-cyan text-xs font-heading"><Plus className="w-3 h-3" /> Add</button>
              </div>
            </div>
            <div>
              <p className="text-white/40 text-xs font-heading mb-2">Arabic (عربي)</p>
              <div className="space-y-2">
                {(form.rules_ar || []).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input dir="rtl" value={item} onChange={e => editList('rules_ar', i, e.target.value)} className={inputCls + ' text-xs flex-1'} />
                    <button onClick={() => removeFromList('rules_ar', i)} className="w-8 h-9 bg-red-500/10 hover:bg-red-500/20 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-3 h-3 text-red-400" /></button>
                  </div>
                ))}
                <button onClick={() => addToList('rules_ar')} className="flex items-center gap-1 text-electric-cyan text-xs font-heading"><Plus className="w-3 h-3" /> Add</button>
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
            {save.isPending ? 'Saving...' : '💾 Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}