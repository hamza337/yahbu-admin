import React, { useState } from 'react';
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineCurrencyDollar, HiOutlineBell, HiOutlinePlus, HiOutlineTrash, HiOutlineGlobeAlt, HiOutlineCheckCircle } from 'react-icons/hi';
import MultiFactorAuth from './MultiFactorAuth';
import SecurityAlerts from './SecurityAlerts';

const SecuritySettings = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('access-control');

  // State for IP allowlist
  const [ipAllowlist, setIpAllowlist] = useState([
    {
      id: 1,
      ipAddress: '192.168.1.100',
      description: 'Office Network',
      addedBy: 'John Doe',
      dateAdded: '2024-01-15',
    },
    {
      id: 2,
      ipAddress: '10.0.0.50',
      description: 'VPN Gateway',
      addedBy: 'Jane Smith',
      dateAdded: '2024-01-10',
    },
    {
      id: 3,
      ipAddress: '203.0.113.25',
      description: 'Remote Office',
      addedBy: 'Mike Johnson',
      dateAdded: '2024-01-05',
    },
  ]);

  // State for new IP entry
  const [newIpAddress, setNewIpAddress] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // State for notifications
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Tab configuration
  const tabs = [
    { id: 'access-control', name: 'Access Control', icon: <HiOutlineLockClosed className="h-4 w-4" /> },
    { id: 'multi-factor', name: 'Multi-Factor Auth', icon: <HiOutlineShieldCheck className="h-4 w-4" /> },
    { id: 'security-alerts', name: 'Security Alerts', icon: <HiOutlineBell className="h-4 w-4" /> },
  ];

  // Handle adding new IP address
  const handleAddIpAddress = () => {
    if (newIpAddress.trim() && newDescription.trim()) {
      const newEntry = {
        id: ipAllowlist.length + 1,
        ipAddress: newIpAddress.trim(),
        description: newDescription.trim(),
        addedBy: 'Current User', // In real app, this would be the logged-in user
        dateAdded: new Date().toISOString().split('T')[0],
      };
      
      setIpAllowlist([...ipAllowlist, newEntry]);
      setNewIpAddress('');
      setNewDescription('');
      
      // Show success message
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  // Handle removing IP address
  const handleRemoveIpAddress = (id) => {
    setIpAllowlist(ipAllowlist.filter(item => item.id !== id));
  };

  // Validate IP address format (basic validation)
  const isValidIpAddress = (ip) => {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Security Settings</h1>
        <p className="text-gray-600 mt-2">Configure security policies and access controls</p>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <HiOutlineCheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">IP address added successfully!</span>
          </div>
        </div>
      )}

      {/* Professional Tabs */}
      <div className="mb-8">
        <div className="bg-gray-50 p-1 rounded-xl border border-gray-200 shadow-sm">
          <nav className="flex space-x-1" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                } flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {tab.icon}
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Access Control Tab Content */}
      {activeTab === 'access-control' && (
        <div className="space-y-8">
          {/* IP Allowlist Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <HiOutlineGlobeAlt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">IP Allowlist</h2>
                  <p className="text-gray-600 text-sm">Restrict admin panel access to specific IP addresses</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Add New IP Form */}
              <div className="mb-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New IP Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ip-address" className="block text-sm font-medium text-gray-700 mb-2">
                      IP Address
                    </label>
                    <input
                      type="text"
                      id="ip-address"
                      value={newIpAddress}
                      onChange={(e) => setNewIpAddress(e.target.value)}
                      className={`block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                        newIpAddress && !isValidIpAddress(newIpAddress) 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300 bg-white'
                      }`}
                      placeholder="192.168.1.100"
                    />
                    {newIpAddress && !isValidIpAddress(newIpAddress) && (
                      <p className="mt-1 text-sm text-red-600">
                        Please enter a valid IP address
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Office Network"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={handleAddIpAddress}
                    disabled={!newIpAddress.trim() || !newDescription.trim() || !isValidIpAddress(newIpAddress)}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <HiOutlinePlus className="-ml-1 mr-2 h-5 w-5" />
                    Add IP Address
                  </button>
                </div>
              </div>

              {/* IP Allowlist Table */}
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP Address
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Added By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ipAllowlist.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                              <HiOutlineGlobeAlt className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 font-mono">{item.ipAddress}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{item.description}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{item.addedBy}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{item.dateAdded}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleRemoveIpAddress(item.id)}
                            className="inline-flex items-center p-2 bg-red-50 rounded-lg hover:bg-red-100 transition-all group"
                          >
                            <HiOutlineTrash className="h-4 w-4 text-red-600 group-hover:text-red-700" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {ipAllowlist.length === 0 && (
                <div className="text-center py-12">
                  <HiOutlineGlobeAlt className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No IP addresses</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by adding your first IP address to the allowlist.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Multi-Factor Auth Tab Content */}
      {activeTab === 'multi-factor' && (
        <MultiFactorAuth />
      )}

      {/* Security Alerts Tab Content */}
      {activeTab === 'security-alerts' && (
        <SecurityAlerts />
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'access-control' && activeTab !== 'multi-factor' && activeTab !== 'security-alerts' && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <div className="text-center">
            <div className="p-4 bg-gray-50 rounded-lg inline-block mb-4">
              {tabs.find(tab => tab.id === activeTab)?.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {tabs.find(tab => tab.id === activeTab)?.name}
            </h3>
            <p className="text-gray-600">This section is coming soon. Stay tuned for updates!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;