import {
  FaStar,
  FaCrown,
  FaCheck,
  FaArrowRight,
  FaMoneyBillWave,
  FaChartLine,
  FaCogs,
  FaLeaf,
  FaHandHoldingUsd,
  FaClipboardCheck,
  FaTools,
  FaPiggyBank,
  FaHome,
  FaHeart,
  FaUsers,
  FaCheckCircle,
  FaSolarPanel
} from "react-icons/fa";

export default function Products() {
  const products = [
    {
      name: 'Warm Home Discount Scheme (WHD)',
      popular: true,
      features: [
        'Solar Energy Systems Installation',
        'EV Charging Infrastructure',
        'Battery Storage Solutions',
        'LED Lighting Upgrades',
        'Heating System Modernization',
        'Energy Efficiency Optimization'
      ],
      benefits: [
        { icon: <FaMoneyBillWave className="text-green-500" />, text: 'Cut energy costs significantly' },
        { icon: <FaChartLine className="text-green-500" />, text: 'Market predictability' },
        { icon: <FaCogs className="text-green-500" />, text: 'Infrastructure upgrades' },
        { icon: <FaLeaf className="text-green-500" />, text: 'Reduce carbon emissions' }
      ],
      cta: 'Apply for WHD',
      link: '#/mandatory_form/ppa-form',
      icon: <FaSolarPanel className="text-white text-2xl" />
    },

    {
      name: 'Business Energy Advice Service (BEAS)',
      popular: false,
      features: [
        'Improved Refrigeration Systems',
        'Building Insulation Upgrades',
        'Water Management Solutions',
        'Recycling & Waste Management',
        'HVAC System Optimization',
        'LED Lighting Retrofit'
      ],
      benefits: [
        { icon: <FaHandHoldingUsd className="text-green-500" />, text: 'Substantial cash grants' },
        { icon: <FaClipboardCheck className="text-green-500" />, text: 'Free energy assessments' },
        { icon: <FaTools className="text-green-500" />, text: 'Energy efficiency upgrades' },
        { icon: <FaPiggyBank className="text-green-500" />, text: 'Maximum savings potential' }
      ],
      cta: 'Apply for BEAS Grants',
      link: '#/mandatory_form/beas-form',
      icon: <FaHandHoldingUsd className="text-white text-2xl" />
    },

    {
      name: 'Average Megawatt (AMW) Renewable',
      popular: false,
      features: [
        'Winter Fuel Payments',
        'Warm Home Discount Scheme',
        'Energy Bill Support',
        'Low-Income Assistance',
        'Community Energy Programs',
        'Home Upgrade Grants'
      ],
      benefits: [
        { icon: <FaHome className="text-green-500" />, text: 'Reduce energy bills' },
        { icon: <FaHeart className="text-green-500" />, text: 'Combat energy poverty' },
        { icon: <FaUsers className="text-green-500" />, text: 'Enhance community energy' },
        { icon: <FaCheckCircle className="text-green-500" />, text: 'Quick approvals' }
      ],
      cta: 'Apply for AMW Renewable',
      link: '#/mandatory_form/amw-form',
      icon: <FaHome className="text-white text-2xl" />
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
          <FaStar className="text-orange-500" />
          Our Solutions
        </div>

        <h2 className="text-4xl font-bold mb-4">
          Energy{' '}
          <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Solutions
          </span>{' '}
          That Save You Money
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the perfect energy solution for your needs. All options designed to reduce costs and environmental impact.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {products.map((product, index) => (
          <div
            key={index}
            className={`bg-white rounded-2xl p-8 shadow-md border relative flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
              product.popular
                ? 'border-2 border-green-500 bg-gradient-to-br from-white to-green-50'
                : 'border border-gray-200'
            }`}
          >

            {/* Popular Badge */}
            {product.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                <FaCrown />
                Most Popular
              </div>
            )}

            {/* Product Header */}
            <div className="text-center mb-8 pb-8 border-b border-gray-200">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                {product.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{product.name}</h3>
            </div>

            {/* Features Section */}
            <div className="mb-8 flex-grow">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h4>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-green-50 hover:translate-x-1"
                  >
                    <div className="text-green-500 w-4">{benefit.icon}</div>
                    <span className="text-sm font-medium text-gray-900">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <a
                href={product.link}
                className={`btn w-full justify-center ${
                  product.popular ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {product.cta}
                <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Solution Note Section */}
      <div className="text-center">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 shadow-md border-l-4 border-green-500 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Sure Which Solution is Right for You?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our energy experts will assess your specific needs and recommend the perfect combination 
            of solutions to maximize your savings and environmental impact.
          </p>
          <button 
            className="btn btn-primary btn-large"
            onClick={() => scrollToSection('contact')}
          >
            Get Personalized Recommendation
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
