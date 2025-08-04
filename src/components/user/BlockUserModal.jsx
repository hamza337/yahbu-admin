import React, { useState } from 'react';
import { HiNoSymbol, HiXMark, HiExclamationTriangle } from 'react-icons/hi2';

const BlockUserModal = ({ user, isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!reason.trim()) return;
    
    setIsLoading(true);
    try {
      await onConfirm(user.id, reason);
      setReason('');
      onClose();
    } catch (error) {
      console.error('Error blocking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200/50 bg-red-50/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <HiNoSymbol className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-red-800">Block User</h2>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <HiXMark className="w-5 h-5 text-red-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h3 className="font-semibold text-black">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="bg-yellow-50/80 border border-yellow-200/60 rounded-lg p-4 mb-4 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <HiExclamationTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Warning</p>
                  <p className="text-sm text-yellow-700">
                    This action will block the user from accessing the platform. The user will be unable to log in or perform any actions.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for blocking <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                rows={4}
                placeholder="Please provide a detailed reason for blocking this user..."
                required
              />
              {!reason.trim() && (
                <p className="text-xs text-gray-500 mt-1">A reason is required to proceed with blocking.</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!reason.trim() || isLoading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Blocking...
                </>
              ) : (
                <>
                  <HiNoSymbol className="w-4 h-4" />
                  Block User
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockUserModal;