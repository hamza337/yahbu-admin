import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContentModeration from './ContentModeration';

const ContentModerationManagement = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('moderation');

  // Set active tab based on location state if available
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location]);

  // Define tabs for content moderation
  const tabs = [
    { id: 'moderation', label: 'Content Moderation' },
    // Future tabs could include:
    // { id: 'settings', label: 'Moderation Settings' },
    // { id: 'reports', label: 'Moderation Reports' },
    // { id: 'audit', label: 'Audit Log' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'moderation' && <ContentModeration />}
        {/* Add more conditional rendering for future tabs */}
      </div>
    </div>
  );
};

export default ContentModerationManagement;