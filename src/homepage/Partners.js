import './Partners.css';
import { FaHandshake } from "react-icons/fa";

export default function Partners() {
  const partners = [
    {
      image: 'imgs/sben Partner Logo AW for website.jpg',
      description: 'Staffordshire Business & Environment Network'
    },
    {
      image: 'imgs/UofS_Master_Logo_RGB (6).png',
      description: 'University of Sustainability'
    },
    {
      image: 'imgs/NuLBC Logo (1).jpg',
      description: 'Newcastle-under-Lyme Borough Council'
    },
    {
      image: 'imgs/Funded by UK Gov-01 (1) (1).png',
      description: 'UK Government'
    }
  ];

  return (
    <div>
      <div className="container mx-auto px-4">
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
      </div>

      {/* Full width marquee container */}
      <div className="w-screen ml-[calc(-50vw+50%)] relative">
  <div className="overflow-hidden relative py-12 bg-gradient-to-br from-emerald-50/40 to-teal-50/40 border-t border-b border-gray-100/50 hover:[&_.marquee]:animate-pause">
    
    {/* Fade overlays for edges */}
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
    
    <div className="flex animate-marquee group/marquee">
      {/* First set of partners */}
      <div className="flex flex-shrink-0 items-center gap-8 px-8">
        {partners.map((partner, index) => (
          <div key={`partner-${index}`} className="flex flex-col items-center justify-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 min-w-[280px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300 hover:scale-[1.02] group-hover/marquee:opacity-100 opacity-90">
            <div className="relative w-full h-32 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={partner.image} 
                alt={partner.name || "Partner logo"} 
                className="relative w-full h-full object-contain transition-all duration-500"
              />
            </div>
            <div className="text-center">
              <h5 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                {partner.description || "Partner Name"}
              </h5>
            </div>
          </div>
        ))}
      </div>
      
      {/* Duplicate for seamless loop */}
      <div className="flex flex-shrink-0 items-center gap-8 px-8" aria-hidden="true">
        {partners.map((partner, index) => (
          <div key={`partner-duplicate-${index}`} className="flex flex-col items-center justify-center gap-4 p-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 min-w-[280px] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-300 hover:scale-[1.02] group-hover/marquee:opacity-100 opacity-90">
            <div className="relative w-full h-32 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={partner.image} 
                alt={partner.description || "Partner logo"} 
                className="relative w-full h-full object-contain transition-all duration-500"
              />
            </div>
            <div className="text-center">
              <h5 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                {partner.description || "Partner Name"}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
    </div>
  )
}