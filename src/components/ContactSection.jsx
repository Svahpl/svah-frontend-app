import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Mail } from 'lucide-react';
import { countries } from '../data/countries';

const ContactSection = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState(null);
  const [formType, setFormType] = useState(null); // Track whether it's 'requirements' or 'sales'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    const fullMobileNumber = selectedCountryCode ? `${selectedCountryCode.phoneCode}${data.mobileNumber}` : data.mobileNumber;
    console.log({ ...data, country: selectedCountry?.value, mobileNumber: fullMobileNumber, formType });
    setIsSubmitted(true);
    reset();
    setSelectedCountry(null);
    setSelectedCountryCode(null);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormVisible(false);
      setFormType(null); // Reset form type after submission
    }, 5000);
  };

  const handleButtonClick = (type) => {
    setFormType(type);
    setIsFormVisible(!isFormVisible);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Buttons for Requirement and Sales */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <button
            onClick={() => handleButtonClick('requirements')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md"
          >
            <Mail size={20} className="text-white" />
            DROP US A MESSAGE FOR REQUIREMENT
          </button>
          <button
            onClick={() => handleButtonClick('sales')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md"
          >
            <Mail size={20} className="text-white" />
            DROP US A MESSAGE FOR SALES
          </button>
        </div>

        {/* Form */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            isFormVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300">
            <h3 className="text-2xl font-heading font-bold text-emerald-800 mb-6">
              {formType === 'sales' ? 'Please provide your sales details' : 'DROP US A MESSAGE'}
            </h3>
            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-4 mb-6 animate-fade-in">
                <p className="font-medium">Thank you. One of our representatives will get back to you within 24 hours.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-emerald-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`w-full px-4 py-3 border ${
                    errors.fullName ? 'border-red-500' : 'border-emerald-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300`}
                  placeholder="Enter full name"
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-emerald-700 mb-2">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  className={`w-full px-4 py-3 border ${
                    errors.companyName ? 'border-red-500' : 'border-emerald-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300`}
                  placeholder="Enter company name"
                  {...register('companyName', { required: 'Company name is required' })}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium text-emerald-700 mb-2">
                  Company Email
                </label>
                <input
                  id="companyEmail"
                  type="email"
                  className={`w-full px-4 py-3 border ${
                    errors.companyEmail ? 'border-red-500' : 'border-emerald-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300`}
                  placeholder="Enter company email"
                  {...register('companyEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.companyEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyEmail.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-emerald-700 mb-2">
                  Country
                </label>
                <Select
                  id="country"
                  options={countries}
                  value={selectedCountry}
                  onChange={(option) => {
                    setSelectedCountry(option);
                    setSelectedCountryCode(option);
                  }}
                  placeholder="Select country"
                  className="text-base"
                  classNames={{
                    control: (state) =>
                      `!border ${
                        state.isFocused
                          ? '!border-emerald-500 !shadow-md !ring-2 !ring-emerald-200'
                          : errors.country
                          ? '!border-red-500'
                          : '!border-emerald-300'
                      } !rounded-lg !bg-white`,
                  }}
                  {...register('country', { required: 'Country is required' })}
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyAddress" className="block text-sm font-medium text-emerald-700 mb-2">
                  Company Address
                </label>
                <textarea
                  id="companyAddress"
                  rows={2}
                  className={`w-full px-4 py-3 border ${
                    errors.companyAddress ? 'border-red-500' : 'border-emerald-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300`}
                  placeholder="Enter company address"
                  {...register('companyAddress', { required: 'Company address is required' })}
                />
                {errors.companyAddress && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="websiteLink" className="block text-sm font-medium text-emerald-700 mb-2">
                  Website Link (Optional)
                </label>
                <input
                  id="websiteLink"
                  type="url"
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300"
                  placeholder="Enter website link"
                  {...register('websiteLink')}
                />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-emerald-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-3">
                  <Select
                    id="countryCode"
                    options={countries}
                    value={selectedCountryCode}
                    onChange={setSelectedCountryCode}
                    placeholder="Code"
                    getOptionLabel={(option) => option.phoneCode}
                    getOptionValue={(option) => option.phoneCode}
                    className="w-1/4 text-base"
                    classNames={{
                      control: (state) =>
                        `!border ${
                          state.isFocused
                            ? '!border-emerald-500 !shadow-md !ring-2 !ring-emerald-200'
                            : errors.countryCode
                            ? '!border-red-500'
                            : '!border-emerald-300'
                        } !rounded-lg !bg-white`,
                    }}
                    {...register('countryCode', { required: 'Country code is required' })}
                  />
                  <input
                    id="mobileNumber"
                    type="tel"
                    className={`w-3/4 px-4 py-3 border ${
                      errors.mobileNumber ? 'border-red-500' : 'border-emerald-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300`}
                    placeholder="Enter mobile number"
                    {...register('mobileNumber', {
                      required: 'Mobile number is required',
                      pattern: {
                        value: /^\d{7,15}$/,
                        message: 'Mobile number must be 7-15 digits',
                      },
                    })}
                  />
                </div>
                {errors.countryCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.countryCode.message}</p>
                )}
                {errors.mobileNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobileNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-emerald-700 mb-2">
                  {formType === 'sales' ? 'Sales Details' : 'Requirements'}
                </label>
                <textarea
                  id="requirements"
                  rows={3}
                  className={`w-full px-4 py-3 border ${
                    errors.requirements ? 'border-red-500' : 'border-emerald-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300`}
                  placeholder={formType === 'sales' ? 'Please describe your sales details' : 'Please describe your requirements'}
                  {...register('requirements', { required: formType === 'sales' ? 'Sales details are required' : 'Requirements description is required' })}
                />
                {errors.requirements && (
                  <p className="mt-1 text-sm text-red-600">{errors.requirements.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-emerald-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/80 text-emerald-800 placeholder-emerald-400 shadow-sm hover:shadow-md transition-all duration-300"
                  placeholder="Enter your message"
                  {...register('message')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emeraldSARS
                to-emerald-600 from-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:to-emerald-700 hover:from-amber-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-md"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </section>
  );
};

export default ContactSection;