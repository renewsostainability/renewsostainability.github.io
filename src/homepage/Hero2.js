import './Hero2.css';
import { useEffect, useState } from 'react';
import { FaStar, FaArrowRight, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Hero2() {
  const text = 'What do you need today?';
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [leftShowMore, setLeftShowMore] = useState(false);
  const [rightShowMore, setRightShowMore] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 100);
    }

    if (!isDeleting && displayedText === text) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    }

    if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, 80);
    }

    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white via-gray-50 to-emerald-50 overflow-hidden py-20 lg:py-28">
      {/* Modern Abstract Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, #10b981 1px, transparent 1px),
                             linear-gradient(180deg, #10b981 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}></div>
        </div>

        {/* Floating Abstract Shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full opacity-40 animate-float-slow"></div>
          <div className="absolute inset-10 bg-gradient-to-br from-white to-transparent rounded-full opacity-30 animate-float-reverse"></div>
        </div>

        <div className="absolute bottom-1/3 right-1/4 w-96 h-96">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-emerald-50 rounded-3xl rotate-45 opacity-50 animate-float-delayed"></div>
        </div>

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/50"></div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-blue-500/5 to-emerald-500/5 rounded-tl-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Minimal Modern Design */}
          <div className="relative">
            {/* Badge with subtle shadow */}
            <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-full font-medium text-gray-700 shadow-sm mb-10 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="relative">
                <FaStar className="text-emerald-500" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Welcome to RENEW
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-gray-900 leading-tight">
              <span className="relative">
                <span className="relative">
                  {displayedText || '\u00A0'}
                  <span className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></span>
                </span>
                <span className="inline-block w-[3px] h-[1.2em] bg-gradient-to-b from-emerald-500 to-blue-500 animate-blink align-middle ml-2"></span>
              </span>
            </h1>

            {/* Content with Read More/Less */}
            <div className="mb-12">
              <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                <p>
                  You want expert sustainability support and verified renewable energy
                  providers? Get started by telling us a bit about yourself and/or your
                  organisation.
                </p>
                
                {leftShowMore && (
                  <div className="space-y-4">
                    <p>
                      We recognise that for households, businesses, and public
                      organisations, rising energy bills can be a concern, just like
                      carbon-emitting operations, which harm our planet.
                    </p>
                    <p>
                      That's why we are here to help: whether your goal is to reduce costs, 
                      improve energy efficiency, reduce carbon emissions, make measured progress 
                      on your sustainability journey, and achieve good returns on investment 
                      and a greener planet, RENEW is your all-in-one solution.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setLeftShowMore(!leftShowMore)}
                className="mt-6 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors group"
              >
                {leftShowMore ? (
                  <>
                    <FaChevronUp className="group-hover:-translate-y-0.5 transition-transform" />
                    Read less
                  </>
                ) : (
                  <>
                    <FaChevronDown className="group-hover:translate-y-0.5 transition-transform" />
                    Read more
                  </>
                )}
                <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ml-2"></div>
              </button>
            </div>

            {/* CTA Button */}
            <button
              className="group relative inline-flex items-center gap-4 bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-200"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('products');
              }}
            >
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Get Started Now
              </span>
              <FaArrowRight className="relative z-10 text-emerald-500 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
            </button>
          </div>

          {/* RIGHT SIDE - Modern Card Design */}
          <div className="relative">
            {/* Floating Card */}
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 rounded-t-2xl"></div>
              
              {/* Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full">
                  <div className="relative">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="absolute -inset-1 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">SUSTAINABILITY ASSESSMENT</span>
                </div>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  I Need Help With Sustainability and Net Zero
                </span>
              </h2>

              {/* Content with Read More/Less */}
              <div className="mb-12">
                <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                  <p>
                    Don't know where or how to start on your sustainability and net-zero journey? 
                    Take our Sustainability Baseline Assessment (SBA) to get going.
                  </p>
                  
                  {rightShowMore && (
                    <div className="space-y-4">
                      <p>
                        The world of sustainability and net-zero can be overwhelming and leave 
                        you puzzled. It's a never-ending journey, and there's always a mark to make.
                      </p>
                      <p>
                        This can leave otherwise well-intentioned businesses and organisations 
                        drained and demotivated. Don't worry, we are here to unpack the lot and 
                        set you on a clear path of progress on sustainability leadership and net-zero.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setRightShowMore(!rightShowMore)}
                  className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                >
                  {rightShowMore ? (
                    <>
                      <FaChevronUp className="group-hover:-translate-y-0.5 transition-transform" />
                      Read less
                    </>
                  ) : (
                    <>
                      <FaChevronDown className="group-hover:translate-y-0.5 transition-transform" />
                      Learn more
                    </>
                  )}
                  <div className="w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 ml-2"></div>
                </button>
              </div>

              {/* CTA Button */}
              <button
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 w-full justify-center overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                <FaExternalLinkAlt className="relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Take the SBA Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl opacity-50"></div>
            <div className="absolute -z-20 -top-8 -right-8 w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl opacity-30"></div>
          </div>

        </div>
      </div>
    </section>
  );
}