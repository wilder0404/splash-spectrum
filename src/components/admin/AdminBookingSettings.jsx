import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Plus, Trash2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const inputCls = "bg-white/5 border-white/10 text-white rounded-xl placeholder:text-white/20";
const Section = ({ title, children }) => (
  <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 space-y-4">
    <h3 className="font-heading font-bold text-neon-pink text-sm uppercase tracking-wider">{title}</h3>
    {children}
  </div>
);

export default function AdminBookingSettings() {
  const qc = useQueryClient();
  const { data: settingsList = [], isLoading } = useQuery({
    queryKey: ['booking-settings'],
    queryFn: () => base44.entities.BookingSettings.list(),
  });

  const settings = settingsList[0] || null;

  const [timeSlots, setTimeSlots] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    if (settings) {
      setTimeSlots(settings.timeSlots || []);
      setExperiences(settings.experienceOptions || []);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: () => {
      const data = { timeSlots, experienceOptions: experiences };
      return settings
        ? base44.entities.BookingSettings.update(settings.id, data)
        : base44.entities.BookingSettings.create(data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['booking-settings'] }),
  });

  const addTimeSlot = () => setTimeSlots([...timeSlots, '']);
  const updateTimeSlot = (i, val) => { const a = [...timeSlots]; a[i] = val; setTimeSlots(a); };
  const removeTimeSlot = (i) => setTimeSlots(timeSlots.filter((_, idx) => idx !== i));

  const addExperience = () => setExperiences([...experiences, { name_en: '', name_ar: '', whatsappOnly: false, subExperiences: [] }]);
  const removeExperience = (i) => setExperiences(experiences.filter((_, idx) => idx !== i));
  const updateExp = (i, key, val) => { const a = [...experiences]; a[i] = { ...a[i], [key]: val }; setExperiences(a); };

  const addSubExp = (i) => {
    const a = [...experiences];
    a[i] = { ...a[i], subExperiences: [...(a[i].subExperiences || []), { name_en: '', name_ar: '', maxPeople: 10 }] };
    setExperiences(a);
  };
  const removeSubExp = (i, j) => {
    const a = [...experiences];
    a[i] = { ...a[i], subExperiences: a[i].subExperiences.filter((_, idx) => idx !== j) };
    setExperiences(a);
  };
  const updateSubExp = (i, j, key, val) => {
    const a = [...experiences];
    const subs = [...(a[i].subExperiences || [])];
    subs[j] = { ...subs[j], [key]: val };
    a[i] = { ...a[i], subExperiences: subs };
    setExperiences(a);
  };

  if (isLoading) return <div className="text-white/50 text-center py-20">Loading...</div>;

  return (
    <div className="pb-10 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading font-bold text-white text-xl">Booking Form Settings</h2>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}
          className="bg-neon-pink hover:bg-neon-pink/80 text-white font-heading font-bold rounded-xl gap-2">
          <Save className="w-4 h-4" /> {saveMutation.isPending ? 'Saving...' : 'Save All'}
        </Button>
      </div>

      {/* Time Slots */}
      <Section title="Available Time Slots">
        <div className="flex flex-wrap gap-2 mb-3">
          {timeSlots.map((slot, i) => (
            <div key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
              <Input value={slot} onChange={e => updateTimeSlot(i, e.target.value)}
                className={inputCls + ' h-7 text-xs w-28 border-0 bg-transparent p-0 px-1'} />
              <button onClick={() => removeTimeSlot(i)} className="text-red-400 hover:text-red-300 ml-1">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addTimeSlot} className="flex items-center gap-2 text-neon-pink text-sm font-heading font-semibold">
          <Plus className="w-4 h-4" /> Add Time Slot
        </button>
      </Section>

      {/* Experience Options */}
      <Section title="Experience Options">
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/40 text-xs mb-1 block">Name (English)</Label>
                  <Input value={exp.name_en} onChange={e => updateExp(i, 'name_en', e.target.value)} className={inputCls + ' text-sm'} />
                </div>
                <div>
                  <Label className="text-white/40 text-xs mb-1 block">Name (Arabic)</Label>
                  <Input dir="rtl" value={exp.name_ar} onChange={e => updateExp(i, 'name_ar', e.target.value)} className={inputCls + ' text-sm'} />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={exp.whatsappOnly} onChange={e => updateExp(i, 'whatsappOnly', e.target.checked)} className="w-4 h-4 accent-neon-green" />
                <span className="text-white/60 text-sm font-body">WhatsApp Only</span>
              </label>

              {/* Sub-experiences */}
              <div className="space-y-2">
                <p className="text-white/40 text-xs font-heading uppercase tracking-wider">Sub-Activities</p>
                {(exp.subExperiences || []).map((sub, j) => (
                  <div key={j} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-white/[0.02] rounded-lg p-2">
                    <Input placeholder="Name EN" value={sub.name_en} onChange={e => updateSubExp(i, j, 'name_en', e.target.value)} className={inputCls + ' text-xs'} />
                    <Input placeholder="اسم" dir="rtl" value={sub.name_ar} onChange={e => updateSubExp(i, j, 'name_ar', e.target.value)} className={inputCls + ' text-xs'} />
                    <Input type="number" placeholder="Max people" value={sub.maxPeople} onChange={e => updateSubExp(i, j, 'maxPeople', Number(e.target.value))} className={inputCls + ' text-xs'} />
                    <button onClick={() => removeSubExp(i, j)} className="flex justify-center"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                ))}
                <button onClick={() => addSubExp(i)} className="flex items-center gap-1 text-electric-cyan text-xs font-heading">
                  <Plus className="w-3 h-3" /> Add Sub-activity
                </button>
              </div>

              <div className="flex justify-end">
                <button onClick={() => removeExperience(i)} className="flex items-center gap-1 text-red-400 hover:text-red-300 text-xs font-heading">
                  <Trash2 className="w-3 h-3" /> Remove Experience
                </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addExperience} className="flex items-center gap-2 text-neon-pink text-sm font-heading font-semibold mt-2">
          <Plus className="w-4 h-4" /> Add Experience Option
        </button>
      </Section>
    </div>
  );
}