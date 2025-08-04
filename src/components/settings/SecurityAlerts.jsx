import React, { useState } from 'react';
import { HiOutlineBell, HiOutlineExclamation, HiOutlineShieldExclamation, HiOutlineUserAdd, HiOutlineLockClosed, HiOutlineEye, HiOutlineX, HiOutlineCog, HiOutlineMail, HiOutlineDeviceMobile } from 'react-icons/hi';

const SecurityAlerts = () => {
  // State for alerts configuration
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Coin Limit Exceeded',
      icon: <HiOutlineExclamation className="h-5 w-5" />,
      threshold: '10,000 coins',
      status: 'enabled',
      description: 'Alert when user coin balance exceeds threshold',
      notifications: {
        email: true,
        sms: false,
        dashboard: true
      },
      recipients: ['admin@yahbu.com', 'security@yahbu.com']
    },
    {
      id: 2,
      type: 'Large Payout Request',
      icon: <HiOutlineExclamation className="h-5 w-5" />,
      threshold: '$1,000',
      status: 'enabled',
      description: 'Alert when payout request exceeds monetary threshold',
      notifications: {
        email: true,
        sms: true,
        dashboard: true
      },
      recipients: ['admin@yahbu.com', 'finance@yahbu.com']
    },
    {
      id: 3,
      type: 'New Admin Created',
      icon: <HiOutlineUserAdd className="h-5 w-5" />,
      threshold: 'Any',
      status: 'enabled',
      description: 'Alert when new admin account is created',
      notifications: {
        email: true,
        sms: false,
        dashboard: true
      },
      recipients: ['admin@yahbu.com', 'security@yahbu.com']
    },
    {
      id: 4,
      type: 'Failed Login Attempts',
      icon: <HiOutlineLockClosed className="h-5 w-5" />,
      threshold: '5 attempts',
      status: 'disabled',
      description: 'Alert when multiple failed login attempts detected',
      notifications: {
        email: true,
        sms: true,
        dashboard: true
      },
      recipients: ['security@yahbu.com']
    },
    {
      id: 5,
      type: 'Suspicious Activity',
      icon: <HiOutlineShieldExclamation className="h-5 w-5" />,
      threshold: 'AI Detection',
      status: 'enabled',
      description: 'Alert when AI detects suspicious user behavior',
      notifications: {
        email: true,
        sms: false,
        dashboard: true
      },
      recipients: ['admin@yahbu.com', 'security@yahbu.com']
    }
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Handle alert status toggle
  const handleStatusToggle = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: alert.status === 'enabled' ? 'disabled' : 'enabled' }
        : alert
    ));
  };

  // Handle configure button click
  const handleConfigure = (alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  };

  // Handle save configuration
  const handleSaveConfiguration = () => {
    // Update the alert configuration
    setAlerts(alerts.map(alert => 
      alert.id === selectedAlert.id ? selectedAlert : alert
    ));
    handleCloseModal();
  };

  // Handle notification method toggle
  const handleNotificationToggle = (method) => {
    setSelectedAlert({
      ...selectedAlert,
      notifications: {
        ...selectedAlert.notifications,
        [method]: !selectedAlert.notifications[method]
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Security Alert Configuration */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <HiOutlineBell className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Security Alert Configuration</h2>
              <p className="text-gray-600 text-sm">Configure automated alerts for suspicious activities</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alert Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Threshold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        alert.status === 'enabled' ? 'bg-orange-50' : 'bg-gray-50'
                      }`}>
                        <div className={alert.status === 'enabled' ? 'text-orange-600' : 'text-gray-400'}>
                          {alert.icon}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{alert.type}</div>
                        <div className="text-sm text-gray-500">{alert.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-medium">{alert.threshold}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      alert.status === 'enabled' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status === 'enabled' ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer mr-4">
                      <input
                        type="checkbox"
                        checked={alert.status === 'enabled'}
                        onChange={() => handleStatusToggle(alert.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <button
                      onClick={() => handleConfigure(alert)}
                      className="inline-flex items-center px-3 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group"
                    >
                      <HiOutlineCog className="h-4 w-4 text-blue-600 group-hover:text-blue-700 mr-1" />
                      <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">Configure</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Configuration Modal */}
      {isModalOpen && selectedAlert && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-70">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    {selectedAlert.icon && <div className="text-orange-600">{selectedAlert.icon}</div>}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Configure Alert</h3>
                    <p className="text-sm text-gray-600">{selectedAlert.type}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <HiOutlineX className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Alert Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={selectedAlert.description}
                  onChange={(e) => setSelectedAlert({...selectedAlert, description: e.target.value})}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  rows="3"
                />
              </div>

              {/* Threshold Configuration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Threshold
                </label>
                <input
                  type="text"
                  value={selectedAlert.threshold}
                  onChange={(e) => setSelectedAlert({...selectedAlert, threshold: e.target.value})}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Notification Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Notification Methods
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <HiOutlineMail className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Email Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAlert.notifications.email}
                        onChange={() => handleNotificationToggle('email')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <HiOutlineDeviceMobile className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">SMS Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAlert.notifications.sms}
                        onChange={() => handleNotificationToggle('sms')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <HiOutlineBell className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Dashboard Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAlert.notifications.dashboard}
                        onChange={() => handleNotificationToggle('dashboard')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Recipients
                </label>
                <div className="space-y-2">
                  {selectedAlert.recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={recipient}
                        onChange={(e) => {
                          const newRecipients = [...selectedAlert.recipients];
                          newRecipients[index] = e.target.value;
                          setSelectedAlert({...selectedAlert, recipients: newRecipients});
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfiguration}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityAlerts;