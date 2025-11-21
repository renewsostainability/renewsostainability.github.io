'use client'
import { useState } from 'react'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: "How much can I save on my energy bills with RENEW?",
      answer: "Most clients save between 40-60% on their energy bills. The exact amount depends on your current energy usage, property type, and the solutions implemented. Our free assessment will provide a detailed savings estimate specific to your situation."
    },
    {
      question: "Are there any upfront costs for your services?",
      answer: "No, there are no upfront costs for our initial assessment and consultation. For many solutions like Power Purchase Agreements (PPAs), we offer $0 upfront options. For other projects, we help you access government grants and funding to minimize or eliminate out-of-pocket expenses."
    },
    {
      question: "How long does the installation process take?",
      answer: "Installation timelines vary by project complexity. Simple upgrades like LED lighting can be completed in 1-2 days, while comprehensive solar installations typically take 2-4 weeks. We provide detailed timelines during the assessment phase and work to minimize disruption to your operations."
    },
    {
      question: "Do you help with government grant applications?",
      answer: "Yes, we provide complete grant application support. Our experts identify all available grants, assist with paperwork, and ensure your application meets all requirements. We've helped clients secure millions in funding for energy efficiency projects."
    },
    {
      question: "What maintenance is required after installation?",
      answer: "Most of our solutions require minimal maintenance. Solar panels need occasional cleaning, and we provide monitoring systems to track performance. We offer maintenance packages and 24/7 support to ensure your systems operate efficiently for years to come."
    },
    {
      question: "Can I combine multiple energy solutions?",
      answer: "Absolutely! We specialize in creating integrated energy solutions. Many clients combine solar panels with battery storage, EV charging, and energy efficiency upgrades for maximum savings and environmental impact. We'll design a comprehensive package tailored to your needs."
    },
    {
      question: "What happens if I move or sell my property?",
      answer: "For residential properties, most energy upgrades increase property value and can be transferred to new owners. For commercial PPA agreements, we offer flexible transfer options. We'll discuss all scenarios during planning to ensure long-term benefits."
    },
    {
      question: "How do I get started with RENEW?",
      answer: "Getting started is simple! Contact us for a free, no-obligation energy assessment. We'll analyze your current energy usage, discuss your goals, and provide a customized plan with projected savings and available funding options."
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className="container mx-auto px-4">
        {/* FAQ Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
            <i className="fas fa-question-circle text-orange-500"></i> FAQ
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our energy solutions, savings, 
            and the implementation process.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto mb-16">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-sm border transition-all duration-300 mb-4 overflow-hidden cursor-pointer
                ${activeIndex === index 
                  ? 'border-green-500 shadow-lg' 
                  : 'border-gray-200 hover:shadow-md hover:border-gray-300'
                }`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="w-full px-6 py-6 md:px-8 md:py-6 text-left flex justify-between items-center gap-4">
                <span className={`text-lg font-semibold flex-1 transition-colors duration-300
                  ${activeIndex === index ? 'text-green-600' : 'text-gray-900 hover:text-green-600'}`}
                >
                  {faq.question}
                </span>
                <i className={`fas fa-chevron-${activeIndex === index ? 'up' : 'down'} text-green-600 transition-transform duration-300
                  ${activeIndex === index ? 'rotate-180' : ''}`}
                ></i>
              </div>

              {/* Answer */}
              <div 
                className={`overflow-hidden transition-all duration-400
                  ${activeIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-6 pb-6 md:px-8 md:pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h3>
            <h6 className="mb-8 max-w-2xl mx-auto">
              Our energy experts are here to help. Contact us for personalized advice 
              and detailed information about your specific situation.
            </h6>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="btn btn-primary btn-large bg-white text-green-600 border-none hover:bg-gray-100 hover:transform hover:-translate-y-0.5"
                onClick={scrollToContact}
              >
                Contact Us <i className="fas fa-arrow-right ml-2"></i>
              </button>
              <button 
                className="btn btn-secondary btn-large bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white hover:transform hover:-translate-y-0.5"
                onClick={() => window.open('tel:+441234567890')}
              >
                <i className="fas fa-phone mr-2"></i> Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}