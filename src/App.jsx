import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { LanguageProvider } from '@/lib/LanguageContext';
import Home from './pages/Home';
import ExperienceDetail from './pages/ExperienceDetail';
import AdminDashboard from './pages/AdminDashboard';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import AdminPanelPage from './pages/AdminPanelPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<ExperienceDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/admin-panel" element={<AdminPanelPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App
