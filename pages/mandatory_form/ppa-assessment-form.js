// "use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBolt, 
  FaShieldAlt, 
  FaPoundSign, 
  FaCheckCircle, 
  FaInfoCircle,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaBriefcase,
  FaChartBar,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer';

// Validation functions moved to top level to avoid hoisting issues
const validateFullName = (name) => {
  if (!name.trim()) {
    return 'Full name is required';
  }
  if (name.trim().length < 2) {
    return 'Full name must be at least 2 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return 'Full name can only contain letters and spaces';
  }
  return '';
};

const validateUKPostcode = (postcode) => {
  if (!postcode.trim()) {
    return 'Postcode is required';
  }
  
  // UK postcode regex pattern
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
  const formattedPostcode = postcode.toUpperCase().replace(/\s/g, '');
  
  if (!ukPostcodeRegex.test(formattedPostcode)) {
    return 'Please enter a valid UK postcode';
  }
  return '';
};

const validateEmail = (email) => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

const validateEmploymentStatus = (status) => {
  if (!status) {
    return 'Employment status is required';
  }
  const validStatuses = ['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired'];
  if (!validStatuses.includes(status)) {
    return 'Please select a valid employment status';
  }
  return '';
};

const validateAnnualIncome = (income) => {
  if (!income) {
    return 'Annual income is required';
  }
  
  const incomeNum = parseInt(income);
  if (isNaN(incomeNum)) {
    return 'Please enter a valid number';
  }
  
  if (incomeNum < 10000) {
    return 'Annual income must be at least £10,000';
  }
  
  if (incomeNum > 100000) {
    return 'Annual income cannot exceed £100,000';
  }
  
  return '';
};

export default function PPAAssessmentForm() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  // Initialize with localStorage data
  const getInitialFormData = () => {
    if (typeof window === 'undefined') {
      return {
        fullName: '',
        postcode: '',
        email: '',
        employmentStatus: '',
        annualIncome: '',
        termsAccepted: false
      };
    }

    return {
      fullName: localStorage.getItem('fullName') || '',
      postcode: localStorage.getItem('postcode') || '',
      email: localStorage.getItem('email') || '',
      employmentStatus: localStorage.getItem('employmentStatus') || '',
      annualIncome: localStorage.getItem('annualIncome') || '',
      termsAccepted: JSON.parse(localStorage.getItem('termsAccepted') || 'false')
    };
  };

  const getInitialFieldValidity = (formData) => {
    return {
      fullName: validateFullName(formData.fullName) === '',
      postcode: validateUKPostcode(formData.postcode) === '',
      email: validateEmail(formData.email) === '',
      employmentStatus: validateEmploymentStatus(formData.employmentStatus) === '',
      annualIncome: validateAnnualIncome(formData.annualIncome) === ''
    };
  };

  const getInitialValidationErrors = (formData) => {
    return {
      fullName: validateFullName(formData.fullName),
      postcode: validateUKPostcode(formData.postcode),
      email: validateEmail(formData.email),
      employmentStatus: validateEmploymentStatus(formData.employmentStatus),
      annualIncome: validateAnnualIncome(formData.annualIncome)
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [fieldValidity, setFieldValidity] = useState(() => getInitialFieldValidity(getInitialFormData()));
  const [validationErrors, setValidationErrors] = useState(() => getInitialValidationErrors(getInitialFormData()));

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updatedData = { ...prev, [name]: newValue };
      
      // Save to localStorage
      if (name === 'termsAccepted') {
        localStorage.setItem(name, JSON.stringify(newValue));
      } else {
        localStorage.setItem(name, newValue);
      }

      return updatedData;
    });

    // Validate on change
    let error = '';
    let isValid = true;

    switch (name) {
      case 'fullName':
        error = validateFullName(newValue);
        isValid = !error;
        break;
      case 'postcode':
        error = validateUKPostcode(newValue);
        isValid = !error;
        break;
      case 'email':
        error = validateEmail(newValue);
        isValid = !error;
        break;
      case 'employmentStatus':
        error = validateEmploymentStatus(newValue);
        isValid = !error;
        break;
      case 'annualIncome':
        error = validateAnnualIncome(newValue);
        isValid = !error;
        break;
      default:
        break;
    }

    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));

    setFieldValidity(prev => ({
      ...prev,
      [name]: isValid
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation before submission
    const errors = {
      fullName: validateFullName(formData.fullName),
      postcode: validateUKPostcode(formData.postcode),
      email: validateEmail(formData.email),
      employmentStatus: validateEmploymentStatus(formData.employmentStatus),
      annualIncome: validateAnnualIncome(formData.annualIncome)
    };

    setValidationErrors(errors);

    const isValid = Object.values(errors).every(error => error === '');
    
    if (isValid && formData.termsAccepted) {
      console.log('PPA Assessment Form Data:', formData);
      
      // Save all data to localStorage
      localStorage.setItem('fullName', formData.fullName);
      localStorage.setItem('postcode', formData.postcode);
      localStorage.setItem('email', formData.email);
      localStorage.setItem('employmentStatus', formData.employmentStatus);
      localStorage.setItem('annualIncome', formData.annualIncome);
      localStorage.setItem('termsAccepted', JSON.stringify(formData.termsAccepted));
      
      router.push('/eligibility_checks/warm_home_discount_scheme_form');
    } else {
      console.log('Form has validation errors');
    }
  };

  const isFormValid = () => {
    return Object.values(fieldValidity).every(valid => valid) && formData.termsAccepted;
  };

  // Show loading state if not hydrated yet
  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white py-8 mt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your information...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-8 mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-18">
            {/* Main Form Section */}
            <div className="lg:col-span-3">
              {/* Returning User Notice */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-start">
                  <FaInfoCircle className="w-6 h-6 text-green-600 mt-0.5 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-green-900 text-lg mb-2">Returning user?</h3>
                    <p className="text-green-700 mb-3">
                      Already started your PPA assessment? Continue where you left off.
                    </p>
                    <button className="text-green-600 font-semibold text-sm hover:text-green-800 transition-colors flex items-center">
                      Access your dashboard
                      <FaArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaUser className="w-6 h-6 mr-3 text-green-600" />
                    Personal Information
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-3">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          onKeyUp={(e) => handleChange(e)}
                          className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 text-lg ${
                            fieldValidity.fullName ? 'border-gray-300' : 'border-red-500'
                          }`}
                          required
                        />
                        <div className="absolute right-4 top-4 flex items-center">
                          {fieldValidity.fullName && formData.fullName ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : !fieldValidity.fullName && formData.fullName ? (
                            <FaTimes className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaUser className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {validationErrors.fullName && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <FaTimes className="w-3 h-3 mr-1" />
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Address Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaMapMarkerAlt className="w-5 h-5 mr-2 text-green-600" />
                        Property Location
                      </h3>
                      <label htmlFor="postcode" className="block text-sm font-semibold text-gray-700 mb-3">
                        Postcode
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          onKeyUp={(e) => handleChange(e)}
                          className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 text-lg ${
                            fieldValidity.postcode ? 'border-gray-300' : 'border-red-500'
                          }`}
                          required
                        />
                        <div className="absolute right-4 top-4 flex items-center">
                          {fieldValidity.postcode && formData.postcode ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : !fieldValidity.postcode && formData.postcode ? (
                            <FaTimes className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {validationErrors.postcode && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <FaTimes className="w-3 h-3 mr-1" />
                          {validationErrors.postcode}
                        </p>
                      )}
                    </div>

                    {/* Email Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaEnvelope className="w-5 h-5 mr-2 text-green-600" />
                        Contact Details
                      </h3>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address
                      </label>
                      <p className="text-gray-600 text-sm mb-4">
                        We'll send your personalized PPA assessment results and offers to this address
                      </p>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onKeyUp={(e) => handleChange(e)}
                          className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 text-lg ${
                            fieldValidity.email ? 'border-gray-300' : 'border-red-500'
                          }`}
                          required
                        />
                        <div className="absolute right-4 top-4 flex items-center">
                          {fieldValidity.email && formData.email ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : !fieldValidity.email && formData.email ? (
                            <FaTimes className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaEnvelope className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <FaTimes className="w-3 h-3 mr-1" />
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Financial Information Section */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FaChartBar className="w-6 h-6 mr-3 text-green-600" />
                    Financial Information
                  </h2>

                  <div className="space-y-6">
                    {/* Employment Status - Full Width */}
                    <div>
                      <label htmlFor="employmentStatus" className="block text-sm font-semibold text-gray-700 mb-3">
                        Current Employment Status
                      </label>
                      <div className="relative">
                        <select
                          id="employmentStatus"
                          name="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={handleChange}
                          className={`w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 text-lg appearance-none ${
                            fieldValidity.employmentStatus ? 'border-gray-300' : 'border-red-500'
                          }`}
                          required
                        >
                          <option value="">Select employment status</option>
                          <option value="Employed">Employed</option>
                          <option value="Unemployed">Unemployed</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Student">Student</option>
                          <option value="Retired">Retired</option>
                        </select>
                        <div className="absolute right-4 top-4 flex items-center">
                          {fieldValidity.employmentStatus && formData.employmentStatus ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : !fieldValidity.employmentStatus && formData.employmentStatus ? (
                            <FaTimes className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaBriefcase className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {validationErrors.employmentStatus && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <FaTimes className="w-3 h-3 mr-1" />
                          {validationErrors.employmentStatus}
                        </p>
                      )}
                    </div>

                    {/* Annual Income - Full Width */}
                    <div>
                      <label htmlFor="annualIncome" className="block text-sm font-semibold text-gray-700 mb-3">
                        Annual Income (£10,000 - £100,000)
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-4 text-gray-500 font-medium text-lg">£</div>
                        <input
                          type="number"
                          id="annualIncome"
                          name="annualIncome"
                          value={formData.annualIncome}
                          onChange={handleChange}
                          onKeyUp={(e) => handleChange(e)}
                          min="10000"
                          max="100000"
                          className={`w-full pl-12 pr-12 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 text-lg ${
                            fieldValidity.annualIncome ? 'border-gray-300' : 'border-red-500'
                          }`}
                          required
                        />
                        <div className="absolute right-4 top-4 flex items-center">
                          {fieldValidity.annualIncome && formData.annualIncome ? (
                            <FaCheck className="w-5 h-5 text-green-500" />
                          ) : !fieldValidity.annualIncome && formData.annualIncome ? (
                            <FaTimes className="w-5 h-5 text-red-500" />
                          ) : (
                            <FaPoundSign className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                      {validationErrors.annualIncome && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <FaTimes className="w-3 h-3 mr-1" />
                          {validationErrors.annualIncome}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs mt-2">
                        Must be between £10,000 and £100,000
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-start mb-4">
                    <FaShieldAlt className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-gray-900">Data Protection & Terms</h3>
                  </div>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    We process your information to provide personalized PPA assessments and connect you with suitable energy providers. 
                    Your data is protected and never shared without your explicit consent.
                  </p>
                  
                  <label className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1 flex-shrink-0"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I accept the <a href="#" className="text-green-600 hover:text-green-800 underline font-medium">terms and conditions</a> and have read the <a href="#" className="text-green-600 hover:text-green-800 underline font-medium">privacy policy</a>
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-6">
                  <a
                    onClick={() => router.push('/#products')}
                    className="px-8 py-4 border border-gray-300 cursor-pointer rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center"
                  >
                    <FaArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </a>
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg text-base font-semibold text-white hover:from-green-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Get My PPA Assessment
                    <FaArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar - Benefits */}
            <div className="lg:col-span-2">
              <div className="sticky top-30">
                <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center">
                  <FaCheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  What You'll Receive
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaBolt className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Custom PPA Analysis</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Detailed assessment of optimal power purchase agreements for your specific energy needs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPoundSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Savings Forecast</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Projected cost savings and ROI analysis based on current market rates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Provider Matching</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Matched with vetted energy providers offering competitive PPA terms
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center">
                      <FaShieldAlt className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-semibold text-green-900 text-sm">Bank-Level Security</h4>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Your data is encrypted and protected with enterprise-grade security measures
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}