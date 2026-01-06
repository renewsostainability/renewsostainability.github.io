import './Partners.css';
import { FaHandshake } from "react-icons/fa";

export default function Partners() {
  const sponsors = [
    {
      name: 'University of Staffordshire; Newcastle Under Lyme, and UKSP',
      logo: '🎓',
      description: 'Academic Research Partner'
    },
  ];

  const affiliates = [
    {
      name: 'SBEN',
      logo: '🔋',
      description: 'Sustainable Business Energy Network'
    },
    {
      name: 'ASP',
      logo: '🤝',
      description: 'Affiliate Sustainability Program'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
          <FaHandshake className="text-orange-500" />
          Trusted Partnerships
        </div>
        <h2 className="text-4xl font-bold mb-4">
          Our <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Partners</span> in Sustainability
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Working with leading organizations to deliver comprehensive energy solutions 
          and maximize environmental impact across all sectors.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sponsors Column */}
        <div className="flex-1 p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Sponsor</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-800 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">Strategic partner who support our mission</p>
          </div>
          
          <div className="space-y-6">
            {sponsors.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-500"
              >
                <div className="text-4xl w-16 h-16 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200">
                  {partner.logo}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{partner.name}</h4>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliates Column */}
        <div className="flex-1 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-cyan-50 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Our Affiliates</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">Network partners for sustainable collaboration</p>
          </div>
          
          <div className="space-y-6">
            {affiliates.map((partner, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500"
              >
                <div className="text-4xl w-16 h-16 flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl border border-blue-200">
                  {partner.logo}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">{partner.name}</h4>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}