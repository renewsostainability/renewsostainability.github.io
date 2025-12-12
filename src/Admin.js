import { useState, useEffect } from 'react';
import { 
  FaEdit,
  FaTrash,
  FaSave,
  FaPlus,
  FaList,
  FaDollarSign,
  FaLink,
  FaDownload
} from 'react-icons/fa';

import Header from './homepage/Header';
import Footer from './homepage/Footer';
// Default services data WITH suggested fields
const ppa_dom_services = [
  { 
    title: 'Loft Insulation', 
    description: 'Install 270mm thick loft insulation to prevent heat loss through the roof.',
    url: 'https://energysavingtrust.org.uk/advice/loft-insulation/',
    price: '£800 - £1,500'
  },
  { 
    title: 'LED Lighting', 
    description: 'Replace all halogen and incandescent bulbs with LED alternatives.',
    url: 'https://energysavingtrust.org.uk/advice/lighting/',
    price: '£200 - £800'
  },
  { 
    title: 'Cavity Wall Insulation', 
    description: 'Fill cavity walls with insulation material to reduce heat transfer.',
    url: 'https://energysavingtrust.org.uk/advice/cavity-wall-insulation/',
    price: '£1,500 - £3,000'
  },
  { 
    title: 'Smart Heating Controls', 
    description: 'Install smart thermostats and heating zone controls for better efficiency.',
    url: 'https://energysavingtrust.org.uk/advice/smart-heating-controls/',
    price: '£300 - £1,200'
  },
  { 
    title: 'Solar Panel Installation', 
    description: 'Install photovoltaic panels to generate renewable electricity.',
    url: 'https://energysavingtrust.org.uk/advice/solar-panels/',
    price: '£4,000 - £8,000'
  },
  { 
    title: 'Water Efficiency Measures', 
    description: 'Install water-saving devices and improve hot water system efficiency.',
    url: 'https://energysavingtrust.org.uk/advice/water-saving/',
    price: '£500 - £2,000'
  }
];

const beas_dom_services = [
  { 
    title: 'Solar PV Installation', 
    description: 'Install photovoltaic panels to generate renewable electricity and reduce grid dependency.',
    url: 'https://www.cibse.org/renewables/solar-pv',
    price: '£20,000 - £50,000'
  },
  { 
    title: 'HVAC System Upgrade', 
    description: 'Replace old heating and cooling systems with high-efficiency models and smart controls.',
    url: 'https://www.cibse.org/hvac-systems',
    price: '£15,000 - £40,000'
  },
  { 
    title: 'LED Lighting Retrofit', 
    description: 'Upgrade to energy-efficient LED lighting throughout your commercial premises.',
    url: 'https://www.cibse.org/lighting',
    price: '£5,000 - £20,000'
  },
  { 
    title: 'Building Insulation', 
    description: 'Improve roof, wall, and floor insulation to reduce heating and cooling costs.',
    url: 'https://www.cibse.org/insulation',
    price: '£10,000 - £30,000'
  },
  { 
    title: 'Water Efficiency Systems', 
    description: 'Install water-saving devices and efficient hot water systems for industrial processes.',
    url: 'https://www.cibse.org/water-efficiency',
    price: '£8,000 - £25,000'
  },
  { 
    title: 'Energy Monitoring', 
    description: 'Implement smart energy monitoring systems to track and optimize energy usage.',
    url: 'https://www.cibse.org/energy-monitoring',
    price: '£3,000 - £10,000'
  }
];

const amw_dom_services = [
  { 
    title: 'Solar PV Installation', 
    description: 'Install photovoltaic panels to generate renewable electricity and reduce grid dependency with zero upfront cost.',
    url: 'https://www.ppa-uk.org/solar-ppa',
    price: '£20,000 - £50,000'
  },
  { 
    title: 'HVAC System Upgrade', 
    description: 'Replace old heating and cooling systems with high-efficiency models and smart controls for better energy management.',
    url: 'https://www.ppa-uk.org/hvac-ppa',
    price: '£30,000 - £50,000'
  },
  { 
    title: 'LED Lighting Retrofit', 
    description: 'Upgrade to energy-efficient LED lighting throughout your commercial premises with significant energy savings.',
    url: 'https://www.ppa-uk.org/lighting-ppa',
    price: '£20,000 - £50,000'
  },
  { 
    title: 'Roof Replacement', 
    description: 'Comprehensive roof replacement included in PPA, ensuring optimal conditions for solar panel installation.',
    url: 'https://www.ppa-uk.org/roof-ppa',
    price: '£40,000 - £50,000'
  },
  { 
    title: 'EV Charging Infrastructure', 
    description: 'Install electric vehicle charging stations with solar-powered carports for sustainable transportation.',
    url: 'https://www.ppa-uk.org/ev-charging-ppa',
    price: '£10,000 - £30,000'
  },
  { 
    title: 'Carbon Credit Generation', 
    description: 'Generate carbon credits through renewable energy production and energy efficiency improvements.',
    url: 'https://www.ppa-uk.org/carbon-credits',
    price: '£5,000 - £15,000'
  }
];


export default function Admin() {
  // Initialize from localStorage on component mount with default values
  const loadInitialData = () => {
    try {
      const amwData = localStorage.getItem('admin_amw_services');
      const ppaData = localStorage.getItem('admin_ppa_services');
      const beasData = localStorage.getItem('admin_beas_services');
      
      return {
        amw: amwData ? JSON.parse(amwData) : [],
        ppa: ppaData ? JSON.parse(ppaData) : [],
        beas: beasData ? JSON.parse(beasData) : []
      };
    } catch (error) {
      console.log('Initializing with empty data');
      return {
        amw: [],
        ppa: [],
        beas: []
      };
    }
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState('amw');
  
  // State for services data - initialize directly from localStorage
  const [services, setServices] = useState(loadInitialData());
  
  // State for form inputs - REMOVED url and price from form
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    price: ''
  });
  
  // State for editing
  const [editingId, setEditingId] = useState(null);
  
  // Save to localStorage whenever services change
  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem('admin_amw_services', JSON.stringify(data.amw));
      localStorage.setItem('admin_ppa_services', JSON.stringify(data.ppa));
      localStorage.setItem('admin_beas_services', JSON.stringify(data.beas));
    } catch (error) {
      console.log('Error saving to localStorage:', error);
    }
  };
  
  // Update services and save to localStorage
  const updateServices = (newServices) => {
    setServices(newServices);
    saveToLocalStorage(newServices);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required');
      return;
    }
    
    // When adding new service, we don't include suggested fields - they come from DOM data
    const newService = {
      id: editingId || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      url: formData.url,
      price: formData.price,
      // url and price are NOT added here - they come from DOM data
    };
    
    if (editingId) {
      // Update existing service - preserve existing suggested fields if they exist
      const existingService = services[activeTab].find(item => item.id === editingId);
      const updatedService = {
        ...newService,
        url: existingService?.url || '', // Keep existing url
        price: existingService?.price || '' // Keep existing price
      };
      
      const updatedServices = {
        ...services,
        [activeTab]: services[activeTab].map(item => 
          item.id === editingId ? updatedService : item
        )
      };
      updateServices(updatedServices);
      setEditingId(null);
    } else {
      // Add new service - no suggested fields initially
      const updatedServices = {
        ...services,
        [activeTab]: [...services[activeTab], newService]
      };
      updateServices(updatedServices);
    }
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      url: '',
      price: ''
    });
  };
  
  // Handle edit
  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      url: service.url || '',
      price: service.price || ''
      // Don't show suggested fields in form - they're read-only
    });
    setEditingId(service.id);
  };
  
  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updatedServices = {
        ...services,
        [activeTab]: services[activeTab].filter(item => item.id !== id)
      };
      updateServices(updatedServices);
      
      // Clear form if editing the deleted item
      if (editingId === id) {
        setFormData({
          title: '',
          description: '',
          url: '',
          price: ''
        });
        setEditingId(null);
      }
    }
  };
  
  // Clear form
  const handleClear = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      price: ''
    });
    setEditingId(null);
  };
  
  // Load default services for active tab WITH suggested fields from DOM data
  const handleLoadDefaults = () => {
    if (window.confirm(`Load default products and services for ${getTabName(activeTab)}? This will replace any existing services.`)) {
      let defaultServices = [];
      
      switch(activeTab) {
        case 'amw':
          defaultServices = amw_dom_services.map((service, index) => ({
            id: `amw-default-${index}`,
            title: service.title,
            description: service.description,
            url: service.url,
            price: service.price
          }));
          break;
        case 'ppa':
          defaultServices = ppa_dom_services.map((service, index) => ({
            id: `ppa-default-${index}`,
            title: service.title,
            description: service.description,
            url: service.url,
            price: service.price
          }));
          break;
        case 'beas':
          defaultServices = beas_dom_services.map((service, index) => ({
            id: `beas-default-${index}`,
            title: service.title,
            description: service.description,
            url: service.url,
            price: service.price
          }));
          break;
      }
      
      const updatedServices = {
        ...services,
        [activeTab]: defaultServices
      };
      
      updateServices(updatedServices);
      alert(`Default ${getTabName(activeTab)} loaded successfully!`);
    }
  };
  
  // Get tab name
  const getTabName = (tab) => {
    switch(tab) {
      case 'amw': return 'AMW Services';
      case 'ppa': return 'PPA Services';
      case 'beas': return 'BEAS Services';
      default: return tab.toUpperCase();
    }
  };
  
  return (
    <>
      <Header />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Manage suggested products and services for AMW, PPA, and BEAS programs
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left Sidebar - Vertical Tabs */}
              <div className="lg:w-1/4 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaList className="w-5 h-5 mr-2 text-gray-600" />
                    Programs
                  </h3>
                  
                  <nav className="space-y-1">
                    {['amw', 'ppa', 'beas'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          handleClear();
                        }}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          activeTab === tab
                            ? 'bg-white text-gray-800 shadow-sm border border-gray-200'
                            : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                        }`}
                      >
                        <span className="mr-3">{tab.toUpperCase()}</span>
                        {getTabName(tab)}
                        <span className="ml-auto bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                          {services[tab].length}
                        </span>
                      </button>
                    ))}
                  </nav>
                  
                  {/* Load Defaults Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleLoadDefaults}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200 shadow-sm"
                    >
                      <FaDownload className="w-4 h-4 mr-2" />
                      Load Default Services
                    </button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Loads pre-defined services
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="lg:w-3/4">
                <div className="p-8">
                  {/* Current Tab Header */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h2 className="text-2xl font-light text-gray-900">
                          {getTabName(activeTab)}
                        </h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                          {services[activeTab].length} items
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Manage products and services. Suggested URLs and Prices come from default data.
                    </p>
                  </div>
                  
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Form */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          {editingId ? '✏️ Edit Service' : '➕ Add New Service'}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleClear}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Clear Form
                          </button>
                          {editingId && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              Editing
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                            placeholder="Enter service title"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                          </label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                            placeholder="Enter detailed description"
                            required
                          />
                        </div>
                        
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Your URL (Optional)
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500">
                                <FaLink className="w-4 h-4" />
                              </span>
                              <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                                placeholder="Your actual URL"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Your Price (Optional)
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 text-gray-500">
                                <FaDollarSign className="w-4 h-4" />
                              </span>
                              <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                                placeholder="Your actual price"
                              />
                            </div>
                          </div>
                        
                        <div className="flex space-x-4 pt-4">
                          <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
                          >
                            <FaSave className="w-5 h-5 mr-2" />
                            {editingId ? 'Update Service' : 'Add Service'}
                          </button>
                           
                          {editingId && (
                            <button
                              type="button"
                              onClick={handleClear}
                              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                    
                    {/* Right Column - List */}
                    <div className="bg-white rounded-xl border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              Current Services
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Click edit to modify your fields.
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              {services[activeTab].length} services
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="max-h-[500px] overflow-y-auto">
                        {services[activeTab].length === 0 ? (
                          <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <FaPlus className="w-8 h-8 text-gray-400" />
                            </div>
                            <h4 className="text-lg font-medium text-gray-900 mb-2">
                              No services yet
                            </h4>
                            <p className="text-gray-600 mb-4">
                              Add your first product or service, or load default data
                            </p>
                            <button
                              onClick={handleLoadDefaults}
                              className="px-4 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                            >
                              Load Default Services
                            </button>
                          </div>
                        ) : (
                          <div className="divide-y divide-gray-200">
                            {services[activeTab].map((service) => (
                              <div 
                                key={service.id} 
                                className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${
                                  editingId === service.id ? 'bg-gray-50 border-l-4 border-l-gray-500' : ''
                                }`}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="text-lg font-medium text-gray-900">
                                      {service.title}
                                    </h4>
                                    <p className="text-gray-600 mt-2">
                                      {service.description}
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEdit(service)}
                                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                      title="Edit"
                                    >
                                      <FaEdit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(service.id)}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                      title="Delete"
                                    >
                                      <FaTrash className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="mt-4">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-600">URL:</span>
                                            {service.url ? (
                                                <a
                                                href={service.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-green-600 hover:text-green-800 flex items-center text-sm"
                                                >
                                                <FaLink className="w-3 h-3 mr-1" />
                                                Link
                                                </a>
                                            ) : null}
                                        </div>

                                        <div>
                                            <span className="text-sm text-gray-600">Price:</span>
                                            <span className="ml-2 text-gray-700 text-sm">
                                            {service.price || null}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))} 
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}