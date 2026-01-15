import {
  FaGlobe,
  FaHandshake,
  FaShieldAlt,
  FaRocket,
  FaBullseye,
  FaLeaf,
  FaChevronUp,
  FaChevronDown,
  FaArrowRight
} from "react-icons/fa";
import ReadMoreText from './ReadMoreText';
import { useState } from "react";

export default function About() {
  const [showAll, setShowAll] = useState(false);
  const sections = [
    {
      icon: <FaGlobe className="text-white text-2xl" />,
      title: "What is RENEW",
      content: "Renewable Energy and Net Emissions Workspace (RENEW) is a marketplace that connects users of decarbonization products and services with verified and reliable providers, while delivering a one-stop, customized dashboard for net-zero and sustainability progression. RENEW is a SOStainability product developed with support from the University of Staffordshire, the Newcastle-under-Lyme Borough Council, and the UK Shared Prosperity Fund (UKSPF).",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaHandshake className="text-white text-2xl" />,
      title: "The RENEW Promise",
      content: "RENEW bridges the gap between organisations seeking sustainability solutions and verified providers who offer them. It is a digital dashboard where businesses and other organisations in need seamlessly connect with verified sustainability products and service providers to accelerate their journey to net-zero, circular economy practices, and ESG excellence.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: <FaShieldAlt className="text-white text-2xl" />,
      title: "The RENEW Guarantee",
      content: "RENEW empowers businesses and organisations with bespoke and actionable sustainability insights and then offers speedy access to trusted products and experts, enabling sustained progress from baseline to maturity and leadership in ESG practice.",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const sdgs = [
    { id: 7, title: "Affordable and Clean Energy", image: "imgs/sdg7.png" },
    { id: 8, title: "Decent Work and Economic Growth", image: "imgs/sdg8.png" },
    { id: 9, title: "Industry, Innovation, and Infrastructure", image: "imgs/sdg9.png" },
    { id: 10, title: "Reduced Inequalities", image: "imgs/sdg10.png" },
    { id: 11, title: "Sustainable Cities and Communities", image: "imgs/sdg11.png" },
    { id: 12, title: "Responsible Consumption and Production", image: "imgs/sdg12.png" },
    { id: 13, title: "Climate Action", image: "imgs/sdg13.png" },
    { id: 17, title: "Partnerships for the Goals", image: "imgs/sdg17.png" }
  ];

  const displayedSdgs = showAll ? sdgs : sdgs.slice(0, 2);



  const painPoints = [
    "Aware of the need for sustainability, but don't know where to start.",
    "Able to determine their sustainability baselines, but lack follow-up support.",
    "Struggle to find reliable, pre-vetted product and service providers who can deliver measurable sustainability outcomes."
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
          <FaLeaf className="text-green-500" />
          About RENEW
        </div>
      </div>

      {/* Main Sections */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {sections.map((section, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${section.gradient} rounded-2xl flex items-center justify-center mb-6`}>
              <div className="text-white text-2xl">
                {section.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
            <ReadMoreText text={section.content} previewLength={150} buttonPosition="newline" />
          </div>
        ))}
      </div>

      {/* Why RENEW Section */}
      <div className="p-8 rounded-2xl mb-16">       
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
              <div className="rounded-xl flex items-center justify-center">
                <FaRocket className="text-green-600 text-xl" />
                <h3 className="text-2xl ml-6 font-bold text-gray-900">Why RENEW is the New Deal</h3>
              </div>
              <p className="text-gray-700 text-xl leading-relaxed font-xl">
                <ReadMoreText previewLength={500} buttonPosition="newline" html={`
                  <p className="text-gray-700 leading-relaxed">
                  The drive for sustainability, decarbonization, and net zero comes with some pain points, 
                  including information overload, time constraints, and resource limitations, especially for 
                  Micro, Small, and Medium Enterprises (MSMEs). For some, the problem is not knowing where 
                  to start; for others, it is not knowing which solutions to trust and how to stay ahead 
                  of competition and the regulatory curve.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                  RENEW helps you cut through the noise, simplify the jargon, and connect you with verified 
                  opportunities and solutions. It also helps determine your baseline and eligibility for 
                  recommended products and services, and provides guided steps for improvements and progression.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                  All of these in one place within a secure and dedicated space where you own and control the narrative at your pace.
                  </p>
                `}/>
                
              </p>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4">In summary, many businesses are faced with the following pain points:</h4>
            <ul className="space-y-3">
              {painPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
              <ReadMoreText previewLength={0} buttonPosition="newline" html={`
                <p className="italic mt-2" style={{color: 'green'}}>
                  These often result in inaction after awareness — businesses and other organisations are aware of the gaps and weaknesses, but cannot access practical, reliable, and affordable solutions. This is where RENEW comes in!
                </p>
              `}/>
          </div>
        </div>
      </div>

      {/* SDGs Section */}
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT COLUMN – TEXT WITH ILLUSTRATIVE IMAGE */}
          <div className="flex flex-col items-start">
            {/* Suggested illustrative image for the left column */}
            <img
              src="imgs/world.png" 
              alt="United Nations Sustainable Development Goals icons grid" 
              className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto object-contain"
            />
          </div>

          {/* RIGHT COLUMN – SDG LIST */}
          <div className="bg-gray-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              RENEW and the SDGs
            </h2>

            <p className="text-lg leading-relaxed mb-8" style={{color: 'green'}}>
              RENEW Marketplace contributes to the fulfilment of the following Sustainable Development Goals (SDGs):
            </p>
            <div className="max-h-[350px] overflow-y-auto space-y-4">
              {displayedSdgs.map((sdg) => (
                <div
                  key={sdg.id}
                  className="flex items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition gap-4"
                >
                  <img
                    src={sdg.image}
                    alt={`SDG ${sdg.id}: ${sdg.title}`}
                    className="w-16 h-16 object-contain flex-shrink-0"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-gray-800">
                      SDG {sdg.id}
                    </span>
                    <p className="text-gray-600 text-sm">{sdg.title}</p>
                  </div>
                </div>
              ))}
            </div>
            {sdgs.length > 2 && (
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

    </div>
  );
}