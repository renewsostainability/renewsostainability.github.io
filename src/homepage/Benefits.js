import React from 'react';

const BenefitsPage = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Video with Stronger Fade to White Edges */}
          <div className="order-2 lg:order-1 relative overflow-hidden rounded-2xl">
            <video
              src="imgs/ai.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
            
            {/* Stronger, softer fade-to-white overlay – eliminates any remaining sharp edges */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, rgba(255,255,255,0.8) 60%, white 100%)',
              }}
            ></div>
          </div>

          {/* Right: Text Content */}
          <div className="order-1 lg:order-2">
            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              The RENEW Technology as Competitive Advantage
            </h3>
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                RENEW uses <span className="font-semibold text-green-600">Artificial Intelligence (AI)</span> to interpret data for eligibility, onboarding solutions, tracking progress, and transparent reporting. The platform showcases verified sustainability opportunities and decarbonization solutions, undertakes automated prequalification, and connects users to providers in a seamless interaction that leaves all parties truly satisfied.
                Aside from resolving pain points, RENEW also helps users progress further on their sustainability journey by providing <span className="font-semibold text-green-600">customised recommendations and guidance</span> for the long haul.
              </p>
              <p>
                RENEW marketplace caters to everyone needing help with sustainability — from product and service providers to users seeking effective and efficient solutions; from entities needing support in determining baseline to guidance on improvements and advancement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsPage;