import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/layout/AppLayout'
import UserManagement from './components/user/UserManagement'
import CoinManagement from './components/coin/CoinManagement'
import UserProfile from './components/user/UserProfile'
import ContentModerationManagement from './components/moderation/ContentModerationManagement'
import FinancialMonitoring from './components/financial/FinancialMonitoring'
import AnalyticsReports from './components/analytics/AnalyticsReports'
import RoleManagement from './components/permissions/RoleManagement'
import Login from './components/auth/Login'
import Verify2FA from './components/auth/Verify2FA'
import ForgetPassword from './components/auth/ForgetPassword'
import VerifyOTP from './components/auth/VerifyOTP'
import NewPassword from './components/auth/NewPassword'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Authentication routes without layout */}
        <Route path="/" element={<Login />} />
        <Route path="/verify-2fa" element={<Verify2FA />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/coins" element={<CoinManagement />} />
          <Route path="/moderation" element={<ContentModerationManagement />} />
          <Route path="/financial" element={<FinancialMonitoring />} />
          <Route path="/analytics" element={<AnalyticsReports />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
