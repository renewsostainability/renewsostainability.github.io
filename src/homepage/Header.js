import { useState, useEffect } from "react";
import { FaLeaf, FaArrowRight, FaSignInAlt, FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const homepage_ids = ['', 'home', 'products', 'why-us', 'how-it-works', 'partners', 'faq', 'contact']
  const location = useLocation();
  const isHome = homepage_ids.includes(location.pathname.slice(1))


  const handleNavigation = (sectionId) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    } else {
      window.location.replace(`/#${sectionId}`);
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "products", label: "Services" },
    { id: "why-us", label: "Why RENEW" },
    { id: "how-it-works", label: "How It Works" },
  ];

  const shouldShowMobileMenu = isClient && isMenuOpen;

  // ================== STATIC (NO JS) ==================
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3 text-xl font-bold text-gray-900">
              <FaLeaf className="text-green-600 text-2xl" />
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                RENEW
              </span>
            </div>

            <button className="btn btn-primary flex items-center gap-2">
              Contact Us <FaArrowRight />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ================== FULL CLIENT RENDER ==================
  return (
    <>
      <header
        className={`fixed top-0 left-0 bg-white right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-200"
            : "bg-white/95 backdrop-blur-sm border-b border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button
              className="flex items-center gap-3 text-gray-900 font-bold text-xl"
              onClick={() => (window.location.href = "#/")}
            >
              <FaLeaf className="text-green-600 text-2xl" />
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                RENEW
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:block">
              <ul className="flex gap-8">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className="text-gray-500 font-medium hover:text-green-600 transition"
                      onClick={() => handleNavigation(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {isHome ? (
                <button
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl shadow-lg flex items-center gap-2"
                  onClick={() => handleNavigation("products")}
                >
                  Get Started <FaArrowRight />
                </button>
              ) : (
                <button
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl shadow-lg flex items-center gap-2"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login <FaSignInAlt />
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden text-xl text-gray-900 p-2"
                onClick={() => setIsMenuOpen(true)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {shouldShowMobileMenu && (
        <div className="fixed inset-0 z-[2000] md:hidden flex">
          <div className="w-80 bg-white h-full shadow-2xl p-8 relative animate-slide-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 text-xl font-bold text-green-600">
                <FaLeaf />
                <span>RENEW</span>
              </div>

              <button className="text-xl p-2" onClick={() => setIsMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="mb-8">
              <ul>
                {navItems.map((item) => (
                  <li key={item.id} className="mb-2">
                    <button
                      className="block w-full text-left p-4 text-gray-900 font-medium rounded-lg hover:bg-gray-50"
                      onClick={() => handleNavigation(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {isHome ? (
              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl"
                onClick={() => handleNavigation("products")}
              >
                Get Started
              </button>
            ) : (
              <button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
            )}
          </div>

          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
}
