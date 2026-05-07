import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import { useLang } from '@/lib/LanguageContext';
import { 
  ArrowLeft, Calendar, Clock, Users, Search, Filter, Loader2, 
  CheckCircle, XCircle, AlertCircle, Trash2, Eye, Download,
  ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react';

export default function AdminPanelPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { lang } = useLang();
  const isAr = lang === 'ar';
  
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?mode=login');
      return;
    }
    if (!authLoading && !isAdmin) {
      navigate('/account');
      return;
    }
    if (user && isAdmin) {
      loadBookings();
    }
  }, [user, isAdmin, authLoading, navigate]);

  const loadBookings = async () => {
    setLoading(true);
    const { data } = await db.getAllBookings();
    setBookings(data || []);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    await db.updateBooking(bookingId, { status: newStatus });
    await loadBookings();
    setSelectedBooking(null);
  };

  const handleDelete = async (bookingId) => {
    if (window.confirm(isAr ? 'هل أنت متأكد من حذف هذا الحجز؟' : 'Are you sure you want to delete this booking?')) {
      await db.deleteBooking(bookingId);
      await loadBookings();
      setSelectedBooking(null);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesDate = !selectedDate || booking.booking_date === selectedDate;
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesSearch = !searchQuery || 
      booking.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer_phone?.includes(searchQuery) ||
      booking.experience_name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDate && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-neon-green/20 text-neon-green border-neon-green/30';
      case 'completed': return 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-white/10 text-white/50 border-white/20';
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

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    todayCount: bookings.filter(b => b.booking_date === new Date().toISOString().split('T')[0]).length
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-obsidian" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-obsidian/80 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
            <div>
              <h1 className="font-heading font-bold text-white text-xl">
                {isAr ? 'لوحة الإدارة' : 'Admin Panel'}
              </h1>
              <p className="text-white/40 text-xs font-body">
                {isAr ? 'إدارة الحجوزات' : 'Manage Bookings'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-white/40 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: isAr ? 'إجمالي الحجوزات' : 'Total', value: stats.total, color: 'bg-white/10' },
            { label: isAr ? 'مؤكدة' : 'Confirmed', value: stats.confirmed, color: 'bg-neon-green/20' },
            { label: isAr ? 'قيد الانتظار' : 'Pending', value: stats.pending, color: 'bg-yellow-500/20' },
            { label: isAr ? 'ملغية' : 'Cancelled', value: stats.cancelled, color: 'bg-red-500/20' },
            { label: isAr ? 'اليوم' : 'Today', value: stats.todayCount, color: 'bg-neon-pink/20' },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-xl p-4 border border-white/10`}>
              <p className="text-white/50 text-xs font-body">{stat.label}</p>
              <p className="text-white text-2xl font-heading font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث بالاسم، البريد، الهاتف...' : 'Search name, email, phone...'}
              className="w-full h-10 bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 text-white text-sm font-body placeholder:text-white/30 focus:outline-none focus:border-neon-pink/50"
            />
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm font-body focus:outline-none focus:border-neon-pink/50"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-white text-sm font-body focus:outline-none focus:border-neon-pink/50"
          >
            <option value="all">{isAr ? 'كل الحالات' : 'All Status'}</option>
            <option value="confirmed">{isAr ? 'مؤكد' : 'Confirmed'}</option>
            <option value="pending">{isAr ? 'قيد الانتظار' : 'Pending'}</option>
            <option value="cancelled">{isAr ? 'ملغي' : 'Cancelled'}</option>
            <option value="completed">{isAr ? 'مكتمل' : 'Completed'}</option>
          </select>
          {(selectedDate || statusFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => { setSelectedDate(''); setStatusFilter('all'); setSearchQuery(''); }}
              className="h-10 px-4 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-body hover:bg-white/10 transition-colors"
            >
              {isAr ? 'مسح الفلاتر' : 'Clear'}
            </button>
          )}
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-neon-pink animate-spin" />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-2xl">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 font-body">
              {isAr ? 'لا توجد حجوزات' : 'No bookings found'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.03] border border-white/10 rounded-xl p-4 hover:bg-white/[0.05] transition-colors cursor-pointer"
                onClick={() => setSelectedBooking(booking)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-white truncate">
                        {booking.customer_name}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-neon-pink text-sm font-body truncate">{booking.experience_name}</p>
                    {booking.sub_experience && (
                      <p className="text-white/40 text-xs font-body">{booking.sub_experience}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1.5 text-white/60 text-sm font-body">
                      <Calendar className="w-4 h-4" />
                      {new Date(booking.booking_date).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs font-body">
                      <Clock className="w-3 h-3" />
                      {booking.booking_time}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs font-body">
                      <Users className="w-3 h-3" />
                      {booking.num_people}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-obsidian border border-white/10 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-white text-xl">
                {isAr ? 'تفاصيل الحجز' : 'Booking Details'}
              </h2>
              <button onClick={() => setSelectedBooking(null)} className="text-white/40 hover:text-white">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs font-body mb-1">{isAr ? 'العميل' : 'Customer'}</p>
                <p className="text-white font-heading font-semibold">{selectedBooking.customer_name}</p>
                <p className="text-white/60 text-sm font-body">{selectedBooking.customer_email}</p>
                {selectedBooking.customer_phone && (
                  <p className="text-white/60 text-sm font-body">{selectedBooking.customer_phone}</p>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/40 text-xs font-body mb-1">{isAr ? 'التجربة' : 'Experience'}</p>
                <p className="text-neon-pink font-heading font-semibold">{selectedBooking.experience_name}</p>
                {selectedBooking.sub_experience && (
                  <p className="text-white/60 text-sm font-body">{selectedBooking.sub_experience}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <Calendar className="w-5 h-5 text-white/40 mx-auto mb-1" />
                  <p className="text-white text-sm font-body">
                    {new Date(selectedBooking.booking_date).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <Clock className="w-5 h-5 text-white/40 mx-auto mb-1" />
                  <p className="text-white text-sm font-body">{selectedBooking.booking_time}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <Users className="w-5 h-5 text-white/40 mx-auto mb-1" />
                  <p className="text-white text-sm font-body">{selectedBooking.num_people}</p>
                </div>
              </div>

              {selectedBooking.birthday_pack && (
                <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-xl p-3 text-center">
                  <span className="text-neon-pink text-sm font-body">
                    🎂 {isAr ? 'باقة عيد ميلاد' : 'Birthday Pack'}
                  </span>
                </div>
              )}

              {selectedBooking.total_price && (
                <div className="bg-neon-green/10 border border-neon-green/30 rounded-xl p-3 text-center">
                  <p className="text-neon-green font-heading font-bold">
                    {selectedBooking.total_price} SAR
                  </p>
                </div>
              )}

              {/* Status Actions */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs font-body mb-3">{isAr ? 'تغيير الحالة' : 'Change Status'}</p>
                <div className="flex flex-wrap gap-2">
                  {['confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedBooking.id, status)}
                      disabled={selectedBooking.status === status}
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading border transition-colors ${
                        selectedBooking.status === status 
                          ? getStatusColor(status) + ' opacity-50 cursor-not-allowed'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDelete(selectedBooking.id)}
                className="w-full h-10 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-heading flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                {isAr ? 'حذف الحجز' : 'Delete Booking'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
