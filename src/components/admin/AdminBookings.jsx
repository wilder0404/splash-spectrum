import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const statusColors = {
  confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
  done: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function AdminBookings() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data } = await db.getAllBookings();
      return data || [];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      await db.updateBooking(id, { status });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-bookings'] }),
  });

  const filtered = bookings.filter(b =>
    [b.customer_name, b.customer_email, b.customer_phone, b.experience_name, b.sub_experience].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const counts = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    done: bookings.filter(b => b.status === 'done').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  if (isLoading) return <div className="text-white/50 text-center py-20">Loading bookings...</div>;

  return (
    <div className="pb-10">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total', value: counts.total, color: 'text-white' },
          { label: 'Confirmed', value: counts.confirmed, color: 'text-green-400' },
          { label: 'Done', value: counts.done, color: 'text-blue-400' },
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

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="bg-white/[0.04] border-b border-white/8">
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">#</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Experience</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Activity</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Date</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Time</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">People</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Full Name</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Phone</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Email</th>
              <th className="text-left px-4 py-3 text-white/50 font-heading font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-16 text-white/30">No bookings found.</td>
              </tr>
            ) : (
              filtered.map((booking, idx) => (
                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-white/30">{idx + 1}</td>
                  <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">{booking.experience_name || booking.experience_slug || '—'}</td>
                  <td className="px-4 py-3 text-white/70 whitespace-nowrap">{booking.sub_experience || '—'}</td>
                  <td className="px-4 py-3 text-white/70 whitespace-nowrap">
                    {booking.booking_date ? (
                      <span>
                        {booking.booking_date}{' '}
                        <span className="text-white/40 text-xs">
                          ({new Date(booking.booking_date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' })})
                        </span>
                      </span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-white/70 whitespace-nowrap">{booking.booking_time || '—'}</td>
                  <td className="px-4 py-3 text-white/70 text-center">{booking.num_people || '—'}</td>
                  <td className="px-4 py-3 text-white whitespace-nowrap">{booking.customer_name || '—'}</td>
                  <td className="px-4 py-3 text-white/70 whitespace-nowrap">{booking.customer_phone || '—'}</td>
                  <td className="px-4 py-3 text-white/70 whitespace-nowrap">{booking.customer_email || '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Select
                      value={booking.status || 'confirmed'}
                      onValueChange={val => updateStatus.mutate({ id: booking.id, status: val })}
                    >
                      <SelectTrigger className={`h-7 w-28 text-xs font-heading font-semibold border rounded-lg ${statusColors[booking.status || 'confirmed']}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-obsidian border-white/10">
                        <SelectItem value="confirmed" className="text-green-400">Confirmed</SelectItem>
                        <SelectItem value="done" className="text-blue-400">Done</SelectItem>
                        <SelectItem value="cancelled" className="text-red-400">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
