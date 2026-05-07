import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLang } from '@/lib/LanguageContext';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { lang } = useLang();
  const isAr = lang === 'ar';

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn({ email: form.email, password: form.password });
        if (error) {
          setError(isAr ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
        } else {
          // Redirect admin to admin page, others to home
          const adminEmail = 'splash.spectrum10000@gmail.com';
          if (form.email.toLowerCase() === adminEmail) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      } else {
        if (form.password.length < 6) {
          setError(isAr ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        const { error } = await signUp({
          email: form.email,
          password: form.password,
          fullName: form.fullName,
          phone: form.phone
        });
        if (error) {
          setError(error.message || (isAr ? 'حدث خطأ أثناء إنشاء الحساب' : 'Error creating account'));
        } else {
          setSuccess(isAr ? 'تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني.' : 'Account created! Please check your email to verify.');
        }
      }
    } catch (err) {
      setError(isAr ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
          <span className="font-body text-sm">{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-black text-3xl">
              <span className="text-white">SPLASH</span>
              <span className="text-neon-green">SPECTRUM</span>
            </h1>
            <p className="text-white/50 font-body text-sm mt-2">
              {isAr ? 'مرحباً بك في عالم الإبداع' : 'Welcome to the world of creativity'}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
              <button
                onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all ${
                  isLogin ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {isAr ? 'تسجيل الدخول' : 'Login'}
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 rounded-lg font-heading font-semibold text-sm transition-all ${
                  !isLogin ? 'bg-neon-pink text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {isAr ? 'إنشاء حساب' : 'Sign Up'}
              </button>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-body">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-body">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-white/60 text-sm font-body mb-1.5">
                      {isAr ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-neon-pink/50 transition-colors"
                      placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-body mb-1.5">
                      {isAr ? 'رقم الهاتف' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-neon-pink/50 transition-colors"
                      placeholder="+966..."
                      dir="ltr"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-white/60 text-sm font-body mb-1.5">
                  {isAr ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-neon-pink/50 transition-colors"
                  placeholder={isAr ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  required
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm font-body mb-1.5">
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-white font-body placeholder:text-white/30 focus:outline-none focus:border-neon-pink/50 transition-colors"
                    placeholder={isAr ? 'أدخل كلمة المرور' : 'Enter your password'}
                    required
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-neon-pink rounded-xl font-heading font-bold text-white flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {isLogin 
                  ? (isAr ? 'تسجيل الدخول' : 'Login')
                  : (isAr ? 'إنشاء حساب' : 'Create Account')
                }
              </button>
            </form>

            {/* Footer */}
            {isLogin && (
              <p className="text-center text-white/40 text-sm font-body mt-4">
                {isAr ? 'نسيت كلمة المرور؟' : 'Forgot your password?'}
                <button className="text-neon-pink hover:underline mx-1">
                  {isAr ? 'إعادة تعيين' : 'Reset'}
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
