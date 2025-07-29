import React, { useState } from 'react';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
      {/* Sidebar: only takes up space on desktop */}
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="sticky top-0 z-30">
          <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4">
          <Outlet />
        </main>
        </div>
    </div>
  );
};

export default Layout;
