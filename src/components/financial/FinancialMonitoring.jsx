import React, { useState } from 'react';
import { HiOutlineSearch, HiOutlineFilter, HiOutlineRefresh, HiOutlineExclamation, HiOutlineCheck, HiOutlineX, HiOutlineDocumentDownload, HiOutlineCash, HiOutlineArrowUp, HiOutlineArrowDown, HiOutlineExclamationCircle } from 'react-icons/hi';

const FinancialMonitoring = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  
  // State for date range filter
  const [dateRange, setDateRange] = useState('last30');
  
  // State for payment method filter
  const [paymentMethod, setPaymentMethod] = useState('all');
  
  // State for transaction type filter
  const [transactionType, setTransactionType] = useState('all');
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // State for dispute modal
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // State for refund modal
  const [showRefundModal, setShowRefundModal] = useState(false);
  
  // Dummy data for transactions
  const transactions = [
    {
      id: 'TRX-12345',
      date: '2024-01-15T10:30:00',
      user: { id: 'U123', name: 'John Doe', email: 'john.doe@example.com' },
      type: 'top-up',
      amount: 50.00,
      currency: 'USD',
      coins: 5000,
      paymentMethod: 'stripe',
      paymentId: 'ch_1NxYZ2ABCDEFGHIJKLMNO',
      status: 'completed',
      notes: '',
    },
    {
      id: 'TRX-12346',
      date: '2024-01-14T14:45:00',
      user: { id: 'U456', name: 'Jane Smith', email: 'jane.smith@example.com' },
      type: 'withdrawal',
      amount: 25.00,
      currency: 'USD',
      coins: 2500,
      paymentMethod: 'paypal',
      paymentId: 'PAY-1ABCDEFGHIJKLMNO',
      status: 'completed',
      notes: '',
    },
    {
      id: 'TRX-12347',
      date: '2024-01-13T09:15:00',
      user: { id: 'U789', name: 'Robert Johnson', email: 'robert.j@example.com' },
      type: 'transfer',
      amount: 10.00,
      currency: 'USD',
      coins: 1000,
      paymentMethod: 'internal',
      paymentId: 'INT-1234567890',
      status: 'completed',
      notes: 'Gift to friend',
    },
    {
      id: 'TRX-12348',
      date: '2024-01-12T16:20:00',
      user: { id: 'U123', name: 'John Doe', email: 'john.doe@example.com' },
      type: 'top-up',
      amount: 100.00,
      currency: 'USD',
      coins: 10000,
      paymentMethod: 'dlocal',
      paymentId: 'DL-9876543210',
      status: 'completed',
      notes: '',
    },
    {
      id: 'TRX-12349',
      date: '2024-01-11T11:05:00',
      user: { id: 'U456', name: 'Jane Smith', email: 'jane.smith@example.com' },
      type: 'withdrawal',
      amount: 75.00,
      currency: 'USD',
      coins: 7500,
      paymentMethod: 'stripe',
      paymentId: 'ch_2NxYZ2ABCDEFGHIJKLMNO',
      status: 'pending',
      notes: 'Awaiting verification',
    },
    {
      id: 'TRX-12350',
      date: '2024-01-10T13:40:00',
      user: { id: 'U789', name: 'Robert Johnson', email: 'robert.j@example.com' },
      type: 'top-up',
      amount: 30.00,
      currency: 'USD',
      coins: 3000,
      paymentMethod: 'paypal',
      paymentId: 'PAY-2ABCDEFGHIJKLMNO',
      status: 'failed',
      notes: 'Payment declined by provider',
    },
    {
      id: 'TRX-12351',
      date: '2024-01-09T08:55:00',
      user: { id: 'U101', name: 'Emily Davis', email: 'emily.d@example.com' },
      type: 'transfer',
      amount: 15.00,
      currency: 'USD',
      coins: 1500,
      paymentMethod: 'internal',
      paymentId: 'INT-0987654321',
      status: 'completed',
      notes: '',
    },
    {
      id: 'TRX-12352',
      date: '2024-01-08T15:30:00',
      user: { id: 'U202', name: 'Michael Wilson', email: 'michael.w@example.com' },
      type: 'top-up',
      amount: 200.00,
      currency: 'USD',
      coins: 20000,
      paymentMethod: 'dlocal',
      paymentId: 'DL-1122334455',
      status: 'disputed',
      notes: 'Customer claims unauthorized transaction',
    },
    {
      id: 'TRX-12353',
      date: '2024-01-07T10:15:00',
      user: { id: 'U303', name: 'Sarah Brown', email: 'sarah.b@example.com' },
      type: 'withdrawal',
      amount: 50.00,
      currency: 'USD',
      coins: 5000,
      paymentMethod: 'stripe',
      paymentId: 'ch_3NxYZ2ABCDEFGHIJKLMNO',
      status: 'refunded',
      notes: 'Customer requested refund',
    },
    {
      id: 'TRX-12354',
      date: '2024-01-06T12:25:00',
      user: { id: 'U404', name: 'David Miller', email: 'david.m@example.com' },
      type: 'top-up',
      amount: 75.00,
      currency: 'USD',
      coins: 7500,
      paymentMethod: 'paypal',
      paymentId: 'PAY-3ABCDEFGHIJKLMNO',
      status: 'completed',
      notes: '',
    },
    {
      id: 'TRX-12355',
      date: '2024-01-05T09:40:00',
      user: { id: 'U505', name: 'Lisa Taylor', email: 'lisa.t@example.com' },
      type: 'transfer',
      amount: 25.00,
      currency: 'USD',
      coins: 2500,
      paymentMethod: 'internal',
      paymentId: 'INT-5566778899',
      status: 'completed',
      notes: '',
    },
    {
      id: 'TRX-12356',
      date: '2024-01-04T14:10:00',
      user: { id: 'U123', name: 'John Doe', email: 'john.doe@example.com' },
      type: 'withdrawal',
      amount: 100.00,
      currency: 'USD',
      coins: 10000,
      paymentMethod: 'dlocal',
      paymentId: 'DL-6677889900',
      status: 'pending',
      notes: 'Verification in progress',
    },
  ];
  
  // Summary statistics
  const summaryStats = [
    { title: 'Total Transactions (30d)', value: '$12,450.00', change: '+15%', color: 'text-blue-600' },
    { title: 'Top-ups (30d)', value: '$8,750.00', change: '+12%', color: 'text-green-600' },
    { title: 'Withdrawals (30d)', value: '$3,200.00', change: '+8%', color: 'text-red-600' },
    { title: 'Disputed Amount', value: '$500.00', change: '-5%', color: 'text-yellow-600' },
  ];
  
  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Helper function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  // Helper function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'disputed':
        return 'bg-purple-100 text-purple-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get transaction type icon and color
  const getTransactionTypeInfo = (type) => {
    switch (type) {
      case 'top-up':
        return { icon: <HiOutlineArrowDown className="h-5 w-5 text-green-500" />, color: 'text-green-600' };
      case 'withdrawal':
        return { icon: <HiOutlineArrowUp className="h-5 w-5 text-red-500" />, color: 'text-red-600' };
      case 'transfer':
        return { icon: <HiOutlineCash className="h-5 w-5 text-blue-500" />, color: 'text-blue-600' };
      default:
        return { icon: <HiOutlineCash className="h-5 w-5 text-gray-500" />, color: 'text-gray-600' };
    }
  };
  
  // Helper function to get payment method display name and icon
  const getPaymentMethodInfo = (method) => {
    switch (method) {
      case 'stripe':
        return { name: 'Stripe', icon: '💳' };
      case 'paypal':
        return { name: 'PayPal', icon: '🅿️' };
      case 'dlocal':
        return { name: 'DLocal', icon: '🌐' };
      case 'internal':
        return { name: 'Internal', icon: '🔄' };
      default:
        return { name: method, icon: '💰' };
    }
  };
  
  // Filter transactions based on active tab, filters, and search query
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by tab
    if (activeTab !== 'all' && transaction.type !== activeTab) {
      return false;
    }
    
    // Filter by payment method
    if (paymentMethod !== 'all' && transaction.paymentMethod !== paymentMethod) {
      return false;
    }
    
    // Filter by transaction type
    if (transactionType !== 'all' && transaction.status !== transactionType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        transaction.id.toLowerCase().includes(query) ||
        transaction.user.name.toLowerCase().includes(query) ||
        transaction.user.email.toLowerCase().includes(query) ||
        transaction.paymentId.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle dispute
  const handleDispute = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDisputeModal(true);
  };
  
  // Handle refund
  const handleRefund = (transaction) => {
    setSelectedTransaction(transaction);
    setShowRefundModal(true);
  };
  
  // Submit dispute
  const submitDispute = (e) => {
    e.preventDefault();
    // This would be implemented with actual API calls in a real application
    console.log('Dispute submitted for transaction:', selectedTransaction.id);
    setShowDisputeModal(false);
    setSelectedTransaction(null);
    alert('Dispute has been submitted. This would be implemented with backend integration.');
  };
  
  // Submit refund
  const submitRefund = (e) => {
    e.preventDefault();
    // This would be implemented with actual API calls in a real application
    console.log('Refund processed for transaction:', selectedTransaction.id);
    setShowRefundModal(false);
    setSelectedTransaction(null);
    alert('Refund has been processed. This would be implemented with backend integration.');
  };
  
  // Reset filters
  const resetFilters = () => {
    setDateRange('last30');
    setPaymentMethod('all');
    setTransactionType('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
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
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Transactions
          </button>
          <button
            onClick={() => setActiveTab('top-up')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'top-up' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Top-ups
          </button>
          <button
            onClick={() => setActiveTab('withdrawal')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'withdrawal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Withdrawals
          </button>
          <button
            onClick={() => setActiveTab('transfer')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'transfer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Transfers
          </button>
        </div>
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap items-center gap-4">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            {/* Payment Method Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Methods</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="dlocal">DLocal</option>
                <option value="internal">Internal</option>
              </select>
            </div>
            
            {/* Transaction Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="disputed">Disputed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            {/* Search */}
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by ID, user, email, or payment ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiOutlineRefresh className="-ml-0.5 mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
        
        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((transaction) => {
                const typeInfo = getTransactionTypeInfo(transaction.type);
                const paymentInfo = getPaymentMethodInfo(transaction.paymentMethod);
                
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(transaction.date)}</div>
                      <div className="text-xs text-gray-400">{formatTime(transaction.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium text-gray-900">{transaction.user.name}</div>
                      <div className="text-xs">{transaction.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        {typeInfo.icon}
                        <span className={`ml-2 ${typeInfo.color}`}>
                          {transaction.type === 'top-up' ? 'Top-up' : 
                           transaction.type === 'withdrawal' ? 'Withdrawal' : 'Transfer'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                      <div className="text-xs">{transaction.coins.toLocaleString()} coins</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-2">{paymentInfo.icon}</span>
                        <span>{paymentInfo.name}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">{transaction.paymentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                      {transaction.notes && (
                        <div className="text-xs text-gray-400 mt-1">{transaction.notes}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleDispute(transaction)}
                          className="text-blue-600 hover:text-blue-900"
                          disabled={transaction.status === 'disputed' || transaction.status === 'refunded'}
                        >
                          Dispute
                        </button>
                        <button
                          onClick={() => handleRefund(transaction)}
                          className="text-red-600 hover:text-red-900"
                          disabled={transaction.type !== 'top-up' || transaction.status === 'refunded' || transaction.status === 'failed'}
                        >
                          Refund
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <HiOutlineDocumentDownload className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-10 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <HiOutlineExclamationCircle className="h-10 w-10 text-gray-400 mb-2" />
                      <p>No transactions found matching your filters.</p>
                      <button
                        onClick={resetFilters}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <HiOutlineRefresh className="-ml-0.5 mr-2 h-4 w-4" />
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredTransactions.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 ${currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 ${currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredTransactions.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredTransactions.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {/* Page numbers */}
                  {[...Array(totalPages).keys()].map(number => (
                    <button
                      key={number + 1}
                      onClick={() => handlePageChange(number + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border ${currentPage === number + 1 ? 'bg-blue-50 border-blue-500 text-blue-600 z-10' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'} text-sm font-medium`}
                    >
                      {number + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dispute Modal */}
      {showDisputeModal && selectedTransaction && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                  <HiOutlineExclamation className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">File a Dispute</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You are filing a dispute for transaction {selectedTransaction.id}. This action will be logged and may require further investigation.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={submitDispute} className="mt-5">
                <div className="rounded-md bg-gray-50 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Transaction</p>
                      <p className="text-sm text-gray-900">{selectedTransaction.id}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">User</p>
                      <p className="text-sm text-gray-900">{selectedTransaction.user.name}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Amount</p>
                      <p className="text-sm text-gray-900">${selectedTransaction.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="dispute-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Dispute</label>
                  <select
                    id="dispute-reason"
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="unauthorized">Unauthorized Transaction</option>
                    <option value="duplicate">Duplicate Charge</option>
                    <option value="fraud">Suspected Fraud</option>
                    <option value="service_issue">Service Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="dispute-details" className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                  <textarea
                    id="dispute-details"
                    rows="4"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Provide additional details about the dispute"
                    required
                  ></textarea>
                </div>
                
                <div className="sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit Dispute
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setShowDisputeModal(false);
                      setSelectedTransaction(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Refund Modal */}
      {showRefundModal && selectedTransaction && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <HiOutlineX className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Process Refund</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You are processing a refund for transaction {selectedTransaction.id}. This will return {selectedTransaction.amount.toFixed(2)} {selectedTransaction.currency} to the user.
                    </p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={submitRefund} className="mt-5">
                <div className="rounded-md bg-gray-50 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Transaction</p>
                      <p className="text-sm text-gray-900">{selectedTransaction.id}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">User</p>
                      <p className="text-sm text-gray-900">{selectedTransaction.user.name}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500">Amount</p>
                      <p className="text-sm text-gray-900">${selectedTransaction.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Refund Amount</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      max={selectedTransaction.amount}
                      defaultValue={selectedTransaction.amount.toFixed(2)}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">{selectedTransaction.currency}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Maximum refund amount: ${selectedTransaction.amount.toFixed(2)}</p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="refund-reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Refund</label>
                  <select
                    id="refund-reason"
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="customer_request">Customer Request</option>
                    <option value="duplicate_payment">Duplicate Payment</option>
                    <option value="service_issue">Service Issue</option>
                    <option value="unauthorized">Unauthorized Transaction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="refund-notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    id="refund-notes"
                    rows="3"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add any additional notes about this refund"
                  ></textarea>
                </div>
                
                <div className="sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Process Refund
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setShowRefundModal(false);
                      setSelectedTransaction(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialMonitoring;