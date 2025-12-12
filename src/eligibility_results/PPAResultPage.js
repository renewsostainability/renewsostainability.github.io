import { useState, useEffect } from 'react';
import { 
  FaTimesCircle,
  FaEdit,
  FaHeadset,
  FaLightbulb,
  FaSolarPanel,
  FaTint,
  FaThermometerHalf,
  FaHome,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaUserTie,
  FaClipboardList,
  FaPhone,
  FaCalendar,
  FaEnvelope,
  FaPaperPlane,
  FaFilePdf
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
  const [totalEstimatedCost, setTotalEstimatedCost] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [emailSubject, setEmailSubject] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const htmlQuote = generateHTMLQuote(userData, suggestedServices, totalEstimatedCost, allFieldsTrue);

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
    const userPhone = localStorage.getItem('phone') || '09031234567';

    setUserData({
      name: userName,
      email: userEmail,
      phone: userPhone
    });

    // Set email subject
    const subject = allFieldsTrue 
      ? `Energy Efficiency Quote - Approved for ${userName}`
      : `Energy Efficiency Recommendations - ${userName}`;
    setEmailSubject(subject);

    // Load suggested services from localStorage
    loadSuggestedServices();
  }, []);

  // Load suggested services from localStorage and calculate total cost
  const loadSuggestedServices = () => {
    try {
      // Load PPA services from localStorage (where admin stores them)
      const ppaServices = JSON.parse(localStorage.getItem('admin_ppa_services') || '[]');
      
      // Filter to only include services with price information
      const servicesWithPrice = ppaServices.filter(service => service.price && service.price.trim() !== '');
      
      // Take up to 6 services
      const suggestedServices = servicesWithPrice.slice(0, 6);
      setSuggestedServices(suggestedServices);
      
      // Calculate total estimated cost range
      if (suggestedServices.length > 0) {
        calculateTotalCost(suggestedServices);
      }
      
    } catch (error) {
      console.error('Error loading suggested services:', error);
    }
  };

  // Calculate total estimated cost from services
  const calculateTotalCost = (services) => {
    let minTotal = 0;
    let maxTotal = 0;
    
    services.forEach(service => {
      const price = service.price;
      if (price) {
        // Extract numbers from price strings like "£800 - £1,500" or "£4,000"
        const numbers = price.match(/\d+(?:,\d+)?/g);
        if (numbers) {
          const nums = numbers.map(num => parseFloat(num.replace(/,/g, '')));
          if (nums.length === 2) {
            minTotal += nums[0];
            maxTotal += nums[1];
          } else if (nums.length === 1) {
            minTotal += nums[0];
            maxTotal += nums[0];
          }
        }
      }
    });
    
    if (minTotal > 0 || maxTotal > 0) {
      const costStr = `£${minTotal.toLocaleString()} - £${maxTotal.toLocaleString()}`;
      setTotalEstimatedCost(costStr);
      return costStr;
    }
    return '';
  };

  // Send email via Google Apps Script - Using FormData approach
  const sendEmailViaGAS = async () => {
    if (!userData.email) {
      alert('Please provide your email address first');
      return;
    }

    setSendingEmail(true);
    setEmailStatus('Sending...');

    try {
      // Generate HTML quote
      const htmlContent = generateHTMLQuote(userData, suggestedServices, totalEstimatedCost, allFieldsTrue);
      
      // Create FormData for URL-encoded submission
      const formData = new URLSearchParams();
      formData.append('to', userData.email);
      formData.append('subject', emailSubject);
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

      // With no-cors, we can't read the response, but we can show success
      setEmailStatus('✓ Email sent! Check your inbox.');
      setEmailSent(true);
      
      // Show success alert
      setTimeout(() => {
        alert(`✅ Quote has been sent to ${userData.email}!\n\nPlease check your inbox (and spam folder) within a few minutes.`);
      }, 500);
      
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus('Error - using fallback');

    } finally {
      setSendingEmail(false);
    }
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

  const htmlEligibility = generateHTMLEligibilityResult({userData, verificationConfig, suggestedServices, dataVerified, allFieldsTrue, primaryReason});


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
                    Send Quote via Email
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
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors duration-200">
                      {index % 6 === 0 && <FaHome className="w-6 h-6 text-blue-600" />}
                      {index % 6 === 1 && <FaLightbulb className="w-6 h-6 text-yellow-500" />}
                      {index % 6 === 2 && <FaShieldAlt className="w-6 h-6 text-green-500" />}
                      {index % 6 === 3 && <FaThermometerHalf className="w-6 h-6 text-red-500" />}
                      {index % 6 === 4 && <FaSolarPanel className="w-6 h-6 text-purple-500" />}
                      {index % 6 === 5 && <FaTint className="w-6 h-6 text-cyan-500" />}
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    {service.price && (
                      <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                        <span className="font-medium text-emerald-800">Estimated Cost: </span>
                        <span className="text-emerald-700">{service.price}</span>
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

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Need Help?</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Our energy specialists are here to help you understand your recommendations and next steps.
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
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Quote Support</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-gray-600">
                  <FaEnvelope className="w-5 h-5 inline mr-2" />
                  quotes@energyefficiency.co.uk
                </div>
                <div className="text-gray-600">
                  <FaPhone className="w-5 h-5 inline mr-2" />
                  0800 123 4567
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                If you have issues receiving your quote via email, please check your spam folder or contact us.
              </p>
            </div>
          </div>
        </section>
      </div>
      
        <div 
          dangerouslySetInnerHTML={{ __html: htmlQuote }}
        />

        <div 
          dangerouslySetInnerHTML={{ __html: htmlEligibility }}
        />

      <Footer />
    </>
  );
}