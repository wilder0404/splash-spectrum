import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
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
  const { data: settings, isLoading } = useQuery({
    queryKey: ['booking-settings'],
    queryFn: async () => {
      const { data } = await db.getBookingSettings();
      return data;
    },
  });

  const [timeSlots, setTimeSlots] = useState([]);
  const [closedDates, setClosedDates] = useState([]);

  useEffect(() => {
    if (settings) {
      setTimeSlots(settings.time_slots || []);
      setClosedDates(settings.special_closed_dates || []);
    }
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (settings?.id) {
        await db.updateBookingSettings(settings.id, { 
          time_slots: timeSlots, 
          special_closed_dates: closedDates 
        });
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['booking-settings'] }),
  });

  const addTimeSlot = () => setTimeSlots([...timeSlots, '']);
  const updateTimeSlot = (i, val) => { const a = [...timeSlots]; a[i] = val; setTimeSlots(a); };
  const removeTimeSlot = (i) => setTimeSlots(timeSlots.filter((_, idx) => idx !== i));

  const addClosedDate = () => setClosedDates([...closedDates, '']);
  const updateClosedDate = (i, val) => { const a = [...closedDates]; a[i] = val; setClosedDates(a); };
  const removeClosedDate = (i) => setClosedDates(closedDates.filter((_, idx) => idx !== i));

  if (isLoading) return <div className="text-white/50 text-center py-20">Loading...</div>;

  return (
    <div className="pb-10 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-heading font-bold text-white text-xl">Booking Settings</h2>
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

      {/* Special Closed Dates */}
      <Section title="Special Closed Dates">
        <p className="text-white/40 text-xs font-body mb-3">Add dates when bookings should be blocked (e.g., holidays, maintenance)</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {closedDates.map((date, i) => (
            <div key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2 py-1">
              <Input type="date" value={date} onChange={e => updateClosedDate(i, e.target.value)}
                className={inputCls + ' h-7 text-xs border-0 bg-transparent p-0 px-1'} />
              <button onClick={() => removeClosedDate(i)} className="text-red-400 hover:text-red-300 ml-1">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addClosedDate} className="flex items-center gap-2 text-neon-pink text-sm font-heading font-semibold">
          <Plus className="w-4 h-4" /> Add Closed Date
        </button>
      </Section>
    </div>
  );
}
