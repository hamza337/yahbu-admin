import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CoinConfigurations = () => {
  // Basic coin settings
  const [freeCoinsLimit, setFreeCoinsLimit] = useState(100);
  const [expiryDate, setExpiryDate] = useState(null);
  const [coinValue, setCoinValue] = useState(0.1);
  
  // Coin issuance rules
  const [dailyBonusAmount, setDailyBonusAmount] = useState(50);
  const [referralReward, setReferralReward] = useState(100);
  const [inAppActionRewards, setInAppActionRewards] = useState([
    { id: 1, action: 'Profile Completion', amount: 200 },
    { id: 2, action: 'First Purchase', amount: 500 },
    { id: 3, action: 'Daily Login', amount: 50 }
  ]);
  const [newActionName, setNewActionName] = useState('');
  const [newActionAmount, setNewActionAmount] = useState(0);
  
  // Redemption values
  const [redemptionValues, setRedemptionValues] = useState([
    { id: 1, name: 'Badge', coinsRequired: 10000 },
    { id: 2, name: 'Gift Card', coinsRequired: 50000 },
    { id: 3, name: 'Hoodie', coinsRequired: 100000 },
    { id: 4, name: 'Vacation', coinsRequired: 1000000 }
  ]);
  const [newRewardName, setNewRewardName] = useState('');
  const [newRewardCoins, setNewRewardCoins] = useState(0);
  
  // UI state
  const [activeSection, setActiveSection] = useState('basic');
  const [success, setSuccess] = useState(false);
  
  // Check for active section in sessionStorage when component mounts
  React.useEffect(() => {
    const savedSection = sessionStorage.getItem('activeConfigSection');
    if (savedSection) {
      setActiveSection(savedSection);
      // Clear the stored section after using it
      sessionStorage.removeItem('activeConfigSection');
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };
  
  const addInAppAction = () => {
    if (newActionName && newActionAmount > 0) {
      setInAppActionRewards([
        ...inAppActionRewards,
        {
          id: inAppActionRewards.length + 1,
          action: newActionName,
          amount: newActionAmount
        }
      ]);
      setNewActionName('');
      setNewActionAmount(0);
    }
  };
  
  const removeInAppAction = (id) => {
    setInAppActionRewards(inAppActionRewards.filter(action => action.id !== id));
  };
  
  const addRedemptionValue = () => {
    if (newRewardName && newRewardCoins > 0) {
      setRedemptionValues([
        ...redemptionValues,
        {
          id: redemptionValues.length + 1,
          name: newRewardName,
          coinsRequired: newRewardCoins
        }
      ]);
      setNewRewardName('');
      setNewRewardCoins(0);
    }
  };
  
  const removeRedemptionValue = (id) => {
    setRedemptionValues(redemptionValues.filter(reward => reward.id !== id));
  };

  return (
    <div className="w-full bg-gray-50 py-10 px-2 sm:px-8">
      <div>
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#7C1315' }}>Coin Settings</h1>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-2 px-4 font-medium ${activeSection === 'basic' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('basic')}
          >
            Basic Settings
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeSection === 'issuance' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('issuance')}
          >
            Issuance Rules
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeSection === 'redemption' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveSection('redemption')}
          >
            Redemption Values
          </button>
        </div>
        
        <form onSubmit={handleSave} className="flex flex-col gap-8">
          {/* Basic Settings Section */}
          {activeSection === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="flex flex-col gap-2">
                <span className="font-medium text-black">Free Coins Limit</span>
                <input
                  type="number"
                  min={0}
                  value={freeCoinsLimit}
                  onChange={e => setFreeCoinsLimit(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-medium text-black">Free Coins Expiry Date</span>
                <DatePicker
                  selected={expiryDate}
                  onChange={setExpiryDate}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  placeholderText="Select expiry date"
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-medium text-black">Free Coin Value (USDT)</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={coinValue}
                  onChange={e => setCoinValue(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  required
                />
              </label>
            </div>
          )}
          
          {/* Issuance Rules Section */}
          {activeSection === 'issuance' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="flex flex-col gap-2">
                  <span className="font-medium text-black">Daily Bonus Amount</span>
                  <input
                    type="number"
                    min={0}
                    value={dailyBonusAmount}
                    onChange={e => setDailyBonusAmount(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="font-medium text-black">Referral Reward</span>
                  <input
                    type="number"
                    min={0}
                    value={referralReward}
                    onChange={e => setReferralReward(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  />
                </label>
              </div>
              
              {/* In-App Action Rewards */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-black">In-App Action Rewards</h3>
                
                <div className="mb-6">
                  {inAppActionRewards.map(action => (
                    <div key={action.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-black">{action.action}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-black font-medium">{action.amount} coins</span>
                        <button 
                          type="button"
                          onClick={() => removeInAppAction(action.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Action name"
                    value={newActionName}
                    onChange={e => setNewActionName(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Coins"
                    min={0}
                    value={newActionAmount}
                    onChange={e => setNewActionAmount(Number(e.target.value))}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  />
                  <button
                    type="button"
                    onClick={addInAppAction}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Redemption Values Section */}
          {activeSection === 'redemption' && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-black">Redemption Values</h3>
              
              <div className="mb-6">
                {redemptionValues.map(reward => (
                  <div key={reward.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-black">{reward.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-black font-medium">{reward.coinsRequired.toLocaleString()} coins</span>
                      <button 
                        type="button"
                        onClick={() => removeRedemptionValue(reward.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Reward name"
                  value={newRewardName}
                  onChange={e => setNewRewardName(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
                <input
                  type="number"
                  placeholder="Coins required"
                  min={0}
                  value={newRewardCoins}
                  onChange={e => setNewRewardCoins(Number(e.target.value))}
                  className="w-36 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
                <button
                  type="button"
                  onClick={addRedemptionValue}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              className="mt-4 px-8 py-3 rounded-lg font-semibold text-lg shadow hover:opacity-90 transition"
              style={{ backgroundColor: '#7C1315', color: '#fff' }}
            >
              Save Settings
            </button>
            {success && (
              <div className="text-green-600 font-medium mt-4">Settings saved successfully!</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoinConfigurations;