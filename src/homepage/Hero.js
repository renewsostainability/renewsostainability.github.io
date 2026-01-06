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
  const text = 'What do you need today?';
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-green-50 via-emerald-50 to-white overflow-hidden py-24 lg:py-32 z-10">
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT SIDE TEXT */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-8">
              <FaStar className="text-orange-500" />
              Welcome to RENEW!
            </div>

            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6 text-gray-900">
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent relative">
                
                {/* Typed text (wraps naturally) */}
                <span className="font-semibold text-green-600">
                  {displayedText || '\u00A0'}
                </span>

                {/* Cursor (inline, wrapping-safe) */}
                <span
                  className="inline-block align-baseline ml-1 w-[2px] h-[1em] bg-green-600 animate-blink"
                  aria-hidden="true"
                />
              </span>
            </h2>

            <div className="text-lg text-gray-600 leading-relaxed mb-8 space-y-4">
              <p>
                We recognise that for households, businesses, and sundry organisations, rising energy bills can be a concern, just like high-emission power sources can harm the environment. That’s why we are here to help: whether your goal is to reduce costs, improve efficiency, reduce carbon emissions, make measured progress on your sustainability journey, and achieve good returns on investment and a greener planet, RENEW is your all-in-one solution.
              </p>
              <p className='italic'>
                To get started, tell us a bit about yourself and what you need today (Begin Mandatory Data Collection…then funnel into listed products and services… prompt choice selection and begin Eligibility Check… Eligibility Result either leads to creating the connection between the user and the appropriate provider or the SBA survey.)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn btn-primary btn-large flex items-center justify-center text-center"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('products');
                }}
              >
                Get Started <FaArrowRight className="ml-2" />
              </button>

              <button
                className="btn btn-secondary btn-large flex items-center justify-center text-center"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                <FaPhone className="mr-2" />
                Contact Us
              </button>
            </div>

          </div>

          {/* RIGHT SIDE VISUAL */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-tr from-green-200 via-green-100 to-transparent opacity-40 animate-float-slow -top-10 -left-10 z-0"></div>
            <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-green-300 to-transparent opacity-30 animate-float-slow-slow top-20 right-0 z-0"></div>

            <div className="relative z-10">
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-transform duration-500 hover:scale-105">
                <FaSolarPanel className="text-white text-5xl lg:text-7xl" />
              </div>

              <div className="absolute -top-8 -left-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float">
                <FaBolt className="text-green-600 text-2xl rotate-[20deg]" />
              </div>

              <div className="absolute top-4 right-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float animation-delay-700">
                <FaLeaf className="text-green-600 text-2xl rotate-[-15deg]" />
              </div>

              <div className="absolute bottom-0 -right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg z-20 animate-float animation-delay-1400">
                <FaChargingStation className="text-green-600 text-2xl rotate-[10deg]" />
              </div>

              <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-green-400 rounded-full opacity-50 animate-bounce-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-green-300 rounded-full opacity-40 animate-bounce-slower"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
