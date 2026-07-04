import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import LandingPage from './pages/LandingPage';
import CreateAccount from './pages/CreateAccount';
import ParentVerification from './pages/ParentVerification';
import PrivacyOverview from './pages/PrivacyOverview';
import GranularConsent from './pages/GranularConsent';
import ConsentSummary from './pages/ConsentSummary';
import SuccessScreen from './pages/SuccessScreen';
import StudentDashboard from './pages/StudentDashboard';
import PrivacyCenter from './pages/PrivacyCenter';
import PermissionsPage from './pages/PermissionsPage';
import ConsentHistoryPage from './pages/ConsentHistoryPage';
import DownloadDataPage from './pages/DownloadDataPage';
import DeleteDataPage from './pages/DeleteDataPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Onboarding Flow */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/verify-parent" element={<ParentVerification />} />
          <Route path="/privacy-overview" element={<PrivacyOverview />} />
          <Route path="/granular-consent" element={<GranularConsent />} />
          <Route path="/consent-summary" element={<ConsentSummary />} />
          <Route path="/success" element={<SuccessScreen />} />

          {/* App */}
          <Route path="/dashboard" element={<StudentDashboard />} />

          {/* Privacy Center */}
          <Route path="/privacy-center" element={<PrivacyCenter />} />
          <Route path="/privacy-center/permissions" element={<PermissionsPage />} />
          <Route path="/privacy-center/history" element={<ConsentHistoryPage />} />
          <Route path="/privacy-center/download" element={<DownloadDataPage />} />
          <Route path="/privacy-center/delete" element={<DeleteDataPage />} />
          <Route path="/privacy-center/notifications" element={<NotificationsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
