import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceEditor from './ExperienceEditor';

export default function AdminExperiences() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(null);

  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ['admin-experiences'],
    queryFn: async () => {
      const { data } = await db.getExperiences();
      return data || [];
    },
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }) => {
      await db.updateExperience(id, { is_active });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-experiences'] }),
  });

  if (editing) {
    const exp = editing === 'new' ? null : experiences.find(e => e.id === editing);
    return (
      <ExperienceEditor
        experience={exp}
        onBack={() => setEditing(null)}
      />
    );
  }

  if (isLoading) return <div className="text-white/50 text-center py-20">Loading experiences...</div>;

  return (
    <div className="pb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-white text-xl">All Experiences ({experiences.length})</h2>
        <Button
          onClick={() => setEditing('new')}
          className="bg-neon-pink hover:bg-neon-pink/80 text-white font-heading font-bold rounded-xl gap-2"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      <div className="space-y-3">
        {experiences.map(exp => (
          <div key={exp.id} className={`bg-white/[0.03] border rounded-2xl p-4 flex items-center gap-4 ${exp.is_active ? 'border-white/8' : 'border-white/3 opacity-50'}`}>
            <img src={exp.image || '/placeholder.svg'} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xl">{exp.icon}</span>
                <p className="font-heading font-bold text-white truncate">{exp.title_en}</p>
                {exp.whatsapp_only && <span className="text-xs bg-neon-green/10 text-neon-green border border-neon-green/20 rounded-full px-2 py-0.5">WhatsApp Only</span>}
              </div>
              <p className="text-white/40 text-sm font-body truncate">{exp.tagline_en}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleActive.mutate({ id: exp.id, is_active: !exp.is_active })}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                title={exp.is_active ? 'Hide' : 'Show'}
              >
                {exp.is_active ? <Eye className="w-4 h-4 text-neon-green" /> : <EyeOff className="w-4 h-4 text-white/30" />}
              </button>
              <button
                onClick={() => setEditing(exp.id)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Pencil className="w-4 h-4 text-electric-cyan" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
