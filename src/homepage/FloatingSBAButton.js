import { useEffect, useState } from 'react';
import { FaExternalLinkAlt, FaArrowDown } from "react-icons/fa";

export default function FloatingSBAButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      // Track if scrolled past 100px
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide button when scrolling down, show when scrolling up
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = () => {
    const contactSection = document.getElementById('contact');
    const productsSection = document.getElementById('products');
    
    // Try contact section first, then products as fallback
    const element = contactSection || productsSection;
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // If no section found, scroll to top as fallback
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      {/* Desktop Floating Button */}
      <div className="hidden md:block">
        <button
          className={`pointer-events-auto fixed bottom-8 right-8 flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white px-6 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-[0_20px_50px_rgba(5,150,105,0.4)] transition-all duration-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          } ${
            isScrolled ? 'shadow-emerald-500/30' : ''
          } animate-[bounce_2s_infinite] hover:scale-105 active:scale-95`}
          onClick={scrollToSection}
          aria-label="Take Sustainability Baseline Assessment"
        >
          <FaExternalLinkAlt className="text-lg" />
          <span>Take the SBA Now</span>

          
          {/* Animated ring around button */}
          <div className="absolute -inset-2 rounded-2xl border-2 border-emerald-400/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </button>
      </div>

      {/* Mobile Bottom Bar Button */}
      <div className="md:hidden pointer-events-auto">
        <div className={`
          fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-blue-600 
          text-white p-4 shadow-lg transition-transform duration-300
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <div className="container mx-auto px-4">
            <button
              className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95"
              onClick={scrollToSection}
            >
              <FaExternalLinkAlt className="text-lg animate-[pulse_2s_infinite]" />
              <span className="text-lg">Take the SBA Now</span>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-[ping_1.5s_infinite]" />
            </button>
            
            {/* Arrow indicator on mobile */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-[bounce_1.5s_infinite]">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-2 rounded-full shadow-lg">
                <FaArrowDown className="text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200 z-40">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300"
          style={{
            width: `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%`
          }}
        />
      </div>
    </div>
  );
}