// "use client";
import { useRouter } from 'next/navigation';
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
  FaCalendar
} from 'react-icons/fa';

import Header from '../homepage/Header';
import Footer from '../homepage/Footer';
import { useState, useEffect } from 'react';
import { b } from 'framer-motion/client';
import { HomeIcon } from '@heroicons/react/16/solid';

export default function IneligibleResult() {
  const router = useRouter();

  const [dataVerified, setDataVerified] = useState({
    nameOnBill: false,
    floorArea: false,
    propertyAge: false,
    propertyType: false,
    pensionCredit: false,
    benefits: false,
    epcRating: false
  });

  const [primaryReason, setPrimaryReason] = useState('');
  const [allFieldsTrue, setAllFieldsTrue] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page
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

    console.log('verifiedData:', verifiedData);
    console.log('allFieldsTrue:', allFieldsTrue);


    setDataVerified(verifiedData);

    // Determine primary reason for ineligibility
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
  }, []);

  const improvements = [
    { icon: FaHome, title: 'Loft Insulation', color: 'text-blue-600', desc: 'Install 270mm thick loft insulation to prevent heat loss through the roof.' },
    { icon: FaLightbulb, title: 'LED Lighting', color: 'text-red-500', desc: 'Replace all halogen and incandescent bulbs with LED alternatives.' },
    { icon: FaShieldAlt, title: 'Cavity Wall Insulation', color: 'text-green-400', desc: 'Fill cavity walls with insulation material to reduce heat transfer.' },
    { icon: FaThermometerHalf, title: 'Smart Heating Controls', color: 'text-yellow-300', desc: 'Install smart thermostats and heating zone controls for better efficiency.' },
    { icon: FaSolarPanel, title: 'Solar Panel Installation', color: 'text-purple-700', desc: 'Install photovoltaic panels to generate renewable electricity.' },
    { icon: FaTint, title: 'Water Efficiency Measures', color: 'text-orange-500', desc: 'Install water-saving devices and improve hot water system efficiency.' }
  ];

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
        true: "Your name (or your partner’s) is on the electricity bill.",
        false: "Your name (or your partner’s) is not on the electricity bill.",
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



  return (
    <>
      <Header />
      
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
              WHD Eligibility Result
            </h1>
            <p className="text-2xl text-gray-600 mb-8 font-light">
              {allFieldsTrue ? ( 
                <>
                  Congratulations! Your property meets the eligibility criteria for the energy support scheme.
                </>
              ) : ( 
                <>
                  Unfortunately, your property does not currently meet the eligibility criteria for the energy support scheme.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/eligibility_checks/warm_home_discount_scheme_form')}
                className="px-8 py-4 border border-green-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
              >
                <FaEdit className="w-5 h-5 mr-3" />
                Revise Application
              </button>
              {allFieldsTrue ? (
                <button
                  // onClick={() => router.push('/#')}
                  className="px-8 py-4 flex bg-gradient-to-r justify-center from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <HomeIcon className="w-5 h-5 mr-3" />
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
              <h2 className="text-3xl font-light text-gray-900 mb-4">Eligibility Assessment</h2>
              <p className="text-gray-600 text-lg">Detailed breakdown of your application assessment</p>
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
              <h2 className="text-3xl font-light text-gray-900 mb-4">{allFieldsTrue ? 'You can still improve your net-zero score and save money' : 'Pathway to Eligibility'}</h2>
              <p className="text-gray-600 text-lg">Strategic improvements to help you qualify for future schemes</p>
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
                  <button className="text-blue-900 font-medium flex items-center group-hover:text-gray-700 transition-colors duration-200">
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
                onClick={() => router.push('/#contact')}
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

      <Footer />
    </>
  );
}