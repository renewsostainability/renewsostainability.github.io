// "use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaBuilding, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaInfoCircle,
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaTimes,
  FaPiggyBank,
  FaThermometerHalf,
  FaCertificate,
  FaClock, 
  FaRulerCombined,
  FaIndustry,
  FaUserTie,
  FaChartLine,
  FaBalanceScale,
  FaEuroSign,
  FaLeaf
} from 'react-icons/fa';

import Header from '../homepage/Header';
import Footer from '../homepage/Footer';

export default function BEASApplicationForm() {
  const router = useRouter();

  // Initialize with localStorage data
  const getInitialFormData = () => {
    if (typeof window === 'undefined') {
      return {
        // Business Details
        companyName: '',
        companyNumber: '',
        businessType: '',
        registrationDate: '',
        tradingDuration: '',
        
        // SME Eligibility
        employeeCount: '',
        annualTurnover: '',
        balanceSheetTotal: '',
        
        // Premises & Operations
        premisesType: '',
        energyBillResponsibility: '',
        samePremisesDuration: '',
        
        // Energy Consumption
        electricityConsumption: '',
        gasConsumption: '',
        totalEnergyConsumption: '',
        
        // Previous Support
        previousPublicSupport: '',
        supportAmount: '',
        
        // Project Information
        projectDescription: ' ',
        estimatedCost: '',
        companyContribution: '',
        
        termsAccepted: false
      };
    }

    return {
      companyName: localStorage.getItem('beas_companyName') || '',
      companyNumber: localStorage.getItem('beas_companyNumber') || '',
      businessType: localStorage.getItem('beas_businessType') || '',
      registrationDate: localStorage.getItem('beas_registrationDate') || '',
      tradingDuration: localStorage.getItem('beas_tradingDuration') || '',
      employeeCount: localStorage.getItem('beas_employeeCount') || '',
      annualTurnover: localStorage.getItem('beas_annualTurnover') || '',
      balanceSheetTotal: localStorage.getItem('beas_balanceSheetTotal') || '',
      premisesType: localStorage.getItem('beas_premisesType') || '',
      energyBillResponsibility: localStorage.getItem('beas_energyBillResponsibility') || '',
      samePremisesDuration: localStorage.getItem('beas_samePremisesDuration') || '',
      electricityConsumption: localStorage.getItem('beas_electricityConsumption') || '',
      gasConsumption: localStorage.getItem('beas_gasConsumption') || '',
      totalEnergyConsumption: localStorage.getItem('beas_totalEnergyConsumption') || '',
      previousPublicSupport: localStorage.getItem('beas_previousPublicSupport') || '',
      supportAmount: localStorage.getItem('beas_supportAmount') || '',
      projectDescription: localStorage.getItem('beas_projectDescription') || ' ',
      estimatedCost: localStorage.getItem('beas_estimatedCost') || '',
      companyContribution: localStorage.getItem('beas_companyContribution') || '',
      termsAccepted: JSON.parse(localStorage.getItem('beas_termsAccepted') || 'false')
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [validationErrors, setValidationErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(1);
  const [isCalculatingEnergy, setIsCalculatingEnergy] = useState(false);

  // Calculate total energy consumption when electricity or gas changes
  useEffect(() => {
    if (formData.electricityConsumption || formData.gasConsumption) {
      setIsCalculatingEnergy(true);
      const electricity = parseFloat(formData.electricityConsumption) || 0;
      const gas = parseFloat(formData.gasConsumption) || 0;
      const total = electricity + gas;
      
      setFormData(prev => ({
        ...prev,
        totalEnergyConsumption: total > 0 ? total.toString() : ''
      }));
      
      // Validate minimum consumption
      /* if (total > 0 && total < 25000) {
        setValidationErrors(prev => ({
          ...prev,
          totalEnergyConsumption: 'Minimum energy consumption is 25,000 kWh per year'
        }));
      } else {
        setValidationErrors(prev => ({
          ...prev,
          totalEnergyConsumption: ''
        }));
      } */
      
      setTimeout(() => setIsCalculatingEnergy(false), 500);
    }
  }, [formData.electricityConsumption, formData.gasConsumption]);

  // Calculate company contribution when estimated cost changes
  useEffect(() => {
    if (formData.estimatedCost) {
      const cost = parseFloat(formData.estimatedCost);
      if (!isNaN(cost)) {
        const contribution = cost * 0.5; // Minimum 50% match funding
        setFormData(prev => ({
          ...prev,
          companyContribution: contribution.toString()
        }));
      }
    }
  }, [formData.estimatedCost]);

  const validateField = (name, value) => {
    let error = '';
    let isValid = true;

    switch (name) {
      case 'companyName':
        if (!value.trim()) error = 'Company name is required';
        isValid = !error;
        break;
        
      case 'companyNumber':
        if (!value.trim()) error = 'Company registration number is required';
        else if (!/^[A-Za-z0-9]{8}$/.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid company registration number';
        }
        isValid = !error;
        break;
        
      case 'employeeCount':
        if (!value) error = 'Number of employees is required';
        // else if (isNaN(value) || parseInt(value) >= 250) error = 'Must have fewer than 250 employees to qualify as SME';
        isValid = !error;
        break;
        
      case 'annualTurnover':
        if (!value) error = 'Annual turnover is required';
        // else if (isNaN(value) || parseFloat(value) >= 50000000) error = 'Turnover must be under €50 million for SME eligibility';
        isValid = !error;
        break;
        
      case 'balanceSheetTotal':
        if (!value) error = 'Balance sheet total is required';
        // else if (isNaN(value) || parseFloat(value) >= 43000000) error = 'Balance sheet total must be under €43 million for SME eligibility';
        isValid = !error;
        break;
        
      case 'tradingDuration':
        if (!value) error = 'Trading duration is required';
        // else if (parseInt(value) < 12) error = 'Must have been trading for at least 12 months';
        isValid = !error;
        break;
        
      case 'samePremisesDuration':
        if (!value) error = 'Please specify how long at current premises';
        // else if (parseInt(value) < 12) error = 'Must have been at same premises for at least 12 months';
        isValid = !error;
        break;
        
      case 'energyBillResponsibility':
        if (!value) error = 'Please confirm energy bill responsibility';
        // else if (value !== 'Yes') error = 'Must be responsible for energy bills to qualify';
        isValid = !error;
        break;
        
      case 'electricityConsumption':
      case 'gasConsumption':
        if (value && isNaN(value)) error = 'Please enter a valid number';
        isValid = !error;
        break;
        
      case 'totalEnergyConsumption':
        if (!value) error = 'Total energy consumption is required';
        // else if (parseFloat(value) < 25000) error = 'Minimum energy consumption is 25,000 kWh per year';
        isValid = !error;
        break;
        
      case 'previousPublicSupport':
        if (!value) error = 'Please specify if received previous public support';
        isValid = !error;
        break;
        
      case 'supportAmount':
        if (formData.previousPublicSupport === 'Yes' && (!value || isNaN(value))) {
          error = 'Please specify the amount of previous support';
        } else if (formData.previousPublicSupport === 'Yes' && parseFloat(value) > 315000) {
        //   error = 'Previous public support must not exceed £315,000 over last 3 years';
        }
        isValid = !error;
        break;
        
      case 'estimatedCost':
        if (!value) error = 'Estimated project cost is required';
        // else if (isNaN(value) || parseFloat(value) < 1000) error = 'Minimum project cost is £1,000';
        // else if (parseFloat(value) > 200000) error = 'Maximum project cost is £200,000';
        isValid = !error;
        break;
        
      /* case 'projectDescription':
        if (!value.trim()) error = 'Project description is required';
        else if (value.trim().length < 50) error = 'Please provide a more detailed project description (minimum 50 characters)';
        isValid = !error;
        break; */

      default:
        break;
    }

    return { error, isValid };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      const updatedData = { ...prev, [name]: newValue };
      
      // Save to localStorage
      if (name === 'termsAccepted') {
        localStorage.setItem(`beas_${name}`, JSON.stringify(newValue));
      } else {
        localStorage.setItem(`beas_${name}`, newValue);
      }

      return updatedData;
    });

    const { error } = validateField(name, newValue);

    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    
    // Validate current section
    let sectionFields = [];
    let sectionErrors = {};
    
    switch (currentSection) {
      case 1:
        sectionFields = ['companyName', 'companyNumber', 'businessType', 'registrationDate', 'tradingDuration'];
        break;
      case 2:
        sectionFields = ['employeeCount', 'annualTurnover', 'balanceSheetTotal'];
        break;
      case 3:
        sectionFields = ['premisesType', 'energyBillResponsibility', 'samePremisesDuration'];
        break;
      case 4:
        sectionFields = ['electricityConsumption', 'gasConsumption', 'totalEnergyConsumption'];
        break;
      case 5:
        sectionFields = ['previousPublicSupport', 'supportAmount'];
        break;
      case 6:
        sectionFields = ['projectDescription', 'estimatedCost', 'companyContribution'];
        break;
    }
    
    sectionFields.forEach(field => {
      const { error } = validateField(field, formData[field]);
      if (error) sectionErrors[field] = error;
    });
    
    setValidationErrors(prev => ({ ...prev, ...sectionErrors }));
    
    if (Object.keys(sectionErrors).length === 0) {
      if (currentSection < 6) {
        setCurrentSection(currentSection + 1);
        window.scrollTo(0, 0);
      } else {
        handleFinalSubmit();
      }
    }
  };

  const handleFinalSubmit = () => {
    // Final validation
    const allFields = [
      'companyName', 'companyNumber', 'businessType', 'registrationDate', 'tradingDuration',
      'employeeCount', 'annualTurnover', 'balanceSheetTotal', 'premisesType', 
      'energyBillResponsibility', 'samePremisesDuration', 'totalEnergyConsumption',
      'previousPublicSupport', 'projectDescription', 'estimatedCost'
    ];
    
    const finalErrors = {};
    allFields.forEach(field => {
      const { error } = validateField(field, formData[field]);
      if (error) finalErrors[field] = error;
    });
    
    if (formData.previousPublicSupport === 'Yes') {
      const { error } = validateField('supportAmount', formData.supportAmount);
      if (error) finalErrors.supportAmount = error;
    }
    
    setValidationErrors(finalErrors);
    
    
    router.push('/eligibility_results/beas_scheme_eligibility_result');
  };

  const goToPreviousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    } else {
      router.push('/mandatory_form/beas-grants-form');
    }
  };

  const isCurrentSectionValid = () => {
    const sectionFields = {
      1: ['companyName', 'companyNumber', 'businessType', 'registrationDate', 'tradingDuration'],
      2: ['employeeCount', 'annualTurnover', 'balanceSheetTotal'],
      3: ['premisesType', 'energyBillResponsibility', 'samePremisesDuration'],
      4: ['totalEnergyConsumption'],
      5: ['previousPublicSupport'],
      6: ['projectDescription', 'estimatedCost']
    };
    
    return sectionFields[currentSection].every(field => 
      !validationErrors[field] && formData[field]
    );
  };

  const businessTypes = [
    'Limited Company',
    'Community Interest Company (CIC)',
    'Charitable Incorporated Organisation (CIO)',
    'Limited Liability Partnership (LLP)',
    'Other Incorporated Entity'
  ];

  const premisesTypes = [
    'Industrial Unit',
    'Office Building',
    'Retail Premises',
    'Warehouse',
    'Mixed Use Commercial',
    'Other Commercial Property'
  ];

  const renderSection1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FaBuilding className="w-5 h-5 mr-2 text-green-600" />
        Business Details
      </h3>

      {/* Company Name */}
      <div className='mb-10'>
        <label htmlFor="companyName" className="block text-md font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.companyName ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.companyName && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.companyName}</p>
        )}
      </div>

      {/* Company Registration Number */}
      <div className='mb-10'>
        <label htmlFor="companyNumber" className="block text-md font-semibold text-gray-700 mb-2">
          Company Registration Number *
        </label>
        <input
          type="text"
          id="companyNumber"
          name="companyNumber"
          value={formData.companyNumber}
          onChange={handleChange}
          placeholder="e.g., 12345678"
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.companyNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.companyNumber && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.companyNumber}</p>
        )}
      </div>

      {/* Business Type */}
      <div className='mb-10'>
        <label htmlFor="businessType" className="block text-md font-semibold text-gray-700 mb-2">
          Business Type *
        </label>
        <select
          id="businessType"
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.businessType ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        >
          <option value="">Select business type</option>
          {businessTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {validationErrors.businessType && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.businessType}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">Note: Sole traders are not eligible for this scheme</p>
      </div>

      {/* Registration Date */}
      <div className='mb-10'>
        <label htmlFor="registrationDate" className="block text-md font-semibold text-gray-700 mb-2">
          Company Registration Date *
        </label>
        <input
          type="date"
          id="registrationDate"
          name="registrationDate"
          value={formData.registrationDate}
          onChange={handleChange}
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.registrationDate ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.registrationDate && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.registrationDate}</p>
        )}
      </div>

      {/* Trading Duration */}
      <div className='mb-10'>
        <label htmlFor="tradingDuration" className="block text-md font-semibold text-gray-700 mb-2">
          How many months has the company been actively trading? *
        </label>
        <input
          type="number"
          id="tradingDuration"
          name="tradingDuration"
          value={formData.tradingDuration}
          onChange={handleChange}
          min="1"
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.tradingDuration ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.tradingDuration && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.tradingDuration}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Must be at least 12 months to qualify</p> */}
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FaUserTie className="w-5 h-5 mr-2 text-green-600" />
        SME Eligibility Criteria
      </h3>

      {/* Employee Count */}
      <div className='mb-10'>
        <label htmlFor="employeeCount" className="block text-md font-semibold text-gray-700 mb-2">
          Number of Employees *
        </label>
        <input
          type="number"
          id="employeeCount"
          name="employeeCount"
          value={formData.employeeCount}
          onChange={handleChange}
          min="1"
          max="249"
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.employeeCount ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.employeeCount && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.employeeCount}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Must be fewer than 250 employees</p> */}
      </div>

      {/* Annual Turnover */}
      <div className='mb-10'>
        <label htmlFor="annualTurnover" className="block text-md font-semibold text-gray-700 mb-2">
          Annual Turnover (€) *
        </label>
        <input
          type="number"
          id="annualTurnover"
          name="annualTurnover"
          value={formData.annualTurnover}
          onChange={handleChange}
          /* 
          min="0"
          step="1000" */
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.annualTurnover ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.annualTurnover && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.annualTurnover}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Must be under €50 million</p> */}
      </div>

      {/* Balance Sheet Total */}
      <div className='mb-10'>
        <label htmlFor="balanceSheetTotal" className="block text-md font-semibold text-gray-700 mb-2">
          Balance Sheet Total (€) *
        </label>
        <input
          type="number"
          id="balanceSheetTotal"
          name="balanceSheetTotal"
          value={formData.balanceSheetTotal}
          onChange={handleChange}
          /* 
          min="0"
          step="1000" */
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.balanceSheetTotal ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.balanceSheetTotal && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.balanceSheetTotal}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Must be under €43 million</p> */}
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FaIndustry className="w-5 h-5 mr-2 text-green-600" />
        Premises & Operations
      </h3>

      {/* Premises Type */}
      <div className='mb-10'>
        <label htmlFor="premisesType" className="block text-md font-semibold text-gray-700 mb-2">
          Type of Premises *
        </label>
        <select
          id="premisesType"
          name="premisesType"
          value={formData.premisesType}
          onChange={handleChange}
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.premisesType ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        >
          <option value="">Select premises type</option>
          {premisesTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {validationErrors.premisesType && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.premisesType}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Must be a commercial/industrial property (not residential)</p> */}
      </div>

      {/* Energy Bill Responsibility */}
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Are you responsible for the energy bills at this premises? *
        </h3>
        <div className="flex space-x-6">
          {['Yes', 'No'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="energyBillResponsibility"
                value={option}
                checked={formData.energyBillResponsibility === option}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300"
                required
              />
              <span className="text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
        {validationErrors.energyBillResponsibility && (
          <p className="text-red-500 text-sm mt-2">{validationErrors.energyBillResponsibility}</p>
        )}
      </div>

      {/* Same Premises Duration */}
      <div className='mb-10'>
        <label htmlFor="samePremisesDuration" className="block text-md font-semibold text-gray-700 mb-2">
          How many months has the business been operating from the same premises? *
        </label>
        <input
          type="number"
          id="samePremisesDuration"
          name="samePremisesDuration"
          value={formData.samePremisesDuration}
          onChange={handleChange}
          min="1"
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.samePremisesDuration ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.samePremisesDuration && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.samePremisesDuration}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Must be at least 12 months at the same premises</p> */}
      </div>
    </div>
  );

  const renderSection4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FaChartLine className="w-5 h-5 mr-2 text-green-600" />
        Energy Consumption
      </h3>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <div className="flex items-start">
          <FaInfoCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          {/* <p className="text-green-700 text-sm">Please provide your annual energy consumption in kWh. The minimum requirement is 25,000 kWh per year (combined electricity and gas).</p> */}
        </div>
      </div>

      {/* Electricity Consumption */}
      <div className='mb-10'>
        <label htmlFor="electricityConsumption" className="block text-md font-semibold text-gray-700 mb-2">
          Annual Electricity Consumption (kWh)
        </label>
        <input
          type="number"
          id="electricityConsumption"
          name="electricityConsumption"
          value={formData.electricityConsumption}
          onChange={handleChange}
          /* 
          min="0"
          step="1000" */
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.electricityConsumption ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.electricityConsumption && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.electricityConsumption}</p>
        )}
      </div>

      {/* Gas Consumption */}
      <div className='mb-10'>
        <label htmlFor="gasConsumption" className="block text-md font-semibold text-gray-700 mb-2">
          Annual Gas Consumption (kWh)
        </label>
        <input
          type="number"
          id="gasConsumption"
          name="gasConsumption"
          value={formData.gasConsumption}
          onChange={handleChange}
          /* 
          min="0"
          step="1000" */
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.gasConsumption ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {validationErrors.gasConsumption && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.gasConsumption}</p>
        )}
      </div>

      {/* Total Energy Consumption */}
      <div className='mb-10'>
        <label htmlFor="totalEnergyConsumption" className="block text-md font-semibold text-gray-700 mb-2">
          Total Annual Energy Consumption (kWh) *
        </label>
        <input
          type="number"
          id="totalEnergyConsumption"
          name="totalEnergyConsumption"
          value={formData.totalEnergyConsumption}
          readOnly
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 bg-gray-50 ${
            validationErrors.totalEnergyConsumption ? 'border-red-500' : 'border-gray-300'
          } ${isCalculatingEnergy ? 'animate-pulse' : ''}`}
          required
        />
        {validationErrors.totalEnergyConsumption && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.totalEnergyConsumption}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">
          {formData.totalEnergyConsumption >= 25000 
            ? '✓ Meets minimum energy consumption requirement' 
            : 'Minimum 25,000 kWh per year required'
          }
        </p> */}
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FaBalanceScale className="w-5 h-5 mr-2 text-green-600" />
        Previous Public Support
      </h3>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
        <div className="flex items-start">
          <FaInfoCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          {/* <p className="text-green-700 text-sm">Under EU State Aid rules, businesses cannot receive more than £315,000 of public support over the current and previous two fiscal years.</p> */}
        </div>
      </div>

      {/* Previous Public Support */}
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Has your business received any public support (grants, subsidies, etc.) in the current or previous two fiscal years? *
        </h3>
        <div className="flex space-x-6">
          {['Yes', 'No'].map((option) => (
            <label key={option} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="previousPublicSupport"
                value={option}
                checked={formData.previousPublicSupport === option}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300"
                required
              />
              <span className="text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
        {validationErrors.previousPublicSupport && (
          <p className="text-red-500 text-sm mt-2">{validationErrors.previousPublicSupport}</p>
        )}
      </div>

      {/* Support Amount - Conditionally shown */}
      {formData.previousPublicSupport === 'Yes' && (
        <div className='mb-10'>
          <label htmlFor="supportAmount" className="block text-md font-semibold text-gray-700 mb-2">
            Total Amount of Previous Public Support (£) *
          </label>
          <input
            type="number"
            id="supportAmount"
            name="supportAmount"
            value={formData.supportAmount}
            onChange={handleChange}
            /* 
            min="0"
            step="1000" */
            className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              validationErrors.supportAmount ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {validationErrors.supportAmount && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.supportAmount}</p>
          )}
          {/* <p className="text-gray-500 text-xs mt-1">
            {formData.supportAmount && parseFloat(formData.supportAmount) <= 315000
              ? '✓ Within allowable public support limits'
              : 'Must not exceed £315,000 over current and previous two fiscal years'}
          </p> */}
        </div>
      )}
    </div>
  );

  const renderSection6 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <FaLeaf className="w-5 h-5 mr-2 text-green-600" />
        Project Information
      </h3>

      {/* Project Description */}
      <div className='mb-10'>
        <label htmlFor="projectDescription" className="block text-md font-semibold text-gray-700 mb-2">
          Project Description
        </label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={formData.projectDescription}
          onChange={handleChange}
          rows="5"
          placeholder="Describe the energy efficiency or low-carbon improvements you plan to implement..."
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.projectDescription ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.projectDescription && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.projectDescription}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          {formData.projectDescription.length}/50 characters minimum
        </p>
      </div>

      {/* Estimated Cost */}
      <div className='mb-10'>
        <label htmlFor="estimatedCost" className="block text-md font-semibold text-gray-700 mb-2">
          Estimated Total Project Cost (£) *
        </label>
        <input
          type="number"
          id="estimatedCost"
          name="estimatedCost"
          value={formData.estimatedCost}
          onChange={handleChange}
          /* min="1000"
          max="200000"
          step="100" */
          className={`w-full px-4 py-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            validationErrors.estimatedCost ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {validationErrors.estimatedCost && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.estimatedCost}</p>
        )}
        {/* <p className="text-gray-500 text-xs mt-1">Grants typically range from £1,000 to £100,000</p> */}
      </div>

      {/* Company Contribution */}
      <div className='mb-10'>
        <label htmlFor="companyContribution" className="block text-md font-semibold text-gray-700 mb-2">
          Estimated Company Contribution (£) *
        </label>
        <input
          type="number"
          id="companyContribution"
          name="companyContribution"
          value={formData.companyContribution}
          readOnly
          className="w-full px-4 py-4 border border-gray-300 rounded-lg bg-gray-50"
        />
        {/* <p className="text-gray-500 text-xs mt-1">
          Minimum 50% match funding required (calculated automatically)
        </p> */}
      </div>

      {/* Terms and Conditions */}
      <div className="border border-gray-200 rounded-xl p-6 mt-8">
        <div className="flex items-start mb-4">
          <FaShieldAlt className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-gray-900">Terms & Data Protection</h3>
        </div>
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          We process your information to assess your eligibility for the BEAS scheme. 
          Your data is protected under GDPR and will only be used for this application. 
          By submitting, you agree to participate in a free energy assessment if eligible.
        </p>
        
        <label className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1 flex-shrink-0"
            required
          />
          <span className="text-sm text-gray-700">
            I confirm the information provided is accurate and I accept the {' '}
            <a href="#" className="text-green-600 hover:text-green-800 underline font-medium">terms and conditions</a> 
            {' '}and have read the {' '}
            <a href="#" className="text-green-600 hover:text-green-800 underline font-medium">privacy policy</a>
          </span>
        </label>
      </div>
    </div>
  );

  const sectionTitles = [
    "Business Details",
    "SME Eligibility", 
    "Premises & Operations",
    "Energy Consumption",
    "Previous Support",
    "Project Information"
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white py-8 mt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Main Form Section */}
            <div className="lg:col-span-4">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {sectionTitles.map((title, index) => (
                    <div 
                      key={index}
                      className={`text-xs font-medium ${
                        index + 1 === currentSection 
                          ? 'text-green-600' 
                          : index + 1 < currentSection 
                            ? 'text-green-600' 
                            : 'text-gray-500'
                      }`}
                    >
                      {index + 1}. {title}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentSection / 6) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Scheme Information */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <div className="flex items-start">
                  <FaInfoCircle className="w-6 h-6 text-green-600 mt-0.5 mr-4 flex-shrink-0" />
                  <div className='mb-10'>
                    <h3 className="font-bold text-green-900 text-lg mb-2">Business Energy Assessment Scheme (BEAS)</h3>
                    <p className="text-green-700 mb-3">
                      Apply for free energy assessments and match-funded grants to implement energy efficiency 
                      and low-carbon improvements in your business. Grants range from £1,000 to £100,000 with 
                      minimum 50% match funding from your business.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSectionSubmit}>
                {/* Current Section */}
                <div className="space-y-6 mb-8">
                  {currentSection === 1 && renderSection1()}
                  {currentSection === 2 && renderSection2()}
                  {currentSection === 3 && renderSection3()}
                  {currentSection === 4 && renderSection4()}
                  {currentSection === 5 && renderSection5()}
                  {currentSection === 6 && renderSection6()}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={goToPreviousSection}
                    className="px-8 py-3 border border-gray-300 rounded-lg text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center"
                  >
                    <FaArrowLeft className="w-5 h-5 mr-2" />
                    {currentSection === 1 ? 'Back' : 'Previous'}
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!isCurrentSectionValid() || (currentSection === 6 && !formData.termsAccepted)}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-indigo-700 rounded-lg text-base font-semibold text-white hover:from-green-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {currentSection === 6 ? 'Submit Application' : 'Continue'}
                    <FaArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar - Benefits & Requirements */}
            <div className="lg:col-span-2">
              <div className="sticky top-30">
                <h3 className="font-bold text-gray-900 text-xl mb-6 flex items-center">
                  <FaCheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  Scheme Benefits
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaPiggyBank className="w-5 h-5 text-green-600" />
                    </div>
                    <div className='mb-10'>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Match-Funded Grants</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Receive grants from £1,000 to £100,000 with 50% match funding from your business
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaThermometerHalf className="w-5 h-5 text-green-600" />
                    </div>
                    <div className='mb-10'>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Free Energy Assessment</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Comprehensive energy assessment to identify efficiency improvements at no cost
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaLeaf className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className='mb-10'>
                      <h4 className="font-semibold text-gray-900 text-lg mb-1">Carbon Reduction</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Implement low-carbon technologies and reduce your environmental impact
                      </p>
                    </div>
                  </div>
                </div>

                {/* Eligibility Requirements */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                    <FaCertificate className="w-5 h-5 text-green-500 mr-2" />
                    Eligibility Requirements
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Registered company (Limited, CIC, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Fewer than 250 employees</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Turnover under €50M or balance sheet under €43M</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Trading for 12+ months at same premises</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>25,000+ kWh annual energy consumption</span>
                    </li>
                    <li className="flex items-start">
                      <FaCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Responsible for energy bills</span>
                    </li>
                  </ul>
                </div>

                {/* Important Notes */}
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaInfoCircle className="w-4 h-4 text-amber-600 mr-2" />
                    <h5 className="font-semibold text-amber-900 text-sm">Important Notes</h5>
                  </div>
                  <ul className="text-xs text-amber-700 space-y-1">
                    <li>• Energy assessment is free but compulsory</li>
                    <li>• Sole traders are not eligible</li>
                    <li>• Residential properties are not eligible</li>
                    <li>• Public support limits apply (£315,000 over 3 years)</li>
                  </ul>
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