import React from 'react';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  Failed: 'bg-red-100 text-red-800',
};

const transactions = [
  {
    id: 1,
    date: '2024-06-01 14:23',
    type: 'Credit',
    amount: 50.0,
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-06-02 09:10',
    type: 'Withdrawal',
    amount: 25.0,
    status: 'Pending',
  },
  {
    id: 3,
    date: '2024-06-03 18:45',
    type: 'Debit',
    amount: 10.0,
    status: 'Completed',
  },
  {
    id: 4,
    date: '2024-06-04 11:30',
    type: 'Credit',
    amount: 100.0,
    status: 'Failed',
  },
  {
    id: 5,
    date: '2024-06-05 16:20',
    type: 'Withdrawal',
    amount: 75.0,
    status: 'Completed',
  },
];

const UserTransactions = () => {
  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 overflow-x-auto">
        <div className="font-bold text-xl mb-6 text-black">Transaction History</div>
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-black border-b">
              <th className="py-3 px-4 text-black font-semibold">Date</th>
              <th className="py-3 px-4 text-black font-semibold">Type</th>
              <th className="py-3 px-4 text-black font-semibold">Amount</th>
              <th className="py-3 px-4 text-black font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 px-4 text-black">{tx.date}</td>
                <td className="py-3 px-4 text-black font-medium">{tx.type}</td>
                <td className="py-3 px-4 text-black">${tx.amount.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[tx.status] || 'bg-gray-200 text-gray-700'}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransactions;