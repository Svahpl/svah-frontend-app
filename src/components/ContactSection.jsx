import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { Mail } from 'lucide-react';
import { countries } from '../data/countries';

const ContactSection = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, country: selectedCountry?.value });
    setIsSubmitted(true);
    reset();
    setSelectedCountry(null);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormVisible(false); // Hide form after submission
    }, 5000);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Buttons for Requirement and Sales */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Mail size={0} className="text-white" />
            DROP US A MESSAGE FOR REQUIREMENT
          </button>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="inline-flex items-center gap-2 bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <Mail size={0} className="text-white" />
            DROP US A MESSAGE FOR SALES
          </button>
        </div>

        {/* Form */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isFormVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-heading font-semibold text-primary-800 mb-4">
              DROP US A MESSAGE
            </h3>

            {isSubmitted ? (
              <div className="bg-success-50 border border-success-200 text-success-800 rounded-md p-4 mb-4 animate-fade-in">
                <p>Thank you. One of our representatives will get back to you within 24 hours.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
                  FULL NAME
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`w-full px-3 py-2 border ${
                    errors.fullName ? 'border-error-500' : 'border-neutral-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="full name"
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-error-600">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-1">
                  COMPANY NAME
                </label>
                <input
                  id="companyName"
                  type="text"
                  className={`w-full px-3 py-2 border ${
                    errors.companyName ? 'border-error-500' : 'border-neutral-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="company name"
                  {...register('companyName', { required: 'Company name is required' })}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-error-600">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyEmail" className="block text-sm font-medium text-neutral-700 mb-1">
                  COMPANY EMAIL
                </label>
                <input
                  id="companyEmail"
                  type="email"
                  className={`w-full px-3 py-2 border ${
                    errors.companyEmail ? 'border-error-500' : 'border-neutral-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="company email"
                  {...register('companyEmail', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                {errors.companyEmail && (
                  <p className="mt-1 text-sm text-error-600">{errors.companyEmail.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                  COUNTRY
                </label>
                <Select
                  id="country"
                  options={countries}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  placeholder="Select your country"
                  className="text-base"
                  classNames={{
                    control: (state) =>
                      `!border ${
                        state.isFocused
                          ? '!border-primary-500 !shadow-md !ring-2 !ring-primary-200'
                          : '!border-neutral-300'
                      } !rounded-md !bg-white`,
                  }}
                />
              </div>

              <div>
                <label htmlFor="companyAddress" className="block text-sm font-medium text-neutral-700 mb-1">
                  COMPANY ADDRESS
                </label>
                <textarea
                  id="companyAddress"
                  rows={2}
                  className={`w-full px-3 py-2 border ${
                    errors.companyAddress ? 'border-error-500' : 'border-neutral-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="Your company address"
                  {...register('companyAddress', { required: 'Company address is required' })}
                />
                {errors.companyAddress && (
                  <p className="mt-1 text-sm text-error-600">{errors.companyAddress.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="websiteLink" className="block text-sm font-medium text-neutral-700 mb-1">
                  WEBSITE LINK
                </label>
                <input
                  id="websiteLink"
                  type="url"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://svahpl.com"
                  {...register('websiteLink')}
                />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                  MOBILE NUMBER
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  className={`w-full px-3 py-2 border ${
                    errors.mobileNumber ? 'border-error-500' : 'border-neutral-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="mobile number"
                  {...register('mobileNumber', { required: 'Mobile number is required' })}
                />
                {errors.mobileNumber && (
                  <p className="mt-1 text-sm text-error-600">{errors.mobileNumber.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-neutral-700 mb-1">
                  DESCRIBE REQUIREMENTS
                </label>
                <textarea
                  id="requirements"
                  rows={3}
                  className={`w-full px-3 py-2 border ${
                    errors.requirements ? 'border-error-500' : 'border-neutral-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                  placeholder="Describe requirements"
                  {...register('requirements', { required: 'Requirements description is required' })}
                />
                {errors.requirements && (
                  <p className="mt-1 text-sm text-error-600">{errors.requirements.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Additional message"
                  {...register('message')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;