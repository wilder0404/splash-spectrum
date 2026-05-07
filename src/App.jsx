import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';
import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import AdminPanelPage from './pages/AdminPanelPage';
import { AuthProvider as SupabaseAuthProvider } from './contexts/AuthContext';

const AuthenticatedApp = () => {
  // No longer block on Base44 auth - just render routes directly
  // Supabase auth is handled within individual pages that need it
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<ExperienceDetail />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/admin-panel" element={<AdminPanelPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <LanguageProvider>
      <AuthProvider>
        <SupabaseAuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </SupabaseAuthProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
