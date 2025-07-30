import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { HiOutlineShieldCheck, HiOutlineArrowLeft } from 'react-icons/hi';

const Verify2FA = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const email = location.state?.email || '';

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    const inputToFocus = document.getElementById(`code-${focusIndex}`);
    if (inputToFocus) inputToFocus.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullCode = code.join('');
    if (fullCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to dashboard
      navigate('/user-management');
    }, 1000);
  };

  const handleBack = () => {
    navigate('/');
  };

  // Auto-focus first input on mount
  useEffect(() => {
    const firstInput = document.getElementById('code-0');
    if (firstInput) firstInput.focus();
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <HiOutlineArrowLeft className="h-5 w-5 mr-2" />
          Back to Login
        </button>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <HiOutlineShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Two-Factor Authentication</h1>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code from your authenticator app
          </p>
          {email && (
            <p className="text-sm text-gray-500 mt-1">
              Signed in as: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>

        {/* 2FA Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Authentication Code
              </label>
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                ))}
              </div>
              {error && (
                <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || code.join('').length !== 6}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Can't access your authenticator app?{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
                Contact support
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            © 2024 Yahbu Admin. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify2FA;