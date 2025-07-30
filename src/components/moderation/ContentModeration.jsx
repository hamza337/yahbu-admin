import React, { useState } from 'react';

const ContentModeration = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('flagged');

  // State for content items
  const [flaggedContent, setFlaggedContent] = useState([
    { id: 1, type: 'post', user: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', content: 'This is a potentially offensive post with inappropriate language.', timestamp: '2024-06-10 14:32:45', reason: 'Offensive language', reportedBy: 'User123', status: 'Pending' },
    { id: 2, type: 'comment', user: 'Emma Johnson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', content: 'This comment contains hate speech targeting a specific group.', timestamp: '2024-06-09 09:15:22', reason: 'Hate speech', reportedBy: 'User456', status: 'Pending' },
    { id: 3, type: 'video', user: 'Michael Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', content: 'This video contains violent content that may be disturbing to viewers.', timestamp: '2024-06-08 18:45:10', reason: 'Violence', reportedBy: 'User789', status: 'Pending' },
    { id: 4, type: 'post', user: 'Olivia Davis', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', content: 'This post contains misleading information about health treatments.', timestamp: '2024-06-07 11:20:33', reason: 'Misinformation', reportedBy: 'User101', status: 'Pending' },
    { id: 5, type: 'comment', user: 'William Wilson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', content: 'This comment contains spam links to suspicious websites.', timestamp: '2024-06-06 16:05:18', reason: 'Spam', reportedBy: 'User202', status: 'Pending' },
  ]);

  const [recentContent, setRecentContent] = useState([
    { id: 6, type: 'post', user: 'James Taylor', avatar: 'https://randomuser.me/api/portraits/men/6.jpg', content: 'Just shared my latest travel photos from my trip to Hawaii!', timestamp: '2024-06-10 10:15:30', likes: 45, comments: 12 },
    { id: 7, type: 'video', user: 'Sophia Miller', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', content: 'Check out my new cooking tutorial for homemade pasta.', timestamp: '2024-06-10 09:22:15', views: 230, likes: 78 },
    { id: 8, type: 'post', user: 'Benjamin Anderson', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', content: 'Excited to announce my new book release next month!', timestamp: '2024-06-09 16:45:20', likes: 112, comments: 34 },
    { id: 9, type: 'comment', user: 'Charlotte Thomas', avatar: 'https://randomuser.me/api/portraits/women/9.jpg', content: 'Great article! I learned a lot from this.', timestamp: '2024-06-09 14:30:45', likes: 8 },
    { id: 10, type: 'post', user: 'Daniel Jackson', avatar: 'https://randomuser.me/api/portraits/men/10.jpg', content: 'Just finished my first marathon! Feeling accomplished.', timestamp: '2024-06-08 18:10:55', likes: 95, comments: 27 },
  ]);

  const [moderatedContent, setModeratedContent] = useState([
    { id: 11, type: 'post', user: 'Amelia White', avatar: 'https://randomuser.me/api/portraits/women/11.jpg', content: 'This post contained inappropriate content.', timestamp: '2024-06-05 13:25:40', action: 'Removed', moderator: 'Admin1', reason: 'Nudity' },
    { id: 12, type: 'comment', user: 'Henry Garcia', avatar: 'https://randomuser.me/api/portraits/men/12.jpg', content: 'This comment violated community guidelines.', timestamp: '2024-06-04 11:15:22', action: 'Hidden', moderator: 'Admin2', reason: 'Harassment' },
    { id: 13, type: 'video', user: 'Lily Martinez', avatar: 'https://randomuser.me/api/portraits/women/13.jpg', content: 'This video was reported for copyright infringement.', timestamp: '2024-06-03 15:40:10', action: 'Removed', moderator: 'Admin1', reason: 'Copyright' },
    { id: 14, type: 'post', user: 'Sebastian Lee', avatar: 'https://randomuser.me/api/portraits/men/14.jpg', content: 'This post contained misleading information.', timestamp: '2024-06-02 09:55:33', action: 'Warning', moderator: 'Admin3', reason: 'Misinformation' },
    { id: 15, type: 'comment', user: 'Victoria Clark', avatar: 'https://randomuser.me/api/portraits/women/15.jpg', content: 'This comment contained spam links.', timestamp: '2024-06-01 14:20:18', action: 'Removed', moderator: 'Admin2', reason: 'Spam' },
  ]);

  // State for user violations
  const [userViolations, setUserViolations] = useState([
    { id: 1, user: 'Robert Thompson', avatar: 'https://randomuser.me/api/portraits/men/16.jpg', violations: 5, lastViolation: '2024-06-08', status: 'Warning' },
    { id: 2, user: 'Isabella Rodriguez', avatar: 'https://randomuser.me/api/portraits/women/17.jpg', violations: 8, lastViolation: '2024-06-07', status: 'Suspended (3 days)' },
    { id: 3, user: 'Matthew Lewis', avatar: 'https://randomuser.me/api/portraits/men/18.jpg', violations: 12, lastViolation: '2024-06-05', status: 'Suspended (7 days)' },
    { id: 4, user: 'Sophia Walker', avatar: 'https://randomuser.me/api/portraits/women/19.jpg', violations: 3, lastViolation: '2024-06-09', status: 'Warning' },
    { id: 5, user: 'David Hall', avatar: 'https://randomuser.me/api/portraits/men/20.jpg', violations: 15, lastViolation: '2024-06-01', status: 'Banned' },
  ]);

  // State for moderation action modal
  const [showModerationModal, setShowModerationModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [moderationAction, setModerationAction] = useState('remove');
  const [moderationReason, setModerationReason] = useState('');

  // State for user action modal
  const [showUserActionModal, setShowUserActionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAction, setUserAction] = useState('warning');
  const [suspensionDays, setSuspensionDays] = useState(1);
  const [actionReason, setActionReason] = useState('');

  // Handle content moderation
  const openModerationModal = (content) => {
    setSelectedContent(content);
    setModerationAction('remove');
    setModerationReason('');
    setShowModerationModal(true);
  };

  const handleModerateContent = () => {
    if (!selectedContent || !moderationReason.trim()) return;

    // Update the content status
    const updatedFlaggedContent = flaggedContent.filter(item => item.id !== selectedContent.id);
    setFlaggedContent(updatedFlaggedContent);

    // Add to moderated content
    const newModeratedContent = {
      id: selectedContent.id,
      type: selectedContent.type,
      user: selectedContent.user,
      avatar: selectedContent.avatar,
      content: selectedContent.content,
      timestamp: selectedContent.timestamp,
      action: moderationAction === 'remove' ? 'Removed' : moderationAction === 'hide' ? 'Hidden' : 'Warning',
      moderator: 'Admin1', // This would be the current admin user
      reason: moderationReason
    };

    setModeratedContent([newModeratedContent, ...moderatedContent]);

    // Close modal
    setShowModerationModal(false);
    setSelectedContent(null);
    setModerationReason('');
  };

  // Handle user action
  const openUserActionModal = (user) => {
    setSelectedUser(user);
    setUserAction('warning');
    setSuspensionDays(1);
    setActionReason('');
    setShowUserActionModal(true);
  };

  const handleUserAction = () => {
    if (!selectedUser || !actionReason.trim()) return;

    // Update the user status
    const updatedUserViolations = userViolations.map(user => {
      if (user.id === selectedUser.id) {
        let newStatus = 'Warning';
        if (userAction === 'suspend') {
          newStatus = `Suspended (${suspensionDays} days)`;
        } else if (userAction === 'ban') {
          newStatus = 'Banned';
        }

        return {
          ...user,
          status: newStatus,
          violations: user.violations + 1,
          lastViolation: new Date().toISOString().split('T')[0]
        };
      }
      return user;
    });

    setUserViolations(updatedUserViolations);

    // Close modal
    setShowUserActionModal(false);
    setSelectedUser(null);
    setActionReason('');
  };

  // Helper function to get badge color based on content type
  const getTypeColor = (type) => {
    switch (type) {
      case 'post':
        return 'bg-blue-100 text-blue-800';
      case 'comment':
        return 'bg-green-100 text-green-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get badge color based on reason
  const getReasonColor = (reason) => {
    switch (reason) {
      case 'Offensive language':
      case 'Hate speech':
        return 'bg-red-100 text-red-800';
      case 'Violence':
        return 'bg-orange-100 text-orange-800';
      case 'Misinformation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Spam':
        return 'bg-blue-100 text-blue-800';
      case 'Nudity':
      case 'Copyright':
        return 'bg-purple-100 text-purple-800';
      case 'Harassment':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get badge color based on action
  const getActionColor = (action) => {
    switch (action) {
      case 'Removed':
        return 'bg-red-100 text-red-800';
      case 'Hidden':
        return 'bg-yellow-100 text-yellow-800';
      case 'Warning':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get badge color based on user status
  const getStatusColor = (status) => {
    if (status.includes('Warning')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status.includes('Suspended')) {
      return 'bg-orange-100 text-orange-800';
    } else if (status.includes('Banned')) {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">Flagged Content</div>
            <div className="text-2xl font-bold text-red-600">{flaggedContent.length}</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">Content Reviewed (Today)</div>
            <div className="text-2xl font-bold text-green-600">12</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">Content Removed (Today)</div>
            <div className="text-2xl font-bold text-orange-600">5</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <div className="text-sm font-medium text-gray-600 mb-1">User Violations (Today)</div>
            <div className="text-2xl font-bold text-purple-600">3</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('flagged')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'flagged' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Flagged Content
                <span className="ml-2 py-0.5 px-2 text-xs rounded-full bg-red-100 text-red-800">{flaggedContent.length}</span>
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'recent' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Recent Content
              </button>
              <button
                onClick={() => setActiveTab('moderated')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'moderated' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Moderated Content
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                User Violations
              </button>
            </nav>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'flagged' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">Flagged Content</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                {flaggedContent.length} items requiring review
              </span>
            </div>
            <div className="overflow-hidden">
              <div className="space-y-4 p-4">
                {flaggedContent.map(content => (
                  <div key={content.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img src={content.avatar} alt={content.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{content.user}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getReasonColor(content.reason)}`}>
                              {content.reason}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{content.timestamp}</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-800">
                            {content.content}
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            <span>Reported by: {content.reportedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openModerationModal(content)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Take Action
                        </button>
                        <button 
                          onClick={() => {
                            // Approve content (remove from flagged)
                            setFlaggedContent(flaggedContent.filter(item => item.id !== content.id));
                          }}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">Recent Content</h3>
              <div>
                <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white">
                  <option value="all">All Types</option>
                  <option value="post">Posts</option>
                  <option value="comment">Comments</option>
                  <option value="video">Videos</option>
                </select>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="space-y-4 p-4">
                {recentContent.map(content => (
                  <div key={content.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img src={content.avatar} alt={content.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{content.user}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{content.timestamp}</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-800">
                            {content.content}
                          </div>
                          <div className="mt-2 text-xs text-gray-500 flex space-x-4">
                            {content.likes && <span>{content.likes} likes</span>}
                            {content.comments && <span>{content.comments} comments</span>}
                            {content.views && <span>{content.views} views</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openModerationModal(content)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                          Flag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'moderated' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">Moderated Content</h3>
              <div>
                <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white">
                  <option value="all">All Actions</option>
                  <option value="removed">Removed</option>
                  <option value="hidden">Hidden</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="space-y-4 p-4">
                {moderatedContent.map(content => (
                  <div key={content.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img src={content.avatar} alt={content.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{content.user}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                              {content.type.charAt(0).toUpperCase() + content.type.slice(1)}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(content.action)}`}>
                              {content.action}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{content.timestamp}</p>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-800">
                            {content.content}
                          </div>
                          <div className="mt-2 text-xs text-gray-500 flex space-x-4">
                            <span>Reason: {content.reason}</span>
                            <span>Moderator: {content.moderator}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                          Restore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800">User Violations</h3>
              <div>
                <select className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white">
                  <option value="all">All Statuses</option>
                  <option value="warning">Warning</option>
                  <option value="suspended">Suspended</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violations</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Violation</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userViolations.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <img src={user.avatar} alt={user.user} className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.user}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.violations}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.lastViolation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openUserActionModal(user)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                          >
                            Take Action
                          </button>
                          <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                            View History
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Moderation Action Modal */}
        {showModerationModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-center">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-2">Moderate Content</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500 mb-3">
                    You are about to take action on content from <span className="font-medium text-gray-700">{selectedContent?.user}</span>.
                  </p>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                    <select
                      value={moderationAction}
                      onChange={(e) => setModerationAction(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="remove">Remove Content</option>
                      <option value="hide">Hide Content</option>
                      <option value="warn">Issue Warning</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea
                      id="reason"
                      rows="3"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="Please provide a reason for this action"
                      value={moderationReason}
                      onChange={(e) => setModerationReason(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <button
                    onClick={() => setShowModerationModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleModerateContent}
                    disabled={!moderationReason.trim()}
                    className={`px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 w-full ${moderationReason.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
                  >
                    Confirm Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Action Modal */}
        {showUserActionModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-center">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                    <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mt-2">Take Action on User</h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-sm text-gray-500 mb-3">
                    You are about to take action on user <span className="font-medium text-gray-700">{selectedUser?.user}</span> who has <span className="font-medium text-gray-700">{selectedUser?.violations}</span> previous violations.
                  </p>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                    <select
                      value={userAction}
                      onChange={(e) => setUserAction(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="warning">Issue Warning</option>
                      <option value="suspend">Suspend User</option>
                      <option value="ban">Ban User</option>
                    </select>
                  </div>
                  {userAction === 'suspend' && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Suspension Duration (days)</label>
                      <select
                        value={suspensionDays}
                        onChange={(e) => setSuspensionDays(parseInt(e.target.value))}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="1">1 day</option>
                        <option value="3">3 days</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                      </select>
                    </div>
                  )}
                  <div className="mt-4">
                    <label htmlFor="actionReason" className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea
                      id="actionReason"
                      rows="3"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      placeholder="Please provide a reason for this action"
                      value={actionReason}
                      onChange={(e) => setActionReason(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <button
                    onClick={() => setShowUserActionModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUserAction}
                    disabled={!actionReason.trim()}
                    className={`px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 w-full ${actionReason.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'}`}
                  >
                    Confirm Action
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModeration;