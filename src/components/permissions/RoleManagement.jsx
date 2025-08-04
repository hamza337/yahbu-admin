import React, { useState } from 'react';
import { HiOutlineUserGroup, HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineTrash, HiOutlinePencil, HiOutlinePlus, HiOutlineSearch, HiOutlineCheck, HiOutlineX, HiOutlineCurrencyDollar, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineCog } from 'react-icons/hi';

const RoleManagement = () => {
  // State for roles
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to all system features and settings',
      usersCount: 3,
      permissions: {
        userManagement: { view: true, create: true, edit: true, delete: true },
        coinManagement: { view: true, create: true, edit: true, delete: true },
        contentModeration: { view: true, create: true, edit: true, delete: true },
        financialTransactions: { view: true, create: true, edit: true, delete: true },
        analyticsReports: { view: true, create: true, edit: true, delete: true },
        roleManagement: { view: true, create: true, edit: true, delete: true },
        systemSettings: { view: true, create: true, edit: true, delete: true },
      },
    },
    {
      id: 2,
      name: 'Finance Admin',
      description: 'Access to financial transactions and reports',
      usersCount: 5,
      permissions: {
        userManagement: { view: true, create: false, edit: false, delete: false },
        coinManagement: { view: true, create: true, edit: true, delete: false },
        contentModeration: { view: false, create: false, edit: false, delete: false },
        financialTransactions: { view: true, create: true, edit: true, delete: false },
        analyticsReports: { view: true, create: true, edit: false, delete: false },
        roleManagement: { view: false, create: false, edit: false, delete: false },
        systemSettings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: 3,
      name: 'Content Moderator',
      description: 'Access to content moderation features',
      usersCount: 12,
      permissions: {
        userManagement: { view: true, create: false, edit: false, delete: false },
        coinManagement: { view: false, create: false, edit: false, delete: false },
        contentModeration: { view: true, create: true, edit: true, delete: true },
        financialTransactions: { view: false, create: false, edit: false, delete: false },
        analyticsReports: { view: true, create: false, edit: false, delete: false },
        roleManagement: { view: false, create: false, edit: false, delete: false },
        systemSettings: { view: false, create: false, edit: false, delete: false },
      },
    },
    {
      id: 4,
      name: 'Support',
      description: 'Limited access to help users with issues',
      usersCount: 8,
      permissions: {
        userManagement: { view: true, create: false, edit: true, delete: false },
        coinManagement: { view: true, create: false, edit: false, delete: false },
        contentModeration: { view: true, create: false, edit: false, delete: false },
        financialTransactions: { view: true, create: false, edit: false, delete: false },
        analyticsReports: { view: true, create: false, edit: false, delete: false },
        roleManagement: { view: false, create: false, edit: false, delete: false },
        systemSettings: { view: false, create: false, edit: false, delete: false },
      },
    },
  ]);

  // State for users with roles
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Super Admin', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Finance Admin', status: 'Active', lastActive: '1 day ago' },
    { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', role: 'Content Moderator', status: 'Active', lastActive: '3 hours ago' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', role: 'Support', status: 'Active', lastActive: '5 hours ago' },
    { id: 5, name: 'Michael Wilson', email: 'michael.w@example.com', role: 'Finance Admin', status: 'Inactive', lastActive: '5 days ago' },
    { id: 6, name: 'Sarah Brown', email: 'sarah.b@example.com', role: 'Content Moderator', status: 'Active', lastActive: '1 hour ago' },
    { id: 7, name: 'David Miller', email: 'david.m@example.com', role: 'Super Admin', status: 'Active', lastActive: 'Just now' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa.t@example.com', role: 'Support', status: 'Active', lastActive: '4 hours ago' },
  ]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('roles');

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for selected role (for editing)
  const [selectedRole, setSelectedRole] = useState(null);

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);

  // State for create modal
  const [showCreateModal, setShowCreateModal] = useState(false);

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // State for assign role modal
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // State for new role
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {
      userManagement: { view: false, create: false, edit: false, delete: false },
      coinManagement: { view: false, create: false, edit: false, delete: false },
      contentModeration: { view: false, create: false, edit: false, delete: false },
      financialTransactions: { view: false, create: false, edit: false, delete: false },
      analyticsReports: { view: false, create: false, edit: false, delete: false },
      roleManagement: { view: false, create: false, edit: false, delete: false },
      systemSettings: { view: false, create: false, edit: false, delete: false },
    },
  });

  // Permission module names for display
  const permissionModules = [
    { id: 'userManagement', name: 'User Management', icon: <HiOutlineUserGroup className="h-5 w-5" /> },
    { id: 'coinManagement', name: 'Coin & Rewards', icon: <HiOutlineCurrencyDollar className="h-5 w-5" /> },
    { id: 'contentModeration', name: 'Content Moderation', icon: <HiOutlineDocumentText className="h-5 w-5" /> },
    { id: 'financialTransactions', name: 'Financial Transactions', icon: <HiOutlineChartBar className="h-5 w-5" /> },
    { id: 'analyticsReports', name: 'Analytics & Reports', icon: <HiOutlineChartBar className="h-5 w-5" /> },
    { id: 'roleManagement', name: 'Role Management', icon: <HiOutlineShieldCheck className="h-5 w-5" /> },
    { id: 'systemSettings', name: 'System Settings', icon: <HiOutlineCog className="h-5 w-5" /> },
  ];

  // Permission actions
  const permissionActions = [
    { id: 'view', name: 'View' },
    { id: 'create', name: 'Create' },
    { id: 'edit', name: 'Edit' },
    { id: 'delete', name: 'Delete' },
  ];

  // Handle role selection for editing
  const handleEditRole = (role) => {
    setSelectedRole({ ...role });
    setShowEditModal(true);
  };

  // Handle role deletion
  const handleDeleteRole = (role) => {
    setSelectedRole(role);
    setShowDeleteModal(true);
  };

  // Confirm role deletion
  const confirmDeleteRole = () => {
    setRoles(roles.filter(role => role.id !== selectedRole.id));
    setShowDeleteModal(false);
    setSelectedRole(null);
  };

  // Handle permission change for editing
  const handlePermissionChange = (module, action, value) => {
    if (selectedRole) {
      setSelectedRole({
        ...selectedRole,
        permissions: {
          ...selectedRole.permissions,
          [module]: {
            ...selectedRole.permissions[module],
            [action]: value,
          },
        },
      });
    } else if (showCreateModal) {
      setNewRole({
        ...newRole,
        permissions: {
          ...newRole.permissions,
          [module]: {
            ...newRole.permissions[module],
            [action]: value,
          },
        },
      });
    }
  };

  // Save edited role
  const saveRole = () => {
    setRoles(roles.map(role => role.id === selectedRole.id ? selectedRole : role));
    setShowEditModal(false);
    setSelectedRole(null);
  };

  // Create new role
  const createRole = () => {
    const newRoleWithId = {
      ...newRole,
      id: roles.length + 1,
      usersCount: 0,
    };
    setRoles([...roles, newRoleWithId]);
    setShowCreateModal(false);
    setNewRole({
      name: '',
      description: '',
      permissions: {
        userManagement: { view: false, create: false, edit: false, delete: false },
        coinManagement: { view: false, create: false, edit: false, delete: false },
        contentModeration: { view: false, create: false, edit: false, delete: false },
        financialTransactions: { view: false, create: false, edit: false, delete: false },
        analyticsReports: { view: false, create: false, edit: false, delete: false },
        roleManagement: { view: false, create: false, edit: false, delete: false },
        systemSettings: { view: false, create: false, edit: false, delete: false },
      },
    });
  };

  // Handle user selection for role assignment
  const handleAssignRole = (user) => {
    setSelectedUser(user);
    setShowAssignRoleModal(true);
  };

  // Save assigned role
  const saveAssignedRole = (roleName) => {
    setUsers(users.map(user => user.id === selectedUser.id ? { ...user, role: roleName } : user));
    setShowAssignRoleModal(false);
    setSelectedUser(null);
  };

  // Filter roles based on search query
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Professional Tabs - Center Aligned */}
      <div className="mb-8 flex justify-center">
        <div className="bg-gray-50 p-1 rounded-xl border border-gray-200 shadow-sm max-w-md">
          <nav className="flex space-x-1" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('roles')}
              className={`${
                activeTab === 'roles'
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              } py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <div className="flex items-center justify-center space-x-2">
                <HiOutlineShieldCheck className="h-4 w-4" />
                <span>Roles</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              } py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <div className="flex items-center justify-center space-x-2">
                <HiOutlineUserGroup className="h-4 w-4" />
                <span>Users</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Actions - Center Aligned */}
      <div className="mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
            placeholder={`Search ${activeTab === 'roles' ? 'roles' : 'users'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {activeTab === 'roles' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <HiOutlinePlus className="-ml-1 mr-2 h-5 w-5" />
            Create New Role
          </button>
        )}
      </div>

      {/* Roles Tab Content - Card Layout */}
      {activeTab === 'roles' && (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
            {filteredRoles.map((role) => {
            const totalPermissions = Object.values(role.permissions).reduce((total, modulePerms) => {
              return total + Object.values(modulePerms).filter(Boolean).length;
            }, 0);
            
            return (
              <div key={role.id} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[280px] flex flex-col">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full transform translate-x-16 -translate-y-16"></div>
                </div>
                
                {/* Header */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <HiOutlineShieldCheck className="h-7 w-7 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{role.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {role.usersCount} users
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-2.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all group"
                      >
                        <HiOutlinePencil className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
                      </button>
                      {role.name !== 'Super Admin' && (
                        <button
                          onClick={() => handleDeleteRole(role)}
                          className="p-2.5 bg-red-50 rounded-lg hover:bg-red-100 transition-all group"
                        >
                          <HiOutlineTrash className="h-4 w-4 text-red-600 group-hover:text-red-700" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="flex-1 mb-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                  
                  {/* Stats */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Active Users</span>
                      <span className="text-gray-900 font-bold text-xl">{role.usersCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm font-medium">Permissions</span>
                      <span className="text-gray-900 font-bold text-xl">
                        {totalPermissions === Object.keys(role.permissions).length * 4 ? 'All' : totalPermissions}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Users Tab Content */}
      {activeTab === 'users' && (
        <div className="flex justify-center">
          <div className="w-full max-w-6xl bg-white shadow-lg overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'Finance Admin' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'Content Moderator' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleAssignRole(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {showEditModal && selectedRole && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowEditModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 z-50">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <HiOutlineUserGroup className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Role</h3>
                  <div className="mt-6 space-y-8">
                    {/* Professional Form Fields */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">Role Information</h4>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="role-name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Role Name
                          </label>
                          <input
                            type="text"
                            name="role-name"
                            id="role-name"
                            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Enter role name"
                            value={selectedRole.name}
                            onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                            disabled={selectedRole.name === 'Super Admin'}
                          />
                          {selectedRole.name === 'Super Admin' && (
                            <p className="mt-2 text-sm text-gray-500">Super Admin role name cannot be changed.</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="role-description" className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            name="role-description"
                            id="role-description"
                            rows={3}
                            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                            placeholder="Describe the role's purpose and responsibilities"
                            value={selectedRole.description}
                            onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Detailed Permissions */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">Permissions Configuration</h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Module
                              </th>
                              {permissionActions.map((action) => (
                                <th key={action.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {action.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {permissionModules.map((module) => (
                              <tr key={module.id} className={selectedRole.name === 'Super Admin' && module.id === 'roleManagement' ? 'bg-gray-50' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  <div className="flex items-center">
                                    {module.icon}
                                    <span className="ml-2">{module.name}</span>
                                  </div>
                                </td>
                                {permissionActions.map((action) => (
                                  <td key={action.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center justify-center">
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={selectedRole.permissions[module.id][action.id]}
                                        onChange={(e) => handlePermissionChange(module.id, action.id, e.target.checked)}
                                        disabled={selectedRole.name === 'Super Admin' || (selectedRole.name === 'Super Admin' && module.id === 'roleManagement')}
                                      />
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={saveRole}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedRole(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowCreateModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 z-50">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <HiOutlinePlus className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Role</h3>
                  <div className="mt-6 space-y-8">
                    {/* Professional Form Fields */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">Role Information</h4>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="new-role-name" className="block text-sm font-semibold text-gray-700 mb-2">
                            Role Name
                          </label>
                          <input
                            type="text"
                            name="new-role-name"
                            id="new-role-name"
                            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Enter role name"
                            value={newRole.name}
                            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="new-role-description" className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            name="new-role-description"
                            id="new-role-description"
                            rows={3}
                            className="block w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                            placeholder="Describe the role's purpose and responsibilities"
                            value={newRole.description}
                            onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Permissions Configuration */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h4 className="text-lg font-semibold text-gray-900 mb-6">Permissions Configuration</h4>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Module
                              </th>
                              {permissionActions.map((action) => (
                                <th key={action.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {action.name}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {permissionModules.map((module) => (
                              <tr key={module.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  <div className="flex items-center">
                                    {module.icon}
                                    <span className="ml-2">{module.name}</span>
                                  </div>
                                </td>
                                {permissionActions.map((action) => (
                                  <td key={action.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center justify-center">
                                      <input
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        checked={newRole.permissions[module.id][action.id]}
                                        onChange={(e) => handlePermissionChange(module.id, action.id, e.target.checked)}
                                      />
                                    </div>
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={createRole}
                  disabled={!newRole.name}
                >
                  Create Role
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewRole({
                      name: '',
                      description: '',
                      permissions: {
                        userManagement: { view: false, create: false, edit: false, delete: false },
                        coinManagement: { view: false, create: false, edit: false, delete: false },
                        contentModeration: { view: false, create: false, edit: false, delete: false },
                        financialTransactions: { view: false, create: false, edit: false, delete: false },
                        analyticsReports: { view: false, create: false, edit: false, delete: false },
                        roleManagement: { view: false, create: false, edit: false, delete: false },
                        systemSettings: { view: false, create: false, edit: false, delete: false },
                      },
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Role Confirmation Modal */}
      {showDeleteModal && selectedRole && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowDeleteModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 z-50">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <HiOutlineTrash className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Role</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete the role "{selectedRole.name}"? This action cannot be undone.
                      {selectedRole.usersCount > 0 && (
                        <span className="block mt-2 font-medium text-red-600">
                          Warning: {selectedRole.usersCount} {selectedRole.usersCount === 1 ? 'user has' : 'users have'} this role assigned.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDeleteRole}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedRole(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Role Modal */}
      {showAssignRoleModal && selectedUser && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setShowAssignRoleModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 z-50">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <HiOutlineUserGroup className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Assign Role</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Change role assignment for {selectedUser.name}.
                    </p>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">Select Role</label>
                    <select
                      id="role-select"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      defaultValue={selectedUser.role}
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => saveAssignedRole(document.getElementById('role-select').value)}
                >
                  Assign
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowAssignRoleModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;