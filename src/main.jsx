import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/layout/AppLayout'
import UserDashboard from './components/user/Dashboard'
import CoinDashboard from './components/coin/Dashboard'
import UserManagement from './components/user/UserManagement'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Routes without layout */}
        <Route path="/login" element={<UserDashboard />} />

        {/* Routes with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<UserManagement />} />
          <Route path="/coins" element={<CoinDashboard />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
