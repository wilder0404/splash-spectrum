import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Clock, Phone, Mail, User, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminBookings() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => base44.entities.Booking.list('-created_date', 200),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Booking.update(id, { status }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-bookings'] }),
  });

  const updateNotes = useMutation({
    mutationFn: ({ id, adminNotes }) => base44.entities.Booking.update(id, { adminNotes }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-bookings'] }),
  });

  const filtered = bookings.filter(b =>
    [b.name, b.email, b.phone, b.experienceName, b.experienceSlug].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const counts = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  if (isLoading) return <div className="text-white/50 text-center py-20">Loading bookings...</div>;

  return (
    <div className="pb-10">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: counts.total, color: 'text-white' },
          { label: 'Pending', value: counts.pending, color: 'text-yellow-400' },
          { label: 'Confirmed', value: counts.confirmed, color: 'text-green-400' },
          { label: 'Cancelled', value: counts.cancelled, color: 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs font-body mb-1">{s.label}</p>
            <p className={`font-heading font-black text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <Input
          placeholder="Search by name, email, phone or experience..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 bg-white/5 border-white/10 text-white h-11 rounded-xl placeholder:text-white/20"
        />
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-white/30 font-body">No bookings found.</div>
        )}
        {filtered.map(booking => (
          <div key={booking.id} className="bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden">
            <div
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-neon-pink/10 flex items-center justify-center shrink-0 text-lg">
                  {booking.experienceName?.[0] || '🎨'}
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-white text-sm truncate">{booking.name}</p>
                  <p className="text-white/40 text-xs font-body truncate">{booking.experienceName || booking.experienceSlug}{booking.subExperience ? ` — ${booking.subExperience}` : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <p className="text-white/70 text-sm font-body">{booking.date}</p>
                  <p className="text-white/40 text-xs font-body">{booking.time} · {booking.people} people</p>
                </div>
                <Select
                  value={booking.status || 'pending'}
                  onValueChange={(val) => { updateStatus.mutate({ id: booking.id, status: val }); }}
                  onClick={e => e.stopPropagation()}
                >
                  <SelectTrigger className={`h-8 w-28 text-xs font-heading font-semibold border rounded-lg ${statusColors[booking.status || 'pending']}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-obsidian border-white/10">
                    <SelectItem value="pending" className="text-yellow-400">Pending</SelectItem>
                    <SelectItem value="confirmed" className="text-green-400">Confirmed</SelectItem>
                    <SelectItem value="cancelled" className="text-red-400">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                {expandedId === booking.id ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
              </div>
            </div>

            {expandedId === booking.id && (
              <div className="border-t border-white/5 p-4 sm:p-5 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-white/60"><Mail className="w-3.5 h-3.5 text-neon-pink" />{booking.email}</div>
                  <div className="flex items-center gap-2 text-white/60"><Phone className="w-3.5 h-3.5 text-neon-pink" />{booking.phone}</div>
                  <div className="flex items-center gap-2 text-white/60"><Calendar className="w-3.5 h-3.5 text-electric-cyan" />{booking.date}</div>
                  <div className="flex items-center gap-2 text-white/60"><Clock className="w-3.5 h-3.5 text-electric-cyan" />{booking.time}</div>
                  <div className="flex items-center gap-2 text-white/60"><Users className="w-3.5 h-3.5 text-neon-green" />{booking.people} people</div>
                  <div className="flex items-center gap-2 text-white/60"><User className="w-3.5 h-3.5 text-uv-purple" />{booking.name}</div>
                </div>
                <div>
                  <p className="text-white/40 text-xs font-heading mb-1.5">Admin Notes</p>
                  <textarea
                    defaultValue={booking.adminNotes || ''}
                    placeholder="Add internal notes..."
                    rows={2}
                    onBlur={e => updateNotes.mutate({ id: booking.id, adminNotes: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white/70 text-sm font-body resize-none focus:outline-none focus:border-neon-pink/50 placeholder:text-white/20"
                  />
                </div>
                <p className="text-white/20 text-xs font-body">Booked: {new Date(booking.created_date).toLocaleString()}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}