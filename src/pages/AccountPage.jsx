import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { db, supabase } from '../lib/supabase';
import { useLang } from '@/lib/LanguageContext';
import { ArrowLeft, User, Calendar, Clock, Users, LogOut, Settings, Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function AccountPage() {
  const { user, userProfile, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { lang } = useLang();
  const isAr = lang === 'ar';
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    if (!user) {
      navigate('/auth?mode=login');
      return;
    }
    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await db.getUserBookings(user.id);
    setBookings(data || []);
    setLoading(false);
  };

  const handleSignOut = () => {
    // Direct supabase signout + force clear all auth state
    supabase.auth.signOut().finally(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-neon-green';
      case 'completed': return 'text-neon-cyan';
      case 'cancelled': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      default: return 'text-white/50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    const texts = {
      confirmed: isAr ? 'مؤكد' : 'Confirmed',
      completed: isAr ? 'مكتمل' : 'Completed',
      cancelled: isAr ? 'ملغي' : 'Cancelled',
      pending: isAr ? 'قيد الانتظار' : 'Pending'
    };
    return texts[status] || status;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-obsidian" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-obsidian/80 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            <span className="font-body text-sm">{isAr ? 'الرئيسية' : 'Home'}</span>
          </Link>
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link 
                to="/admin-panel"
                className="px-3 py-1.5 bg-neon-purple/20 border border-neon-purple/30 rounded-lg text-neon-purple text-sm font-heading hover:bg-neon-purple/30 transition-colors"
              >
                {isAr ? 'لوحة الإدارة' : 'Admin Panel'}
              </Link>
            )}
            <button
              onClick={handleSignOut}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-neon-pink/20 border border-neon-pink/30 flex items-center justify-center">
              <User className="w-8 h-8 text-neon-pink" />
            </div>
            <div className="flex-1">
              <h1 className="font-heading font-bold text-white text-xl">
                {userProfile?.full_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-white/50 font-body text-sm">{user.email}</p>
              {userProfile?.phone && (
                <p className="text-white/40 font-body text-sm">{userProfile.phone}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all ${
              activeTab === 'bookings' ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {isAr ? 'حجوزاتي' : 'My Bookings'}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all ${
              activeTab === 'settings' ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {isAr ? 'الإعدادات' : 'Settings'}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="font-heading font-bold text-white text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neon-pink" />
              {isAr ? 'حجوزاتي' : 'My Bookings'}
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 bg-white/[0.02] border border-white/5 rounded-2xl">
                <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 font-body">
                  {isAr ? 'لا توجد حجوزات حتى الآن' : 'No bookings yet'}
                </p>
                <Link 
                  to="/#booking"
                  className="inline-block mt-4 px-6 py-2 bg-neon-pink rounded-xl text-white font-heading font-semibold text-sm hover:brightness-110 transition-all"
                >
                  {isAr ? 'احجز الآن' : 'Book Now'}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/10 rounded-2xl p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-white">
                          {booking.experience_name}
                        </h3>
                        {booking.sub_experience && (
                          <p className="text-white/50 text-sm font-body">{booking.sub_experience}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-white/60 text-sm font-body">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.booking_date).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {booking.booking_time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            {booking.num_people} {isAr ? 'أشخاص' : 'people'}
                          </span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="text-sm font-heading">{getStatusText(booking.status)}</span>
                      </div>
                    </div>
                    {booking.birthday_pack && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <span className="text-xs bg-neon-pink/20 text-neon-pink px-2 py-1 rounded-full font-body">
                          {isAr ? 'باقة عيد ميلاد' : 'Birthday Pack'}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="font-heading font-bold text-white text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-neon-pink" />
              {isAr ? 'الإعدادات' : 'Account Settings'}
            </h2>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-white/60 text-sm font-body mb-1.5">
                  {isAr ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white/50 font-body"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm font-body mb-1.5">
                  {isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={userProfile?.full_name || ''}
                  disabled
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white/50 font-body"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm font-body mb-1.5">
                  {isAr ? 'رقم الهاتف' : 'Phone'}
                </label>
                <input
                  type="tel"
                  value={userProfile?.phone || ''}
                  disabled
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white/50 font-body"
                />
              </div>
              <p className="text-white/30 text-xs font-body">
                {isAr ? 'لتعديل بياناتك، يرجى التواصل معنا عبر واتساب' : 'To update your info, please contact us via WhatsApp'}
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full h-12 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-heading font-semibold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {isAr ? 'تسجيل الخروج' : 'Sign Out'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
