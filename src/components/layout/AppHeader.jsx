import React, { useState, useRef, useEffect } from 'react';

const AppHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 border-b bg-white relative z-30">
      {/* Hamburger for mobile */}
      <button
        className="sm:hidden p-2 mr-2 text-gray-600 hover:bg-gray-200 rounded focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex-1" />
      {/* Profile dropdown */}
      <div className="relative ml-auto" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen((open) => !open)}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-700 text-white font-bold text-lg">
            SA
          </div>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {/* Dropdown menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 min-w-max">
            <div className="px-4 py-2">
              <div className="text-sm font-medium text-gray-900">super@admin.com</div>
              <div className="text-xs text-gray-500">super admin</div>
            </div>
            <div className="my-2 border-t border-gray-100" />
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold"
              onClick={() => {/* handle logout here */}}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;