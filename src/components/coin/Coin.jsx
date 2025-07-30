import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const allTransactions = [
  // Withdrawals
  {
    id: 1,
    user: { name: 'Alice Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    amount: 120.5,
    date: '2024-06-01 14:23',
    type: 'Withdrawal',
    status: 'Completed',
  },
  {
    id: 2,
    user: { name: 'Bob Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    amount: 75.0,
    date: '2024-06-02 09:10',
    type: 'Withdrawal',
    status: 'Completed',
  },
  // Deposits
  {
    id: 3,
    user: { name: 'Charlie Lee', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
    amount: 200.0,
    date: '2024-06-03 18:45',
    type: 'Deposit',
    status: 'Completed',
  },
  {
    id: 4,
    user: { name: 'Diana King', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    amount: 50.25,
    date: '2024-06-04 11:30',
    type: 'Deposit',
    status: 'Completed',
  },
  // Rewards
  {
    id: 5,
    user: { name: 'Eva Green', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
    amount: 100.0,
    date: '2024-06-01 08:15',
    type: 'Reward',
    status: 'Completed',
    reason: 'Daily Login',
  },
  {
    id: 6,
    user: { name: 'Frank White', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
    amount: 500.0,
    date: '2024-06-02 16:40',
    type: 'Reward',
    status: 'Completed',
    reason: 'Referral Bonus',
  },
  // Redemptions
  {
    id: 7,
    user: { name: 'Grace Taylor', avatar: 'https://randomuser.me/api/portraits/women/91.jpg' },
    amount: 10000,
    date: '2024-06-03 12:20',
    type: 'Redemption',
    status: 'Completed',
    item: 'Badge',
  },
  {
    id: 8,
    user: { name: 'Henry Miller', avatar: 'https://randomuser.me/api/portraits/men/17.jpg' },
    amount: 50000,
    date: '2024-06-04 09:55',
    type: 'Redemption',
    status: 'Pending',
    item: 'Gift Card',
  },
  // Manual Adjustments
  {
    id: 9,
    user: { name: 'Irene Davis', avatar: 'https://randomuser.me/api/portraits/women/57.jpg' },
    amount: 150.0,
    date: '2024-06-01 10:30',
    type: 'Manual Credit',
    status: 'Completed',
    admin: 'Admin User',
    note: 'Customer service compensation',
  },
  {
    id: 10,
    user: { name: 'Jack Wilson', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    amount: 75.0,
    date: '2024-06-02 14:15',
    type: 'Manual Debit',
    status: 'Completed',
    admin: 'Admin User',
    note: 'Correction for system error',
  },
];

// Helper functions for styling
const getTypeColor = (type) => {
  switch (type) {
    case 'Withdrawal':
      return 'bg-red-100 text-red-800';
    case 'Deposit':
      return 'bg-green-100 text-green-800';
    case 'Reward':
      return 'bg-purple-100 text-purple-800';
    case 'Redemption':
      return 'bg-orange-100 text-orange-800';
    case 'Manual Credit':
      return 'bg-blue-100 text-blue-800';
    case 'Manual Debit':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Coin = () => {
  const [transactions, setTransactions] = useState(allTransactions);
  const [timeFilter, setTimeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [searchTerm, setSearchTerm] = useState('');

  // Apply filters to transactions
  useEffect(() => {
    let filtered = [...allTransactions];
    
    // Apply time filter
    if (timeFilter !== 'all') {
      const today = new Date();
      let filterDate = new Date();
      
      if (timeFilter === 'daily') {
        filterDate.setDate(today.getDate() - 1);
      } else if (timeFilter === 'weekly') {
        filterDate.setDate(today.getDate() - 7);
      } else if (timeFilter === 'monthly') {
        filterDate.setMonth(today.getMonth() - 1);
      }
      
      filtered = filtered.filter(tx => new Date(tx.date) >= filterDate);
    }
    
    // Apply custom date range filter
    if (timeFilter === 'custom' && startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= start && (!endDate || txDate <= new Date(endDate));
      });
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.user.name.toLowerCase().includes(term) || 
        tx.type.toLowerCase().includes(term) ||
        (tx.note && tx.note.toLowerCase().includes(term)) ||
        (tx.reason && tx.reason.toLowerCase().includes(term)) ||
        (tx.item && tx.item.toLowerCase().includes(term))
      );
    }
    
    setTransactions(filtered);
  }, [timeFilter, typeFilter, statusFilter, dateRange, searchTerm, startDate, endDate]);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div>
        {/* Enhanced Header with integrated search */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-xl shadow-lg mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                <p className="text-sm text-white text-opacity-90 mt-1">View, filter and manage all coin transactions</p>
              </div>
            </div>
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white text-opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by user, type, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 transition-all duration-200 shadow-inner"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white text-opacity-70 hover:text-opacity-100"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Enhanced Filter Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                  <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg">Advanced Filters</h3>
              </div>
              <button 
                onClick={() => {
                  setTimeFilter('all');
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                  setDateRange([null, null]);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Reset All
              </button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Time Period Filter - Enhanced */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Time Period
              </label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {['all', 'daily', 'weekly', 'monthly'].map(f => (
                    <button
                      key={f}
                      onClick={() => {
                        setTimeFilter(f);
                        if (f !== 'custom') setDateRange([null, null]);
                      }}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${timeFilter === f 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                    >
                      {f === 'all' ? 'All Time' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                  <button
                    onClick={() => setTimeFilter('custom')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${timeFilter === 'custom' 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                  >
                    Custom
                  </button>
                </div>
                
                {timeFilter === 'custom' && (
                  <div className="mt-3 relative bg-white rounded-md overflow-hidden shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <DatePicker
                      selectsRange
                      startDate={startDate}
                      endDate={endDate}
                      onChange={(update) => setDateRange(update)}
                      isClearable={true}
                      className="w-full pl-10 pr-4 py-2.5 border-0 focus:ring-2 focus:ring-blue-500 text-gray-700"
                      placeholderText="Select date range"
                      dateFormat="MMM d, yyyy"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Transaction Type Filter - Enhanced */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                </svg>
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${typeFilter === 'all' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                >
                  All Types
                </button>
                
                {['Withdrawal', 'Deposit', 'Reward', 'Redemption', 'Manual Credit', 'Manual Debit'].map(type => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${typeFilter === type 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <span className={`w-3 h-3 rounded-full mr-2 ${getTypeColor(type).split(' ')[0]}`}></span>
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Status Filter - Enhanced */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg className="h-4 w-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${statusFilter === 'all' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                >
                  All Statuses
                </button>
                
                {['Completed', 'Pending', 'Failed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${statusFilter === status 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <span className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(status).split(' ')[0]}`}></span>
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Active Filters & Reset */}
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {timeFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  <svg className="h-3 w-3 mr-1 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {timeFilter === 'custom' ? 'Custom Date' : timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
                  <button 
                    onClick={() => {
                      setTimeFilter('all');
                      setDateRange([null, null]);
                    }}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                  >
                    <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {typeFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <svg className="h-3 w-3 mr-1 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  {typeFilter}
                  <button 
                    onClick={() => setTypeFilter('all')}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none"
                  >
                    <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {statusFilter !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  <svg className="h-3 w-3 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {statusFilter}
                  <button 
                    onClick={() => setStatusFilter('all')}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none"
                  >
                    <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}
              
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  <svg className="h-3 w-3 mr-1 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Search: "{searchTerm}"
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600 focus:outline-none"
                  >
                    <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              )}

            </div>
            
            <button 
              onClick={() => {
                setTimeFilter('all');
                setTypeFilter('all');
                setStatusFilter('all');
                setSearchTerm('');
                setDateRange([null, null]);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
              disabled={timeFilter === 'all' && typeFilter === 'all' && statusFilter === 'all' && !searchTerm}
            >
              <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset All Filters
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
              <h3 className="font-bold text-lg text-gray-800">Transaction Records</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                {transactions.length} transactions
              </span>
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <img src={tx.user.avatar} alt={tx.user.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border border-white"></div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{tx.user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-bold ${tx.type === 'Withdrawal' || tx.type === 'Manual Debit' ? 'text-red-600' : tx.type === 'Deposit' || tx.type === 'Manual Credit' ? 'text-green-600' : 'text-gray-900'} flex items-center`}>
                          {(tx.type === 'Withdrawal' || tx.type === 'Manual Debit') && (
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          )}
                          {(tx.type === 'Deposit' || tx.type === 'Manual Credit' || tx.type === 'Reward') && (
                            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                          )}
                          {tx.type === 'Redemption' 
                            ? `${tx.amount.toLocaleString()} coins` 
                            : `$${tx.amount.toFixed(2)}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tx.date.split(' ')[0]}</div>
                        <div className="text-xs text-gray-500">{tx.date.split(' ')[1]}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(tx.type)}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                          {tx.status === 'Completed' && (
                            <svg className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {tx.status === 'Pending' && (
                            <svg className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {tx.status === 'Failed' && (
                            <svg className="h-3 w-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {tx.reason && <div className="text-xs text-gray-500 mb-1"><span className="font-medium">Reason:</span> {tx.reason}</div>}
                          {tx.item && <div className="text-xs text-gray-500 mb-1"><span className="font-medium">Item:</span> {tx.item}</div>}
                          {tx.note && <div className="text-xs text-gray-500 mb-1"><span className="font-medium">Note:</span> {tx.note}</div>}
                          {tx.admin && <div className="text-xs text-gray-500"><span className="font-medium">By:</span> {tx.admin}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition-colors duration-150 flex items-center float-right">
                          <span>View Details</span>
                          <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <svg className="h-12 w-12 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions found</h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any transactions matching your current filters. Try adjusting your search criteria or clearing some filters.  
              </p>
              <button 
                onClick={() => {
                  setTimeFilter('all');
                  setTypeFilter('all');
                  setStatusFilter('all');
                  setSearchTerm('');
                  setDateRange([null, null]);
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset All Filters
              </button>
            </div>
          )}
          
          {transactions.length > 0 && (
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(10, transactions.length)}</span> of{' '}
                    <span className="font-medium">{transactions.length}</span> results
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
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      8
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      9
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      10
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Coin;