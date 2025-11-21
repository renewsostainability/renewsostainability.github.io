"use client";
import { useRouter } from 'next/navigation';
import { 
  FaTimesCircle,
  FaEdit,
  FaHeadset,
  FaLightbulb,
  FaSolarPanel,
  FaTint,
  FaThermometerHalf,
  FaBuilding,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaUserTie,
  FaClipboardList,
  FaPhone,
  FaCalendar,
  FaIndustry,
  FaCar,
  FaTree,
  FaRulerCombined,
  FaExclamationTriangle,
  FaCheck
} from 'react-icons/fa';

import Header from '../../components/homepage/Header';
import Footer from '../../components/homepage/Footer';
import { useState, useEffect } from 'react';

export default function AMWRenewableEnergyResult() {
  const router = useRouter();

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
  }, []);

  const improvements = [
    { 
      icon: FaSolarPanel, 
      title: 'Solar PV Installation', 
      color: 'text-yellow-500', 
      desc: 'Install photovoltaic panels to generate renewable electricity and reduce grid dependency with zero upfront cost.' 
    },
    { 
      icon: FaThermometerHalf, 
      title: 'HVAC System Upgrade', 
      color: 'text-blue-600', 
      desc: 'Replace old heating and cooling systems with high-efficiency models and smart controls for better energy management.' 
    },
    { 
      icon: FaLightbulb, 
      title: 'LED Lighting Retrofit', 
      color: 'text-green-500', 
      desc: 'Upgrade to energy-efficient LED lighting throughout your commercial premises with significant energy savings.' 
    },
    { 
      icon: FaBuilding, 
      title: 'Roof Replacement', 
      color: 'text-orange-500', 
      desc: 'Comprehensive roof replacement included in PPA, ensuring optimal conditions for solar panel installation.' 
    },
    { 
      icon: FaCar, 
      title: 'EV Charging Infrastructure', 
      color: 'text-cyan-500', 
      desc: 'Install electric vehicle charging stations with solar-powered carports for sustainable transportation.' 
    },
    { 
      icon: FaTree, 
      title: 'Carbon Credit Generation', 
      color: 'text-emerald-500', 
      desc: 'Generate carbon credits through renewable energy production and energy efficiency improvements.' 
    }
  ];

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

  return (
    <>
      <Header />
      
      {/* Hero Section */}
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
            AMW Eligibility Result
          </h1>
          <p className="text-2xl text-gray-600 mb-8 font-light">
            {allFieldsTrue ? ( 
              <>
                Congratulations! Your business is well-suited for AMW Renewable.
              </>
            ) : ( 
              <>
                Your business shows potential for renewable energy improvements.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/eligibility_checks/amw_renewable_ppa_eligibility_form')}
              className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
            >
              <FaEdit className="w-5 h-5 mr-3" />
              Revise Application
            </button>
            {allFieldsTrue ? (
              <button
                // onClick={() => router.push('/dashboard')}
                className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaClipboardList className="w-5 h-5 mr-3" />
                Go to Dashboard
              </button>
              ) : (
              <button
                onClick={() => router.push('/#contact')}
                className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaHeadset className="w-5 h-5 mr-3" />
                Speak to Advisor
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
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
                    <div
                    className={`w-16 h-16 ${
                        verified ? "text-green-50" : "text-red-50"
                    } rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                    <Icon
                        className={`w-8 h-8 ${
                        verified ? "text-green-600" : "text-red-600"
                        }`}
                    />
                    </div>

                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {item.title}
                    </h3>

                    <p
                    className={`${
                        verified ? "text-green-600" : "text-red-600"
                    } font-medium`}
                    >
                    {item.description[verified ? "true" : "false"]}
                    </p>
                </div>
                );
            })}
          </div>

          {!allFieldsTrue && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4">Primary Reason for Ineligibility</h3>
              <p className="text-yellow-700 text-lg">{primaryReason}</p>
            </div>
          )}
        </div>
      </section>

      {/* Recommended Solutions */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              {allFieldsTrue ? 'Recommended Renewable Energy Solutions' : 'Pathway to PPA Eligibility'}
            </h2>
            <p className="text-gray-600 text-lg">
              {allFieldsTrue 
                ? 'Comprehensive energy solutions tailored to your business needs' 
                : 'Strategic improvements to enhance your renewable energy potential'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {improvements.map((improvement, index) => (
              <div key={index} className="group p-8 bg-white hover:bg-gray-50 transition-colors duration-200 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-100 transition-colors duration-200">
                  <improvement.icon className={`w-6 h-6 ${improvement.color}`} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{improvement.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {improvement.desc}
                </p>
                <button className="text-green-900 font-medium flex items-center group-hover:text-gray-700 transition-colors duration-200">
                  Learn more
                  <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Plan */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              {allFieldsTrue ? 'Next Steps for Your PPA' : 'Business Energy Improvement Plan'}
            </h2>
            <p className="text-gray-600 text-lg">
              {allFieldsTrue 
                ? 'Structured approach to implement your Power Purchase Agreement' 
                : 'Strategic pathway to optimize your business for renewable energy'}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
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
                <button className="text-green-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                  <FaCalendar className="w-4 h-4 mr-2" />
                  Schedule Assessment
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
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
                <button className="text-green-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                  <FaUserTie className="w-4 h-4 mr-2" />
                  {allFieldsTrue ? 'Review Agreement' : 'Get Implementation Quote'}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg">
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
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
                <button className="text-green-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                  <FaClipboardList className="w-4 h-4 mr-2" />
                  {allFieldsTrue ? 'Start Installation' : 'View Monitoring Options'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Support Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Renewable Energy Specialist Support</h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Our dedicated renewable energy consultants provide comprehensive support for PPA implementation, 
            energy efficiency upgrades, and sustainable business transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => router.push('/contact')}
              className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
            >
              <FaPhone className="w-5 h-5 mr-3" />
              Schedule Energy Consultation
            </button>
            <button className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <FaUserTie className="w-5 h-5 mr-3" />
              Request PPA Proposal
            </button>
          </div>

          {/* Additional Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <FaShieldAlt className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">25-Year Price Security</h3>
              <p className="text-gray-600 text-sm">Fixed energy pricing with long-term cost predictability</p>
            </div>
            <div className="text-center p-6">
              <FaTree className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Carbon Neutral Goals</h3>
              <p className="text-gray-600 text-sm">Achieve sustainability targets and environmental compliance</p>
            </div>
            <div className="text-center p-6">
              <FaIndustry className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Zero Capital Investment</h3>
              <p className="text-gray-600 text-sm">No upfront costs with comprehensive maintenance included</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}