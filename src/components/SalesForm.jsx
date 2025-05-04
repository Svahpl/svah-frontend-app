import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';

const farmingMethods = [
  { value: 'organic', label: 'Organic' },
  { value: 'natural', label: 'Natural Farming' },
  { value: 'inorganic', label: 'Inorganic' }
];

const productConditions = [
  { value: 'fresh', label: 'Fresh' },
  { value: 'dried', label: 'Dried' }
];

const states = [
  { value: 'telangana', label: 'Telangana' },
  { value: 'andhra-pradesh', label: 'Andhra Pradesh' }
];

// Placeholder data - in a real app, these would be fetched based on state selection
const mandals = [
  { value: 'venkatapuram', label: 'Venkatapuram' },
  { value: 'mulugu', label: 'Mulugu' }
];

// Placeholder data - in a real app, these would be fetched based on mandal selection
const villages = [
  { value: 'veerabhadravaram', label: 'Veerabhadravaram' },
  { value: 'eturnagaram', label: 'Eturnagaram' }
];

const SalesForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedMandal, setSelectedMandal] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [selectedFarmingMethod, setSelectedFarmingMethod] = useState(null);
  const [selectedProductCondition, setSelectedProductCondition] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  
  const onSubmit = (data) => {
    // In a real application, submit this data to your backend
    console.log({ 
      ...data, 
      state: selectedState?.value,
      mandal: selectedMandal?.value,
      village: selectedVillage?.value,
      farmingMethod: selectedFarmingMethod?.value,
      productCondition: selectedProductCondition?.value
    });
    
    setIsSubmitted(true);
    reset();
    setSelectedState(null);
    setSelectedMandal(null);
    setSelectedVillage(null);
    setSelectedFarmingMethod(null);
    setSelectedProductCondition(null);
    
    // Reset the success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-heading font-semibold text-primary-800 mb-4">Drop Us a Message - Sales</h3>
      
      {isSubmitted ? (
        <div className="bg-success-50 border border-success-200 text-success-800 rounded-md p-4 mb-4 animate-fade-in">
          <p>Thank you. One of our representatives will get back to you within 24 hours.</p>
        </div>
      ) : null}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="farmerName" className="block text-sm font-medium text-neutral-700 mb-1">Farmer Name</label>
          <input
            id="farmerName"
            type="text"
            className={`w-full px-3 py-2 border ${errors.farmerName ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Your name"
            {...register('farmerName', { required: 'Farmer name is required' })}
          />
          {errors.farmerName && <p className="mt-1 text-sm text-error-600">{errors.farmerName.message}</p>}
        </div>
        
        <div>
          <label htmlFor="pattaNumber" className="block text-sm font-medium text-neutral-700 mb-1">PPB/ROFR Patta Number</label>
          <input
            id="pattaNumber"
            type="text"
            className={`w-full px-3 py-2 border ${errors.pattaNumber ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Your patta number"
            {...register('pattaNumber', { required: 'Patta number is required' })}
          />
          {errors.pattaNumber && <p className="mt-1 text-sm text-error-600">{errors.pattaNumber.message}</p>}
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">State</label>
          <Select
            id="state"
            options={states}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Select your state"
            className="text-base"
            classNames={{
              control: (state) => 
                `!border ${state.isFocused ? '!border-primary-500 !shadow-md !ring-2 !ring-primary-200' : '!border-neutral-300'} !rounded-md !bg-white`,
            }}
          />
        </div>
        
        <div>
          <label htmlFor="mandal" className="block text-sm font-medium text-neutral-700 mb-1">Mandal</label>
          <Select
            id="mandal"
            options={mandals}
            value={selectedMandal}
            onChange={setSelectedMandal}
            placeholder="Select your mandal"
            isDisabled={!selectedState}
            className="text-base"
            classNames={{
              control: (state) => 
                `!border ${state.isFocused ? '!border-primary-500 !shadow-md !ring-2 !ring-primary-200' : '!border-neutral-300'} !rounded-md !bg-white`,
            }}
          />
        </div>
        
        <div>
          <label htmlFor="village" className="block text-sm font-medium text-neutral-700 mb-1">Revenue Village</label>
          <Select
            id="village"
            options={villages}
            value={selectedVillage}
            onChange={setSelectedVillage}
            placeholder="Select your village"
            isDisabled={!selectedMandal}
            className="text-base"
            classNames={{
              control: (state) => 
                `!border ${state.isFocused ? '!border-primary-500 !shadow-md !ring-2 !ring-primary-200' : '!border-neutral-300'} !rounded-md !bg-white`,
            }}
          />
        </div>
        
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-neutral-700 mb-1">Pincode</label>
          <input
            id="pincode"
            type="text"
            className={`w-full px-3 py-2 border ${errors.pincode ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Your pincode"
            {...register('pincode', { required: 'Pincode is required' })}
          />
          {errors.pincode && <p className="mt-1 text-sm text-error-600">{errors.pincode.message}</p>}
        </div>
        
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium text-neutral-700 mb-1">Mobile Number</label>
          <input
            id="mobileNumber"
            type="tel"
            className={`w-full px-3 py-2 border ${errors.mobileNumber ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Your mobile number"
            {...register('mobileNumber', { required: 'Mobile number is required' })}
          />
          {errors.mobileNumber && <p className="mt-1 text-sm text-error-600">{errors.mobileNumber.message}</p>}
        </div>
        
        <div>
          <label htmlFor="cropName" className="block text-sm font-medium text-neutral-700 mb-1">Crop Name</label>
          <input
            id="cropName"
            type="text"
            className={`w-full px-3 py-2 border ${errors.cropName ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Name of your crop"
            {...register('cropName', { required: 'Crop name is required' })}
          />
          {errors.cropName && <p className="mt-1 text-sm text-error-600">{errors.cropName.message}</p>}
        </div>
        
        <div>
          <label htmlFor="farmingMethod" className="block text-sm font-medium text-neutral-700 mb-1">Farming Method</label>
          <Select
            id="farmingMethod"
            options={farmingMethods}
            value={selectedFarmingMethod}
            onChange={setSelectedFarmingMethod}
            placeholder="Select farming method"
            className="text-base"
            classNames={{
              control: (state) => 
                `!border ${state.isFocused ? '!border-primary-500 !shadow-md !ring-2 !ring-primary-200' : '!border-neutral-300'} !rounded-md !bg-white`,
            }}
          />
        </div>
        
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-neutral-700 mb-1">Product Name</label>
          <input
            id="productName"
            type="text"
            className={`w-full px-3 py-2 border ${errors.productName ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Name of your product"
            {...register('productName', { required: 'Product name is required' })}
          />
          {errors.productName && <p className="mt-1 text-sm text-error-600">{errors.productName.message}</p>}
        </div>
        
        <div>
          <label htmlFor="productForm" className="block text-sm font-medium text-neutral-700 mb-1">Product Form</label>
          <input
            id="productForm"
            type="text"
            className={`w-full px-3 py-2 border ${errors.productForm ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Form of your product"
            {...register('productForm', { required: 'Product form is required' })}
          />
          {errors.productForm && <p className="mt-1 text-sm text-error-600">{errors.productForm.message}</p>}
        </div>
        
        <div>
          <label htmlFor="productCondition" className="block text-sm font-medium text-neutral-700 mb-1">Product Condition</label>
          <Select
            id="productCondition"
            options={productConditions}
            value={selectedProductCondition}
            onChange={setSelectedProductCondition}
            placeholder="Select product condition"
            className="text-base"
            classNames={{
              control: (state) => 
                `!border ${state.isFocused ? '!border-primary-500 !shadow-md !ring-2 !ring-primary-200' : '!border-neutral-300'} !rounded-md !bg-white`,
            }}
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-neutral-700 mb-1">Quantity (kg/MT)</label>
          <input
            id="quantity"
            type="text"
            className={`w-full px-3 py-2 border ${errors.quantity ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Quantity available"
            {...register('quantity', { required: 'Quantity is required' })}
          />
          {errors.quantity && <p className="mt-1 text-sm text-error-600">{errors.quantity.message}</p>}
        </div>
        
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">Price (per kg)</label>
          <input
            id="price"
            type="text"
            className={`w-full px-3 py-2 border ${errors.price ? 'border-error-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Price per kg"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <p className="mt-1 text-sm text-error-600">{errors.price.message}</p>}
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default SalesForm;