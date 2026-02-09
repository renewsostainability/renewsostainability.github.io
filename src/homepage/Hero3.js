// Hero3.js
import './Hero.css';
import { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

export default function Hero() {
  const text = 'What do you need today?';

  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [leftShowMore, setLeftShowMore] = useState(false);
  const [rightShowMore, setRightShowMore] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);

  // Typing animation effect (only one useEffect needed)
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
  }, [displayedText, isDeleting, text]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* First Section – Appears before clicking "Get Started Now" */}
      {!showSecondSection && (
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-white/80 via-blue-50/50 to-emerald-50/50 backdrop-blur-sm overflow-hidden py-20 lg:py-28">
        {/* Animated Bubble Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large bubbles */}
          <div className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/40 to-blue-200/30 rounded-full blur-2xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gradient-to-tr from-blue-200/40 to-cyan-200/30 rounded-full blur-2xl animate-float-medium" />

          {/* Medium bubbles */}
          <div className="absolute top-40 right-1/4 w-48 h-48 bg-gradient-to-r from-teal-200/30 to-emerald-200/20 rounded-full blur-xl animate-float-fast" />
          <div className="absolute bottom-40 left-1/4 w-56 h-56 bg-gradient-to-l from-sky-200/30 to-blue-200/20 rounded-full blur-xl animate-float-slow" />

          {/* Small bubbles */}
          <div className="absolute top-20 right-1/3 w-32 h-32 bg-emerald-100/20 rounded-full blur-lg animate-float-fast" />
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-100/20 rounded-full blur-lg animate-float-medium" />
          <div className="absolute top-1/2 left-20 w-24 h-24 bg-cyan-100/20 rounded-full blur-md animate-float-slow" />
          <div className="absolute top-1/3 right-40 w-28 h-28 bg-teal-100/20 rounded-full blur-md animate-float-medium" />

          {/* Tiny floating dots */}
          <div className="absolute top-10 left-1/4 w-8 h-8 bg-blue-300/10 rounded-full animate-bounce" />
          <div className="absolute top-32 right-32 w-6 h-6 bg-emerald-300/10 rounded-full animate-bounce delay-300" />
          <div className="absolute bottom-32 left-32 w-10 h-10 bg-cyan-300/10 rounded-full animate-bounce delay-700" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT – Intro */}
            <div>
              <p className="text-xl md:text-2xl text-slate-700 mb-8">
                Welcome to RENEW! Your one-stop sustainability solution and marketplace for decarbonization opportunities.
                Choose your country/region to begin.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => setShowSecondSection(true)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-transform backdrop-blur-sm"
                >
                  Get Started Now
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* RIGHT – Hero Image */}
            <div className="relative">
              <img
                src="imgs/—Pngtree—3d illustration infrastructure renewable energy_13125800.png"
                alt="Expansive solar farm with wind turbines – symbolizing clean renewable energy and sustainability"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Second Section – Appears after clicking "Get Started Now" */}
      {showSecondSection && (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden py-20 lg:py-28">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* LEFT SIDE */}
              <div className="relative">
                {/* Typing Heading */}
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-slate-900 leading-tight">
                  <span className="relative">
                    <span className="text-slate-800">{displayedText || '\u00A0'}</span>
                    <span className="inline-block w-[3px] h-[1.2em] bg-gradient-to-b from-emerald-500 to-blue-500 animate-blink align-middle ml-2"></span>
                  </span>
                </h1>

                {/* Content */}
                <div className="mb-12">
                  <div className="text-slate-600 text-lg leading-relaxed space-y-4">
                    <p>
                      You want expert sustainability support and verified renewable energy providers? Get started by telling us a bit about yourself and/or your organisation.
                    </p>

                    {leftShowMore && (
                      <div className="space-y-4">
                        <p>
                          We recognise that for households, businesses, and public organisations, rising energy bills can be a concern, just like carbon-emitting operations, which harm our planet.
                        </p>
                        <p>
                          That's why we are here to help: whether your goal is to reduce costs, improve energy efficiency, reduce carbon emissions, make measured progress on your sustainability journey, and achieve good returns on investment and a greener planet, RENEW is your all-in-one solution.
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
                        <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
                        Read less
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
                        Read more
                      </>
                    )}
                    <div className="w-0 group-hover:w-16 h-[2px] bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ml-2"></div>
                  </button>
                </div>

                {/* CTA Button */}
                <button
                  className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('products');
                  }}
                >
                  <span className="relative z-10">Get Started Now</span>
                  <FaArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                </button>
              </div>

              {/* RIGHT SIDE – Card */}
              <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-slate-200">
                {/* Decorative Corner */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl rotate-12 shadow-lg"></div>

                {/* Badge */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full mb-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-slate-700">Sustainability Baseline Assessment (SBA)</span>
                  </div>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-slate-900 leading-tight">
                  I Need Help With Sustainability and Net Zero
                </h2>

                <div className="mb-12">
                  <div className="text-slate-600 text-lg leading-relaxed space-y-4">
                    <p>
                      Don't know where or how to start on your sustainability and net-zero journey? Take our Sustainability Baseline Assessment (SBA) to get going.
                    </p>

                    {rightShowMore && (
                      <div className="space-y-4">
                        <p>
                          The world of sustainability and net-zero can be overwhelming and leave you puzzled. It's a never-ending journey, and there's always a mark to make.
                        </p>
                        <p>
                          This can leave otherwise well-intentioned businesses and organisations drained and demotivated. Don't worry, we are here to unpack the lot and set you on a clear path of progress on sustainability leadership and net-zero.
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
                        <FaChevronUp className="group-hover:-translate-y-1 transition-transform" />
                        Read less
                      </>
                    ) : (
                      <>
                        <FaChevronDown className="group-hover:translate-y-1 transition-transform" />
                        Learn more
                      </>
                    )}
                    <div className="w-0 group-hover:w-16 h-[2px] bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300 ml-2"></div>
                  </button>
                </div>

                {/* CTA Button */}
                <button
                  className="group relative inline-flex items-center gap-4 bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-gray-200"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Take the SBA Now
                  </span>
                  <FaExternalLinkAlt className="relative z-10 text-emerald-500 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}