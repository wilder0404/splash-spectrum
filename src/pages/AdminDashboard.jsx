import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminExperiences from '@/components/admin/AdminExperiences';
import AdminBookingSettings from '@/components/admin/AdminBookingSettings';
import AdminReviews from '@/components/admin/AdminReviews';
import { BookOpen, Palette, LogOut, Home, Settings, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('bookings');

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neon-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-heading font-black text-white text-2xl mb-2">Admin Access Only</h2>
          <p className="text-white/50 font-body mb-6">You need to be logged in as an admin to view this page.</p>
          <button
            onClick={() => navigate('/auth?mode=login')}
            className="px-6 py-3 bg-neon-pink text-white font-heading font-bold rounded-xl hover:bg-neon-pink/80 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'experiences', label: 'Experiences', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reviews', label: 'Reviews', icon: Star },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Top Bar */}
      <div className="bg-obsidian/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-white/40 hover:text-white transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-neon-pink font-heading font-bold text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/50 text-sm font-body hidden sm:block">{user.email}</span>
          <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4 border-b border-white/5 flex gap-2 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-semibold text-sm whitespace-nowrap transition-colors ${
              tab === t.id ? 'bg-neon-pink text-white' : 'bg-white/5 text-white/50 hover:text-white'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {tab === 'bookings' && <AdminBookings />}
        {tab === 'experiences' && <AdminExperiences />}
        {tab === 'settings' && <AdminBookingSettings />}
        {tab === 'reviews' && <AdminReviews />}
      </div>
    </div>
  );
}
