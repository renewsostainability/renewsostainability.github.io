import {
  FaStar,
  FaClipboardCheck,
  FaLightbulb,
  FaHandHoldingUsd,
  FaTools,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Solution',
      description: 'Select the ideal renewable or energy efficiency solution that fits your goals and property type from the home page.',
      icon: <FaClipboardCheck className="text-green-600 text-lg" />
    },
    {
      number: '02',
      title: 'Provide Mandatory Information',
      description: 'Provide the required details about your property or business to help us understand your needs.',
      icon: <FaLightbulb className="text-green-600 text-lg" />
    },
    {
      number: '03',
      title: 'Perform Eligibility Checks',
      description: 'We assess your eligibility and secure any available grants, incentives, or financing options, based on the information provided.',
      icon: <FaHandHoldingUsd className="text-green-600 text-lg" />
    },
    {
      number: '04',
      title: 'Enjoy Our Services',
      description: 'Access a real-time dashboard and enjoy our services to optimize your energy usage and reduce costs.',
      icon: <FaTools className="text-green-600 text-lg" />
    },
    {
      number: '05',
      title: 'Ongoing Support',
      description: 'Receive continuous monitoring, maintenance, and optimization to maximize efficiency and savings.',
      icon: <FaHeadset className="text-green-600 text-lg" />
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
          Our Process
        </div>

        <h2 className="text-4xl font-bold mb-4">
          How <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">RENEW</span> Works
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our streamlined process ensures you get the best energy solutions with minimal effort on your part.
        </p>
      </div>

      {/* Process Steps */}
      <div className="flex flex-col gap-8 mb-16 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-8 relative">
            {/* Step Number */}
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 relative z-10 shadow-lg">
              {step.number}
            </div>

            {/* Step Content */}
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 flex items-start gap-6 flex-grow transition-all duration-300 hover:translate-x-2 hover:shadow-lg">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>

            {/* Step Connector - Only show between steps */}
            {index < steps.length - 1 && (
              <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-green-200 z-0"></div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Saving?</h3>
          <h6 className="text mb-8">
            Join hundreds of satisfied customers who have already reduced their energy costs 
            and carbon footprint with RENEW solutions.
          </h6>
          <button 
            className="btn btn-primary btn-large bg-white text-green-600 border-none hover:bg-gray-100 hover:transform hover:-translate-y-0.5"
            onClick={() => scrollToSection('contact')}
          >
            Contact Us <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
