import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Card component for coin statistics
const CoinStatCard = ({ title, value, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
    <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

// User wallet card component
const UserWalletCard = ({ user, onAddCoins, onRemoveCoins }) => (
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
      <button 
        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        onClick={onAddCoins}
      >
        ADD COINS
      </button>
      <button 
        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        onClick={onRemoveCoins}
      >
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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'remove'
  const [coinAmount, setCoinAmount] = useState('');
  const [coinType, setCoinType] = useState('paid'); // 'paid' or 'free'
  const [modalUser, setModalUser] = useState(null);
  const navigate = useNavigate();
  
  // Function to navigate to configurations tab with specific section active
  const navigateToConfigurations = (section) => {
    // Store the active section in sessionStorage to be retrieved by CoinConfigurations
    sessionStorage.setItem('activeConfigSection', section);
    // Navigate to the configurations tab
    navigate('/coin-management', { state: { activeTab: 'configurations' } });
  };
  
  // Function to open the add coins modal
  const handleAddCoins = (user) => {
    setModalType('add');
    setModalUser(user);
    setCoinAmount('');
    setCoinType('paid');
    setShowModal(true);
  };
  
  // Function to open the remove coins modal
  const handleRemoveCoins = (user) => {
    setModalType('remove');
    setModalUser(user);
    setCoinAmount('');
    setCoinType('paid');
    setShowModal(true);
  };
  
  // Function to handle the coin transaction
  const handleCoinTransaction = () => {
    // Here you would implement the actual API call to update the user's coins
    console.log(`${modalType === 'add' ? 'Adding' : 'Removing'} ${coinAmount} ${coinType} coins ${modalType === 'add' ? 'to' : 'from'} ${modalUser.name}`);
    
    // Close the modal after transaction
    setShowModal(false);
    
    // In a real implementation, you would update the user's coin balance here
  };

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
            <UserWalletCard 
              user={userData} 
              onAddCoins={() => handleAddCoins(userData)}
              onRemoveCoins={() => handleRemoveCoins(userData)}
            />
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
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigateToConfigurations('redemption')}
              >
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
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigateToConfigurations('issuance')}
              >
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
      
      {/* Coin Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-black">
              {modalType === 'add' ? 'Add Coins' : 'Remove Coins'} - {modalUser.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coin Type</label>
                <div className="flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="coinType"
                      value="paid"
                      checked={coinType === 'paid'}
                      onChange={() => setCoinType('paid')}
                    />
                    <span className="ml-2 text-black">Paid Coins</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="coinType"
                      value="free"
                      checked={coinType === 'free'}
                      onChange={() => setCoinType('free')}
                    />
                    <span className="ml-2 text-black">Free Coins</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Enter amount"
                  min="1"
                  required
                />
              </div>
              
              {modalType === 'remove' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason (optional)</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter reason for removing coins"
                    rows="2"
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCoinTransaction}
                className={`px-4 py-2 rounded-md text-white ${modalType === 'add' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}
                disabled={!coinAmount || coinAmount <= 0}
              >
                {modalType === 'add' ? 'Add Coins' : 'Remove Coins'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;