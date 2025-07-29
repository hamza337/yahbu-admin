import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Card component for wallet stats
const WalletCard = ({ title, value, icon, color }) => (
  <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full min-w-[200px] h-24 overflow-hidden">
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
        <div className="text-sm text-black">Coins: <span className="font-bold">{payload[0].value}</span></div>
      </div>
    );
  }
  return null;
};

const UserWallet = () => {
  // Dummy data for wallet stats
  const walletStats = [
    { title: 'Total Coins', value: 1250, icon: '🪙', color: 'bg-blue-500' },
    { title: 'Real Coins', value: 800, icon: '💰', color: 'bg-green-500' },
    { title: 'Bonus Coins', value: 450, icon: '🎁', color: 'bg-yellow-500' },
  ];

  // Dummy data for chart (last 6 months)
  const chartData = [
    { month: 'Jan', coins: 800 },
    { month: 'Feb', coins: 950 },
    { month: 'Mar', coins: 1100 },
    { month: 'Apr', coins: 1050 },
    { month: 'May', coins: 1200 },
    { month: 'Jun', coins: 1250 },
  ];

  return (
    <div className="w-full">
      {/* Wallet Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {walletStats.map(card => (
          <WalletCard key={card.title} {...card} />
        ))}
      </div>

      {/* Coin History Chart */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="font-bold text-xl mb-6 text-black">Coin History (Last 6 Months)</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 14, fill: '#000' }} />
            <YAxis tick={{ fontSize: 14, fill: '#000' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="coins" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserWallet;