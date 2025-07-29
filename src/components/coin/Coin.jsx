import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const transactions = [
  {
    id: 1,
    user: { name: 'Alice Smith', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    amount: 120.5,
    date: '2024-06-01 14:23',
    type: 'Withdrawal',
  },
  {
    id: 2,
    user: { name: 'Bob Johnson', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    amount: 75.0,
    date: '2024-06-02 09:10',
    type: 'Withdrawal',
  },
  {
    id: 3,
    user: { name: 'Charlie Lee', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
    amount: 200.0,
    date: '2024-06-03 18:45',
    type: 'Withdrawal',
  },
  {
    id: 4,
    user: { name: 'Diana King', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    amount: 50.25,
    date: '2024-06-04 11:30',
    type: 'Withdrawal',
  },
];

const Coin = () => {
  const [filter, setFilter] = useState('monthly');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div >
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

        {/* Transactions Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 overflow-x-auto">
          <div className="font-bold text-xl mb-4 text-black">Withdrawal Transactions</div>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-black border-b">
                <th className="py-2 px-3 text-black">User</th>
                <th className="py-2 px-3 text-black">Amount</th>
                <th className="py-2 px-3 text-black">Date/Time</th>
                <th className="py-2 px-3 text-black">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 px-3 flex items-center gap-3">
                    <img src={tx.user.avatar} alt={tx.user.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="font-medium text-black">{tx.user.name}</span>
                  </td>
                  <td className="py-2 px-3 text-black">${tx.amount.toFixed(2)}</td>
                  <td className="py-2 px-3 text-black">{tx.date}</td>
                  <td className="py-2 px-3 text-black">{tx.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coin;