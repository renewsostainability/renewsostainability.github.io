// 'use client';

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (sectionId) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId)

    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    } else {
      router.push(`/#${sectionId}`)
    }
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Services' },
    { id: 'why-us', label: 'Why RENEW' },
    { id: 'how-it-works', label: 'How It Works' },
  ]

  // Don't render mobile menu overlay during SSR
  const shouldShowMobileMenu = isClient && isMenuOpen

  // ---------------- STATIC SSR RENDER ----------------
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            
            {/* Logo */}
            <div className="flex items-center">
              <button className="flex items-center gap-3 text-gray-900 font-bold text-xl bg-none border-none cursor-pointer">
                <div className="text-green-600 text-2xl">
                  <i className="fas fa-leaf"></i>
                </div>
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  RENEW
                </span>
              </button>
            </div>

            {/* Static Button */}
            <div className="flex items-center gap-4">
              <button className="btn btn-primary">
                Free Assessment <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>

          </div>
        </div>
      </header>
    )
  }

  // ---------------- FULL CLIENT RENDER ----------------
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-200' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <div className="flex items-center">
              <button 
                className="flex items-center gap-3 text-gray-900 font-bold text-xl bg-none border-none cursor-pointer"
                onClick={() => router.push('/')}
              >
                <div className="text-green-600 text-2xl">
                  <i className="fas fa-leaf"></i>
                </div>
                <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  RENEW
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex list-none gap-8">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button 
                      className="bg-none border-none text-gray-500 font-medium relative cursor-pointer hover:text-green-600 transition-colors"
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

              {/* Homepage → Get Started | Other pages → Login */}
              {isHome ? (
                <button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => handleNavigation('products')}
                >
                  Get Started <i className="fas fa-arrow-right ml-2"></i>
                </button>
              ) : (
                <button 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => router.push('/login')}
                >
                  Login <i className="fas fa-sign-in-alt ml-2"></i>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden text-xl text-gray-900 p-2"
                onClick={() => setIsMenuOpen(true)}
              >
                <i className="fas fa-bars"></i>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {shouldShowMobileMenu && (
        <div className="fixed inset-0 z-[2000] md:hidden flex">
          
          {/* Slide-out Menu */}
          <div className="w-80 bg-white h-full shadow-2xl p-8 relative z-[2001] animate-slide-in">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3 font-bold text-xl text-green-600">
                <i className="fas fa-leaf"></i>
                <span>RENEW</span>
              </div>

              <button 
                className="text-xl text-gray-900 p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            {/* Menu Links */}
            <nav className="mb-8">
              <ul>
                {navItems.map(item => (
                  <li key={item.id} className="mb-2">
                    <button 
                      className="block w-full text-left p-4 text-gray-900 font-medium rounded-lg hover:bg-gray-50 hover:text-green-600"
                      onClick={() => handleNavigation(item.id)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            {isHome ? (
              <button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold"
                onClick={() => handleNavigation('products')}
              >
                Get Started
              </button>
            ) : (
              <button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold"
                onClick={() => router.push('/login')}
              >
                Login
              </button>
            )}
          </div>

          {/* Black Overlay */}
          <div 
            className="flex-1 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </>
  )
}
