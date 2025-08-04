import React, { useState } from 'react';
import { HiOutlineShieldCheck, HiOutlineDeviceMobile, HiOutlineMail, HiOutlineQrcode, HiOutlineRefresh } from 'react-icons/hi';

const MultiFactorAuth = () => {
  // State for MFA settings
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [selectedMethods, setSelectedMethods] = useState({
    authenticator: true,
    sms: false,
    email: false,
  });

  // State for QR code generation
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  // Handle MFA toggle
  const handleMfaToggle = () => {
    setMfaEnabled(!mfaEnabled);
  };

  // Handle method selection
  const handleMethodChange = (method) => {
    setSelectedMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  // Generate new QR code
  const handleGenerateQrCode = () => {
    setQrCodeGenerated(true);
    // In a real app, this would generate a new QR code
  };

  return (
    <div className="space-y-8">
      {/* Multi-Factor Authentication Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MFA Configuration */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <HiOutlineShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Multi-Factor Authentication</h2>
                <p className="text-gray-600 text-sm">Enable MFA for all admin accounts</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Require MFA Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Require MFA for all admins</h3>
                <p className="text-sm text-gray-600 mt-1">All admin users must use 2FA to access the panel</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mfaEnabled}
                  onChange={handleMfaToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* MFA Methods */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">MFA Methods</h3>
              <div className="space-y-3">
                {/* Authenticator App */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <HiOutlineDeviceMobile className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Authenticator App (TOTP)</h4>
                      <p className="text-sm text-gray-600">Google Authenticator, Authy, etc.</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMethods.authenticator}
                      onChange={() => handleMethodChange('authenticator')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* SMS Verification */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      <HiOutlineDeviceMobile className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Verification</h4>
                      <p className="text-sm text-gray-600">Send codes via text message</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMethods.sms}
                      onChange={() => handleMethodChange('sms')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Email Verification */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <HiOutlineMail className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email Verification</h4>
                      <p className="text-sm text-gray-600">Send codes via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMethods.email}
                      onChange={() => handleMethodChange('email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Setup */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <HiOutlineQrcode className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">QR Code Setup</h2>
                <p className="text-gray-600 text-sm">Generate QR code for authenticator apps</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* QR Code Display Area */}
            <div className="text-center mb-6">
              <div className="inline-block p-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                {qrCodeGenerated ? (
                  <div className="space-y-4">
                    {/* Placeholder QR Code */}
                    <div className="w-48 h-48 mx-auto bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-8 gap-1 p-4">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">QR Code would be displayed here</p>
                      <p className="text-xs text-gray-600 mt-1">Scan with Google Authenticator or similar app</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <HiOutlineQrcode className="h-24 w-24 text-gray-400 mx-auto" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">QR Code would be displayed here</p>
                      <p className="text-xs text-gray-600 mt-1">Scan with Google Authenticator or similar app</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={handleGenerateQrCode}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
              >
                <HiOutlineRefresh className="-ml-1 mr-2 h-5 w-5" />
                Generate New QR Code
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Download Google Authenticator or similar app</li>
                <li>Scan the QR code with your authenticator app</li>
                <li>Enter the 6-digit code to verify setup</li>
                <li>Save your backup codes in a secure location</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Security Settings */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">Additional Security Settings</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Session Timeout</h4>
              <p className="text-sm text-gray-600 mb-3">Automatically log out inactive users</p>
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
              </select>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Login Attempts</h4>
              <p className="text-sm text-gray-600 mb-3">Maximum failed login attempts</p>
              <select className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>3 attempts</option>
                <option>5 attempts</option>
                <option>10 attempts</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiFactorAuth;