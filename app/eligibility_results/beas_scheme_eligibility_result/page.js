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
  FaPiggyBank,
  FaChartLine,
  FaIndustry,
  FaBalanceScale,
  FaHome,
  FaLeaf,
  FaEuroSign,
  FaRulerCombined
} from 'react-icons/fa';

import Header from '../../components/homepage/Header';
import Footer from '../../components/homepage/Footer';
import { useState, useEffect } from 'react';
import { FaH } from 'react-icons/fa6';

export default function BEASResult() {
  const router = useRouter();

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
    // totalEnergyConsumption: false,
    previousPublicSupport: false,
    supportAmount: false,
    projectDescription: false,
    estimatedCost: false
  });

  const [primaryReason, setPrimaryReason] = useState('');
  const [allFieldsTrue, setAllFieldsTrue] = useState(false);
  const [grantAmount, setGrantAmount] = useState(0);
  const [companyContribution, setCompanyContribution] = useState(0);

  useEffect(() => {
    // Retrieve and verify all BEAS form data
    const verifiedData = {
      companyName: !!localStorage.getItem('beas_companyName'),
    //   companyNumber: !!localStorage.getItem('beas_companyNumber'),
      businessType: !!localStorage.getItem('beas_businessType'),
      tradingDuration: parseInt(localStorage.getItem('beas_tradingDuration') || '0') >= 12,
      employeeCount: parseInt(localStorage.getItem('beas_employeeCount') || '0') < 250,
      annualTurnover: parseFloat(localStorage.getItem('beas_annualTurnover') || '0') < 50000000,
      balanceSheetTotal: parseFloat(localStorage.getItem('beas_balanceSheetTotal') || '0') < 43000000,
      premisesType: !!localStorage.getItem('beas_premisesType'),
      energyBillResponsibility: localStorage.getItem('beas_energyBillResponsibility') === 'Yes',
      samePremisesDuration: parseInt(localStorage.getItem('beas_samePremisesDuration') || '0') >= 12,
    //   totalEnergyConsumption: parseFloat(localStorage.getItem('beas_totalEnergyConsumption') || '0') >= 25000,
      previousPublicSupport: localStorage.getItem('beas_previousPublicSupport') === 'No' || 
                            (localStorage.getItem('beas_previousPublicSupport') === 'Yes' && 
                             parseFloat(localStorage.getItem('beas_supportAmount') || '0') <= 315000),
      supportAmount: localStorage.getItem('beas_previousPublicSupport') === 'No' || 
                    (localStorage.getItem('beas_previousPublicSupport') === 'Yes' && 
                     parseFloat(localStorage.getItem('beas_supportAmount') || '0') <= 315000),
      /* projectDescription: !!localStorage.getItem('beas_projectDescription') && 
                         localStorage.getItem('beas_projectDescription').length >= 50, */
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
      } /* else if (!verifiedData.totalEnergyConsumption) {
        setPrimaryReason('Energy consumption below minimum threshold of 25,000 kWh per year');
      } */ else if (!verifiedData.previousPublicSupport) {
        setPrimaryReason('Previous public support exceeds allowable limits');
      } else if (!verifiedData.estimatedCost) {
        setPrimaryReason('Project cost outside allowable range (£1,000 - £200,000)');
      } else {
        setPrimaryReason('Business or project characteristics do not meet scheme requirements');
      }
    }
  }, []);

  const improvements = [
    { 
      icon: FaSolarPanel, 
      title: 'Solar PV Installation', 
      color: 'text-yellow-500', 
      desc: 'Install photovoltaic panels to generate renewable electricity and reduce grid dependency.' 
    },
    { 
      icon: FaThermometerHalf, 
      title: 'HVAC System Upgrade', 
      color: 'text-blue-600', 
      desc: 'Replace old heating and cooling systems with high-efficiency models and smart controls.' 
    },
    { 
      icon: FaLightbulb, 
      title: 'LED Lighting Retrofit', 
      color: 'text-green-500', 
      desc: 'Upgrade to energy-efficient LED lighting throughout your commercial premises.' 
    },
    { 
      icon: FaBuilding, 
      title: 'Building Insulation', 
      color: 'text-orange-500', 
      desc: 'Improve roof, wall, and floor insulation to reduce heating and cooling costs.' 
    },
    { 
      icon: FaTint, 
      title: 'Water Efficiency Systems', 
      color: 'text-cyan-500', 
      desc: 'Install water-saving devices and efficient hot water systems for industrial processes.' 
    },
    { 
      icon: FaChartLine, 
      title: 'Energy Monitoring', 
      color: 'text-purple-500', 
      desc: 'Implement smart energy monitoring systems to track and optimize energy usage.' 
    }
  ];

  const verificationConfig = {
    companyName: {
      title: "Company Registration",
      description: {
        true: "Your company is properly registered and verified.",
        false: "Company registration details could not be verified.",
      },
    },
    /* companyNumber: {
      title: "Company Number",
      description: {
        true: "Valid company registration number provided.",
        false: "Invalid or missing company registration number.",
      },
    }, */
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
    /* totalEnergyConsumption: {
      title: "Energy Consumption",
      description: {
        true: "Meets minimum 25,000 kWh annual consumption.",
        false: "Below minimum energy consumption threshold.",
      },
    }, */
    previousPublicSupport: {
      title: "Previous Public Support",
      description: {
        true: "Within allowable public support limits.",
        false: "Exceeds public support limits or requires review.",
      },
    },
    /* projectDescription: {
      title: "Project Description",
      description: {
        true: "Detailed project description provided.",
        false: "Insufficient project details provided.",
      },
    }, */
    estimatedCost: {
      title: "Project Cost",
      description: {
        true: "Project cost within allowable range.",
        false: "Project cost outside scheme limits.",
      },
    },
  };

  return (
    <>
      <Header />
      
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
            {/* Hero Section */}
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
                        BEAS Eligibility Result
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

                    {/* {allFieldsTrue && (
                        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 max-w-2xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="p-4">
                            <FaPiggyBank className="w-8 h-8 text-green-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-gray-900">£{grantAmount.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Potential Grant</div>
                            </div>
                            <div className="p-4">
                            <FaBuilding className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-gray-900">£{companyContribution.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Your Contribution</div>
                            </div>
                            <div className="p-4">
                            <FaChartLine className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                            <div className="text-2xl font-bold text-gray-900">50%</div>
                            <div className="text-sm text-gray-600">Match Funding</div>
                            </div>
                        </div>
                        </div>
                    )} */}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => router.push('/eligibility_checks/beas_grants_eligibility_form')}
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
                            <FaHome className="w-5 h-5 mr-3" />
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
                    <h2 className="text-3xl font-light text-gray-900 mb-4">Business Eligibility Assessment</h2>
                    <p className="text-gray-600 text-lg">Detailed breakdown of your BEAS application assessment</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {Object.entries(verificationConfig).map(([key, item]) => {
                        const verified = dataVerified[key];
                        const Icon = verified ? FaCheckCircle : FaTimesCircle;

                        return (
                        <div key={key} className="text-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                            <div
                            className={`w-14 h-14 ${
                                verified ? "bg-green-50" : "bg-red-50"
                            } rounded-full flex items-center justify-center mx-auto mb-4`}
                            >
                            <Icon
                                className={`w-7 h-7 ${
                                verified ? "text-green-600" : "text-red-600"
                                }`}
                            />
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {item.title}
                            </h3>

                            <p
                            className={`text-sm ${
                                verified ? "text-green-600" : "text-red-600"
                            } font-medium leading-relaxed`}
                            >
                            {item.description[verified ? "true" : "false"]}
                            </p>
                        </div>
                        );
                    })}
                </div>

                {!allFieldsTrue && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center max-w-4xl mx-auto">
                    <h3 className="text-xl font-semibold text-yellow-800 mb-4">Primary Reason for Ineligibility</h3>
                    <p className="text-yellow-700 text-lg mb-4">{primaryReason}</p>
                    <p className="text-yellow-600">
                        Our business advisors can help you understand the specific requirements and guide you toward eligibility.
                    </p>
                    </div>
                )}
                </div>
            </section>

            {/* Recommended Energy Solutions */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
                <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-light text-gray-900 mb-4">
                    {allFieldsTrue ? 'Recommended Energy Efficiency Measures' : 'Pathway to BEAS Eligibility'}
                    </h2>
                    <p className="text-gray-600 text-lg">
                    {allFieldsTrue 
                        ? 'Strategic improvements to maximize your energy savings and carbon reduction' 
                        : 'Energy efficiency measures to help your business qualify for future support'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {improvements.map((improvement, index) => (
                    <div key={index} className="group p-8 bg-white hover:bg-gray-50 transition-all duration-200 border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
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
                    <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-lg">1</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-3">
                        {allFieldsTrue ? 'Free Energy Assessment' : 'Initial Energy Audit'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                        {allFieldsTrue
                            ? 'Schedule your complimentary detailed energy assessment to identify the most impactful improvements for your specific business operations.'
                            : 'Begin with a comprehensive energy audit to identify cost-effective efficiency measures for your business.'}
                        </p>
                        <button className="text-blue-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                        <FaCalendar className="w-4 h-4 mr-2" />
                        Schedule Assessment
                        </button>
                    </div>
                    </div>

                    <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
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
                        <button className="text-blue-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                        <FaUserTie className="w-4 h-4 mr-2" />
                        Find Approved Installers
                        </button>
                    </div>
                    </div>

                    <div className="flex items-start space-x-6 p-8 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-lg">3</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-gray-900 mb-3">
                        {allFieldsTrue ? 'Grant Processing' : 'Reassessment & Application'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                        {allFieldsTrue
                            ? 'Complete the grant claim process with our support team and receive your match-funded contribution.'
                            : 'After implementing improvements, reassess your eligibility and submit a new BEAS application.'}
                        </p>
                        <button className="text-blue-900 font-medium flex items-center hover:text-gray-700 transition-colors duration-200">
                        <FaClipboardList className="w-4 h-4 mr-2" />
                        {allFieldsTrue ? 'Start Grant Process' : 'Document Requirements'}
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </section>

            {/* Business Support Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-light text-gray-900 mb-6">Business Energy Specialist Support</h2>
                <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
                    Our dedicated business energy advisors can provide personalized guidance on energy efficiency, 
                    funding opportunities, and connecting you with certified professionals for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button 
                    onClick={() => router.push('/contact')}
                    className="px-8 py-4 border border-blue-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex rounded-xl items-center justify-center"
                    >
                    <FaPhone className="w-5 h-5 mr-3" />
                    Schedule Business Consultation
                    </button>
                    <button className="px-8 py-4 flex bg-gradient-to-r justify-center from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <FaUserTie className="w-5 h-5 mr-3" />
                    Find Certified Installers
                    </button>
                </div>

                {/* Additional Resources */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                    <FaLeaf className="w-8 h-8 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Carbon Reduction</h3>
                    <p className="text-gray-600 text-sm">Reduce your carbon footprint and meet sustainability goals</p>
                    </div>
                    <div className="text-center p-6">
                    <FaPiggyBank className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Cost Savings</h3>
                    <p className="text-gray-600 text-sm">Lower energy bills and improve operational efficiency</p>
                    </div>
                    <div className="text-center p-6">
                    <FaShieldAlt className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Compliance</h3>
                    <p className="text-gray-600 text-sm">Meet regulatory requirements and future-proof your business</p>
                    </div>
                </div>
                </div>
            </section>
        </div>

      <Footer />
    </>
  );
}