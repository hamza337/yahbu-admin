import React, { useState } from 'react';
import { HiOutlineRefresh, HiOutlineDownload, HiOutlineFilter, HiOutlineSearch, HiOutlineExclamation } from 'react-icons/hi';

const FinancialMonitoring = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for date range filter
  const [dateRange, setDateRange] = useState('week');
  
  // State for payment method filter
  const [paymentMethod, setPaymentMethod] = useState('all');
  
  // State for transaction type filter
  const [transactionType, setTransactionType] = useState('all');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for dispute modal
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [disputeReason, setDisputeReason] = useState('');
  
  // State for refund modal
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');
  
  // Dummy data for transactions
  const transactions = [
    { 
      id: 'TRX-001', 
      user: 'John Smith', 
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      type: 'Top-up', 
      amount: 50.00, 
      coins: 5000, 
      method: 'Stripe', 
      status: 'Completed', 
      date: '2024-06-10 14:30:22',
      paymentId: 'ch_3NpjKL2eZvKYlo2C1MFgDnM5'
    },
    { 
      id: 'TRX-002', 
      user: 'Emily Johnson', 
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      type: 'Withdrawal', 
      amount: 25.00, 
      coins: 2500, 
      method: 'PayPal', 
      status: 'Pending', 
      date: '2024-06-09 11:15:43',
      paymentId: 'PAYID-MNTL5DI8UY12345'
    },
    { 
      id: 'TRX-003', 
      user: 'Michael Brown', 
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      type: 'Transfer', 
      amount: 15.00, 
      coins: 1500, 
      method: 'Internal', 
      status: 'Completed', 
      date: '2024-06-08 09:45:10',
      paymentId: 'INT-TRANSFER-789012'
    },
    { 
      id: 'TRX-004', 
      user: 'Sarah Wilson', 
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      type: 'Top-up', 
      amount: 100.00, 
      coins: 10000, 
      method: 'Dlocal', 
      status: 'Failed', 
      date: '2024-06-07 16:20:35',
      paymentId: 'DL-PAY-456789'
    },
    { 
      id: 'TRX-005', 
      user: 'David Lee', 
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      type: 'Top-up', 
      amount: 75.00, 
      coins: 7500, 
      method: 'Stripe', 
      status: 'Disputed', 
      date: '2024-06-06 13:10:18',
      paymentId: 'ch_3NpjKL2eZvKYlo2C1MFgXyZ'
    },
    { 
      id: 'TRX-006', 
      user: 'Jessica Taylor', 
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      type: 'Withdrawal', 
      amount: 30.00, 
      coins: 3000, 
      method: 'PayPal', 
      status: 'Completed', 
      date: '2024-06-05 10:05:52',
      paymentId: 'PAYID-MNTL5DI8UY67890'
    },
  ];
  
  // Summary statistics
  const summaryStats = [
    { title: 'Total Transaction Volume', value: '$12,450.00', change: '+15%', color: 'text-blue-600' },
    { title: 'Pending Transactions', value: '8', change: '-3%', color: 'text-yellow-600' },
    { title: 'Disputed Transactions', value: '3', change: '+1', color: 'text-red-600' },
    { title: 'Conversion Rate', value: '98.5%', change: '+0.5%', color: 'text-green-600' },
  ];
  
  // Helper function for status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Disputed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function for type styling
  const getTypeStyle = (type) => {
    switch (type) {
      case 'Top-up':
        return 'bg-blue-50 text-blue-700';
      case 'Withdrawal':
        return 'bg-orange-50 text-orange-700';
      case 'Transfer':
        return 'bg-indigo-50 text-indigo-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  
  // Helper function for method styling
  const getMethodIcon = (method) => {
    switch (method) {
      case 'Stripe':
        return '💳';
      case 'PayPal':
        return '🅿️';
      case 'Dlocal':
        return '🌐';
      case 'Internal':
        return '🔄';
      default:
        return '💰';
    }
  };
  
  // Handle opening dispute modal
  const handleOpenDisputeModal = (transaction) => {
    setSelectedTransaction(transaction);
    setDisputeReason('');
    setShowDisputeModal(true);
  };
  
  // Handle dispute submission
  const handleSubmitDispute = () => {
    if (!selectedTransaction || !disputeReason.trim()) return;
    
    // Here you would handle the dispute submission to backend
    console.log('Dispute submitted for transaction:', selectedTransaction.id, 'Reason:', disputeReason);
    
    // Close modal
    setShowDisputeModal(false);
    setSelectedTransaction(null);
    setDisputeReason('');
  };
  
  // Handle opening refund modal
  const handleOpenRefundModal = (transaction) => {
    setSelectedTransaction(transaction);
    setRefundAmount(transaction.amount.toFixed(2));
    setRefundReason('');
    setShowRefundModal(true);
  };
  
  // Handle refund submission
  const handleSubmitRefund = () => {
    if (!selectedTransaction || !refundReason.trim() || !refundAmount) return;
    
    // Here you would handle the refund submission to backend
    console.log('Refund submitted for transaction:', selectedTransaction.id, 'Amount:', refundAmount, 'Reason:', refundReason);
    
    // Close modal
    setShowRefundModal(false);
    setSelectedTransaction(null);
    setRefundAmount('');
    setRefundReason('');
  };
  
  // Filter transactions based on active tab and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by tab
    if (activeTab !== 'all' && transaction.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Filter by payment method
    if (paymentMethod !== 'all' && transaction.method !== paymentMethod) {
      return false;
    }
    
    // Filter by transaction type
    if (transactionType !== 'all' && transaction.type !== transactionType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !(
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.paymentId.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Financial & Transaction Monitoring</h1>
        <p className="text-gray-600">Monitor and manage all payment activities across the platform</p>
      </div>
      
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className={`text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                stat.change.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Transactions
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('failed')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'failed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Failed
          </button>
          <button
            onClick={() => setActiveTab('disputed')}
            className={`px-4 py-3 text-sm font-medium ${activeTab === 'disputed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Disputed
          </button>
        </div>
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search by ID, user or payment reference"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Date Range */}
            <div>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
              </select>
            </div>
            
            {/* Payment Method */}
            <div>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Payment Methods</option>
                <option value="Stripe">Stripe</option>
                <option value="PayPal">PayPal</option>
                <option value="Dlocal">Dlocal</option>
                <option value="Internal">Internal</option>
              </select>
            </div>
            
            {/* Transaction Type */}
            <div>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Transaction Types</option>
                <option value="Top-up">Top-up</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Transfer">Transfer</option>
              </select>
            </div>
            
            {/* Reset Filters */}
            <button
              onClick={() => {
                setSearchQuery('');
                setDateRange('week');
                setPaymentMethod('all');
                setTransactionType('all');
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <HiOutlineRefresh className="-ml-0.5 mr-2 h-4 w-4" />
              Reset
            </button>
            
            {/* Export */}
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto"
            >
              <HiOutlineDownload className="-ml-0.5 mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={transaction.avatar} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{transaction.user}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyle(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${transaction.amount.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{transaction.coins.toLocaleString()} coins</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">{getMethodIcon(transaction.method)}</span>
                      <span className="text-sm text-gray-900">{transaction.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleOpenRefundModal(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                        disabled={transaction.status === 'Refunded'}
                      >
                        Refund
                      </button>
                      <button
                        onClick={() => handleOpenDisputeModal(transaction)}
                        className="text-red-600 hover:text-red-900"
                        disabled={transaction.status === 'Disputed'}
                      >
                        Dispute
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTransactions.length}</span> of{' '}
                <span className="font-medium">{filteredTransactions.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <HiOutlineExclamation className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">File a Dispute</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You are filing a dispute for transaction {selectedTransaction?.id} for ${selectedTransaction?.amount.toFixed(2)}.
                      </p>
                      <div className="mt-4">
                        <label htmlFor="disputeReason" className="block text-sm font-medium text-gray-700">Reason for Dispute</label>
                        <textarea
                          id="disputeReason"
                          name="disputeReason"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Please provide details about the dispute..."
                          value={disputeReason}
                          onChange={(e) => setDisputeReason(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmitDispute}
                >
                  File Dispute
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDisputeModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <HiOutlineRefresh className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Process Refund</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You are processing a refund for transaction {selectedTransaction?.id} for user {selectedTransaction?.user}.
                      </p>
                      <div className="mt-4">
                        <label htmlFor="refundAmount" className="block text-sm font-medium text-gray-700">Refund Amount</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            name="refundAmount"
                            id="refundAmount"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                            placeholder="0.00"
                            value={refundAmount}
                            onChange={(e) => setRefundAmount(e.target.value)}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">USD</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="refundReason" className="block text-sm font-medium text-gray-700">Reason for Refund</label>
                        <textarea
                          id="refundReason"
                          name="refundReason"
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Please provide details about the refund..."
                          value={refundReason}
                          onChange={(e) => setRefundReason(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmitRefund}
                >
                  Process Refund
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowRefundModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialMonitoring;