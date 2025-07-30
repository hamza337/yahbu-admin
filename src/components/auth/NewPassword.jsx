import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineArrowLeft, HiOutlineCheckCircle } from 'react-icons/hi';

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const email = location.state?.email || '';
  const otp = location.state?.otp || '';

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('One special character');
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validate new password
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      newErrors.newPassword = passwordErrors.join(', ');
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to login with success message
      navigate('/', { 
        state: { 
          message: 'Password reset successfully! Please login with your new password.',
          type: 'success'
        } 
      });
    }, 1000);
  };

  const handleBack = () => {
    navigate('/verify-otp', { state: { email } });
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.newPassword.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(formData.newPassword) },
    { text: 'One lowercase letter', met: /[a-z]/.test(formData.newPassword) },
    { text: 'One number', met: /\d/.test(formData.newPassword) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) }
  ];

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
            <HiOutlineLockClosed className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Set New Password</h1>
          <p className="text-gray-600 mt-2">
            Create a strong password for your account
          </p>
          {email && (
            <p className="text-sm text-gray-500 mt-1">
              Account: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>

        {/* New Password Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword.newPassword ? 'text' : 'password'}
                  required
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.newPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
              )}
            </div>

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</h4>
                <div className="space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center">
                      <HiOutlineCheckCircle 
                        className={`h-4 w-4 mr-2 ${req.met ? 'text-green-500' : 'text-gray-300'}`} 
                      />
                      <span className={`text-sm ${req.met ? 'text-green-700' : 'text-gray-600'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword.confirmPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating Password...
                </div>
              ) : (
                'Update Password'
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in here
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

export default NewPassword;