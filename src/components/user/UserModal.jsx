import React, { useState, useRef, useEffect } from 'react';

const tabs = [
  { name: 'Overview', key: 'overview' },
  { name: 'Transactions', key: 'transactions' },
  { name: 'Complaints', key: 'complaints' },
];

const UserModal = ({ user, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(user);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleResetPassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 8) {
      // Handle password reset logic here
      console.log('Password reset for user:', user.id);
      setShowResetPassword(false);
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // Sample transaction data
  const userTransactions = [
    {
      id: 1,
      type: 'purchase',
      amount: '+500',
      date: '2024-01-20',
      description: 'Coin purchase via Stripe'
    },
    {
      id: 2,
      type: 'bonus',
      amount: '+100',
      date: '2024-01-19',
      description: 'Daily login bonus'
    },
    {
      id: 3,
      type: 'redemption',
      amount: '-250',
      date: '2024-01-18',
      description: 'Gift card redemption'
    },
    {
      id: 4,
      type: 'purchase',
      amount: '+1000',
      date: '2024-01-17',
      description: 'Premium package purchase'
    },
    {
      id: 5,
      type: 'bonus',
      amount: '+50',
      date: '2024-01-16',
      description: 'Referral bonus'
    }
  ];

  // Sample complaints data
  const userComplaints = [
    {
      id: 1,
      title: 'Inappropriate Content',
      status: 'Under Review',
      date: '2024-06-06',
      description: 'User reported for posting inappropriate content in community forum'
    },
    {
      id: 2,
      title: 'Spam Activity',
      status: 'Resolved',
      date: '2024-06-05',
      description: 'Multiple users reported spam messages from this account'
    },
    {
      id: 3,
      title: 'Harassment',
      status: 'Pending',
      date: '2024-06-04',
      description: 'Complaint about harassment in private messages'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-black">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="relative flex border-b border-gray-200/50 bg-white/80 backdrop-blur-sm px-6">
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-black">Wallet Overview</h3>
              
              {/* Wallet Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Real Coins Card */}
                <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Real Coins</h4>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-green-400">1,250</div>
                    <div className="text-sm text-gray-400">≈ $103.13 value</div>
                  </div>
                </div>

                {/* Bonus Coins Card */}
                <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Bonus Coins</h4>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-blue-400">340</div>
                    <div className="text-sm text-gray-400">System-awarded coins</div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <h3 className="font-semibold text-lg text-black mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Join Date</span>
                    <div className="text-black font-medium">{userData.joinedDate}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Last Login</span>
                    <div className="text-black font-medium">{userData.lastLogin}</div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <div className={`font-medium ${userData.status === 'Active' ? 'text-green-600' : userData.status === 'Blocked' ? 'text-red-600' : 'text-yellow-600'}`}>
                      {userData.status}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">KYC Status</span>
                    <div className={`font-medium ${userData.kycStatus === 'Verified' ? 'text-green-600' : userData.kycStatus === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                      {userData.kycStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Reset Section */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <h3 className="font-semibold text-lg text-black mb-4">Security Settings</h3>
                {!showResetPassword ? (
                  <button
                    onClick={() => setShowResetPassword(true)}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Reset User Password
                    </div>
                  </button>
                ) : (
                  <div className="bg-gray-50/80 p-6 rounded-lg border border-gray-200/60 backdrop-blur-sm">
                    <h4 className="font-medium text-black mb-4">Reset Password for {userData.name}</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter new password (min 8 characters)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Confirm new password"
                        />
                      </div>
                      {newPassword && confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-red-600 text-sm">Passwords do not match</p>
                      )}
                      {newPassword && newPassword.length < 8 && (
                        <p className="text-red-600 text-sm">Password must be at least 8 characters long</p>
                      )}
                      <div className="flex gap-3">
                        <button
                          onClick={handleResetPassword}
                          disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword || newPassword.length < 8}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Reset Password
                        </button>
                        <button
                          onClick={() => {
                            setShowResetPassword(false);
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-black">Transaction History</h3>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50/80 backdrop-blur-sm">
                      <tr>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200/50">
                      {userTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.type === 'purchase' 
                                ? 'bg-white text-gray-800 border border-gray-300' 
                                : transaction.type === 'bonus'
                                ? 'bg-gray-800 text-white'
                                : 'bg-gray-800 text-white'
                            }`}>
                              {transaction.type}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`font-semibold ${
                              transaction.amount.startsWith('+') 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {transaction.amount}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600 font-medium">
                            {transaction.date}
                          </td>
                          <td className="py-4 px-6 text-gray-700">
                            {transaction.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Complaints Tab */}
          {activeTab === 'complaints' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-black">Complaints</h3>
                <span className="text-sm text-gray-500">{userComplaints.length} total</span>
              </div>
              
              {userComplaints.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No complaints found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userComplaints.map((complaint) => (
                    <div key={complaint.id} className="bg-white/60 backdrop-blur-sm border border-gray-200/40 rounded-lg p-5 hover:bg-white/80 transition-all duration-200">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{complaint.title}</h4>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                            complaint.status === 'Resolved' 
                              ? 'bg-green-50 text-green-700 border border-green-200' 
                              : complaint.status === 'Under Review'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {complaint.status}
                          </span>
                          <span className="text-xs text-gray-400">{complaint.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{complaint.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;