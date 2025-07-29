import React, { useState } from 'react';

const UserData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    age: 28,
    dob: '1996-05-15',
    cnic: '35202-1234567-8',
    email: 'john.doe@example.com',
    phone: '+92 300 1234567',
    address: '123 Main Street, Islamabad, Pakistan',
    joinDate: '2023-01-15',
    lastLogin: '2024-06-05 14:30',
    status: 'Active',
    kycStatus: 'Verified',
    password: '••••••••••••••••',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-xl text-black">User Information</div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-4">
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">First Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.firstName}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Last Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.lastName}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Age</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({...userData, age: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.age}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                {isEditing ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) => setUserData({...userData, dob: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.dob}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">CNIC Number</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.cnic}
                    onChange={(e) => setUserData({...userData, cnic: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.cnic}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Email</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.email}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Phone</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.phone}</div>
                )}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">Password</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="px-3 py-2 text-black font-medium">{userData.password}</div>
                )}
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">Address</span>
              {isEditing ? (
                <textarea
                  value={userData.address}
                  onChange={(e) => setUserData({...userData, address: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              ) : (
                <div className="px-3 py-2 text-black font-medium">{userData.address}</div>
              )}
            </label>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-lg text-black mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Join Date</span>
              <div className="text-black font-medium">{userData.joinDate}</div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Last Login</span>
              <div className="text-black font-medium">{userData.lastLogin}</div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Status</span>
              <div className="text-green-600 font-medium">{userData.status}</div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">KYC Status</span>
              <div className="text-green-600 font-medium">{userData.kycStatus}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;