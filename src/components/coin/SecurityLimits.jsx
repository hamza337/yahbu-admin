import React, { useState } from 'react';

const SecurityLimits = () => {
  // State for security limits
  const [limits, setLimits] = useState({
    dailyFreeCoins: 500,
    weeklyRedemption: 100000,
    monthlyReferral: 5000,
    highValueThreshold: 100000,
    dailyPurchaseLimit: 50000,
    monthlyPurchaseLimit: 1000000,
    suspiciousActivityThreshold: 200000
  });

  // State for form values (to handle changes before saving)
  const [formValues, setFormValues] = useState({
    ...limits
  });

  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseInt(value, 10) || 0
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLimits(formValues);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  // Security activity logs (dummy data)
  const securityLogs = [
    { id: 1, user: 'John Smith', action: 'Exceeded daily free coins limit', timestamp: '2024-06-10 14:32:45', status: 'Blocked' },
    { id: 2, user: 'Emma Johnson', action: 'Multiple redemption attempts', timestamp: '2024-06-09 09:15:22', status: 'Flagged' },
    { id: 3, user: 'Michael Brown', action: 'Suspicious coin transfer pattern', timestamp: '2024-06-08 18:45:10', status: 'Under Review' },
    { id: 4, user: 'Olivia Davis', action: 'Exceeded monthly purchase limit', timestamp: '2024-06-07 11:20:33', status: 'Blocked' },
    { id: 5, user: 'William Wilson', action: 'Attempted high-value redemption', timestamp: '2024-06-06 16:05:18', status: 'Flagged' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-6 mb-6 shadow-md">
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Security & Limits</h1>
              <p className="text-sm text-white text-opacity-90 mt-1">Set limits to prevent exploitation and ensure system integrity</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">Security limits updated successfully!</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Security Limits Form */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Coin Limits Configuration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="dailyFreeCoins" className="block text-sm font-medium text-gray-700 mb-1">Daily Free Coins Limit</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="dailyFreeCoins"
                    id="dailyFreeCoins"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.dailyFreeCoins}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Maximum free coins a user can earn per day</p>
              </div>

              <div>
                <label htmlFor="weeklyRedemption" className="block text-sm font-medium text-gray-700 mb-1">Weekly Redemption Limit</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="weeklyRedemption"
                    id="weeklyRedemption"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.weeklyRedemption}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Maximum coins a user can redeem per week</p>
              </div>

              <div>
                <label htmlFor="monthlyReferral" className="block text-sm font-medium text-gray-700 mb-1">Monthly Referral Rewards Cap</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="monthlyReferral"
                    id="monthlyReferral"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.monthlyReferral}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Maximum referral rewards a user can earn per month</p>
              </div>

              <div>
                <label htmlFor="highValueThreshold" className="block text-sm font-medium text-gray-700 mb-1">High-Value Redemption Threshold</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="highValueThreshold"
                    id="highValueThreshold"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.highValueThreshold}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Redemptions above this value require manual approval</p>
              </div>

              <div>
                <label htmlFor="dailyPurchaseLimit" className="block text-sm font-medium text-gray-700 mb-1">Daily Purchase Limit</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="dailyPurchaseLimit"
                    id="dailyPurchaseLimit"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.dailyPurchaseLimit}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Maximum coins a user can purchase per day</p>
              </div>

              <div>
                <label htmlFor="monthlyPurchaseLimit" className="block text-sm font-medium text-gray-700 mb-1">Monthly Purchase Limit</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="monthlyPurchaseLimit"
                    id="monthlyPurchaseLimit"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.monthlyPurchaseLimit}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Maximum coins a user can purchase per month</p>
              </div>

              <div>
                <label htmlFor="suspiciousActivityThreshold" className="block text-sm font-medium text-gray-700 mb-1">Suspicious Activity Threshold</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    name="suspiciousActivityThreshold"
                    id="suspiciousActivityThreshold"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                    value={formValues.suspiciousActivityThreshold}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">coins</span>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Transactions above this value will be flagged for review</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Security Limits
                </button>
              </div>
            </form>
          </div>

          {/* Current Limits Overview */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Current Limits</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Daily Free Coins Limit</span>
                  <span className="font-medium text-black">{limits.dailyFreeCoins.toLocaleString()} coins</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Weekly Redemption Limit</span>
                  <span className="font-medium text-black">{limits.weeklyRedemption.toLocaleString()} coins</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Monthly Referral Rewards Cap</span>
                  <span className="font-medium text-black">{limits.monthlyReferral.toLocaleString()} coins</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">High-Value Redemption Threshold</span>
                  <span className="font-medium text-black">{limits.highValueThreshold.toLocaleString()} coins</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Daily Purchase Limit</span>
                  <span className="font-medium text-black">{limits.dailyPurchaseLimit.toLocaleString()} coins</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Monthly Purchase Limit</span>
                  <span className="font-medium text-black">{limits.monthlyPurchaseLimit.toLocaleString()} coins</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Suspicious Activity Threshold</span>
                  <span className="font-medium text-black">{limits.suspiciousActivityThreshold.toLocaleString()} coins</span>
                </div>
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Security Recommendations</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Set daily free coins limit to prevent abuse of the reward system</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Implement weekly redemption limits to prevent mass redemptions</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Set high-value redemption thresholds to require manual approval for expensive items</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="ml-2 text-sm text-gray-600">Monitor suspicious activity patterns to detect potential fraud</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Activity Logs */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-bold text-lg text-gray-800">Security Activity Logs</h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
              3 flagged activities
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {securityLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.action}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{log.timestamp}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${log.status === 'Blocked' ? 'bg-red-100 text-red-800' : log.status === 'Flagged' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900">View Details</button>
                        {log.status !== 'Blocked' && (
                          <button className="text-red-600 hover:text-red-900">Block User</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLimits;