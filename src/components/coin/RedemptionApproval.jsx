import React, { useState, useEffect } from 'react';

const RedemptionApproval = () => {
  // State for pending redemptions
  const [pendingRedemptions, setPendingRedemptions] = useState([
    { id: 1, user: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', item: 'Vacation Package', coins: 1000000, date: '2024-06-10', status: 'Pending' },
    { id: 2, user: 'Emma Johnson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', item: 'Gaming Console', coins: 250000, date: '2024-06-09', status: 'Pending' },
    { id: 3, user: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', item: 'Premium Headphones', coins: 150000, date: '2024-06-08', status: 'Pending' },
    { id: 4, user: 'Olivia Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', item: 'Smartphone', coins: 500000, date: '2024-06-07', status: 'Pending' },
    { id: 5, user: 'William Wilson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', item: 'Laptop', coins: 750000, date: '2024-06-06', status: 'Pending' },
  ]);

  // State for approved and rejected redemptions
  const [approvedRedemptions, setApprovedRedemptions] = useState([
    { id: 6, user: 'James Taylor', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', item: 'Smart Watch', coins: 120000, date: '2024-06-05', status: 'Approved', approvedDate: '2024-06-05' },
    { id: 7, user: 'Sophia Miller', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', item: 'Wireless Earbuds', coins: 80000, date: '2024-06-04', status: 'Approved', approvedDate: '2024-06-04' },
    { id: 8, user: 'Benjamin Anderson', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', item: 'Fitness Tracker', coins: 95000, date: '2024-06-03', status: 'Approved', approvedDate: '2024-06-03' },
  ]);

  const [rejectedRedemptions, setRejectedRedemptions] = useState([
    { id: 9, user: 'Charlotte Thomas', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', item: 'Designer Handbag', coins: 850000, date: '2024-06-02', status: 'Rejected', rejectedDate: '2024-06-02', reason: 'Insufficient account history' },
    { id: 10, user: 'Daniel Jackson', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', item: 'Gaming PC', coins: 1200000, date: '2024-06-01', status: 'Rejected', rejectedDate: '2024-06-01', reason: 'Suspicious activity detected' },
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('pending');
  
  // State for rejection modal
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRedemption, setSelectedRedemption] = useState(null);

  // Handle approval
  const handleApprove = (redemption) => {
    // Update the redemption status
    const updatedRedemption = {
      ...redemption,
      status: 'Approved',
      approvedDate: new Date().toISOString().split('T')[0]
    };

    // Add to approved list
    setApprovedRedemptions([updatedRedemption, ...approvedRedemptions]);

    // Remove from pending list
    setPendingRedemptions(pendingRedemptions.filter(item => item.id !== redemption.id));
  };

  // Open rejection modal
  const openRejectionModal = (redemption) => {
    setSelectedRedemption(redemption);
    setRejectionReason('');
    setShowRejectionModal(true);
  };

  // Handle rejection
  const handleReject = () => {
    if (!selectedRedemption || !rejectionReason.trim()) return;

    // Update the redemption status
    const updatedRedemption = {
      ...selectedRedemption,
      status: 'Rejected',
      rejectedDate: new Date().toISOString().split('T')[0],
      reason: rejectionReason
    };

    // Add to rejected list
    setRejectedRedemptions([updatedRedemption, ...rejectedRedemptions]);

    // Remove from pending list
    setPendingRedemptions(pendingRedemptions.filter(item => item.id !== selectedRedemption.id));

    // Close modal
    setShowRejectionModal(false);
    setSelectedRedemption(null);
    setRejectionReason('');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-6 mb-6 shadow-md">
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Redemption Approval</h1>
              <p className="text-sm text-white text-opacity-90 mt-1">Manage high-value redemption requests</p>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">Pending Approvals</div>
            <div className="text-2xl font-bold text-yellow-600">{pendingRedemptions.length}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">Approved (Last 30 Days)</div>
            <div className="text-2xl font-bold text-green-600">{approvedRedemptions.length}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">Rejected (Last 30 Days)</div>
            <div className="text-2xl font-bold text-red-600">{rejectedRedemptions.length}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Pending
                <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-yellow-100 text-yellow-800">{pendingRedemptions.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'approved' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Approved
                <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-green-100 text-green-800">{approvedRedemptions.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('rejected')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'rejected' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Rejected
                <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-red-100 text-red-800">{rejectedRedemptions.length}</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Redemptions Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          {activeTab === 'pending' && (
            <>
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Pending High-Value Redemptions</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                  {pendingRedemptions.length} pending approvals
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingRedemptions.map(redemption => (
                      <tr key={redemption.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <img src={redemption.avatar} alt={redemption.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{redemption.user}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.item}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{redemption.coins.toLocaleString()} coins</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {redemption.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => handleApprove(redemption)}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => openRejectionModal(redemption)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'approved' && (
            <>
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Approved Redemptions</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  {approvedRedemptions.length} approved
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approval Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {approvedRedemptions.map(redemption => (
                      <tr key={redemption.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <img src={redemption.avatar} alt={redemption.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{redemption.user}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.item}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{redemption.coins.toLocaleString()} coins</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.approvedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {redemption.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'rejected' && (
            <>
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-800">Rejected Redemptions</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                  {rejectedRedemptions.length} rejected
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rejection Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rejectedRedemptions.map(redemption => (
                      <tr key={redemption.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <img src={redemption.avatar} alt={redemption.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{redemption.user}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.item}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{redemption.coins.toLocaleString()} coins</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{redemption.rejectedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {redemption.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{redemption.reason}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-2">Reject Redemption</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 mb-3">
                  You are about to reject the redemption request from <span className="font-medium text-gray-700">{selectedRedemption?.user}</span> for <span className="font-medium text-gray-700">{selectedRedemption?.item}</span> ({selectedRedemption?.coins.toLocaleString()} coins).
                </p>
                <div className="mt-4">
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                  <textarea
                    id="reason"
                    rows="3"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="Please provide a reason for rejection"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <button
                  onClick={() => setShowRejectionModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectionReason.trim()}
                  className={`px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 w-full ${rejectionReason.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedemptionApproval;