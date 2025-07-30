import React, { useState } from 'react';
import { HiOutlineDownload, HiOutlineChartBar, HiOutlineUsers, HiOutlineCurrencyDollar, HiOutlineRefresh } from 'react-icons/hi';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsReports = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('coins');
  
  // State for time range
  const [timeRange, setTimeRange] = useState('month');
  
  // State for report type
  const [reportType, setReportType] = useState('summary');
  
  // Dummy data for coin movement
  const coinMovementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Coins Issued',
        data: [1200000, 1500000, 1800000, 2000000, 2200000, 2500000, 2800000, 3000000, 3200000, 3500000, 3800000, 4000000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Coins Redeemed',
        data: [800000, 1000000, 1200000, 1300000, 1500000, 1700000, 1900000, 2100000, 2300000, 2500000, 2700000, 2900000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Net Circulation',
        data: [400000, 500000, 600000, 700000, 700000, 800000, 900000, 900000, 900000, 1000000, 1100000, 1100000],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };
  
  // Dummy data for user engagement
  const userEngagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Daily Active Users',
        data: [15000, 18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Coin Transactions',
        data: [45000, 52000, 60000, 68000, 75000, 82000, 90000, 98000, 105000, 112000, 120000, 128000],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
      },
    ],
  };
  
  // Dummy data for growth trends
  const growthTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Retention Rate (%)',
        data: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };
  
  // Dummy data for user behavior distribution
  const userBehaviorData = {
    labels: ['Content Creation', 'Content Consumption', 'Coin Purchases', 'Redemptions', 'Social Interactions'],
    datasets: [
      {
        label: 'User Behavior Distribution',
        data: [25, 40, 15, 10, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(251, 191, 36, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(251, 191, 36)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Chart options
  const lineOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Trends',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
  };
  
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Coin Flow',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Behavior Distribution',
      },
    },
  };
  
  // Summary statistics
  const coinStats = [
    { title: 'Total Coins in Circulation', value: '59,200,000', change: '+15%', color: 'text-blue-600' },
    { title: 'Coins Issued (Last 30 Days)', value: '4,000,000', change: '+8%', color: 'text-green-600' },
    { title: 'Coins Redeemed (Last 30 Days)', value: '2,900,000', change: '+12%', color: 'text-red-600' },
    { title: 'Average Daily Transactions', value: '125,430', change: '+5%', color: 'text-purple-600' },
  ];
  
  const userStats = [
    { title: 'Total Registered Users', value: '1,250,000', change: '+18%', color: 'text-blue-600' },
    { title: 'Daily Active Users', value: '52,000', change: '+8%', color: 'text-green-600' },
    { title: 'Monthly Active Users', value: '350,000', change: '+12%', color: 'text-purple-600' },
    { title: 'User Retention Rate', value: '86%', change: '+1%', color: 'text-yellow-600' },
  ];
  
  const growthStats = [
    { title: 'New Users (Last 30 Days)', value: '10,500', change: '+5%', color: 'text-blue-600' },
    { title: 'User Growth Rate', value: '4.8%', change: '+0.2%', color: 'text-green-600' },
    { title: 'Transaction Growth', value: '7.2%', change: '+0.5%', color: 'text-purple-600' },
    { title: 'Revenue Growth', value: '12.5%', change: '+1.8%', color: 'text-yellow-600' },
  ];
  
  // Helper function to get stats based on active tab
  const getActiveStats = () => {
    switch (activeTab) {
      case 'coins':
        return coinStats;
      case 'users':
        return userStats;
      case 'growth':
        return growthStats;
      default:
        return coinStats;
    }
  };
  
  // Helper function to get chart based on active tab and report type
  const getActiveChart = () => {
    if (activeTab === 'coins') {
      if (reportType === 'summary') {
        return <Line options={lineOptions} data={coinMovementData} />;
      } else {
        return <Bar options={barOptions} data={coinMovementData} />;
      }
    } else if (activeTab === 'users') {
      if (reportType === 'summary') {
        return <Line options={lineOptions} data={userEngagementData} />;
      } else {
        return <Pie options={pieOptions} data={userBehaviorData} />;
      }
    } else if (activeTab === 'growth') {
      return <Line options={lineOptions} data={growthTrendsData} />;
    }
    
    return <Line options={lineOptions} data={coinMovementData} />;
  };
  
  // Handle export to CSV
  const handleExportCSV = () => {
    // This would be implemented with actual data in a real application
    console.log('Exporting to CSV...');
    alert('Export functionality would be implemented with backend integration');
  };
  
  // Handle export to Excel
  const handleExportExcel = () => {
    // This would be implemented with actual data in a real application
    console.log('Exporting to Excel...');
    alert('Export functionality would be implemented with backend integration');
  };

  return (
    <div className="w-full">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {getActiveStats().map((stat, index) => (
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
            onClick={() => setActiveTab('coins')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'coins' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <HiOutlineCurrencyDollar className="mr-2 h-5 w-5" />
            Coin Movement
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <HiOutlineUsers className="mr-2 h-5 w-5" />
            User Engagement
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`flex items-center px-4 py-3 text-sm font-medium ${activeTab === 'growth' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <HiOutlineChartBar className="mr-2 h-5 w-5" />
            Growth Trends
          </button>
        </div>
        
        {/* Filters and Controls */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex flex-wrap items-center gap-4">
            {/* Time Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="quarter">Last 90 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>
            
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="summary">Summary View</option>
                <option value="detailed">Detailed View</option>
              </select>
            </div>
            
            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setTimeRange('month');
                  setReportType('summary');
                }}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiOutlineRefresh className="-ml-0.5 mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
            
            {/* Export Options */}
            <div className="flex items-end ml-auto space-x-2">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiOutlineDownload className="-ml-0.5 mr-2 h-4 w-4" />
                Export CSV
              </button>
              <button
                onClick={handleExportExcel}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiOutlineDownload className="-ml-0.5 mr-2 h-4 w-4" />
                Export Excel
              </button>
            </div>
          </div>
        </div>
        
        {/* Chart Display */}
        <div className="p-6">
          {getActiveChart()}
        </div>
      </div>
      
      {/* Data Tables Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="font-bold text-lg text-gray-800">
            {activeTab === 'coins' ? 'Coin Movement Details' : 
             activeTab === 'users' ? 'User Engagement Metrics' : 'Growth Metrics'}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            {timeRange === 'week' ? 'Last 7 Days' : 
             timeRange === 'month' ? 'Last 30 Days' : 
             timeRange === 'quarter' ? 'Last 90 Days' : 'Last 12 Months'}
          </span>
        </div>
        
        {/* Table content would depend on the active tab */}
        <div className="overflow-x-auto">
          {activeTab === 'coins' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins Issued</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coins Redeemed</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Change</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Circulation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data rows */}
                {['Dec', 'Nov', 'Oct', 'Sep', 'Aug'].map((month, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month} 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(4000000 - index * 300000).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(2900000 - index * 200000).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(1100000 - index * 100000).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(59200000 - index * 1100000).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'users' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Active Users</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin Transactions</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Session Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data rows */}
                {['Dec', 'Nov', 'Oct', 'Sep', 'Aug'].map((month, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month} 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(52000 - index * 3000).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(128000 - index * 8000).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(12 - index * 0.5).toFixed(1)} min</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(68 - index * 2).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'growth' && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">New Users</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention Rate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Growth</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue Growth</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample data rows */}
                {['Dec', 'Nov', 'Oct', 'Sep', 'Aug'].map((month, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{month} 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(10500 - index * 500).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(86 - index * 1).toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(7.2 - index * 0.3).toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(12.5 - index * 0.5).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                <span className="font-medium">12</span> results
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
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
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
    </div>
  );
};

export default AnalyticsReports;