import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiUserGroup, HiCurrencyDollar, HiCog, HiX } from 'react-icons/hi';

const navItems = [
  {
    heading: 'Management',
    items: [
      { name: 'User Management', to: '/', icon: <HiUserGroup className="w-5 h-5 mr-3" /> },
      { name: 'Coin Management', to: '/coins', icon: <HiCurrencyDollar className="w-5 h-5 mr-3" /> },
    ],
  },
  {
    heading: 'Configurations',
    items: [
      { name: 'System Preferences', to: '/settings', icon: <HiCog className="w-5 h-5 mr-3" /> },
    ],
  },
];

const AppSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  // Sidebar content
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo or brand */}
      <div className="flex items-center h-26 px-6 font-bold text-xl tracking-tight">
        <span className="font-bold text-3xl text-white">Yahbu Admin</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-8">
        {navItems.map(section => (
          <div key={section.heading}>
            <div className="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-2 pl-2">
              {section.heading}
      </div>
            <ul className="space-y-1">
              {section.items.map(item => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg transition-colors font-medium ${isActive ? 'bg-white text-black bg-opacity-20' : ''}`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
         </div>
        ))}
      </nav>
   </div>
  );

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-[#7C1315] text-white shadow-lg transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0 sm:static sm:shadow-none sm:block sm:rounded-none
          rounded-r-2xl sm:rounded-none
        `}
        aria-label="Sidebar"
      >
        {/* Close button for mobile */}
        <div className="sm:hidden flex justify-end p-4">
          <button
            className="p-2 text-white hover:bg-blue-600 rounded-full focus:outline-none"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <HiX className="w-6 h-6" />
          </button>
</div>
        {sidebarContent}
      </aside>
    </>
  );
};

export default AppSidebar;