import React, { useRef, useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  FaBuilding,
  FaUsers,
  FaIndustry,
  FaShoppingCart,
  FaBullseye,
  FaChartLine,
  FaNewspaper,
  FaHome
} from 'react-icons/fa';

const HowItWorks2 = () => {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const audienceData = [
    {
      text: "Businesses with zero awareness and a lack of sustainability baselines, metrics, and KPIs.",
      icon: <FaBuilding className="w-6 h-6" />,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },
    {
      text: "SMEs and mid-sized enterprises that have sustainability goals but lack in-house expertise.",
      icon: <FaIndustry className="w-6 h-6" />,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },
    {
      text: "Corporate sustainability teams seeking niche solutions or local service providers.",
      icon: <FaUsers className="w-6 h-6" />,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      image: "https://www.business.com/_next/image/?url=https%3A%2F%2Fimages.business.com%2Fapp%2Fuploads%2F2018%2F12%2F19102326%2Fwhy-sustainability-matters-in-business-1024x559.png&w=2048&q=80"
    },
    {
      text: "Public-facing organisations needing sustainable procurement support.",
      icon: <FaShoppingCart className="w-6 h-6" />,
      color: "from-amber-500 to-amber-700",
      bgColor: "bg-amber-50",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
    },
    {
      text: "Product and service providers seeking access to authentic leads.",
      icon: <FaBullseye className="w-6 h-6" />,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-50",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd"
    },
    {
      text: "Policy makers seeking case studies and data for reform.",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "from-indigo-500 to-indigo-700",
      bgColor: "bg-indigo-50",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      text: "Media and advocacy organisations.",
      icon: <FaNewspaper className="w-6 h-6" />,
      color: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-50",
      image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1"
    },
    {
      text: "Households seeking verified energy-saving and efficiency grants and other support.",
      icon: <FaHome className="w-6 h-6" />,
      color: "from-emerald-500 to-emerald-700",
      bgColor: "bg-emerald-50",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
    }
  ];

  // Track centered item
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onScroll = () => {
      const center = slider.scrollLeft + slider.offsetWidth / 2;
      const cards = Array.from(slider.children);

      const closest = cards.reduce((best, card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        return Math.abs(cardCenter - center) <
          Math.abs(
            cards[best].offsetLeft +
              cards[best].offsetWidth / 2 -
              center
          )
          ? index
          : best;
      }, 0);

      setActiveIndex(closest);
    };

    slider.addEventListener('scroll', onScroll, { passive: true });
    return () => slider.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToIndex = (index) => {
    const slider = sliderRef.current;
    const card = slider.children[index];

    slider.scrollTo({
      left:
        card.offsetLeft -
        slider.offsetWidth / 2 +
        card.offsetWidth / 2,
      behavior: 'smooth'
    });
  };

  const goPrev = () => {
    scrollToIndex(Math.max(activeIndex - 1, 0));
  };

  const goNext = () => {
    scrollToIndex(Math.min(activeIndex + 1, audienceData.length - 1));
  };

  return (
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Who is RENEW for?
          </h2>
          <p className="text-xl text-gray-600">
            Our platform serves diverse stakeholders committed to sustainability
          </p>
        </div>

        <div className="relative">
            {/* Navigation buttons */}
            <button
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition hidden lg:block"
            >
                <MdChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg hover:scale-105 transition hidden lg:block"
            >
                <MdChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Slider */}
            <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 
                [&::-webkit-scrollbar]:hidden -ms-overflow-style-none scrollbar-width-none"
            >
            {audienceData.map((item, index) => (
            <div
                className={`flex-shrink-0 snap-center w-[80%] sm:w-[50%] lg:w-1/3 transition-all duration-300 ${
                    index === activeIndex
                    ? 'scale-105 rounded-2xl'
                    : 'scale-95 rounded-lg'
                }`}
                >

                <div className={`${item.bgColor} rounded-lg shadow-lg h-full`}>
                    <div className={`relative h-60 overflow-hidden ${
                        index === activeIndex ? 'rounded-t-2xl' : 'rounded-t-lg'
                    }`}>

                        <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`} />
                    </div>
                    <div className="p-6 flex gap-3">
                        <div className={`text-gradient ${item.color}`}>
                            {item.icon}
                        </div>
                        <p className="text-gray-800 font-medium">
                            {item.text}
                        </p>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {audienceData.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  index === activeIndex
                    ? 'bg-gray-800 scale-125'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
  );
};

export default HowItWorks2;
