import React, { useState } from 'react';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-green-100 text-green-800',
  Dismissed: 'bg-gray-200 text-gray-700',
};

const reports = [
  {
    id: 1,
    reporter: 'John Doe',
    reportedContent: 'Video: "How to make pasta"',
    date: '2024-06-01 14:23',
    status: 'Pending',
    reason: 'Inappropriate content',
    fullReport: 'This video contains inappropriate language and should be reviewed. The content violates community guidelines regarding respectful communication.',
    type: 'Reported Against'
  },
  {
    id: 2,
    reporter: 'Alice Smith',
    reportedContent: 'Image: "Sunset at beach"',
    date: '2024-06-02 09:10',
    status: 'Resolved',
    reason: 'Copyright violation',
    fullReport: 'This image appears to be used without proper attribution. The original photographer has been contacted and proper credits have been added.',
    type: 'Reported By'
  },
  {
    id: 3,
    reporter: 'Bob Johnson',
    reportedContent: 'Post: "Daily motivation quote"',
    date: '2024-06-03 18:45',
    status: 'Dismissed',
    reason: 'Spam',
    fullReport: 'After review, this post was found to be legitimate motivational content and does not violate any community guidelines. The report has been dismissed.',
    type: 'Reported Against'
  },
  {
    id: 4,
    reporter: 'Charlie Lee',
    reportedContent: 'Comment: "Great work!"',
    date: '2024-06-04 11:30',
    status: 'Pending',
    reason: 'Harassment',
    fullReport: 'This comment contains harassing language directed at another user. The comment has been temporarily hidden pending review.',
    type: 'Reported By'
  },
];

const UserReports = () => {
  const [expandedReports, setExpandedReports] = useState(new Set());

  const toggleReport = (reportId) => {
    const newExpanded = new Set(expandedReports);
    if (newExpanded.has(reportId)) {
      newExpanded.delete(reportId);
    } else {
      newExpanded.add(reportId);
    }
    setExpandedReports(newExpanded);
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="font-bold text-xl mb-6 text-black">Reports & Complaints</div>
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    report.type === 'Reported By' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {report.type}
                  </span>
                  <span className="text-sm text-gray-600">{report.reporter}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[report.status] || 'bg-gray-200 text-gray-700'}`}>
                    {report.status}
                  </span>
                  <button
                    onClick={() => toggleReport(report.id)}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${expandedReports.has(report.id) ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="font-medium text-black">{report.reportedContent}</div>
                <div className="text-sm text-gray-600 mt-1">Reason: {report.reason}</div>
                <div className="text-sm text-gray-500">{report.date}</div>
              </div>

              {expandedReports.has(report.id) && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                  <div className="font-semibold text-black mb-2">Full Report Details:</div>
                  <div className="text-sm text-gray-700 leading-relaxed">{report.fullReport}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserReports;