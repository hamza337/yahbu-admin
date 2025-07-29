import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Card component
const StatCard = ({ icon, title, value, color }) => (
  <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm p-4 w-full min-w-[180px] h-24 overflow-hidden">
    <div className={`flex items-center justify-center h-12 w-12 rounded-full ${color} text-white text-xl mr-4`}>{icon}</div>
    <div>
      <div className="text-base font-semibold text-black mb-1">{title}</div>
      <div className="text-2xl font-bold text-black">{value}</div>
    </div>
  </div>
);

// Custom Tooltip for recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg shadow-lg bg-white px-4 py-3 border border-gray-200">
        <div className="text-base font-semibold text-black mb-1">{label}</div>
        <div className="text-sm text-black">Users: <span className="font-bold">{payload[0].value}</span></div>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  // Filter state
  const [filter, setFilter] = useState('monthly');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Dummy data
  const stats = [
    { title: 'Total Users', value: 1240, icon: '👥', color: 'bg-blue-500' },
    { title: 'Pending Requests', value: 32, icon: '⏳', color: 'bg-yellow-500' },
    { title: 'Blocked Users', value: 8, icon: '🚫', color: 'bg-red-500' },
  ];

  const recentUsers = [
    { name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2024-01-10' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Pending', joined: '2024-02-15' },
    { name: 'Charlie Lee', email: 'charlie@example.com', role: 'Moderator', status: 'Blocked', joined: '2024-03-22' },
    { name: 'Diana King', email: 'diana@example.com', role: 'User', status: 'Active', joined: '2024-04-05' },
    { name: 'Evan Wright', email: 'evan@example.com', role: 'User', status: 'Active', joined: '2024-05-01' },
  ];

  const chartData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 350 },
    { month: 'Mar', users: 180 },
    { month: 'Apr', users: 270 },
    { month: 'May', users: 160 },
    { month: 'Jun', users: 170 },
    { month: 'Jul', users: 260 },
    { month: 'Aug', users: 90 },
    { month: 'Sep', users: 200 },
    { month: 'Oct', users: 320 },
    { month: 'Nov', users: 230 },
    { month: 'Dec', users: 630 },
  ];

  // Only show last 6 months for the chart
  const last6Months = chartData.slice(-6);

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {['daily', 'weekly', 'monthly'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 text-black
              ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-blue-50'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-black">Custom:</span>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
              setFilter('custom');
            }}
            isClearable={true}
            className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholderText="Select range"
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map(card => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      {/* Table and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 overflow-x-auto h-full">
          <div className="font-bold text-xl mb-4 text-black">Recently Added Users</div>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-black border-b">
                <th className="py-2 px-3 text-black">Name</th>
                <th className="py-2 px-3 text-black">Email</th>
                <th className="py-2 px-3 text-black">Role</th>
                <th className="py-2 px-3 text-black">Status</th>
                <th className="py-2 px-3 text-black">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, idx) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 px-3 font-medium text-black">{user.name}</td>
                  <td className="py-2 px-3 text-black">{user.email}</td>
                  <td className="py-2 px-3 text-black">{user.role}</td>
                  <td className="py-2 px-3 text-black">{user.status}</td>
                  <td className="py-2 px-3 text-black">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex-1 min-w-[220px] max-w-lg w-full mx-auto lg:mx-0 overflow-hidden">
          <div className="font-bold text-xl mb-4 text-black">User Growth (Last 6 Months)</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={last6Months} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#000' }} />
              <YAxis tick={{ fontSize: 12, fill: '#000' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;