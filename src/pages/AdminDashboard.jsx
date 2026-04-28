import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import AdminBookings from '@/components/admin/AdminBookings';
import AdminExperiences from '@/components/admin/AdminExperiences';
import AdminBookingSettings from '@/components/admin/AdminBookingSettings';
import AdminReviews from '@/components/admin/AdminReviews';
import { BookOpen, Palette, LogOut, Home, Settings, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('bookings');


  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neon-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="font-heading font-black text-white text-2xl mb-2">Admin Access Only</h2>
          <p className="text-white/50 font-body mb-6">You need to be logged in as an admin to view this page.</p>
          <button
            onClick={() => base44.auth.redirectToLogin(window.location.href)}
            className="px-6 py-3 bg-neon-pink text-white font-heading font-bold rounded-xl hover:bg-neon-pink/80 transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <span className="font-heading font-black text-white text-lg">Splash Spectrum <span className="text-neon-pink">Admin</span></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm font-body hidden sm:block">{user.email}</span>
            <Link
              to="/"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-body"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <button
              onClick={() => base44.auth.logout('/')}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-body"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => setTab('bookings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all ${tab === 'bookings' ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen className="w-4 h-4" /> Bookings
          </button>
          <button
            onClick={() => setTab('experiences')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all ${tab === 'experiences' ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Palette className="w-4 h-4" /> Experiences
          </button>
          <button
            onClick={() => setTab('booking-settings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all ${tab === 'booking-settings' ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Settings className="w-4 h-4" /> Booking Form
          </button>
          <button
            onClick={() => setTab('reviews')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all ${tab === 'reviews' ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
          >
            <Star className="w-4 h-4" /> Reviews
          </button>
        </div>

        {tab === 'bookings' && <AdminBookings />}
        {tab === 'experiences' && <AdminExperiences />}
        {tab === 'booking-settings' && <AdminBookingSettings />}
        {tab === 'reviews' && <AdminReviews />}
      </div>
    </div>
  );
}