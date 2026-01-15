import React, { useState } from 'react';
import { MdSavings, MdCheckCircle } from 'react-icons/md';
import ReadMoreText from './ReadMoreText';
import { FaChevronDown, FaChevronUp, FaHandshake } from 'react-icons/fa';

const HowItWorks = () => {
  const [showAll, setShowAll] = useState(false);

  const steps = [
    "Users complete an Eligibility Check and Sustainability Business Assessment (SBA)",
    "Prequalified users are automatically guided to a curated network of sustainability service and decarbonization product providers, while those who are unsuccessful get onboarded for improvement support",
    "RENEW moderates the interaction and transactions between prequalified users and providers to ensure a satisfaction guarantee",
    "RENEW provides continuous custom guidance through a mutually curated sustainability journey to guarantee continual improvements and advancement",
    "RENEW validates progress by curating and disseminating Sustainability Success Stories using impact metrics."
  ];

  const audience = [
    "Businesses with zero awareness and a lack of sustainability baselines, metrics, and KPIs.",
    "SMEs and mid-sized enterprises that have sustainability goals but lack in-house expertise.",
    "Corporate sustainability teams seeking niche solutions or local service providers.",
    "Public-facing organisations needing sustainable procurement support.",
    "Product and service providers seeking access to authentic leads.",
    "Policy makers seeking case studies and data for reform.",
    "Media and advocacy organisations.",
    "Households seeking verified energy-saving and efficiency grants and other support."
  ];

  const displayedAudience = showAll ? audience : audience.slice(0, 3);

  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* How RENEW Works - Horizontal with Only Numbers */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
              <FaHandshake className="text-orange-500" />
              How RENEW Works
            </div>
          </div>

          {/* Desktop & Tablet: Horizontal layout with enhanced design */}
          <div className="hidden md:flex items-start justify-between gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="absolute top-10 left-20 right-20 h-0.5 bg-gradient-to-r from-green-200 via-emerald-300 to-teal-200 -z-10"></div>
            
            {steps.map((text, index) => (
              <div key={index} className="flex flex-col items-center text-center flex-1 max-w-xs group relative">
                {/* Animated circle with gradient */}
                <div className="relative z-10 flex items-center justify-center w-24 h-24 mb-8">
                  {/* Outer glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
                  
                  {/* Main circle with gradient */}
                  <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white rounded-full font-bold text-3xl shadow-xl flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-green-200">
                    {index + 1}
                  </div>
                  
                  {/* Small decorative dot */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full border-4 border-white shadow-md"></div>
                </div>
                
                {/* Text container with subtle background */}
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-lg group-hover:border-green-100 transition-all duration-300 group-hover:-translate-y-1">
                  {/* Corner accent */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-500 rotate-45 rounded-sm"></div>
                  
                  <p className="text-gray-800 leading-relaxed relative">
                    <ReadMoreText previewLength={50} buttonPosition="newline" text={text} />
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical stacked with enhanced design */}
          <div className="md:hidden space-y-12 relative">
            {/* Vertical connecting line for mobile */}
            <div className="absolute top-12 bottom-12 left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-green-200 via-emerald-300 to-teal-200 -z-10"></div>
            
            {steps.map((text, index) => (
              <div key={index} className="flex items-start gap-6 group">
                {/* Circle container */}
                <div className="relative flex-shrink-0">
                  <div className="relative flex items-center justify-center w-16 h-16">
                    {/* Outer glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
                    
                    {/* Main circle */}
                    <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white rounded-full font-bold text-2xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                {/* Text container */}
                <div className="flex-1 pt-2">
                  <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-green-100 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gray-500">STEP {index + 1}</span>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-green-100 to-emerald-100"></div>
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed">
                      <ReadMoreText previewLength={100} buttonPosition="newline" html={text} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 text-xl lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold">Save Money and Gain Confidence with RENEW Eligibility Check</h2>
            <ReadMoreText previewLength={400} buttonPosition="newline" html={`
              <div className="p-10">              
                <p className="text-lg mb-6">
                  A common pain point for both users and suppliers of renewable energy products – whether solar, LED lighting, batteries, insulation, refrigeration, or other energy efficiency retrofits – is the necessity for site visits and the usual back-and-forth consultations. This can take precious time, require ample paperwork, and cost money.
                </p>
                <p className="text-lg mb-6">
                  RENEW eliminates these burdens by using data to automate the process and determine eligibility online and in real-time. A prequalified user is onboarded onto the platform and connected with verified service providers. This ensures a seamless, effective, and efficient transaction that leaves both parties happy and satisfied.
                </p>
                <p className="text-lg font-semibold italic" style={{color: 'green'}}>
                  The RENEW eligibility check is offered FREE to the user. For ineligible users, a no-cost Sustainability Baseline Assessment (SBA) is provided to determine their baseline and launch a guided sustainability journey.
                </p>
              </div>
            `} />
          </div>

          {/* Who is RENEW for? */}
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Who is RENEW for?</h2>
            <ul className="space-y-5">
              {displayedAudience.map((item, index) => (
                <li key={index} className="flex items-start text-lg text-gray-700">
                  <MdCheckCircle className="w-7 h-7 text-green-600 mr-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {audience.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-1 text-green-600 font-medium hover:underline mt-2"
              >
                {showAll ? "Show less" : "Show more"}
                {showAll ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;