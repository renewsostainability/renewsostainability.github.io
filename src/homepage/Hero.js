import './Hero.css';
import { useEffect, useState } from 'react';

import {
  FaStar,
  FaArrowRight,
  FaSolarPanel,
  FaBolt,
  FaLeaf,
  FaChargingStation,
  FaPhone
} from "react-icons/fa";

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
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE TEXT */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-8">
              <FaStar className="text-orange-500" />
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
                just like high-emission power sources harm the environment.
              </p>
              <p>
                We simplify and automate your decarbonization and net-zero journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn btn-primary btn-large"
                onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}
              >
                Get Started <FaArrowRight className="ml-2" />
              </button>

              <button
                className="btn btn-secondary btn-large"
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              >
                <FaPhone className="mr-2" />
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT SIDE VISUAL */}
          <div className="relative flex justify-center items-center">
            {/* Background Blobs */}
            <div className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-tr from-green-200 via-green-100 to-transparent opacity-40 animate-float-slow -top-10 -left-10 z-0"></div>
            <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-green-300 to-transparent opacity-30 animate-float-slow-slow top-20 right-0 z-0"></div>

            <div className="relative z-10">
              {/* Main Icon Bubble */}
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <FaSolarPanel className="text-white text-5xl lg:text-7xl" />
              </div>

              {/* Floating Icons with slight rotation and staggered animation */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float hover:scale-110 transition-transform">
                <FaBolt className="text-green-600 text-2xl rotate-[20deg]" />
              </div>

              <div className="absolute top-4 right-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float animation-delay-700 hover:scale-110 transition-transform">
                <FaLeaf className="text-green-600 text-2xl rotate-[-15deg]" />
              </div>

              <div className="absolute bottom-0 -right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float animation-delay-1400 hover:scale-110 transition-transform">
                <FaChargingStation className="text-green-600 text-2xl rotate-[10deg]" />
              </div>

              {/* Small accent bubbles */}
              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-green-400 rounded-full opacity-50 animate-bounce-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-green-300 rounded-full opacity-40 animate-bounce-slower"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
