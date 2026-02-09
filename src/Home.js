import { useEffect, useState } from 'react';

import Header from './homepage/Header';
import Hero from './homepage/Hero';
import Hero3 from './homepage/Hero3';
import Products from './homepage/Products.js';
import WhyUs from './homepage/WhyUs';
import HowItWorks from './homepage/HowItWorks';
import HowItWorks2 from './homepage/HowItWorks2';
import Partners from './homepage/Partners';
import FAQ from './homepage/FAQ';
import Contact from './homepage/Contact';
import Footer from './homepage/Footer';
import About from './homepage/About';
import Benefits from './homepage/Benefits';
import FloatingSBAButton from './homepage/FloatingSBAButton';

import './custom-css.css';

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
          <section id="home"><Hero3 /></section>
          <section id="products" className="section-bg"><Products /></section>
          <section id="how-it-works" className="section section-bg-alt"><HowItWorks /></section>
          <section id="how-it-works-2" className="section section-bg-alt"><HowItWorks2 /></section>
          <section id="about-us" className="section section-bg"><About /></section>
          <section id="why-us" className="section section-bg-alt"><WhyUs /></section>
          <section id="benefits" className="section"><Benefits /></section>
          <section id="partners" className="section section-bg"><Partners /></section>
          {/* <section id="faq" className="section section-bg-alt"><FAQ /></section> */}
          <section id="contact" className="section section-bg-alt"><Contact /></section>
          <FloatingSBAButton />
        </main>
        <Footer />
      </div>
    </>
  );
}
