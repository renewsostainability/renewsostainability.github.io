import { useState, useEffect } from 'react';
import { 
  FaTimesCircle,
  FaEdit,
  FaHeadset,
  FaArrowRight,
  FaCheckCircle,
  FaUserTie,
  FaClipboardList,
  FaPhone,
  FaCalendar,
  FaEnvelope,
  FaPaperPlane,
  FaPiggyBank,
  FaChartLine,
  FaBuilding,
  FaShieldAlt,
  FaLeaf
} from 'react-icons/fa';

import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { generateHTMLQuote } from '../components/Quote';
import { generateHTMLEligibilityResult } from '../components/Result';

export default function BEASResultPage() {
  const [dataVerified, setDataVerified] = useState({
    companyName: false,
    companyNumber: false,
    businessType: false,
    tradingDuration: false,
    employeeCount: false,
    annualTurnover: false,
    balanceSheetTotal: false,
    premisesType: false,
    energyBillResponsibility: false,
    samePremisesDuration: false,
    previousPublicSupport: false,
    supportAmount: false,
    projectDescription: false,
    estimatedCost: false
  });

  const [primaryReason, setPrimaryReason] = useState('');
  const [allFieldsTrue, setAllFieldsTrue] = useState(false);
  const [grantAmount, setGrantAmount] = useState(0);
  const [companyContribution, setCompanyContribution] = useState(0);
  const [suggestedServices, setSuggestedServices] = useState([]);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [emailSent, setEmailSent] = useState(false);

  // Your Google Apps Script Web App URL (replace with your actual URL)
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzChLctjwFjJ8Btyg0J17WuXj91slxpsyPsRDMd9ffc9CPr67h472gvxBlYqG7DpQVL5Q/exec";


  useEffect(() => {
    // Retrieve and verify all BEAS form data
    const verifiedData = {
      companyName: !!localStorage.getItem('beas_companyName'),
      businessType: !!localStorage.getItem('beas_businessType'),
      tradingDuration: parseInt(localStorage.getItem('beas_tradingDuration') || '0') >= 12,
      employeeCount: parseInt(localStorage.getItem('beas_employeeCount') || '0') < 250,
      annualTurnover: parseFloat(localStorage.getItem('beas_annualTurnover') || '0') < 50000000,
      balanceSheetTotal: parseFloat(localStorage.getItem('beas_balanceSheetTotal') || '0') < 43000000,
      premisesType: !!localStorage.getItem('beas_premisesType'),
      energyBillResponsibility: localStorage.getItem('beas_energyBillResponsibility') === 'Yes',
      samePremisesDuration: parseInt(localStorage.getItem('beas_samePremisesDuration') || '0') >= 12,
      previousPublicSupport: localStorage.getItem('beas_previousPublicSupport') === 'No' || 
                            (localStorage.getItem('beas_previousPublicSupport') === 'Yes' && 
                             parseFloat(localStorage.getItem('beas_supportAmount') || '0') <= 315000),
      supportAmount: localStorage.getItem('beas_previousPublicSupport') === 'No' || 
                    (localStorage.getItem('beas_previousPublicSupport') === 'Yes' && 
                     parseFloat(localStorage.getItem('beas_supportAmount') || '0') <= 315000),
      estimatedCost: parseFloat(localStorage.getItem('beas_estimatedCost') || '0') >= 1000 && 
                    parseFloat(localStorage.getItem('beas_estimatedCost') || '0') <= 200000
    };

    const allFieldsTrue = Object.values(verifiedData).every(Boolean);
    setAllFieldsTrue(allFieldsTrue);
    setDataVerified(verifiedData);

    // Calculate grant amount (up to 50% of project cost, max £100,000)
    const projectCost = parseFloat(localStorage.getItem('beas_estimatedCost') || '0');
    const calculatedGrant = Math.min(projectCost * 0.5, 100000);
    const calculatedContribution = projectCost - calculatedGrant;
    
    setGrantAmount(calculatedGrant);
    setCompanyContribution(calculatedContribution);

    // Determine primary reason for ineligibility
    if (!allFieldsTrue) {
      if (!verifiedData.employeeCount || !verifiedData.annualTurnover || !verifiedData.balanceSheetTotal) {
        setPrimaryReason('Business does not meet SME criteria (size, turnover, or balance sheet requirements)');
      } else if (!verifiedData.tradingDuration || !verifiedData.samePremisesDuration) {
        setPrimaryReason('Business has not been trading long enough or at current premises for minimum 12 months');
      } else if (!verifiedData.energyBillResponsibility) {
        setPrimaryReason('Business is not responsible for energy bills at the premises');
      } else if (!verifiedData.previousPublicSupport) {
        setPrimaryReason('Previous public support exceeds allowable limits');
      } else if (!verifiedData.estimatedCost) {
        setPrimaryReason('Project cost outside allowable range (£1,000 - £200,000)');
      } else {
        setPrimaryReason('Business or project characteristics do not meet scheme requirements');
      }
    }

    // Load user data for email
    const userName = localStorage.getItem('fullName') || 'Business Owner';
    const userEmail = localStorage.getItem('email') || '';

    setUserData({
      name: userName,
      email: userEmail
    });

    // Load suggested services
    loadSuggestedServices();
  }, []);

  const formattedPrice = (price) =>
    price
      ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)
      : '-';

  // Load suggested services from localStorage
  const loadSuggestedServices = () => {
    try {
      // Load BEAS services from localStorage (similar to PPA services)
      const beasServices = JSON.parse(localStorage.getItem('admin_beas_services') || '[]');
      
      // If no specific BEAS services, use default improvements
      if (beasServices.length === 0) {
        const defaultServices = [
          { 
            title: 'Solar PV Installation', 
            description: 'Install photovoltaic panels to generate renewable electricity and reduce grid dependency.',
            price: 25000
          },
          { 
            title: 'HVAC System Upgrade', 
            description: 'Replace old heating and cooling systems with high-efficiency models and smart controls.',
            price: 18000
          },
          { 
            title: 'LED Lighting Retrofit', 
            description: 'Upgrade to energy-efficient LED lighting throughout your commercial premises.',
            price: 8000
          },
          { 
            title: 'Building Insulation', 
            description: 'Improve roof, wall, and floor insulation to reduce heating and cooling costs.',
            price: 15000
          },
          { 
            title: 'Energy Monitoring System', 
            description: 'Implement smart energy monitoring systems to track and optimize energy usage.',
            price: 5000
          },
          { 
            title: 'Process Optimization', 
            description: 'Optimize industrial processes for maximum energy efficiency and cost savings.',
            price: 30000
          }
        ];
        setSuggestedServices(defaultServices);
        calculateTotalCost(defaultServices);
      } else {
        setSuggestedServices(beasServices);
        calculateTotalCost(beasServices);
      }
      
    } catch (error) {
      console.error('Error loading suggested services:', error);
    }
  };

  // Calculate total estimated cost from services
  const calculateTotalCost = (services) => {
    let total = 0;

    services.forEach(service => {
      const price = service.price;
      if (price) {
        total += Number(price);
      }
    });

    if (total > 0) {
      const convertedTotal = formattedPrice(total);
      setTotalEstimatedCost(convertedTotal.toString());
      return convertedTotal;
    }

    return '';
  };

    const verificationConfig = {
    companyName: {
      title: "Company Registration",
      description: {
        true: "Your company is properly registered and verified.",
        false: "Company registration details could not be verified.",
      },
    },
    businessType: {
      title: "Business Type",
      description: {
        true: "Eligible business structure (incorporated entity).",
        false: "Business type not eligible (sole traders excluded).",
      },
    },
    tradingDuration: {
      title: "Trading Duration",
      description: {
        true: "Business has been trading for 12+ months.",
        false: "Business has been trading for less than 12 months.",
      },
    },
    employeeCount: {
      title: "Employee Count",
      description: {
        true: "Fewer than 250 employees (SME criteria met).",
        false: "250 or more employees (exceeds SME limit).",
      },
    },
    annualTurnover: {
      title: "Annual Turnover",
      description: {
        true: "Turnover under €50 million (SME criteria met).",
        false: "Turnover exceeds €50 million SME limit.",
      },
    },
    balanceSheetTotal: {
      title: "Balance Sheet",
      description: {
        true: "Balance sheet under €43 million (SME criteria met).",
        false: "Balance sheet exceeds €43 million SME limit.",
      },
    },
    premisesType: {
      title: "Premises Type",
      description: {
        true: "Operates from commercial/industrial premises.",
        false: "Premises type not eligible (residential excluded).",
      },
    },
    energyBillResponsibility: {
      title: "Energy Bill Responsibility",
      description: {
        true: "Business is responsible for energy bills.",
        false: "Business is not responsible for energy bills.",
      },
    },
    samePremisesDuration: {
      title: "Premises Duration",
      description: {
        true: "Operating from same premises for 12+ months.",
        false: "Less than 12 months at current premises.",
      },
    },
    previousPublicSupport: {
      title: "Previous Public Support",
      description: {
        true: "Within allowable public support limits.",
        false: "Exceeds public support limits or requires review.",
      },
    },
    estimatedCost: {
      title: "Project Cost",
      description: {
        true: "Project cost within allowable range.",
        false: "Project cost outside scheme limits.",
      },
    },
  };


  const htmlContent = generateHTMLQuote(userData, suggestedServices, totalEstimatedCost, allFieldsTrue);
  const htmlEligibility = generateHTMLEligibilityResult({userData, verificationConfig, suggestedServices, dataVerified, allFieldsTrue, primaryReason});


  // Send email via Google Apps Script

  const sendEmailViaGAS = async () => {
    if (!userData.email) {
      alert('Please provide your email address first');
      return;
    }

    setSendingEmail(true);
    setEmailStatus('Sending...');

    try {
      // Create FormData for URL-encoded submission
      const formData = new URLSearchParams();
      formData.append('to', userData.email);
      formData.append('subject', allFieldsTrue ? 'BEAS Eligibility Result & Grant Details' : 'BEAS Eligibility Assessment Result');
      formData.append('htmlBody', htmlEligibility);
      formData.append('name', userData.name);
      
      // Send using fetch with proper headers for form data
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important: Use no-cors for Google Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });
      
      if (allFieldsTrue) {
        // Create FormData for URL-encoded submission
        const formData = new URLSearchParams();
        formData.append('to', userData.email);
        formData.append('subject', 'Energy Efficiency Quote');
        formData.append('htmlBody', htmlContent);
        formData.append('name', userData.name);
        
        // Send using fetch with proper headers for form data
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Important: Use no-cors for Google Apps Script
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString()
        });
      }

      setEmailStatus('✓ Email sent! Check your inbox.');
      setEmailSent(true);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus('Error - using fallback');

    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <>
      <Header />
      
      {/* Email Status Banner */}
      {emailSent && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg flex items-center">
            <FaCheckCircle className="w-5 h-5 mr-2" />
            <span>Results sent to your email successfully!</span>
          </div>
        </div>
      )}

      {/* Hero Section - Updated to match first design */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                {allFieldsTrue ? (
                  <FaCheckCircle className="w-12 h-12 text-green-600" />
                ) : (
                  <FaTimesCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
            </div>
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              BEAS Eligibility Results
            </h1>
            <p className="text-2xl text-gray-600 mb-8 font-light">
              {allFieldsTrue ? ( 
                <>
                  Congratulations! Your business is eligible for the BEAS scheme.
                </>
              ) : ( 
                <>
                  Unfortunately, your business does not currently meet the BEAS eligibility criteria.
                </>
              )}
            </p>

            {/* Email Status - Added from first design */}
            <div className="mb-8">
              {sendingEmail ? (
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                  Sending results to your email...
                </div>
              ) : emailSent && (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Results sent! Check your inbox.
                </div>
              )}
            </div>

            {/* Email Send Button - Added from first design */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={sendEmailViaGAS}
                disabled={sendingEmail || !userData.email || emailSent}
                className={`px-8 py-4 flex items-center justify-center rounded-xl font-medium transition-all duration-200 ${
                  sendingEmail 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : emailSent
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                }`}
              >
                {sendingEmail ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : emailSent ? (
                  <>
                    <FaEnvelope className="w-5 h-5 mr-3" />
                    Send Email Again
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5 mr-3" />
                    {allFieldsTrue ? 'Send Eligibility Result & Grant Details via Email' : 'Send Eligibility Result Email'}
                  </>
                )}
              </button>
              
              {/* Revise Button */}
              <button 
                onClick={() => window.location.replace('#/eligibility_checks/beas-check')}
                className="px-8 py-4 border border-blue-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaEdit className="w-5 h-5 mr-3" />
                Revise Application
              </button>
            </div>

            {/* Grant Details - Updated styling */}
            {allFieldsTrue && (
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <FaPiggyBank className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">{formattedPrice(grantAmount)}</div>
                    <div className="text-sm text-gray-600">Potential Grant</div>
                  </div>
                  <div className="p-4">
                    <FaBuilding className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">{formattedPrice(companyContribution)}</div>
                    <div className="text-sm text-gray-600">Your Contribution</div>
                  </div>
                  <div className="p-4">
                    <FaChartLine className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">50%</div>
                    <div className="text-sm text-gray-600">Match Funding</div>
                  </div>
                </div>
              </div>
            )}

            {userData.email && (
              <p className="mt-4 text-gray-600">
                Results will be sent to: <span className="font-medium">{userData.email}</span>
                {emailStatus && <span className="ml-2 text-sm text-green-600">{emailStatus}</span>}
              </p>
            )}

            {!userData.email && (
              <p className="mt-4 text-red-600">
                Please add your email address to receive the results
              </p>
            )}
          </div>
        </section>

        {/* Assessment Overview - Updated grid to match first design */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Business Eligibility Assessment</h2>
              <p className="text-gray-600 text-lg">Detailed breakdown of your BEAS application assessment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {Object.entries(verificationConfig).map(([key, item]) => {
                const verified = dataVerified[key];
                const Icon = verified ? FaCheckCircle : FaTimesCircle;

                return (
                  <div key={key} className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-16 h-16 ${
                      verified ? "bg-green-50" : "bg-red-50"
                    } rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${
                        verified ? "text-green-600" : "text-red-600"
                      }`} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className={`${
                      verified ? "text-green-600" : "text-red-600"
                    } font-medium leading-relaxed`}>
                      {item.description[verified ? "true" : "false"]}
                    </p>
                  </div>
                );
              })}
            </div>

            {!allFieldsTrue && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Why Your Business Didn't Qualify</h3>
                <p className="text-yellow-700 text-lg mb-4">{primaryReason}</p>
                <p className="text-yellow-600">
                  Don't worry! We have recommendations to help you improve your eligibility.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Solutions - Updated to match first design structure */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Your Personalized Recommendations
              </h2>
              <p className="text-gray-600 text-lg">
                Based on energy efficiency services for businesses
              </p>
              {totalEstimatedCost && suggestedServices.length > 0 && (
                <div className="mt-4 inline-block px-6 py-3 bg-blue-100 text-blue-800 rounded-lg">
                  <strong>Total Estimated Investment Range:</strong> {totalEstimatedCost}
                </div>
              )}
            </div>

            {suggestedServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suggestedServices.map((service, index) => (
                  <div key={index} className="group p-8 bg-white hover:bg-gray-50 transition-colors duration-200 border border-gray-200 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    {service.price && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium text-blue-800">Estimated Cost: </span>
                        <span className="text-blue-700">{formattedPrice(service.price)}</span>
                      </div>
                    )}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.replace('#/#contact');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      Learn more
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Loading Recommendations...</h3>
                <p className="text-gray-600">
                  Your personalized business energy suggestions will appear here shortly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Action Plan - Updated styling to match first design */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                {allFieldsTrue ? 'Next Steps for Your BEAS Grant' : 'Business Energy Improvement Plan'}
              </h2>
              <p className="text-gray-600 text-lg">
                {allFieldsTrue 
                  ? 'Structured approach to implement your energy efficiency project' 
                  : 'Strategic pathway to improve your business energy performance'}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {allFieldsTrue ? 'Free Business Energy Assessment' : 'Initial Energy Audit'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {allFieldsTrue
                      ? 'Schedule your complimentary detailed energy assessment to identify the most impactful improvements for your specific business operations.'
                      : 'Begin with a comprehensive energy audit to identify cost-effective efficiency measures for your business.'}
                  </p>
                  <button 
                    onClick={() => window.location.replace('#/#contact')}
                    className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200"
                  >
                    <FaCalendar className="w-4 h-4 mr-2" />
                    Schedule Assessment
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {allFieldsTrue ? 'Project Implementation' : 'Efficiency Upgrades'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {allFieldsTrue
                      ? 'Work with BEAS-approved installers to implement your chosen energy efficiency measures with quality assurance.'
                      : 'Implement recommended energy efficiency upgrades to improve your eligibility and reduce operational costs.'}
                  </p>
                  <button 
                    onClick={() => window.location.replace('#/#contact')}
                    className="text-green-900 font-medium flex items-center hover:text-green-700 transition-colors duration-200"
                  >
                    <FaUserTie className="w-4 h-4 mr-2" />
                    Find Approved Installers
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {allFieldsTrue ? 'Grant Processing & Support' : 'Reassessment & Application'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {allFieldsTrue
                      ? 'Complete the grant claim process with our support team and receive your match-funded contribution.'
                      : 'After implementing improvements, reassess your eligibility and submit a new BEAS application.'}
                  </p>
                  <button 
                    onClick={() => window.location.replace('#/#contact')}
                    className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200"
                  >
                    <FaClipboardList className="w-4 h-4 mr-2" />
                    {allFieldsTrue ? 'Start Grant Process' : 'Document Requirements'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Support Section - Updated to match first design */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Business Energy Specialist Support</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Our dedicated business energy advisors can provide personalized guidance on energy efficiency, 
              funding opportunities, and connecting you with certified professionals for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.replace('#/#contact')}
                className="px-8 py-4 border border-blue-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaPhone className="w-5 h-5 mr-3" />
                Schedule Business Consultation
              </button>
              <button 
                onClick={() => window.location.replace('#/#contact')}
                className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-green-600 hover:from-green-600 hover:to-indigo-700 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <FaUserTie className="w-5 h-5 mr-3" />
                Find Certified Installers
              </button>
            </div>

            {/* Additional Resources */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaLeaf className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Carbon Reduction</h3>
                <p className="text-gray-600 text-sm">Reduce your carbon footprint and meet sustainability goals</p>
              </div>
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaPiggyBank className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cost Savings</h3>
                <p className="text-gray-600 text-sm">Lower energy bills and improve operational efficiency</p>
              </div>
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaShieldAlt className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance</h3>
                <p className="text-gray-600 text-sm">Meet regulatory requirements and future-proof your business</p>
              </div>
            </div>
          </div>
        </section>
      </div>

       {/* <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div 
          dangerouslySetInnerHTML={{ __html: htmlEligibility }}
        /> */}

      <Footer />
    </>
  );
}