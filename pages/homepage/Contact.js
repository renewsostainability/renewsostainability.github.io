// 'use client'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    interest: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! We will contact you shortly.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      propertyType: '',
      interest: '',
      message: ''
    })
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Info Section */}
        <div className="lg:pr-8">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full font-medium text-green-600 shadow-md mb-6">
            <i className="fas fa-star text-orange-500"></i>
            Get Started
          </div>
          
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Start Your <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">Energy Savings</span> Journey
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            Ready to reduce your energy costs and carbon footprint? Fill out the form 
            and our energy experts will contact you within 24 hours for a free, no-obligation assessment.
          </p>

          <div className="flex flex-col gap-6">
            {/* Phone Contact */}
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:translate-x-2 hover:shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-phone-alt text-white text-lg"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                <a 
                  href="tel:+441234567890" 
                  className="text-green-600 font-medium hover:text-green-700 transition-colors duration-300"
                >
                  +44 123 456 7890
                </a>
              </div>
            </div>
            
            {/* Email Contact */}
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:translate-x-2 hover:shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-envelope text-white text-lg"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                <a 
                  href="mailto:info@renew-energy.com" 
                  className="text-green-600 font-medium hover:text-green-700 transition-colors duration-300"
                >
                  info@renew-energy.com
                </a>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:translate-x-2 hover:shadow-md">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fas fa-clock text-white text-lg"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                <p className="text-gray-600 text-sm">Mon-Fri: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="mb-6">
                <input 
                  type="text" 
                  name="name"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-gray-900"
                  placeholder="Full Name *" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-6">
                <input 
                  type="email" 
                  name="email"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-gray-900"
                  placeholder="Email Address *" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            
            {/* Phone and Property Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="mb-6">
                <input 
                  type="tel" 
                  name="phone"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-gray-900"
                  placeholder="Phone Number *" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="mb-6">
                <select 
                  name="propertyType"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-gray-900 appearance-none"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Property Type *</option>
                  <option value="residential">Residential Home</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="industrial">Industrial Facility</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            {/* Interest Selection */}
            <div className="mb-6">
              <select 
                name="interest"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-gray-900 appearance-none"
                value={formData.interest}
                onChange={handleChange}
                required
              >
                <option value="">Primary Interest *</option>
                <option value="solar">Solar Energy</option>
                <option value="ev">EV Chargers</option>
                <option value="lighting">LED Lighting</option>
                <option value="grants">Energy Grants</option>
                <option value="government">Government Support</option>
                <option value="multiple">Multiple Solutions</option>
              </select>
            </div>
            
            {/* Message Textarea */}
            <div className="mb-6">
              <textarea 
                name="message"
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white text-gray-900 resize-y min-h-[120px]"
                rows="4" 
                placeholder="Tell us about your energy needs and goals..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full btn btn-primary btn-large"
            >
              Contact Us <i className="fas fa-arrow-right ml-2"></i>
            </button>
            
            {/* Form Note */}
            <p className="text-center mt-6 text-gray-500 text-sm">
              By submitting this form, you agree to our privacy policy and consent to being contacted by our energy specialists.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}