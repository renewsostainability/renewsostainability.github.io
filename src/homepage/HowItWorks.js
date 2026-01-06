import React from 'react';
import { MdSavings, MdCheckCircle } from 'react-icons/md';

const HowItWorks = () => {
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

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* How RENEW Works - Horizontal with Only Numbers */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            How RENEW Works
          </h2>

          {/* Desktop & Tablet: Horizontal layout */}
          <div className="hidden md:flex items-start justify-between gap-8">
            {steps.map((text, index) => (
              <div key={index} className="flex flex-col items-center text-center flex-1 max-w-xs">
                <div className="flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full font-bold text-3xl shadow-lg mb-8">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Vertical stacked */}
          <div className="md:hidden space-y-12">
            {steps.map((text, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-green-600 text-white rounded-full font-bold text-3xl shadow-lg mb-8">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Save Money and Gain Confidence */}
          <div className="p-10">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold">Save Money and Gain Confidence with RENEW Eligibility Check</h2>
            </div>
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

          {/* Who is RENEW for? */}
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Who is RENEW for?</h2>
            <ul className="space-y-5">
              {audience.map((item, index) => (
                <li key={index} className="flex items-start text-lg text-gray-700">
                  <MdCheckCircle className="w-7 h-7 text-green-600 mr-4 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;