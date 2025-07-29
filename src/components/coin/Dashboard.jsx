import React, { useState } from 'react';

// Card component for coin statistics
const CoinStatCard = ({ title, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
    <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

// User wallet card component
const UserWalletCard = ({ user }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 mb-4">
    <div className="flex justify-between items-center mb-3">
      <div className="font-semibold text-black">{user.name}</div>
      <div className="text-blue-600 font-bold">{user.balance} COO</div>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Paid coins Issued:</span>
        <span className="text-black font-medium">{user.paidIssued}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Paid Coins:</span>
        <span className="text-black font-medium">{user.paidCoins}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Free coins:</span>
        <span className="text-black font-medium">{user.freeCoins}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Free coins:</span>
        <span className="text-black font-medium">{user.totalFreeCoins}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Free coins:</span>
        <span className="text-black font-medium">{user.remainingFreeCoins}</span>
      </div>
    </div>
    <div className="flex gap-2 mt-4">
      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
        ADD COINS
      </button>
      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition">
        REMOVE COINS
      </button>
    </div>
  </div>
);

// Activity log entry component
const ActivityLogEntry = ({ date, user, details, coins }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex-1">
      <div className="text-sm text-gray-600">{date}</div>
      <div className="font-medium text-black">{user}</div>
    </div>
    <div className="flex-1 text-center">
      <div className="text-sm text-black">{details}</div>
    </div>
    <div className="flex-1 text-right">
      <div className="text-sm text-black">{coins}</div>
    </div>
  </div>
);

// Reward tier component
const RewardTier = ({ coins, reward }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-black font-medium">{coins.toLocaleString()} coins:</span>
    <span className="text-black">{reward}</span>
  </div>
);

// Coin rule component
const CoinRule = ({ rule }) => (
  <div className="py-2 text-black">
    {rule}
  </div>
);

const Dashboard = () => {
  const [searchUser, setSearchUser] = useState('');

  // Dummy data for coin statistics
  const coinStats = [
    { title: 'Paid Coins Issued', value: '45,830,000', color: 'text-blue-600' },
    { title: 'Paid Coins Purchased', value: '45,500,000', color: 'text-green-600' },
    { title: 'Free Coins Given', value: '5,040,000', color: 'text-yellow-600' },
    { title: 'Coins Spent', value: '16,290,000', color: 'text-red-600' },
  ];

  // Dummy user data
  const userData = {
    name: 'User Commcom',
    balance: '500',
    paidIssued: '2,500',
    paidCoins: '1,200',
    freeCoins: '350',
    totalFreeCoins: '12,800',
    remainingFreeCoins: '330',
  };

  // Dummy activity logs
  const activityLogs = [
    { date: 'Apr 22, 2024', user: 'Brian Wells', details: 'purchased puidic', coins: '5,000 paid coins' },
    { date: 'Apr 21, 2024', user: 'Lena Peterson', details: 'Spent a Power Up', coins: '300 coins for reterfai' },
    { date: 'Apr 21, 2024', user: 'Lena Peterson', details: 'Received 2500 coins', coins: '2,500 free coins' },
    { date: 'Apr 20, 2024', user: 'Emma Knight', details: 'Awarded 10,000 free', coins: '10,000 free coins' },
  ];

  // Dummy reward tiers
  const rewardTiers = [
    { coins: 10000, reward: 'Badge' },
    { coins: 50000, reward: 'Gift Card' },
    { coins: 100000, reward: 'Hoodie' },
    { coins: 1000000, reward: 'Vacation' },
  ];

  // Dummy coin rules
  const coinRules = [
    'Free coins expire after 30 days',
    'Maximum daily Issuance 500 free coins',
    'Referral reward 100 free coins',
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* COIN DASHBOARD */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coinStats.map((stat, index) => (
              <CoinStatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* USER COIN WALLET MANAGEMENT */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-black">USER COIN WALLET MANAGEMENT</h2>
            
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            {/* User Profile Card */}
            <UserWalletCard user={userData} />
          </div>

          {/* COIN ACTIVITY LOGS */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 text-black">COIN ACTIVITY LOGS</h2>
            
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm font-semibold text-gray-600 border-b border-gray-200 pb-2">
              <div>DATE</div>
              <div className="text-center">USER</div>
              <div className="text-right">DETAILS</div>
            </div>

            {/* Activity Logs */}
            <div className="space-y-2">
              {activityLogs.map((log, index) => (
                <ActivityLogEntry key={index} {...log} />
              ))}
            </div>

            {/* View All Button */}
            <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              VIEW ALL
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COIN REWARD TIERS */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">COIN REWARD TIERS</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                EDIT
              </button>
            </div>
            
            <div className="space-y-2">
              {rewardTiers.map((tier, index) => (
                <RewardTier key={index} {...tier} />
              ))}
            </div>
          </div>

          {/* COIN ISSUANCE RULES */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">COIN ISSUANCE RULES</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                EDIT
              </button>
            </div>
            
            <div className="space-y-2">
              {coinRules.map((rule, index) => (
                <CoinRule key={index} rule={rule} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;