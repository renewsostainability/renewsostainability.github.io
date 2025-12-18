import { useState, useEffect, useMemo } from 'react';
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
  FaPaperPlane
} from 'react-icons/fa';

import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { generateHTMLQuote } from '../components/Quote';
import { generateHTMLEligibilityResult } from '../components/Result';

export default function PPAResultPage() {
  const [dataVerified, setDataVerified] = useState({
    nameOnBill: false,
    floorArea: false,
    propertyAge: false,
    propertyType: false,
    pensionCredit: false,
    benefits: false,
    epcRating: false,
    annualIncome: false
  });

  const [primaryReason, setPrimaryReason] = useState('');
  const [allFieldsTrue, setAllFieldsTrue] = useState(false);
  const [suggestedServices, setSuggestedServices] = useState([]);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState();
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [emailSent, setEmailSent] = useState(false);

  // Your Google Apps Script Web App URL
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzChLctjwFjJ8Btyg0J17WuXj91slxpsyPsRDMd9ffc9CPr67h472gvxBlYqG7DpQVL5Q/exec";

  useEffect(() => {
    // Load user data
    let uk_low_income = 34500;
    let expected_benefits = ['Universal Credit', 'Housing Benefit', 'Income-based Jobseeker\'s Allowance', 'Employment & Support Allowance'];
    let expected_epc_ratings = ['A', 'B', 'C'];
    let expected_property_types = ['detached', 'semi-detached', 'terraced'];
    let expected_property_ages = ['1991-1995', '1996-2002', '2003-2006', '2007-2011', '2012-present'];

    const pensionCredit = localStorage.getItem('whd_pensionCredit')?.trim() === 'Yes';
    const nameOnBill = localStorage.getItem('whd_nameOnBill')?.trim() === 'Yes';
    const floorArea = Number(localStorage.getItem('whd_floorArea')) > 100;
    const propertyType = expected_property_types.includes(localStorage.getItem('whd_propertyType')?.trim());
    const propertyAge = expected_property_ages.includes(localStorage.getItem('whd_propertyAge')?.trim());
    const benefitsArray = JSON.parse(localStorage.getItem('whd_benefits') || '[]');
    const benefits = benefitsArray.some(benefit => expected_benefits.includes(benefit));
    const epcRating = expected_epc_ratings.includes(localStorage.getItem('whd_epcRating')?.trim());
    const annualIncome = Number(localStorage.getItem('annualIncome')) > uk_low_income;

    const verifiedData = { nameOnBill, floorArea, propertyAge, propertyType, pensionCredit, benefits, epcRating, annualIncome };
    const allFieldsTrue = Object.values(verifiedData).every(Boolean);
    
    setAllFieldsTrue(allFieldsTrue);
    setDataVerified(verifiedData);

    if (!allFieldsTrue) {
      if (!verifiedData.benefits && !verifiedData.pensionCredit) {
        setPrimaryReason('Not receiving qualifying benefits or pension credit');
      } else if (!verifiedData.epcRating) {
        setPrimaryReason('EPC rating does not meet the required threshold (needs to be D, E, F, or G)');
      } else if (!verifiedData.nameOnBill) {
        setPrimaryReason('Name on electricity bill could not be verified');
      } else {
        setPrimaryReason('Property characteristics do not meet scheme requirements');
      }
    }

    // Load user data for quotes
    const userName = localStorage.getItem('fullName') || 'Customer';
    const userEmail = localStorage.getItem('email') || '';

    setUserData({
      name: userName,
      email: userEmail
    });

    // Load suggested services from localStorage
    loadSuggestedServices();
  }, []);

  const formattedPrice = (price) =>
    price
      ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price)
      : '-';

  // Load suggested services from localStorage and calculate total cost
  const loadSuggestedServices = () => {
    try {
      // Load PPA services from localStorage (where admin stores them)
      const ppaServices = JSON.parse(localStorage.getItem('admin_ppa_services') || '[]');
      
      // Take up to 6 services
      setSuggestedServices(ppaServices);
      
      // Calculate total estimated cost range
      if (ppaServices.length > 0) {
        calculateTotalCost(ppaServices);
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
        total += Number(price); // ensure numeric addition
      }
    });


    if (total > 0) {
      const convertedTotal = formattedPrice(total);
      setTotalEstimatedCost(convertedTotal.toString());
      return convertedTotal;
    }

    return '';
  };

  // Verification configuration
  const verificationConfig = {
    pensionCredit: {
      title: "Pension Credit",
      description: {
        true: "You receive the Guarantee Credit element of Pension Credit with a participating energy supplier.",
        false: "You do not receive the Guarantee Credit element of Pension Credit.",
      },
    },
    benefits: {
      title: "Qualifying Benefits",
      description: {
        true: "Your household receives a qualifying means-tested benefit (e.g., Universal Credit, Housing Benefit, Income Support).",
        false: "You are not receiving any qualifying means-tested benefits.",
      },
    },
    propertyType: {
      title: "Property Type",
      description: {
        true: "Your property type qualifies for high-energy-cost assessment.",
        false: "Your property type does not qualify for high-energy-cost assessment.",
      },
    },
    propertyAge: {
      title: "Property Age",
      description: {
        true: "Your property age qualifies for high-energy-cost assessment.",
        false: "Your property age does not qualify for high-energy-cost assessment.",
      },
    },
    floorArea: {
      title: "Floor Area",
      description: {
        true: "Your property's floor area supports a high energy-cost score.",
        false: "Your property's floor area does not indicate a high energy-cost score.",
      },
    },
    annualIncome: {
      title: "Annual Income",
      description: {
        true: "Your annual income meets the eligibility requirement.",
        false: "Your annual income does not meet the eligibility requirement.",
      },
    },
    nameOnBill: {
      title: "Bill Responsibility",
      description: {
        true: "Your name (or your partner's) is on the electricity bill.",
        false: "Your name (or your partner's) is not on the electricity bill.",
      },
    },
    epcRating: {
      title: "EPC Rating",
      description: {
        true: "Your EPC rating is D, E, F or G, which meets the eligibility requirement.",
        false: "Your EPC rating is not D, E, F or G (your home is too energy-efficient).",
      },
    },
  };

  const htmlContent = generateHTMLQuote(userData, suggestedServices, totalEstimatedCost, allFieldsTrue);

  const htmlEligibility = generateHTMLEligibilityResult({userData, verificationConfig, suggestedServices, dataVerified, allFieldsTrue, primaryReason});

    // Send email via Google Apps Script - Using FormData approach
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
      formData.append('subject', 'Energy Efficiency Eligibility Result');
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
            <span>Quote sent to your email successfully!</span>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                {allFieldsTrue ? (
                  <FaCheckCircle className="w-12 h-12 text-green-600" />
                ) : (
                  <FaTimesCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
            </div>
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Eligibility Results & Quote
            </h1>
            <p className="text-2xl text-gray-600 mb-8 font-light">
              {allFieldsTrue ? ( 
                <>
                  Congratulations! You qualify for energy efficiency support.
                </>
              ) : ( 
                <>
                  While you don't qualify for this scheme, we have recommendations to improve your energy efficiency.
                </>
              )}
            </p>

            {/* Email Status */}
            <div className="mb-8">
              {sendingEmail ? (
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                  Sending quote to your email...
                </div>
              ) : emailSent && (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Quote sent! Check your inbox.
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Email Send Button */}
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
                    Send Email
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-5 h-5 mr-3" />
                    {allFieldsTrue ? 'Send Eligibility Result & Quote via Email' : 'Send Eligibility Result Email'}
                  </>
                )}
              </button>
              
              {/* Revise Button */}
              <button 
                onClick={() => window.location.replace('#/eligibility_checks/ppa-check')}
                className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaEdit className="w-5 h-5 mr-3" />
                Revise Application
              </button>
            </div>

            {userData.email && (
              <p className="mt-4 text-gray-600">
                Quote will be sent to: <span className="font-medium">{userData.email}</span>
                {emailStatus && <span className="ml-2 text-sm text-green-600">{emailStatus}</span>}
              </p>
            )}

            {!userData.email && (
              <p className="mt-4 text-red-600">
                Please add your email address to receive the quote
              </p>
            )}

          </div>
        </section>

        {/* Assessment Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Assessment Summary</h2>
              <p className="text-gray-600 text-lg">Detailed breakdown of your application</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {Object.entries(verificationConfig).map(([key, item]) => {
                const verified = dataVerified[key];
                const Icon = verified ? FaCheckCircle : FaTimesCircle;

                return (
                  <div key={key} className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className={`w-16 h-16 ${
                      verified ? "text-green-50" : "text-red-50"
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
                    } font-medium`}>
                      {item.description[verified ? "true" : "false"]}
                    </p>
                  </div>
                );
              })}
            </div>

            {!allFieldsTrue && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Why You Didn't Qualify</h3>
                <p className="text-yellow-700 text-lg">{primaryReason}</p>
                <p className="text-yellow-600 mt-4">
                  Don't worry! We have recommendations to help you improve.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Solutions */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Your Personalized Recommendations
              </h2>
              <p className="text-gray-600 text-lg">
                Based on services in our database
              </p>
              {totalEstimatedCost && suggestedServices.length > 0 && (
                <div className="mt-4 inline-block px-6 py-3 bg-emerald-100 text-emerald-800 rounded-lg">
                  <strong>Total Estimated Cost Range:</strong> {totalEstimatedCost}
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
                      <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                        <span className="font-medium text-emerald-800">Estimated Cost: </span>
                        <span className="text-emerald-700">{formattedPrice(service.price)}</span>
                      </div>
                    )}
                    {service.url && (
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        Learn more
                        <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    )}
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
                  Your personalized suggestions will appear here shortly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Action Plan */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Recommended Action Plan</h2>
              <p className="text-gray-600 text-lg">{allFieldsTrue ? 'Next Steps to Improve Net-zero Score' : 'Structured approach to improve your eligibility'}</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Initial Assessment</h3>
                  <p className="text-gray-600 mb-4">
                    Schedule a comprehensive energy assessment to identify the most impactful improvements for your specific property.
                  </p>
                  <button className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                    <FaCalendar className="w-4 h-4 mr-2" />
                    Schedule Assessment
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Implementation Strategy</h3>
                  <p className="text-gray-600 mb-4">
                    Work with certified installers to implement cost-effective energy efficiency measures that optimize your EPC rating.
                  </p>
                  <button className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                    <FaUserTie className="w-4 h-4 mr-2" />
                    Find Installers
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Reassessment & Application</h3>
                  <p className="text-gray-600 mb-4">
                    Once improvements are complete, obtain a new EPC certificate and reapply for the energy support scheme.
                  </p>
                  <button className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                    <FaClipboardList className="w-4 h-4 mr-2" />
                    Document Requirements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Support */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Professional Guidance Available</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Our energy specialists can provide personalized advice and connect you with certified professionals to help you achieve your energy efficiency goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.replace('#/#contact')}
                className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaPhone className="w-5 h-5 mr-3" />
                Schedule Consultation
              </button>
              <button className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <FaUserTie className="w-5 h-5 mr-3" />
                Find Certified Installers
              </button>
            </div>
          </div>
        </section>
      </div>
      
        <div 
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div 
          dangerouslySetInnerHTML={{ __html: htmlEligibility }}
        />

      <Footer />
    </>
  );
}