import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Coin from './Coin';
import CoinConfigurations from './CoinConfigurations';
import CoinAnalytics from './CoinAnalytics';
import RedemptionApproval from './RedemptionApproval';
import SecurityLimits from './SecurityLimits';

const tabs = [
  { name: 'Dashboard', key: 'dashboard' },
  { name: 'Transactions', key: 'coins' },
  { name: 'Analytics', key: 'analytics' },
  { name: 'Redemptions', key: 'redemptions' },
  { name: 'Security', key: 'security' },
  { name: 'Configurations', key: 'configurations' },
];

const CoinManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  
  // Check if there's a tab specified in the location state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);

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
    <div className="w-full">
      {/* Tab Bar */}
      <div className="relative flex items-start border-b border-gray-200 bg-transparent px-0 pt-2">
        <div className="flex space-x-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab.key}
              ref={el => (tabRefs.current[idx] = el)}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-6 text-base font-medium focus:outline-none transition-all duration-200
                rounded-t-lg
                ${activeTab === tab.key
                  ? 'bg-gray-100 text-blue-700 scale-105 shadow-sm z-10'
                  : 'bg-gray-50 text-gray-500 hover:text-blue-600'}
              `}
              style={{ minWidth: 0, background: 'transparent' }}
              tabIndex={0}
            >
              {tab.name}
            </button>
          ))}
        </div>
        {/* Animated indicator (optional, can be removed for this style) */}
        {/* <span
          className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 rounded"
          style={{
            ...indicatorStyle,
            position: 'absolute',
          }}
        /> */}
      </div>
      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'coins' && <Coin />}
        {activeTab === 'analytics' && <CoinAnalytics />}
        {activeTab === 'redemptions' && <RedemptionApproval />}
        {activeTab === 'security' && <SecurityLimits />}
        {activeTab === 'configurations' && <CoinConfigurations />}
      </div>
    </div>
  );
};

export default CoinManagement;