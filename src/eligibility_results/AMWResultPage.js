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
  FaTree,
  FaIndustry,
  FaShieldAlt
} from 'react-icons/fa';

import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { generateHTMLQuote } from '../components/Quote';
import { generateHTMLEligibilityResult } from '../components/Result';

export default function AMWResultPage() {
  const [dataVerified, setDataVerified] = useState({
    energyUsage: false,
    siteLocations: false,
    roofSize: false,
    roofCondition: false,
    asbestosPresent: false,
    ledLighting: false,
    heatingSystem: false,
    businessGrounds: false,
    carportsRequired: false,
    solarSuitability: false
  });

  const [primaryReason, setPrimaryReason] = useState('');
  const [allFieldsTrue, setAllFieldsTrue] = useState(false);
  const [suggestedServices, setSuggestedServices] = useState([]);
  const [totalEstimatedCost, setTotalEstimatedCost] = useState('');
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
    // Retrieve and verify all AMW form data
    const energyUsage = Number(localStorage.getItem('amw_energyUsage') || '0');
    const siteLocations = Number(localStorage.getItem('amw_siteLocations') || '0');
    const roofSize = Number(localStorage.getItem('amw_roofSize') || '0');
    const roofCondition = localStorage.getItem('amw_roofCondition');
    const asbestosPresent = localStorage.getItem('amw_asbestosPresent');
    const ledLighting = localStorage.getItem('amw_ledLighting');
    const heatingSystem = localStorage.getItem('amw_heatingSystem');
    const businessGrounds = localStorage.getItem('amw_businessGrounds');
    const carportsRequired = localStorage.getItem('amw_carportsRequired');
    const solarSuitability = localStorage.getItem('amw_solarSuitability');

    // Set verification data for display
    const verifiedData = {
      energyUsage: energyUsage >= 150000,
      siteLocations: siteLocations > 0,
      roofSize: roofSize > 50,
      roofCondition: roofCondition === 'good' || roofCondition === 'excellent' || roofCondition === 'fair',
      asbestosPresent: asbestosPresent === 'No',
      ledLighting: ledLighting === 'No' || ledLighting === 'Partial',
      heatingSystem: heatingSystem && heatingSystem !== 'electric',
      businessGrounds: businessGrounds === 'Yes',
      carportsRequired: carportsRequired === 'Yes' || carportsRequired === 'Possible Future',
      solarSuitability: solarSuitability && solarSuitability !== 'unsure'
    };

    const allFieldsTrue = Object.values(verifiedData).every(Boolean);
    setAllFieldsTrue(allFieldsTrue);
    setDataVerified(verifiedData);

    // Determine primary reason for ineligibility
    if (!allFieldsTrue) {
      if (!verifiedData.energyUsage) {
        setPrimaryReason('Energy usage below minimum threshold of 150,000 kWh per year for optimal PPA benefits');
      } else if (!verifiedData.asbestosPresent) {
        setPrimaryReason('Asbestos presence requires additional remediation before solar installation');
      } else if (!verifiedData.roofCondition) {
        setPrimaryReason('Roof condition may require replacement or significant repairs for solar installation');
      } else if (!verifiedData.roofSize) {
        setPrimaryReason('Insufficient roof space for commercial-scale solar panel installation');
      } else if (!verifiedData.siteLocations) {
        setPrimaryReason('Multiple site locations provide better scalability and investment opportunities');
      } else {
        setPrimaryReason('Business characteristics do not meet all PPA requirements');
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
      // Load AMW services from localStorage
      const amwServices = JSON.parse(localStorage.getItem('admin_amw_services') || '[]');
      
      // If no specific AMW services, use default improvements with pricing
      if (amwServices.length === 0) {
        const defaultServices = [
          { 
            title: 'Solar PPA Installation', 
            description: 'Zero upfront cost solar panel installation with Power Purchase Agreement - generate renewable electricity with fixed pricing for 25 years.',
            price: 0, // PPA means no upfront cost
            url: '#'
          },
          { 
            title: 'HVAC System Upgrade', 
            description: 'Replace old heating and cooling systems with high-efficiency models and smart controls for better energy management and reduced operational costs.',
            price: 25000,
            url: '#'
          },
          { 
            title: 'LED Lighting Retrofit', 
            description: 'Complete LED lighting upgrade throughout commercial premises with significant energy savings and improved lighting quality.',
            price: 12000,
            url: '#'
          },
          { 
            title: 'Roof Replacement Package', 
            description: 'Comprehensive roof replacement included in PPA agreement, ensuring optimal conditions for solar panel installation with 25-year warranty.',
            price: 0, // Often included in PPA
            url: '#'
          },
          { 
            title: 'EV Charging Infrastructure', 
            description: 'Solar-powered electric vehicle charging stations with carport installations for sustainable transportation and employee benefits.',
            price: 18000,
            url: '#'
          },
          { 
            title: 'Energy Monitoring System', 
            description: 'Advanced energy monitoring and management system to track consumption, optimize usage, and maximize renewable energy benefits.',
            price: 8000,
            url: '#'
          }
        ];
        setSuggestedServices(defaultServices);
        calculateTotalCost(defaultServices);
      } else {
        setSuggestedServices(amwServices);
        calculateTotalCost(amwServices);
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
    energyUsage: {
      title: "Energy Usage",
      description: {
        true: "Meets minimum 150,000 kWh annual electricity requirement for PPA.",
        false: "Below minimum energy usage threshold for optimal PPA benefits.",
      },
    },
    siteLocations: {
      title: "Site Locations",
      description: {
        true: "Multiple site locations provide scalability opportunities.",
        false: "Single site location - consider expansion for greater benefits.",
      },
    },
    roofSize: {
      title: "Roof Space",
      description: {
        true: "Adequate roof space available for solar panel installation.",
        false: "Limited roof space may restrict solar installation capacity.",
      },
    },
    roofCondition: {
      title: "Roof Condition",
      description: {
        true: "Roof condition suitable for solar installation without major repairs.",
        false: "Roof condition may require assessment or replacement.",
      },
    },
    asbestosPresent: {
      title: "Asbestos Status",
      description: {
        true: "No asbestos concerns - optimal for installation.",
        false: "Asbestos presence may require additional remediation.",
      },
    },
    ledLighting: {
      title: "LED Lighting",
      description: {
        true: "LED upgrade potential identified for additional savings.",
        false: "Limited LED upgrade potential - already efficient.",
      },
    },
    heatingSystem: {
      title: "Heating System",
      description: {
        true: "Heating system has upgrade potential for efficiency gains.",
        false: "Heating system may have limited upgrade opportunities.",
      },
    },
    businessGrounds: {
      title: "Available Grounds",
      description: {
        true: "Ground space available for additional renewable installations.",
        false: "Limited ground space for expansion opportunities.",
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
        formData.append('subject', allFieldsTrue ? 'AMW Renewable PPA Eligibility & Proposal' : 'AMW Renewable Energy Assessment Results');
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
      
      {/* Email Status Banner - Added from first design */}
      {emailSent && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg flex items-center">
            <FaCheckCircle className="w-5 h-5 mr-2" />
            <span>Assessment sent to your email successfully!</span>
          </div>
        </div>
      )}

      {/* Hero Section - Updated to match first design */}
      <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
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
              AMW Renewable Energy Assessment
            </h1>
            <p className="text-2xl text-gray-600 mb-8 font-light">
              {allFieldsTrue ? ( 
                <>
                  Congratulations! Your business is well-suited for AMW Renewable PPA solutions.
                </>
              ) : ( 
                <>
                  Your business shows potential for renewable energy improvements.
                </>
              )}
            </p>

            {/* Email Status - Added from first design */}
            <div className="mb-8">
              {sendingEmail ? (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700 mr-2"></div>
                  Sending assessment to your email...
                </div>
              ) : emailSent && (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  Assessment sent! Check your inbox.
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
                    {allFieldsTrue ? 'Send PPA Proposal via Email' : 'Send Energy Assessment via Email'}
                  </>
                )}
              </button>
              
              {/* Revise Button */}
              <button 
                onClick={() => window.location.replace('#/eligibility_checks/amw-check')}
                className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaEdit className="w-5 h-5 mr-3" />
                Revise Application
              </button>
            </div>

            {/* PPA Benefits Summary - Enhanced */}
            {allFieldsTrue && (
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <FaShieldAlt className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">£0</div>
                    <div className="text-sm text-gray-600">Upfront Cost</div>
                  </div>
                  <div className="p-4">
                    <FaTree className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">25 Years</div>
                    <div className="text-sm text-gray-600">Price Security</div>
                  </div>
                  <div className="p-4">
                    <FaIndustry className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-600">Maintenance Included</div>
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
                Please add your email address to receive the assessment
              </p>
            )}
          </div>
        </section>

        {/* Assessment Overview - Updated grid to match first design */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Site Assessment Results</h2>
              <p className="text-gray-600 text-lg">Comprehensive analysis of your business energy profile</p>
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
                    } font-medium`}>
                      {item.description[verified ? "true" : "false"]}
                    </p>
                  </div>
                );
              })}
            </div>

            {!allFieldsTrue && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Why Additional Review Is Needed</h3>
                <p className="text-yellow-700 text-lg">{primaryReason}</p>
                <p className="text-yellow-600 mt-4">
                  Our renewable energy specialists can help you address these considerations.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Recommended Solutions - Updated to match first design structure */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Your Personalized Renewable Solutions
              </h2>
              <p className="text-gray-600 text-lg">
                Based on your business energy profile and PPA opportunities
              </p>
              {totalEstimatedCost && suggestedServices.length > 0 && (
                <div className="mt-4 inline-block px-6 py-3 bg-emerald-100 text-emerald-800 rounded-lg">
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
                    {service.price !== undefined && (
                      <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                        <span className="font-medium text-emerald-800">Investment: </span>
                        <span className="text-emerald-700">
                          {service.price === 0 ? 'Included in PPA (no upfront cost)' : formattedPrice(service.price)}
                        </span>
                      </div>
                    )}
                    {service.url && (
                      <a
                        href={service.url}
                        onClick={(e) => {
                          if (service.url === '#') {
                            e.preventDefault();
                            window.location.replace('#/#contact');
                          }
                        }}
                        className="text-green-600 hover:text-green-800 font-medium flex items-center"
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
                <h3 className="text-xl font-medium text-gray-900 mb-2">Loading Renewable Solutions...</h3>
                <p className="text-gray-600">
                  Your personalized PPA recommendations will appear here shortly.
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
                {allFieldsTrue ? 'Next Steps for Your PPA' : 'Renewable Energy Pathway'}
              </h2>
              <p className="text-gray-600 text-lg">
                {allFieldsTrue 
                  ? 'Structured approach to implement your Power Purchase Agreement' 
                  : 'Strategic pathway to optimize your business for renewable energy'}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {allFieldsTrue ? 'Detailed Site Assessment' : 'Initial Energy Audit'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {allFieldsTrue
                      ? 'Comprehensive technical assessment to finalize system design and installation planning.'
                      : 'Professional energy audit to identify specific improvement opportunities and cost savings.'}
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
                    {allFieldsTrue ? 'PPA Agreement Finalization' : 'Efficiency Implementation'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {allFieldsTrue
                      ? 'Review and sign the Power Purchase Agreement with guaranteed savings and fixed pricing.'
                      : 'Implement recommended energy efficiency measures to improve your eligibility and reduce costs.'}
                  </p>
                  <button 
                    onClick={() => window.location.replace('#/#contact')}
                    className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200"
                  >
                    <FaUserTie className="w-4 h-4 mr-2" />
                    {allFieldsTrue ? 'Review Agreement' : 'Get Implementation Quote'}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">
                    {allFieldsTrue ? 'System Installation & Commissioning' : 'Performance Monitoring'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {allFieldsTrue
                      ? 'Professional installation of renewable energy systems with ongoing maintenance and support.'
                      : 'Monitor energy performance and savings to optimize your renewable energy strategy.'}
                  </p>
                  <button 
                    onClick={() => window.location.replace('#/#contact')}
                    className="text-gray-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200"
                  >
                    <FaClipboardList className="w-4 h-4 mr-2" />
                    {allFieldsTrue ? 'Start Installation' : 'View Monitoring Options'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Support Section - Updated to match first design */}
        <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-6">Renewable Energy Specialist Support</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Our dedicated renewable energy consultants provide comprehensive support for PPA implementation, 
              energy efficiency upgrades, and sustainable business transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.location.replace('#/#contact')}
                className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaPhone className="w-5 h-5 mr-3" />
                Schedule Energy Consultation
              </button>
              <button 
                onClick={() => window.location.replace('#/#contact')}
                className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <FaUserTie className="w-5 h-5 mr-3" />
                Request PPA Proposal
              </button>
            </div>

            {/* Additional Benefits - Updated styling */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaShieldAlt className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">25-Year Price Security</h3>
                <p className="text-gray-600 text-sm">Fixed energy pricing with long-term cost predictability</p>
              </div>
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaTree className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Carbon Neutral Goals</h3>
                <p className="text-gray-600 text-sm">Achieve sustainability targets and environmental compliance</p>
              </div>
              <div className="text-center p-8 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <FaIndustry className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Zero Capital Investment</h3>
                <p className="text-gray-600 text-sm">No upfront costs with comprehensive maintenance included</p>
              </div>
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