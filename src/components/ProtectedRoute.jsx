import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-obsidian">
    <div className="w-8 h-8 border-4 border-neon-pink border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, requireAdmin = false }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return fallback;
  }

  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
