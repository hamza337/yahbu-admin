import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Active: 'bg-green-100 text-green-800',
  Blocked: 'bg-gray-200 text-gray-700',
  Inactive: 'bg-gray-200 text-gray-700',
};

const users = [
  { name: 'John Doe', email: 'woop@yahbu.com', role: 'Admin', status: 'Pending', joined: '2024-08-15' },
  { name: 'Jane Smith', email: 'cmh@yahbu.com', role: 'Admin', status: 'Active', joined: '2024-08-20' },
  { name: 'Acme Corp', email: 'xyz@yahbu.com', role: 'Admin', status: 'Blocked', joined: '2024-08-21' },
  { name: 'Global Inc', email: 'abc@yahbu.com', role: 'Admin', status: 'Active', joined: '2024-08-25' },
];

const User = () => {
  const [dropdownIdx, setDropdownIdx] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIdx(null);
      }
    }
    if (dropdownIdx !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownIdx]);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for user..."
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50"><p className="text-sm font-normal leading-none text-slate-500">Name</p></th>
              <th className="p-4 border-b border-slate-200 bg-slate-50"><p className="text-sm font-normal leading-none text-slate-500">Email</p></th>
              <th className="p-4 border-b border-slate-200 bg-slate-50"><p className="text-sm font-normal leading-none text-slate-500">Role</p></th>
              <th className="p-4 border-b border-slate-200 bg-slate-50"><p className="text-sm font-normal leading-none text-slate-500">Status</p></th>
              <th className="p-4 border-b border-slate-200 bg-slate-50"><p className="text-sm font-normal leading-none text-slate-500">Joined</p></th>
              <th className="p-4 border-b border-slate-200 bg-slate-50"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-slate-50 border-b border-slate-200">
                <td className="p-4 py-5"><p className="text-sm text-slate-500">{user.name}</p></td>
                <td className="p-4 py-5"><p className="text-sm text-slate-500">{user.email}</p></td>
                <td className="p-4 py-5"><p className="text-sm text-slate-500">{user.role}</p></td>
                <td className="p-4 py-5">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[user.status] || 'bg-gray-200 text-gray-700'}`}>{user.status}</span>
                </td>
                <td className="p-4 py-5"><p className="text-sm text-slate-500">{user.joined}</p></td>
                <td className="p-4 py-5 text-right relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                    onClick={() => setDropdownIdx(idx === dropdownIdx ? null : idx)}
                    aria-label="Actions"
                  >
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="5" cy="12" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="19" cy="12" r="2" />
                    </svg>
                  </button>
                  {dropdownIdx === idx && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                      <button onClick={() => navigate(`/user/profile`)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Profile</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold">Block This User</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default User;