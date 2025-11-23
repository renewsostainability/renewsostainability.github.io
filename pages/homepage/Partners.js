export default function Partners() {
  const partners = [
    {
      name: 'NHS Trust',
      logo: '🏥',
      description: 'Healthcare Sustainability Partner'
    },
    {
      name: 'Energy Saving Trust',
      logo: '💡',
      description: 'Energy Efficiency Certification'
    },
    {
      name: 'Carbon Trust',
      logo: '🌍',
      description: 'Carbon Reduction Partner'
    },
    {
      name: 'Government Grants',
      logo: '🏛️',
      description: 'Official Funding Partner'
    },
    {
      name: 'Solar Energy UK',
      logo: '☀️',
      description: 'Renewable Energy Alliance'
    },
    {
      name: 'Green Building Council',
      logo: '🏢',
      description: 'Sustainable Construction Partner'
    },
    {
      name: 'EV Association',
      logo: '⚡',
      description: 'Electric Vehicle Infrastructure'
    },
    {
      name: 'Local Authorities',
      logo: '📍',
      description: 'Regional Implementation Partner'
    }
  ]

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
            <i className="fas fa-handshake text-orange-500"></i>
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
      </div>

      {/* Full width marquee container */}
      <div className="w-screen ml-[calc(-50vw+50%)] relative">
        <div className="overflow-hidden relative py-8 bg-gradient-to-br from-green-50/50 to-blue-50/50 border-t border-b border-gray-200 hover:[&_.marquee]:animate-pause">
          <div className="flex animate-scroll-marquee">
            <div className="flex flex-shrink-0 items-center gap-8 px-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-w-[300px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-500">
                  <div className="text-4xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                    {partner.logo}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex flex-shrink-0 items-center gap-8 px-8">
              {partners.map((partner, index) => (
                <div key={index} className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-w-[300px] transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-green-500">
                  <div className="text-4xl w-14 h-14 flex items-center justify-center flex-shrink-0">
                    {partner.logo}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{partner.name}</h4>
                    <p className="text-sm text-gray-600">{partner.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes scroll-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee 40s linear infinite;
          width: fit-content;
        }
        .animate-pause {
          animation-play-state: paused;
        }
        
        /* Ensure no horizontal scroll */
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}