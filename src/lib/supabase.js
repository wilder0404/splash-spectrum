import { createClient } from '@supabase/supabase-js';

// Supabase credentials - hardcoded fallbacks for v0 environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 
                    import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
                    'https://ujmbpfawpquyiabptdqw.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 
                        import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                        import.meta.env.SUPABASE_ANON_KEY ||
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqbWJwZmF3cHF1eWlhYnB0ZHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NjYzMTMsImV4cCI6MjA2MTQ0MjMxM30.toH9czMjkSpcEF9rMCNpXJlDfKx8q2y7GprLxpGcblc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Auth helper functions
export const auth = {
  async signUp({ email, password, fullName, phone }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: 'user'
        }
      }
    });
    return { data, error };
  },

  async signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },

  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  },

  async updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { data, error };
  }
};

// Database helper functions
export const db = {
  // ============ EXPERIENCES ============
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('[v0] Error fetching experiences:', error);
    } else {
      console.log('[v0] Fetched experiences:', data?.length || 0);
    }
    return { data, error };
  },

  async getExperienceBySlug(slug) {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('slug', slug)
      .single();
    return { data, error };
  },

  async updateExperience(id, updates) {
    const { data, error } = await supabase
      .from('experiences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // ============ BOOKING SETTINGS ============
  async getBookingSettings() {
    const { data, error } = await supabase
      .from('booking_settings')
      .select('*')
      .limit(1)
      .single();
    return { data, error };
  },

  async updateBookingSettings(id, updates) {
    const { data, error } = await supabase
      .from('booking_settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    return { data, error };
  },

  // ============ USERS ============
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async updateUserProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  async isAdmin(userId) {
    if (!userId) return { isAdmin: false, error: null };
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
    return { isAdmin: data?.role === 'admin', error };
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // ============ BOOKINGS ============
  async createBooking(booking) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    return { data, error };
  },

  async getUserBookings(userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('booking_date', { ascending: false });
    return { data, error };
  },

  async getAllBookings(filters = {}) {
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    if (filters.date) {
      query = query.eq('booking_date', filters.date);
    }
    if (filters.experience) {
      query = query.eq('experience_slug', filters.experience);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  async getBookingsByDate(date) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('booking_date', date)
      .neq('status', 'cancelled')
      .order('booking_time', { ascending: true });
    return { data, error };
  },

  async getBookingsByDateRange(startDate, endDate) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .gte('booking_date', startDate)
      .lte('booking_date', endDate)
      .order('booking_date', { ascending: true });
    return { data, error };
  },

  async updateBooking(bookingId, updates) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select()
      .single();
    return { data, error };
  },

  async cancelBooking(bookingId) {
    return this.updateBooking(bookingId, { status: 'cancelled' });
  },

  async deleteBooking(bookingId) {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);
    return { error };
  },

  // ============ SLOT AVAILABILITY ============
  async getSlotAvailability(experienceSlug, date, subExperience = null) {
    // Get booking settings for time slots
    const { data: settings } = await this.getBookingSettings();
    const timeSlots = settings?.time_slots || ['3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'];
    
    // Determine max capacity based on experience type
    // Splash = 20, Spin = 4, Pouring/Figurines = 14, Group Splash = 15, Phone Case = 12
    const slug = (experienceSlug || '').toLowerCase();
    const sub = (subExperience || '').toLowerCase();
    const combined = `${slug} ${sub}`;
    
    let maxCapacity = 20; // Default: Splash = 20 seats
    let expType = 'splash';
    
    if (combined.includes('spin') || combined.includes('سبين')) {
      maxCapacity = 4; // Spin = 4 seats
      expType = 'spin';
    } else if (combined.includes('phone') || combined.includes('case') || combined.includes('كفر') || combined.includes('جوال')) {
      maxCapacity = 12; // Phone Case = 12 seats
      expType = 'phone';
    } else if (combined.includes('group') || combined.includes('جماعي') || combined.includes('مجموعة') || combined.includes('shared') || combined.includes('canvas')) {
      maxCapacity = 15; // Group Splash = 15 seats
      expType = 'group';
    } else if (combined.includes('pour') || combined.includes('صب') || combined.includes('pouring') || combined.includes('figurine') || combined.includes('مجسم') || combined.includes('custom art')) {
      maxCapacity = 14; // Pouring/Figurines = 14 seats
      expType = 'pour';
    }
    
    // Get bookings for this date
    const { data: allBookings } = await supabase
      .from('bookings')
      .select('experience_slug, experience_name, sub_experience, booking_time, num_people')
      .eq('booking_date', date)
      .neq('status', 'cancelled');
    
    // Filter bookings to match the experience type
    const matchingBookings = (allBookings || []).filter(b => {
      const bookingExp = `${b.experience_slug || ''} ${b.experience_name || ''} ${b.sub_experience || ''}`.toLowerCase();
      
      // Match based on activity type
      if (expType === 'spin') {
        return bookingExp.includes('spin') || bookingExp.includes('سبين');
      } else if (expType === 'phone') {
        return bookingExp.includes('phone') || bookingExp.includes('case') || bookingExp.includes('كفر') || bookingExp.includes('جوال');
      } else if (expType === 'group') {
        return bookingExp.includes('group') || bookingExp.includes('جماعي') || bookingExp.includes('مجموعة') || bookingExp.includes('shared') || bookingExp.includes('canvas');
      } else if (expType === 'pour') {
        return bookingExp.includes('pour') || bookingExp.includes('صب') || bookingExp.includes('figurine') || bookingExp.includes('مجسم') || bookingExp.includes('custom art');
      } else {
        // Default Splash - match general splash bookings (not spin, phone, group, or pour)
        const isOther = bookingExp.includes('spin') || bookingExp.includes('سبين') ||
                       bookingExp.includes('phone') || bookingExp.includes('case') || bookingExp.includes('كفر') ||
                       bookingExp.includes('group') || bookingExp.includes('جماعي') || bookingExp.includes('shared') ||
                       bookingExp.includes('pour') || bookingExp.includes('صب') || bookingExp.includes('figurine');
        return !isOther;
      }
    });
    
    // Calculate booked count per slot
    const bookedPerSlot = {};
    matchingBookings.forEach(booking => {
      bookedPerSlot[booking.booking_time] = (bookedPerSlot[booking.booking_time] || 0) + booking.num_people;
    });
    
    // Build availability response
    const slots = timeSlots.map(slot => ({
      time: slot,
      booked: bookedPerSlot[slot] || 0,
      max: maxCapacity,
      available: maxCapacity - (bookedPerSlot[slot] || 0)
    }));
    
    return { 
      slots, 
      maxCapacity, 
      bookedPerSlot,
      error: null 
    };
  },

  // ============ REVIEWS ============
  async getApprovedReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getAllReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async createReview(review) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    return { data, error };
  },

  async approveReview(reviewId) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', reviewId)
      .select()
      .single();
    return { data, error };
  },

  async deleteReview(reviewId) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);
    return { error };
  }
};

export default supabase;
