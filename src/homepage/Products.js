'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FaSolarPanel,
  FaHandHoldingUsd,
  FaLeaf,
  FaTree,
  FaRecycle,
  FaStar,
  FaCrown,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from 'react-icons/fa';

const products = [
  {
    name: "Renewable Energy and Energy Efficiency Schemes",
    popular: true,
    icon: <FaSolarPanel className="text-white text-xl sm:text-2xl" />,
    features: [
      "Solar",
      "EV chargers",
      "Battery storage",
      "LED lighting",
      "Heating",
      "Refrigeration",
      "Insulation",
      "etc"
    ],
    benefits: [
      "Cost savings",
      "Market predictability",
      "Multiple providers",
      "Optimised products",
      "Finance options",
      "Discounts",
      "Retrofitting",
      "Infrastructure upgrades"
    ],
    cta: "Tell us what you need to get started",
    link: '#/mandatory_form/beas-form',
    color: "from-green-600 to-emerald-700"
  },
  {
    name: "Energy Savings Grants and Government Support",
    popular: false,
    icon: <FaHandHoldingUsd className="text-white text-xl sm:text-2xl" />,
    features: [
      "Winter fuel payment",
      "Warm home scheme",
      "Improved refrigeration",
      "Building insulation",
      "Water management",
      "Recycling and waste management",
      "Heating",
      "Ventilation",
      "Roof replacements",
      "Solar",
      "LED lighting",
      "etc"
    ],
    benefits: [
      "Free energy assessments",
      "Energy efficiency upgrades",
      "Cash grants",
      "Reduce energy poverty",
      "Customised offers"
    ],
    cta: "Tell us what you need to get started",
    link: '#/mandatory_form/ppa-form',
    color: "from-blue-600 to-cyan-700"
  },
  {
    name: "Sustainability Support and Consulting",
    popular: false,
    icon: <FaLeaf className="text-white text-xl sm:text-2xl" />,
    features: [
      "Strategy and policy",
      "Practice guides and action plans",
      "Measurement and reporting",
      "Green communication and marketing"
    ],
    benefits: [
      "Legal and regulatory compliance",
      "Competitive advantage",
      "Sustainability success stories",
      "Socially responsible practices",
      "Ethical business practices"
    ],
    cta: "Tell us what you need to get started",
    link: '#/mandatory_form/amw-form',
    color: "from-emerald-600 to-teal-700"
  },
  {
    name: "Biodiversity and Ecosystem Support",
    popular: false,
    icon: <FaTree className="text-white text-xl sm:text-2xl" />,
    features: [
      "Biodiversity Net Gain",
      "Environmental conservation",
      "Carbon offsets"
    ],
    benefits: [
      "Ecosystem services",
      "Biodiversity restoration",
      "Nature-based solutions",
      "Green spaces",
      "Afforestation"
    ],
    cta: "Tell us what you need to get started",
    color: "from-lime-600 to-green-700"
  },
  {
    name: "Circular Economy Practices",
    popular: false,
    icon: <FaRecycle className="text-white text-xl sm:text-2xl" />,
    features: [
      "Deposit Return Scheme",
      "Waste recycling",
      "Reuse"
    ],
    benefits: [
      "Waste to wealth",
      "Resource efficiency",
      "Fewer landfills",
      "Minimise environmental pollution",
      "Business innovation"
    ],
    cta: "Tell us what you need to get started",
    link: "#contact",
    color: "from-amber-600 to-orange-600"
  }
];

export default function ProductsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const minSwipeDistance = 50;
  const AUTO_PLAY_INTERVAL = 10000; // 10 seconds — slower and more user-friendly

  // Detect mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Slider navigation
  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const goToSlide = useCallback((index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex]);

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Auto-play with pause on hover/touch
  useEffect(() => {
    const startInterval = () => {
      intervalRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    };

    const pauseInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startInterval();

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('mouseenter', pauseInterval);
      slider.addEventListener('mouseleave', startInterval);
      slider.addEventListener('touchstart', pauseInterval);
      slider.addEventListener('touchend', startInterval);
    }

    return () => {
      pauseInterval();
      if (slider) {
        slider.removeEventListener('mouseenter', pauseInterval);
        slider.removeEventListener('mouseleave', startInterval);
        slider.removeEventListener('touchstart', pauseInterval);
        slider.removeEventListener('touchend', startInterval);
      }
    };
  }, [nextSlide]);

  // Scroll to contact section
  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Get visible products based on screen size
  const getVisibleProducts = () => {
    if (isMobile) {
      return [
        {
          ...products[currentIndex],
          isActive: true,
          isMobile: true,
        },
      ];
    }

    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      result.push({
        ...products[index],
        isActive: i === 0,
        isPrevious: i === -1,
        isNext: i === 1,
        isMobile: false,
      });
    }
    return result;
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white sm:py-12 px-4 sm:px-6 lg:px-2">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-1">
          <div className="inline-flex items-center gap-2 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-green-700 shadow-lg text-sm sm:text-base">
            <FaStar className="text-yellow-500 text-sm sm:text-base" />
            <span className="font-semibold">Our Sustainability Solutions</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 mt-4">Network partners for sustainable collaboration</p>
        </div>

        {/* Slider Section */}
        <section
          ref={sliderRef}
          className="relative mb-12 sm:mb-20"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop Navigation Buttons */}
          {!isMobile && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white shadow-lg sm:shadow-2xl rounded-full p-2 sm:p-4 transition-all hover:scale-105 sm:hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-lg sm:text-2xl text-green-700" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white shadow-lg sm:shadow-2xl rounded-full p-2 sm:p-4 transition-all hover:scale-105 sm:hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-lg sm:text-2xl text-green-700" />
              </button>
            </>
          )}

          {/* Slider Cards */}
          <div className="px-2 sm:px-8 lg:px-16 xl:px-24">
            <div
              className={`flex items-center ${isMobile ? 'justify-center' : 'gap-2 sm:gap-4'} transition-opacity duration-300 ${
                isTransitioning ? 'opacity-90' : 'opacity-100'
              }`}
            >
              {visibleProducts.map((product, index) => (
                <div
                  key={`${product.name}-${index}`}
                  className={`
                    transition-all duration-500 ease-in-out
                    ${isMobile
                      ? 'w-full max-w-sm'
                      : product.isActive
                      ? 'w-full md:w-[45%] lg:w-[40%] flex-shrink-0 scale-100'
                      : 'w-full md:w-[27.5%] lg:w-[30%] flex-shrink-0 scale-95 hidden sm:block'
                    }
                  `}
                >
                  <div
                    className={`
                      relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg sm:shadow-xl border-2 h-full transition-all duration-500
                      ${product.isActive
                        ? 'border-green-500 bg-gradient-to-br from-white via-green-50/50 to-white shadow-xl sm:shadow-2xl shadow-green-200/50 z-20'
                        : 'border-gray-100 shadow-lg opacity-90'
                      }
                      ${product.isActive ? 'hover:-translate-y-1 sm:hover:-translate-y-2 lg:hover:-translate-y-3' : 'sm:hover:-translate-y-1'}
                    `}
                  >
                    {/* Popular Badge */}
                    {product.popular && (
                      <div
                        className={`absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 shadow-lg sm:shadow-xl ${
                          product.isActive && !isMobile ? 'animate-bounce' : ''
                        }`}
                      >
                        <FaCrown className="text-yellow-300 text-xs sm:text-sm" />
                        Most Popular
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${product.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md sm:shadow-lg`}
                    >
                      {product.icon}
                    </div>

                    {/* Title */}
                    <div
                      className={`
                        font-bold text-gray-900 text-center mb-2 sm:mb-2 leading-snug
                        ${isMobile
                          ? 'text-lg sm:text-xl'
                          : product.isActive
                          ? 'text-xl sm:text-2xl lg:text-3xl mb-4'
                          : 'text-sm sm:text-base lg:text-lg'
                        }
                      `}
                    >
                      {product.name}
                    </div>

                    {/* Content: Full details if active, summary if not */}
                    {product.isActive ? (
                      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                            <FaCheck className="text-green-600 text-sm sm:text-base" />
                            Range of offers
                          </h4>
                          <ul className="space-y-1 sm:space-y-2">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-gray-700">
                                <span className="mr-2 text-green-600 mt-0.5 sm:mt-1 text-xs sm:text-sm">•</span>
                                <span className="text-xs sm:text-sm leading-relaxed sm:leading-normal">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2">
                            <FaStar className="text-green-600 text-sm sm:text-base" />
                            Benefits
                          </h4>
                          <ul className="space-y-1 sm:space-y-2">
                            {product.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start text-gray-700">
                                <span className="mr-2 text-green-600 mt-0.5 sm:mt-1 text-xs sm:text-sm">•</span>
                                <span className="text-xs sm:text-sm leading-relaxed sm:leading-normal">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 sm:mb-4">
                        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <h6 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                            Includes {product.features.length} offers and {product.benefits.length} benefits
                          </h6>
                          <ul className="space-y-1">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center text-gray-600">
                                <span className="mr-1 sm:mr-2 text-green-500 text-xs">✓</span>
                                <span className="text-xs truncate">{feature}</span>
                              </li>
                            ))}
                            {product.features.length > 3 && (
                              <li className="text-gray-500 text-xs">+{product.features.length - 3} more...</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <a
                      href={product.link}
                      className={`
                        w-full py-2 text-center sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 sm:gap-3 transition-all group text-sm sm:text-base
                        ${product.isActive
                          ? `bg-gradient-to-r ${product.color} text-white hover:shadow-md sm:hover:shadow-lg hover:scale-[1.02] shadow-sm sm:shadow-md`
                          : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200'
                        }
                      `}
                    >
                      {product.cta}
                      <FaArrowRight
                        className={`transition-transform ${
                          product.isActive ? 'group-hover:translate-x-1 sm:group-hover:translate-x-2' : 'group-hover:translate-x-1'
                        } text-xs sm:text-sm`}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 sm:mt-10 gap-1 sm:gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-green-500 focus:ring-offset-1 sm:focus:ring-offset-2 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 w-6 sm:w-10'
                    : 'bg-gray-300 hover:bg-gray-400 w-4 sm:w-8'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">
            <span className="font-medium">{currentIndex + 1}</span>
            <span className="mx-1 sm:mx-2">/</span>
            <span>{products.length}</span>
          </div>

          {/* Mobile Arrows */}
          {isMobile && products.length > 1 && (
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-xl text-green-700" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-xl text-green-700" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}