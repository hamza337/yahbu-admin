import React, { useState } from 'react';
import { 
  HiOutlineDatabase, 
  HiOutlineDownload, 
  HiOutlineUpload,
  HiOutlinePlay,
  HiOutlineStop,
  HiOutlineCog,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineRefresh
} from 'react-icons/hi';
import { HiX, HiExclamation } from 'react-icons/hi';

const BackupManagement = () => {
  // State for backup operations
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedRestoreBackup, setSelectedRestoreBackup] = useState(null);
  
  // State for new schedule form
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    type: 'incremental',
    frequency: 'daily',
    time: '02:00',
    retention: '30',
    location: 'aws-s3',
    compression: true,
    encryption: true
  });

  // Sample backup data
  const [backupStats] = useState({
    lastBackup: '2 hours ago',
    lastBackupTime: 'Today at 2:00 PM',
    backupSize: '2.4 GB',
    successRate: '98.5%'
  });

  // Sample backup history
  const [backupHistory] = useState([
    {
      id: 1,
      type: 'Full Backup',
      size: '2.3 GB',
      status: 'completed',
      date: '2024-01-20 02:00:00',
      duration: '45 minutes',
      location: 'AWS S3'
    },
    {
      id: 2,
      type: 'Incremental',
      size: '128 MB',
      status: 'completed',
      date: '2024-01-19 02:00:00',
      duration: '8 minutes',
      location: 'AWS S3'
    },
    {
      id: 3,
      type: 'Full Backup',
      size: '2.2 GB',
      status: 'completed',
      date: '2024-01-18 02:00:00',
      duration: '42 minutes',
      location: 'AWS S3'
    },
    {
      id: 4,
      type: 'Incremental',
      size: '95 MB',
      status: 'failed',
      date: '2024-01-17 02:00:00',
      duration: 'N/A',
      location: 'AWS S3'
    }
  ]);

  // Sample backup schedule
  const [backupSchedule] = useState([
    {
      id: 1,
      name: 'Daily Incremental Backup',
      schedule: 'Daily at 2:00 AM',
      status: 'active',
      nextRun: 'Tomorrow at 2:00 AM'
    },
    {
      id: 2,
      name: 'Weekly Full Backup',
      schedule: 'Every Sunday at 1:00 AM',
      status: 'active',
      nextRun: 'Sunday at 1:00 AM'
    },
    {
      id: 3,
      name: 'Monthly Archive',
      schedule: 'First day of each month',
      status: 'inactive',
      nextRun: 'Next month'
    }
  ]);

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <HiOutlineCheckCircle className="h-4 w-4" />;
      case 'failed':
        return <HiOutlineExclamationCircle className="h-4 w-4" />;
      case 'running':
        return <HiOutlineClock className="h-4 w-4" />;
      case 'active':
        return <HiOutlinePlay className="h-4 w-4" />;
      case 'inactive':
        return <HiOutlineStop className="h-4 w-4" />;
      default:
        return <HiOutlineClock className="h-4 w-4" />;
    }
  };

  // Handle backup operations
  const handleStartBackup = () => {
    setIsBackupRunning(true);
    // Simulate backup process
    setTimeout(() => {
      setIsBackupRunning(false);
    }, 3000);
  };

  // Handle restore backup
  const handleRestore = (backup) => {
    setSelectedRestoreBackup(backup);
    setShowRestoreModal(true);
  };

  // Handle restore confirmation
  const confirmRestore = () => {
    console.log('Restoring backup:', selectedRestoreBackup);
    setShowRestoreModal(false);
    setSelectedRestoreBackup(null);
    // Add restore logic here
  };

  // Handle add schedule
  const handleAddSchedule = () => {
    console.log('Adding new schedule:', newSchedule);
    setShowAddScheduleModal(false);
    setNewSchedule({
      name: '',
      type: 'incremental',
      frequency: 'daily',
      time: '02:00',
      retention: '30',
      location: 'aws-s3',
      compression: true,
      encryption: true
    });
    // Add schedule logic here
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setNewSchedule(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Backup Management</h1>
        <p className="text-gray-600 mt-2">Manage system backups and data recovery</p>
      </div>

      <div className="space-y-8">
        {/* Backup Overview */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <HiOutlineDatabase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Backup Management</h2>
                  <p className="text-gray-600 text-sm">Manage system backups and data recovery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowRestoreModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <HiOutlineRefresh className="w-4 h-4" />
                  Restore
                </button>
                <button 
                  onClick={handleStartBackup}
                  disabled={isBackupRunning}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBackupRunning ? (
                    <>
                      <HiOutlineRefresh className="h-4 w-4 mr-2 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <HiOutlinePlay className="h-4 w-4 mr-2" />
                      Start Backup
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{backupStats.lastBackup}</div>
                <div className="text-sm text-gray-600">Last Backup</div>
                <div className="text-xs text-gray-500 mt-1">{backupStats.lastBackupTime}</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{backupStats.backupSize}</div>
                <div className="text-sm text-gray-600">Backup Size</div>
                <div className="text-xs text-gray-500 mt-1">Latest backup</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{backupStats.successRate}</div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-orange-600">3</div>
                <div className="text-sm text-gray-600">Active Schedules</div>
                <div className="text-xs text-gray-500 mt-1">Automated backups</div>
              </div>
            </div>
          </div>
        </div>

        {/* Backup History */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Backup History</h3>
            <p className="text-gray-600 text-sm">Complete history of backup operations</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {backupHistory.map((backup) => (
                  <tr key={backup.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-50 rounded-lg mr-3">
                          <HiOutlineDatabase className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{backup.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{backup.size}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-1 rounded mr-2 ${getStatusColor(backup.status)}`}>
                          {getStatusIcon(backup.status)}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(backup.status)}`}>
                          {backup.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{backup.date}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{backup.duration}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{backup.location}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <HiOutlineEye className="h-4 w-4" />
                        </button>
                        <button className="inline-flex items-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <HiOutlineDownload className="h-4 w-4" />
                        </button>
                        {backup.status === 'completed' && (
                          <button 
                            onClick={() => handleRestore(backup)}
                            className="inline-flex items-center p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                            title="Restore from this backup"
                          >
                            <HiOutlineRefresh className="h-4 w-4" />
                          </button>
                        )}
                        <button className="inline-flex items-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Backup Schedule */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Backup Schedule</h3>
                <p className="text-gray-600 text-sm">Configure automatic backup schedules</p>
              </div>
              <button 
                onClick={() => setShowAddScheduleModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <HiOutlineCalendar className="h-4 w-4 mr-2" />
                Add Schedule
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {backupSchedule.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${schedule.status === 'active' ? 'bg-green-50' : 'bg-gray-50'}`}>
                      {getStatusIcon(schedule.status)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{schedule.name}</h4>
                      <p className="text-sm text-gray-600">{schedule.schedule}</p>
                      <p className="text-xs text-gray-500">Next run: {schedule.nextRun}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                      {schedule.status}
                    </span>
                    <button className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <HiOutlineCog className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Add Backup Schedule</h3>
              <button
                onClick={() => setShowAddScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Schedule Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Name
                </label>
                <input
                  type="text"
                  value={newSchedule.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Daily Database Backup"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Backup Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Type
                </label>
                <select
                  value={newSchedule.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="incremental">Incremental Backup</option>
                  <option value="full">Full Backup</option>
                  <option value="differential">Differential Backup</option>
                </select>
              </div>

              {/* Frequency and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={newSchedule.frequency}
                    onChange={(e) => handleInputChange('frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Storage Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage Location
                </label>
                <select
                  value={newSchedule.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="aws-s3">AWS S3</option>
                  <option value="google-cloud">Google Cloud Storage</option>
                  <option value="azure">Azure Blob Storage</option>
                  <option value="local">Local Storage</option>
                </select>
              </div>

              {/* Retention Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retention Period (days)
                </label>
                <input
                  type="number"
                  value={newSchedule.retention}
                  onChange={(e) => handleInputChange('retention', e.target.value)}
                  min="1"
                  max="365"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Backup Options
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="compression"
                    checked={newSchedule.compression}
                    onChange={(e) => handleInputChange('compression', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="compression" className="ml-2 text-sm text-gray-700">
                    Enable compression
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="encryption"
                    checked={newSchedule.encryption}
                    onChange={(e) => handleInputChange('encryption', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="encryption" className="ml-2 text-sm text-gray-700">
                    Enable encryption
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowAddScheduleModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchedule}
                disabled={!newSchedule.name}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore from Backup Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Restore from Backup</h3>
              <button
                 onClick={() => setShowRestoreModal(false)}
                 className="text-gray-400 hover:text-gray-600"
               >
                 <HiX className="w-6 h-6" />
               </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6">
                Select a backup to restore. This action cannot be undone.
              </p>

              {/* Warning */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <HiExclamation className="w-5 h-5 text-red-400 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Warning</h4>
                    <p className="text-sm text-red-700 mt-1">
                      Restoring will overwrite all current data. Make sure to create a backup first.
                    </p>
                  </div>
                </div>
              </div>

              {/* Backup Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Available Backups
                </label>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {backupHistory.filter(backup => backup.status === 'completed').map((backup, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedRestoreBackup(backup)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                        selectedRestoreBackup?.id === backup.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{backup.type}</span>
                            <span className="text-sm text-gray-500">• {backup.size}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {backup.timestamp} • Duration: {backup.duration}
                          </p>
                        </div>
                        {selectedRestoreBackup?.id === backup.id && (
                          <div className="flex items-center justify-end">
                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                              Restore
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestore}
                disabled={!selectedRestoreBackup}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Restore Backup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupManagement;