'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const words = ['Reduce Costs', 'Cut Emissions', 'Save Money', 'Go Green'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        if (displayedText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 80);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(word.slice(0, displayedText.length + 1));
        if (displayedText === word) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-emerald-50 to-white overflow-hidden py-24 lg:py-32 z-10">
      
      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE TEXT */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-8">
              <i className="fas fa-star text-orange-500"></i>
              Welcome to RENEW!
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
              Your All-in-One <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent relative">
                Energy{" "}
                <span className="inline-block min-w-[200px] font-semibold text-green-600">
                  {displayedText}
                </span>
                <span className="inline-block w-0.5 bg-green-600 h-1em align-bottom ml-1 animate-pulse"></span>
              </span>
            </h1>

            <div className="text-lg text-gray-600 leading-relaxed mb-8 space-y-4">
              <p>
                For households, businesses, and investors, energy bills can be expensive,
                just like high-emission power sources harm the environment. But if your goal
                is to reduce costs, improve efficiency, decrease carbon emissions, and achieve
                good returns on investment, then RENEW is your all-in-one solution.
              </p>
              <p>
                We simplify and automate your decarbonization and net-zero journey, so you can
                be green and proud every step of the way!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn btn-primary btn-large"
                onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}
              >
                Get Started <i className="fas fa-arrow-right ml-2"></i>
              </button>

              <button
                className="btn btn-secondary btn-large"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                <i className="fas fa-calendar mr-2"></i>
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT SIDE VISUAL */}
          <div className="relative">
            <div className="relative max-w-md mx-auto">
              <div className="relative p-8">

                {/* Main Icon Bubble */}
                <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10">
                  <i className="fas fa-solar-panel text-white text-5xl lg:text-7xl"></i>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-1/5 left-1/10 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float">
                  <i className="fas fa-bolt text-green-600 text-xl"></i>
                </div>

                <div className="absolute top-1/10 right-1/5 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float animation-delay-1000">
                  <i className="fas fa-leaf text-green-600 text-xl"></i>
                </div>

                <div className="absolute bottom-1/5 right-1/10 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float animation-delay-2000">
                  <i className="fas fa-charging-station text-green-600 text-xl"></i>
                </div>

                {/* Background Blob */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200 to-transparent rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] opacity-10 animate-float animation-duration-6000"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BACKGROUND SHAPES - NOW NON-INTERACTIVE */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-br from-green-200 to-transparent rounded-full opacity-5 -top-48 -right-24 animate-float animation-duration-8000"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-br from-green-200 to-transparent rounded-full opacity-5 -bottom-36 -left-24 animate-float animation-duration-6000 animation-direction-reverse"></div>
        <div className="absolute w-48 h-48 bg-gradient-to-br from-green-200 to-transparent rounded-full opacity-5 top-1/2 right-1/5 animate-float animation-duration-10000"></div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-duration-6000 {
          animation-duration: 6s;
        }
        .animation-duration-8000 {
          animation-duration: 8s;
        }
        .animation-duration-10000 {
          animation-duration: 10s;
        }
        .animation-direction-reverse {
          animation-direction: reverse;
        }
        .h-1em {
          height: 1em;
        }
      `}</style>
    </section>
  );
}
