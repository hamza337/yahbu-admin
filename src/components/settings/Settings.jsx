import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Settings = () => {
  const [freeCoinsLimit, setFreeCoinsLimit] = useState(100);
  const [expiryDate, setExpiryDate] = useState(null);
  const [coinValue, setCoinValue] = useState(0.1);
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-2 sm:px-8">
      <div>
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#7C1315' }}>Platform Settings</h1>
        <form onSubmit={handleSave} className="flex flex-col gap-8">
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

export default Settings;