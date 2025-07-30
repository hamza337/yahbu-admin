import React, { useState } from 'react';
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

const CoinAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('circulation');

  // Sample data for charts
  const circulationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Coins in Circulation',
        data: [45000000, 46500000, 48000000, 49200000, 50500000, 51800000, 53000000, 54200000, 55500000, 56800000, 58000000, 59200000],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Paid Coins',
        data: [42000000, 43200000, 44500000, 45500000, 46800000, 48000000, 49200000, 50300000, 51500000, 52700000, 53800000, 55000000],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Free Coins',
        data: [3000000, 3300000, 3500000, 3700000, 3700000, 3800000, 3800000, 3900000, 4000000, 4100000, 4200000, 4200000],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const coinFlowData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Coins Issued',
        data: [1500000, 1800000, 1600000, 1900000, 2100000, 1800000, 2000000, 1900000, 2200000, 2100000, 1900000, 2000000],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Coins Redeemed',
        data: [800000, 900000, 950000, 1000000, 1100000, 1050000, 1200000, 1150000, 1300000, 1250000, 1200000, 1350000],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const userBehaviorData = {
    labels: ['Daily Login', 'Referrals', 'Profile Completion', 'First Purchase', 'Redemptions', 'Other'],
    datasets: [
      {
        label: 'User Behavior',
        data: [35, 20, 15, 10, 15, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for charts
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Coin Circulation Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
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
  const summaryStats = [
    { title: 'Total Coins in Circulation', value: '59,200,000', color: 'text-blue-600' },
    { title: 'Coins Issued (Last 30 Days)', value: '2,000,000', color: 'text-green-600' },
    { title: 'Coins Redeemed (Last 30 Days)', value: '1,350,000', color: 'text-red-600' },
    { title: 'Active Users with Coins', value: '125,430', color: 'text-purple-600' },
  ];

  // High-value redemption stats
  const redemptionStats = [
    { title: 'Pending High-Value Redemptions', value: '24', color: 'text-yellow-600' },
    { title: 'Approved Redemptions (Last 30 Days)', value: '156', color: 'text-green-600' },
    { title: 'Rejected Redemptions (Last 30 Days)', value: '12', color: 'text-red-600' },
    { title: 'Average Redemption Value', value: '15,750 coins', color: 'text-blue-600' },
  ];

  // Render the appropriate chart based on report type
  const renderChart = () => {
    switch (reportType) {
      case 'circulation':
        return <Line data={circulationData} options={lineOptions} />;
      case 'flow':
        return <Bar data={coinFlowData} options={barOptions} />;
      case 'behavior':
        return <Pie data={userBehaviorData} options={pieOptions} />;
      default:
        return <Line data={circulationData} options={lineOptions} />;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl p-6 mb-6 shadow-md">
          <div className="flex items-center gap-4 text-white">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Coin Analytics Dashboard</h1>
              <p className="text-sm text-white text-opacity-90 mt-1">Monitor coin circulation, flow, and user behavior</p>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {summaryStats.map((stat, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <div className="text-sm font-medium text-gray-600 mb-1">{stat.title}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Report Controls */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Report Controls</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last 90 Days</option>
                  <option value="year">Last 12 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                >
                  <option value="circulation">Coin Circulation</option>
                  <option value="flow">Coin Flow</option>
                  <option value="behavior">User Behavior</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export Report</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <div className="h-96">
            {renderChart()}
          </div>
        </div>

        {/* High-Value Redemption Monitoring */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">High-Value Redemption Monitoring</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {redemptionStats.map((stat, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <div className="text-sm font-medium text-gray-600 mb-1">{stat.title}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Pending High-Value Redemptions Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">Pending High-Value Redemptions</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                24 pending approvals
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
                  {[
                    { id: 1, user: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', item: 'Vacation Package', coins: 1000000, date: '2024-06-10', status: 'Pending' },
                    { id: 2, user: 'Emma Johnson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', item: 'Gaming Console', coins: 250000, date: '2024-06-09', status: 'Pending' },
                    { id: 3, user: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', item: 'Premium Headphones', coins: 150000, date: '2024-06-08', status: 'Pending' },
                    { id: 4, user: 'Olivia Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', item: 'Smartphone', coins: 500000, date: '2024-06-07', status: 'Pending' },
                    { id: 5, user: 'William Wilson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', item: 'Laptop', coins: 750000, date: '2024-06-06', status: 'Pending' },
                  ].map(redemption => (
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
                          <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition">
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security & Limits Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Security & Limits</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Limits</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Daily Free Coins Limit</span>
                    <span className="font-medium text-black">500 coins</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Weekly Redemption Limit</span>
                    <span className="font-medium text-black">100,000 coins</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">Monthly Referral Rewards Cap</span>
                    <span className="font-medium text-black">5,000 coins</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-700">High-Value Redemption Threshold</span>
                    <span className="font-medium text-black">100,000 coins</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Adjust Limits</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Free Coins Limit</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                      defaultValue={500}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Redemption Limit</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                      defaultValue={100000}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Referral Rewards Cap</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                      defaultValue={5000}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">High-Value Redemption Threshold</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                      defaultValue={100000}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Update Limits
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinAnalytics;