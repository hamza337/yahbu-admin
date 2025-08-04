import React, { useState } from 'react';
import { HiEye, HiNoSymbol } from 'react-icons/hi2';
import UserModal from './UserModal';
import BlockUserModal from './BlockUserModal';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'User',
    status: 'Active',
    joinedDate: '2023-01-15',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '+92 300 1234567',
    address: '123 Main Street, Islamabad, Pakistan',
    age: 28,
    dob: '1996-05-15',
    cnic: '35202-1234567-8',
    lastLogin: '2024-06-05 14:30',
    kycStatus: 'Verified'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Admin',
    status: 'Active',
    joinedDate: '2023-02-20',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    phone: '+92 301 2345678',
    address: '456 Oak Avenue, Karachi, Pakistan',
    age: 32,
    dob: '1992-08-10',
    cnic: '42101-9876543-2',
    lastLogin: '2024-06-06 09:15',
    kycStatus: 'Verified'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    joinedDate: '2023-03-10',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    phone: '+92 302 3456789',
    address: '789 Pine Road, Lahore, Pakistan',
    age: 25,
    dob: '1999-03-22',
    cnic: '35202-5555555-5',
    lastLogin: '2024-05-28 16:45',
    kycStatus: 'Pending'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Moderator',
    status: 'Active',
    joinedDate: '2023-04-05',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    phone: '+92 303 4567890',
    address: '321 Elm Street, Faisalabad, Pakistan',
    age: 29,
    dob: '1995-11-18',
    cnic: '38101-7777777-7',
    lastLogin: '2024-06-06 11:20',
    kycStatus: 'Verified'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'User',
    status: 'Blocked',
    joinedDate: '2023-05-12',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    phone: '+92 304 5678901',
    address: '654 Maple Drive, Rawalpindi, Pakistan',
    age: 35,
    dob: '1989-07-03',
    cnic: '37405-3333333-3',
    lastLogin: '2024-05-15 13:30',
    kycStatus: 'Rejected'
  }
];

const User = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Moderator':
        return 'bg-blue-100 text-blue-800';
      case 'User':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleBlockUser = (user) => {
    setUserToBlock(user);
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlock = async (userId, reason) => {
    // Handle block user functionality
    console.log('Block user:', userId, 'Reason:', reason);
    // Here you would typically make an API call to block the user
    // For now, we'll just log it
    alert(`User blocked successfully!\nReason: ${reason}`);
  };

  const handleCloseBlockModal = () => {
    setIsBlockModalOpen(false);
    setUserToBlock(null);
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">User List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-black">User</th>
                <th className="py-3 px-4 font-semibold text-black">Email</th>
                <th className="py-3 px-4 font-semibold text-black">Role</th>
                <th className="py-3 px-4 font-semibold text-black">Status</th>
                <th className="py-3 px-4 font-semibold text-black">Joined</th>
                <th className="py-3 px-4 font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="font-medium text-black">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.joinedDate}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {/* View Eye Button */}
                      <button
                        onClick={() => handleViewUser(user)}
                        className="p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors group"
                        title="View User Details"
                      >
                        <HiEye className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
                      </button>
                      
                      {/* Block/Action Button */}
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="p-2 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors group"
                        title="Block User"
                      >
                        <HiNoSymbol className="w-5 h-5 text-red-600 group-hover:text-red-700 transition-colors" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Block User Modal */}
      {isBlockModalOpen && userToBlock && (
        <BlockUserModal
          user={userToBlock}
          isOpen={isBlockModalOpen}
          onClose={handleCloseBlockModal}
          onConfirm={handleConfirmBlock}
        />
      )}
    </div>
  );
};

export default User;