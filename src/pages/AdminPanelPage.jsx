import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '@/lib/LanguageContext';
import { db, supabase } from '@/lib/supabase';
import { 
  ArrowLeft, Calendar, Clock, Users, Search, Loader2, 
  CheckCircle, XCircle, AlertCircle, Trash2, Eye, Edit2, Plus,
  RefreshCw, Star, FileText, Home, LogOut, Save, Settings
} from 'lucide-react';

export default function AdminPanelPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { lang } = useLang();
  const isAr = lang === 'ar';
  
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Check admin access
  const checkIsAdmin = user?.email === 'splash.spectrum10000@gmail.com' || isAdmin;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?mode=login');
      return;
    }
    if (!authLoading && !checkIsAdmin) {
      navigate('/account');
      return;
    }
    if (user && checkIsAdmin) {
      loadData();
    }
  }, [user, checkIsAdmin, authLoading, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load data with timeout to prevent infinite loading
      const timeout = (ms) => new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
      );
      
      const [bookingsRes, experiencesRes, reviewsRes] = await Promise.race([
        Promise.all([
          db.getAllBookings().catch(() => ({ data: [] })),
          db.getExperiences().catch(() => ({ data: [] })),
          db.getAllReviews().catch(() => ({ data: [] }))
        ]),
        timeout(8000).then(() => [{ data: [] }, { data: [] }, { data: [] }])
      ]);
      
      setBookings(bookingsRes?.data || []);
      setExperiences(experiencesRes?.data || []);
      setReviews(reviewsRes?.data || []);
    } catch (err) {
      console.error('[v0] Error loading admin data:', err);
      // Set empty arrays on error to prevent infinite loading
      setBookings([]);
      setExperiences([]);
      setReviews([]);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    await db.updateBooking(bookingId, { status: newStatus });
    await loadData();
    setSelectedBooking(null);
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Are you sure you want to delete this booking?')) {
      await db.deleteBooking(bookingId);
      await loadData();
      setSelectedBooking(null);
    }
  };

  const handleApproveReview = async (reviewId) => {
    await db.approveReview(reviewId);
    await loadData();
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من حذف هذا التقييم؟' : 'Are you sure you want to delete this review?')) {
      await db.deleteReview(reviewId);
      await loadData();
    }
  };

  const handleSaveExperience = async (exp) => {
    await db.updateExperience(exp.id, exp);
    await loadData();
    setEditingExperience(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = !searchQuery || 
      booking.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_phone?.includes(searchQuery) ||
      booking.experience_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    done: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  const reviewStats = {
    total: reviews.length,
    approved: reviews.filter(r => r.is_approved).length,
    pending: reviews.filter(r => !r.is_approved).length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-400';
      case 'completed': return 'text-cyan-400';
      case 'cancelled': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
      default: return 'text-white/50';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
      </div>
    );
  }

  if (!checkIsAdmin) return null;

  const tabs = [
    { id: 'bookings', label: isAr ? 'الحجوزات' : 'Bookings', icon: FileText },
    { id: 'experiences', label: isAr ? 'التجارب' : 'Experiences', icon: Star },
    { id: 'booking-form', label: isAr ? 'نموذج الحجز' : 'Booking Form', icon: Settings },
    { id: 'reviews', label: isAr ? 'التقييمات' : 'Reviews', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-obsidian" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-obsidian/90 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎨</span>
            <span className="font-heading font-bold text-white text-xl">
              Splash Spectrum <span className="text-neon-pink">Admin</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-sm hidden md:block">{user?.email}</span>
            <Link to="/" className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm">
              <Home className="w-4 h-4" /> {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm">
              <LogOut className="w-4 h-4" /> {isAr ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-neon-pink text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="ml-auto p-2.5 text-white/40 hover:text-white bg-white/5 rounded-xl transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
          </div>
        ) : (
          <>
            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div>
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-xs">Total</p>
                    <p className="text-white text-2xl font-heading font-bold">{stats.total}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-xs">Confirmed</p>
                    <p className="text-emerald-400 text-2xl font-heading font-bold">{stats.confirmed}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-xs">Done</p>
                    <p className="text-cyan-400 text-2xl font-heading font-bold">{stats.done}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/50 text-xs">Cancelled</p>
                    <p className="text-red-400 text-2xl font-heading font-bold">{stats.cancelled}</p>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, phone or experience..."
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-neon-pink/50"
                  />
                </div>

                {/* Bookings Table */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-white/50 text-xs font-heading p-4">#</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">EXPERIENCE</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">ACTIVITY</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">DATE</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">TIME</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">PEOPLE</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">FULL NAME</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">PHONE</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">EMAIL</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">STATUS</th>
                          <th className="text-left text-white/50 text-xs font-heading p-4">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((booking, idx) => (
                          <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                            <td className="p-4 text-white/40 text-sm">{idx + 1}</td>
                            <td className="p-4 text-white font-heading text-sm">{booking.experience_name}</td>
                            <td className="p-4 text-white/60 text-sm">{booking.sub_experience || '-'}</td>
                            <td className="p-4 text-white/60 text-sm">
                              {booking.booking_date}
                              <span className="text-white/30 text-xs ml-1">
                                ({new Date(booking.booking_date).toLocaleDateString('en-US', { weekday: 'short' })})
                              </span>
                            </td>
                            <td className="p-4 text-white/60 text-sm">{booking.booking_time}</td>
                            <td className="p-4 text-white/60 text-sm text-center">{booking.num_people}</td>
                            <td className="p-4 text-white font-heading text-sm">{booking.customer_name}</td>
                            <td className="p-4 text-white/60 text-sm">{booking.customer_phone}</td>
                            <td className="p-4 text-white/60 text-sm">{booking.customer_email}</td>
                            <td className="p-4">
                              <select
                                value={booking.status || 'confirmed'}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                className={`bg-transparent border border-white/10 rounded px-2 py-1 text-xs ${getStatusColor(booking.status)}`}
                              >
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Done</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="pending">Pending</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <button
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="p-1.5 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredBookings.length === 0 && (
                    <div className="text-center py-12 text-white/40">No bookings found.</div>
                  )}
                </div>
              </div>
            )}

            {/* EXPERIENCES TAB */}
            {activeTab === 'experiences' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-white text-lg">
                    All Experiences ({experiences.length})
                  </h2>
                </div>

                {editingExperience ? (
                  <ExperienceEditor 
                    experience={editingExperience} 
                    onSave={handleSaveExperience}
                    onCancel={() => setEditingExperience(null)}
                    isAr={isAr}
                  />
                ) : (
                  <div className="space-y-3">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-4">
                        {exp.image && (
                          <img src={exp.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span>{exp.icon}</span>
                            <h3 className="font-heading font-bold text-white">{exp.title_en}</h3>
                            {exp.whatsapp_only && (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">WhatsApp Only</span>
                            )}
                          </div>
                          <p className="text-white/50 text-sm">{exp.tagline_en}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingExperience(exp)}
                            className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BOOKING FORM TAB */}
            {activeTab === 'booking-form' && (
              <BookingFormSettings isAr={isAr} />
            )}

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-white text-lg">
                    Reviews ({reviewStats.total})
                  </h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-emerald-400">{reviewStats.approved} approved</span>
                    <span className="text-yellow-400">{reviewStats.pending} pending</span>
                  </div>
                </div>

                {reviews.length === 0 ? (
                  <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-white/40">No reviews yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-heading font-bold text-white">{review.customer_name}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                review.is_approved 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {review.is_approved ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-white/70 text-sm">{review.comment}</p>
                            <p className="text-white/30 text-xs mt-2">
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!review.is_approved && (
                              <button
                                onClick={() => handleApproveReview(review.id)}
                                className="p-2 text-emerald-400/60 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReview(review.id)}
                              className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Experience Editor Component
function ExperienceEditor({ experience, onSave, onCancel, isAr }) {
  const [form, setForm] = useState({ ...experience });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <button onClick={onCancel} className="flex items-center gap-2 text-white/60 hover:text-white mb-4 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Experiences
      </button>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-white text-xl">Edit: {form.title_en}</h2>
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-2 bg-neon-pink text-white px-4 py-2 rounded-xl font-heading text-sm hover:bg-neon-pink/90"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="font-heading font-bold text-white mb-4">BASIC INFO</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/50 text-xs mb-1 block">Slug (URL ID)</label>
              <input
                value={form.slug || ''}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Icon (emoji)</label>
              <input
                value={form.icon || ''}
                onChange={(e) => handleChange('icon', e.target.value)}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Accent Color (hex)</label>
              <div className="flex gap-2">
                <div 
                  className="w-10 h-10 rounded-lg border border-white/10" 
                  style={{ backgroundColor: form.color || '#FF007F' }}
                />
                <input
                  value={form.color || '#FF007F'}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="flex-1 h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Sort Order</label>
              <input
                type="number"
                value={form.sort_order || 0}
                onChange={(e) => handleChange('sort_order', parseInt(e.target.value))}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="mt-4">
            <label className="text-white/50 text-xs mb-1 block">Experience Image URL</label>
            <div className="flex gap-3 items-center">
              {form.image && (
                <img src={form.image} alt="" className="w-16 h-16 rounded-lg object-cover" />
              )}
              <input
                value={form.image || ''}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <p className="text-white/30 text-xs mt-1">Paste an image URL or upload to a hosting service</p>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-white/70 text-sm">
              <input
                type="checkbox"
                checked={form.whatsapp_only || false}
                onChange={(e) => handleChange('whatsapp_only', e.target.checked)}
                className="w-4 h-4"
              />
              WhatsApp Only Booking
            </label>
            <label className="flex items-center gap-2 text-white/70 text-sm">
              <input
                type="checkbox"
                checked={form.is_active !== false}
                onChange={(e) => handleChange('is_active', e.target.checked)}
                className="w-4 h-4 accent-emerald-500"
              />
              Active (visible on site)
            </label>
          </div>
        </div>

        {/* English Content */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="font-heading font-bold text-white mb-4">ENGLISH CONTENT</h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/50 text-xs mb-1 block">Title</label>
              <input
                value={form.title_en || ''}
                onChange={(e) => handleChange('title_en', e.target.value)}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Tagline</label>
              <input
                value={form.tagline_en || ''}
                onChange={(e) => handleChange('tagline_en', e.target.value)}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Description</label>
              <textarea
                value={form.description_en || ''}
                onChange={(e) => handleChange('description_en', e.target.value)}
                rows={4}
                className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Duration</label>
                <input
                  value={form.duration_en || ''}
                  onChange={(e) => handleChange('duration_en', e.target.value)}
                  placeholder="e.g. 60-90 minutes"
                  className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Group Size</label>
                <input
                  value={form.group_size_en || ''}
                  onChange={(e) => handleChange('group_size_en', e.target.value)}
                  placeholder="e.g. 1-4 people"
                  className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Price</label>
              <input
                value={form.price_en || ''}
                onChange={(e) => handleChange('price_en', e.target.value)}
                placeholder="e.g. Starting from 150 SAR"
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">What&apos;s Included</label>
              <textarea
                value={form.includes_en || ''}
                onChange={(e) => handleChange('includes_en', e.target.value)}
                rows={3}
                placeholder="List items separated by newlines"
                className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">Rules / Notes</label>
              <textarea
                value={form.rules_en || ''}
                onChange={(e) => handleChange('rules_en', e.target.value)}
                rows={3}
                placeholder="List rules separated by newlines"
                className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Arabic Content */}
        <div className="bg-white/5 rounded-xl p-4" dir="rtl">
          <h3 className="font-heading font-bold text-white mb-4">ARABIC CONTENT</h3>
          <div className="space-y-4">
            <div>
              <label className="text-white/50 text-xs mb-1 block">العنوان</label>
              <input
                value={form.title_ar || ''}
                onChange={(e) => handleChange('title_ar', e.target.value)}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">الشعار</label>
              <input
                value={form.tagline_ar || ''}
                onChange={(e) => handleChange('tagline_ar', e.target.value)}
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">الوصف</label>
              <textarea
                value={form.description_ar || ''}
                onChange={(e) => handleChange('description_ar', e.target.value)}
                rows={4}
                className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs mb-1 block">المدة</label>
                <input
                  value={form.duration_ar || ''}
                  onChange={(e) => handleChange('duration_ar', e.target.value)}
                  placeholder="مثال: 60-90 دقيقة"
                  className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">حجم المجموعة</label>
                <input
                  value={form.group_size_ar || ''}
                  onChange={(e) => handleChange('group_size_ar', e.target.value)}
                  placeholder="مثال: 1-4 أشخاص"
                  className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">السعر</label>
              <input
                value={form.price_ar || ''}
                onChange={(e) => handleChange('price_ar', e.target.value)}
                placeholder="مثال: يبدأ من 150 ريال"
                className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">ماذا يتضمن</label>
              <textarea
                value={form.includes_ar || ''}
                onChange={(e) => handleChange('includes_ar', e.target.value)}
                rows={3}
                placeholder="قائمة العناصر مفصولة بأسطر جديدة"
                className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1 block">القواعد / ملاحظات</label>
              <textarea
                value={form.rules_ar || ''}
                onChange={(e) => handleChange('rules_ar', e.target.value)}
                rows={3}
                placeholder="قائمة القواعد مفصولة بأسطر جديدة"
                className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="font-heading font-bold text-white mb-4">GALLERY</h3>
          <p className="text-white/50 text-sm mb-4">Add image URLs separated by commas</p>
          <textarea
            value={Array.isArray(form.gallery) ? form.gallery.join(', ') : (form.gallery || '')}
            onChange={(e) => handleChange('gallery', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            rows={3}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            className="w-full bg-obsidian border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          />
          {Array.isArray(form.gallery) && form.gallery.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.gallery.map((url, idx) => (
                <img key={idx} src={url} alt="" className="w-16 h-16 rounded-lg object-cover" />
              ))}
            </div>
          )}
        </div>

        {/* Vibes */}
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="font-heading font-bold text-white mb-4">VIBES / TAGS</h3>
          <p className="text-white/50 text-sm mb-4">Add vibe tags separated by commas (e.g. Creative, Fun, Relaxing)</p>
          <input
            value={Array.isArray(form.vibes) ? form.vibes.join(', ') : (form.vibes || '')}
            onChange={(e) => handleChange('vibes', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Creative, Fun, Relaxing, Artistic"
            className="w-full h-10 bg-obsidian border border-white/10 rounded-lg px-3 text-white text-sm"
          />
        </div>
      </div>
    </div>
  );
}

// Booking Form Settings Component
function BookingFormSettings({ isAr }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject('timeout'), 3000));
      const { data } = await Promise.race([db.getBookingSettings(), timeoutPromise]);
      setSettings(data || {
        time_slots: ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'],
        closed_dates: []
      });
    } catch {
      // Use defaults on error/timeout
      setSettings({
        time_slots: ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'],
        closed_dates: []
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    if (settings.id) {
      await db.updateBookingSettings(settings.id, settings);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-white text-lg">Booking Form Settings</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-neon-pink text-white px-4 py-2 rounded-xl font-heading text-sm hover:bg-neon-pink/90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Time Slots */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <h3 className="font-heading font-bold text-white mb-4">Time Slots</h3>
        <p className="text-white/50 text-sm mb-4">Configure available booking time slots (comma-separated)</p>
        <input
          value={(settings?.time_slots || []).join(', ')}
          onChange={(e) => setSettings({ 
            ...settings, 
            time_slots: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
          })}
          placeholder="3:00 PM, 4:00 PM, 5:00 PM..."
          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm placeholder:text-white/30"
        />
      </div>

      {/* Closed Dates */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <h3 className="font-heading font-bold text-white mb-4">Closed Dates</h3>
        <p className="text-white/50 text-sm mb-4">Add dates when bookings are not available (YYYY-MM-DD format, comma-separated)</p>
        <input
          value={(settings?.closed_dates || []).join(', ')}
          onChange={(e) => setSettings({ 
            ...settings, 
            closed_dates: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
          })}
          placeholder="2026-12-25, 2026-01-01..."
          className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm placeholder:text-white/30"
        />
      </div>

      {/* Default Capacity */}
      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <h3 className="font-heading font-bold text-white mb-4">Capacity Settings</h3>
        <p className="text-white/50 text-sm mb-4">Default capacity per experience type</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="text-white/50 text-xs mb-1 block">Splash (default)</label>
            <input type="number" defaultValue={20} disabled className="w-full h-10 bg-white/5 border border-white/10 rounded-lg px-3 text-white text-sm opacity-60" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1 block">Spin</label>
            <input type="number" defaultValue={4} disabled className="w-full h-10 bg-white/5 border border-white/10 rounded-lg px-3 text-white text-sm opacity-60" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1 block">Phone Case</label>
            <input type="number" defaultValue={12} disabled className="w-full h-10 bg-white/5 border border-white/10 rounded-lg px-3 text-white text-sm opacity-60" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1 block">Group Splash</label>
            <input type="number" defaultValue={15} disabled className="w-full h-10 bg-white/5 border border-white/10 rounded-lg px-3 text-white text-sm opacity-60" />
          </div>
          <div>
            <label className="text-white/50 text-xs mb-1 block">Pouring/Figurines</label>
            <input type="number" defaultValue={14} disabled className="w-full h-10 bg-white/5 border border-white/10 rounded-lg px-3 text-white text-sm opacity-60" />
          </div>
        </div>
        <p className="text-white/30 text-xs mt-2">Capacity per hour slot for each experience type.</p>
      </div>
    </div>
  );
}
