'use client'
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex items-center gap-3 text-xl font-bold">
                <i className="fas fa-leaf text-green-500 text-2xl"></i>
                <span>RENEW</span>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                RENEW by SOStainability helps households, businesses, and investors 
                reduce energy costs, improve efficiency, and embrace sustainability 
                through comprehensive energy solutions.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-green-500 hover:transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-linkedin-in text-sm"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-green-500 hover:transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-twitter text-sm"></i>
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:bg-green-500 hover:transform hover:-translate-y-0.5"
                >
                  <i className="fab fa-facebook-f text-sm"></i>
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-white text-lg font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      onClick={() => router.push('/#home')} 
                      className="text-gray-300 hover:text-green-500 cursor-pointer transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      onClick={() => router.push('/#products')} 
                      className="text-gray-300 hover:text-green-500 cursor-pointer transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Our Solutions
                    </a>
                  </li>
                  <li>
                    <a 
                      onClick={() => router.push('/#why-us')} 
                      className="text-gray-300 hover:text-green-500 cursor-pointer transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Why RENEW
                    </a>
                  </li>
                  <li>
                    <a 
                      onClick={() => router.push('/#how-it-works')} 
                      className="text-gray-300 hover:text-green-500 cursor-pointer transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      How It Works
                    </a>
                  </li>
                </ul>
              </div>

              {/* Our Solutions */}
              <div>
                <h4 className="text-white text-lg font-semibold mb-6">Our Solutions</h4>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleNavigation('products') }}
                      className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Power Purchase Agreements
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleNavigation('products') }}
                      className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Energy Savings Grants
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleNavigation('products') }}
                      className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Government Support
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); handleNavigation('contact') }}
                      className="text-gray-300 hover:text-green-500 transition-all duration-300 flex items-center hover:translate-x-1"
                    >
                      Free Assessment
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-white text-lg font-semibold mb-6">Contact Info</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <i className="fas fa-envelope text-green-500 w-4"></i>
                    <a 
                      href="mailto:info@renew-energy.com" 
                      className="text-gray-300 hover:text-green-500 transition-colors duration-300"
                    >
                      info@renew-energy.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-phone text-green-500 w-4"></i>
                    <a 
                      href="tel:+441234567890" 
                      className="text-gray-300 hover:text-green-500 transition-colors duration-300"
                    >
                      +44 123 456 7890
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-green-500 w-4"></i>
                    <span className="text-gray-300">
                      Energy Efficiency Specialists
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                Copyright© <span className="text-white font-medium">{new Date().getFullYear()} RENEW by SOStainability</span>. All rights reserved.
              </p>
              <div className="flex gap-8">
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-500 text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-green-500 text-sm transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}