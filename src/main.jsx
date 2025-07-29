import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/layout/AppLayout'
import UserDashboard from './components/user/Dashboard'
import UserManagement from './components/user/UserManagement'
import CoinManagement from './components/coin/CoinManagement'
import Settings from './components/settings/Settings'
import UserProfile from './components/user/UserProfile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes without layout */}
        <Route path="/login" element={<UserDashboard />} />

        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<UserManagement />} />
          <Route path="/coins" element={<CoinManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/profile" element={<UserProfile />} />

          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
