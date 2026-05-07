import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session with timeout to prevent infinite loading
    const initAuth = async () => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 3000); // Force stop loading after 3 seconds
      
      try {
        const { session } = await auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Check admin by email first for immediate access
          const adminEmail = 'splash.spectrum10000@gmail.com';
          if (session.user.email === adminEmail) {
            setIsAdmin(true);
          }
          await loadUserProfile(session.user.id, session.user.email);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id, session.user.email);
      } else {
        setUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loadUserProfile = async (userId, userEmail) => {
    try {
      const { data: profile } = await db.getUserProfile(userId);
      setUserProfile(profile);
      // Check admin by role OR by email (hardcoded admin email)
      const adminEmail = 'splash.spectrum10000@gmail.com';
      setIsAdmin(profile?.role === 'admin' || userEmail === adminEmail);
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Still set admin if email matches even if profile fails
      const adminEmail = 'splash.spectrum10000@gmail.com';
      setIsAdmin(userEmail === adminEmail);
    }
  };

  const signUp = async ({ email, password, fullName, phone }) => {
    const { data, error } = await auth.signUp({ email, password, fullName, phone });
    return { data, error };
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await auth.signIn({ email, password });
    if (data?.user) {
      setUser(data.user);
      await loadUserProfile(data.user.id, data.user.email);
    }
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await auth.signOut();
    if (!error) {
      setUser(null);
      setUserProfile(null);
      setIsAdmin(false);
    }
    return { error };
  };

  const value = {
    user,
    userProfile,
    isAdmin,
    loading,
    signUp,
    signIn,
    signOut,
    refreshProfile: () => user && loadUserProfile(user.id, user.email)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
