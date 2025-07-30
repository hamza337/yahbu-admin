import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { HiOutlineShieldCheck, HiOutlineArrowLeft, HiOutlineRefresh } from 'react-icons/hi';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const email = location.state?.email || '';

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    const inputToFocus = document.getElementById(`otp-${focusIndex}`);
    if (inputToFocus) inputToFocus.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to new password page
      navigate('/new-password', { state: { email, otp: fullOtp } });
    }, 1000);
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(120); // Reset timer
      setOtp(['', '', '', '', '', '']); // Clear OTP inputs
      setError('');
      
      // Focus first input
      const firstInput = document.getElementById('otp-0');
      if (firstInput) firstInput.focus();
    }, 1000);
  };

  const handleBack = () => {
    navigate('/forget-password');
  };

  // Auto-focus first input on mount
  useEffect(() => {
    const firstInput = document.getElementById('otp-0');
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
          Back
        </button>

        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <HiOutlineShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Verify OTP</h1>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to your email
          </p>
          {email && (
            <p className="text-sm text-gray-500 mt-1">
              Code sent to: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>

        {/* OTP Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Verification Code
              </label>
              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
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

            {/* Timer */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {timeLeft > 0 ? (
                  <>Code expires in: <span className="font-medium text-red-600">{formatTime(timeLeft)}</span></>
                ) : (
                  <span className="text-red-600">Code has expired</span>
                )}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Code'
              )}
            </button>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={timeLeft > 0 || isResending}
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isResending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  Resending...
                </div>
              ) : (
                <>
                  <HiOutlineRefresh className="h-4 w-4 mr-2" />
                  Resend Code
                </>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <Link to="/forget-password" className="text-blue-600 hover:text-blue-500 font-medium">
                Try a different email
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

export default VerifyOTP;