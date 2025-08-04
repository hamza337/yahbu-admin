import React, { useState } from 'react';
import { 
  HiOutlineDocumentText, 
  HiOutlineSearch, 
  HiOutlineFilter, 
  HiOutlineDownload, 
  HiOutlineEye,
  HiOutlineUser,
  HiOutlineBan,
  HiOutlineUserAdd,
  HiOutlineCheckCircle,
  HiOutlineCog,
  HiOutlineCurrencyDollar
} from 'react-icons/hi';

const AuditLogs = () => {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Sample audit log data
  const [auditLogs] = useState([
    {
      id: 1,
      admin: 'John Doe',
      adminId: '192.168.1.100',
      action: 'Coin Credit',
      actionType: 'coin_credit',
      target: 'Alice Johnson',
      details: 'Credited 500 real coins',
      reason: 'Purchase refund',
      timestamp: '2024-01-20 14:30:25',
      severity: 'medium',
      icon: <HiOutlineCurrencyDollar className="h-4 w-4" />
    },
    {
      id: 2,
      admin: 'Jane Smith',
      adminId: '10.0.0.50',
      action: 'User Ban',
      actionType: 'user_ban',
      target: 'BadUser123',
      details: 'Banned user account',
      reason: 'Policy violation',
      timestamp: '2024-01-20 12:15:10',
      severity: 'high',
      icon: <HiOutlineBan className="h-4 w-4" />
    },
    {
      id: 3,
      admin: 'Mike Johnson',
      adminId: '203.0.113.25',
      action: 'Role Assignment',
      actionType: 'role_assignment',
      target: 'Sarah Wilson',
      details: 'Assigned Support role',
      reason: 'New team member',
      timestamp: '2024-01-19 16:45:33',
      severity: 'low',
      icon: <HiOutlineUserAdd className="h-4 w-4" />
    },
    {
      id: 4,
      admin: 'John Doe',
      adminId: '192.168.1.100',
      action: 'Payout Approval',
      actionType: 'payout_approval',
      target: 'Bob Smith',
      details: 'Approved $82.50 payout',
      reason: 'Coin redemption',
      timestamp: '2024-01-19 10:20:15',
      severity: 'high',
      icon: <HiOutlineCheckCircle className="h-4 w-4" />
    },
    {
      id: 5,
      admin: 'Jane Smith',
      adminId: '10.0.0.50',
      action: 'System Settings',
      actionType: 'system_settings',
      target: 'Coin Conversion Rate',
      details: 'Updated rate to $82.50/1000 coins',
      reason: 'Market adjustment',
      timestamp: '2024-01-18 09:30:45',
      severity: 'medium',
      icon: <HiOutlineCog className="h-4 w-4" />
    }
  ]);

  // Statistics data
  const stats = {
    totalActionsToday: 47,
    changeFromYesterday: '+12%',
    highSeverity: 8,
    activeAdmins: 12,
    failedActions: 3,
    errorRate: '0.2%'
  };

  // Get unique admins and actions for filters
  const uniqueAdmins = [...new Set(auditLogs.map(log => log.admin))];
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];

  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAdmin = selectedAdmin === '' || log.admin === selectedAdmin;
    const matchesAction = selectedAction === '' || log.action === selectedAction;
    
    return matchesSearch && matchesAdmin && matchesAction;
  });

  // Get severity badge color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get action badge color
  const getActionColor = (actionType) => {
    switch (actionType) {
      case 'coin_credit':
        return 'bg-blue-100 text-blue-800';
      case 'user_ban':
        return 'bg-red-100 text-red-800';
      case 'role_assignment':
        return 'bg-purple-100 text-purple-800';
      case 'payout_approval':
        return 'bg-green-100 text-green-800';
      case 'system_settings':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Audit Logs</h1>
        <p className="text-gray-600 mt-2">Complete history of all administrative actions and system changes</p>
      </div>

      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <HiOutlineDocumentText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Audit Logs</h2>
                <p className="text-gray-600 text-sm">Complete history of all administrative actions</p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <HiOutlineDownload className="h-4 w-4 mr-2" />
              Export Logs
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{stats.totalActionsToday}</div>
              <div className="text-sm text-gray-600">Total Actions Today</div>
              <div className="text-xs text-green-600 mt-1">{stats.changeFromYesterday} from yesterday</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-red-600">{stats.highSeverity}</div>
              <div className="text-sm text-gray-600">High Severity</div>
              <div className="text-xs text-gray-500 mt-1">Requires attention</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{stats.activeAdmins}</div>
              <div className="text-sm text-gray-600">Active Admins</div>
              <div className="text-xs text-gray-500 mt-1">Last 24 hours</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl font-bold text-orange-600">{stats.failedActions}</div>
              <div className="text-sm text-gray-600">Failed Actions</div>
              <div className="text-xs text-gray-500 mt-1">Error rate: {stats.errorRate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
          <p className="text-gray-600 text-sm">Searchable and filterable log of all admin activities</p>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Admin Filter */}
            <select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Filter by admin</option>
              {uniqueAdmins.map(admin => (
                <option key={admin} value={admin}>{admin}</option>
              ))}
            </select>

            {/* Action Filter */}
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Filter by action</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>

            {/* More Filters Button */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <HiOutlineFilter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-50 rounded-lg mr-3">
                        <HiOutlineUser className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{log.admin}</div>
                        <div className="text-sm text-gray-500">{log.adminId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`p-1 rounded mr-2 ${getActionColor(log.actionType)}`}>
                        {log.icon}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.actionType)}`}>
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.target}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.details}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{log.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.timestamp}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="inline-flex items-center p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <HiOutlineEye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No results message */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <HiOutlineDocumentText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AuditLogs;