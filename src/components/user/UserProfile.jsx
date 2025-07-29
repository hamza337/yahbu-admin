import React, { useState, useRef, useEffect } from 'react';
import UserData from './UserData';
import UserWallet from './UserWallet';
import UserTransactions from './UserTransactions';
import UserReports from './UserReports';

const tabs = [
  { name: 'Profile', key: 'profile' },
  { name: 'Wallet', key: 'wallet' },
  { name: 'Transactions', key: 'transactions' },
  { name: 'Reports and Complaints', key: 'reports' },
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const idx = tabs.findIndex(tab => tab.key === activeTab);
    if (tabRefs.current[idx]) {
      const node = tabRefs.current[idx];
      setIndicatorStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Heading */}
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#7C1315' }}>Profile</h1>
        
        {/* Tab Bar */}
        <div className="relative flex border-b border-gray-200 bg-white">
          {tabs.map((tab, idx) => (
            <button
              key={tab.key}
              ref={el => (tabRefs.current[idx] = el)}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-6 text-base font-medium text-center transition-colors duration-200 focus:outline-none
                ${activeTab === tab.key
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-500 hover:text-blue-600'}
              `}
              style={{ minWidth: 0, background: 'transparent' }}
              tabIndex={0}
            >
              {tab.name}
            </button>
          ))}
          {/* Animated indicator */}
          <span
            className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 rounded"
            style={{
              ...indicatorStyle,
              position: 'absolute',
            }}
          />
        </div>
        
        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'profile' && <UserData />}
          {activeTab === 'wallet' && <UserWallet />}
          {activeTab === 'transactions' && <UserTransactions />}
          {activeTab === 'reports' && <UserReports />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;