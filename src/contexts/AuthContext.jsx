import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        const { session } = await auth.getSession();
        if (session?.user) {
          setUser(session.user);
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      const { data: profile } = await db.getUserProfile(userId);
      setUserProfile(profile);
      setIsAdmin(profile?.role === 'admin');
    } catch (error) {
      console.error('Error loading user profile:', error);
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
      await loadUserProfile(data.user.id);
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
    refreshProfile: () => user && loadUserProfile(user.id)
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
