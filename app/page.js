'use client';

import { useEffect, useState } from 'react';

import Header from './components/homepage/Header';
import Hero from './components/homepage/Hero';
import Products from './components/homepage/Products';
import WhyUs from './components/homepage/WhyUs';
import HowItWorks from './components/homepage/HowItWorks';
import Partners from './components/homepage/Partners';
import FAQ from './components/homepage/FAQ';
import Contact from './components/homepage/Contact';
import Footer from './components/homepage/Footer';

import './homepage.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="home-page">
        <Header />
        <main>
          <section id="home"><Hero /></section>
          <section id="products" className="section section-bg"><Products /></section>
          <section id="why-us" className="section"><WhyUs /></section>
          <section id="how-it-works" className="section section-bg-alt"><HowItWorks /></section>
          <section id="partners" className="section section-bg"><Partners /></section>
          <section id="faq" className="section section-bg-alt"><FAQ /></section>
          <section id="contact" className="section section-bg"><Contact /></section>
        </main>
        <Footer />
      </div>
    </>
  );
}
