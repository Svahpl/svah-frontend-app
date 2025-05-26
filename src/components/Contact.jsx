import React from 'react';
import { Phone, Mail, Youtube, Instagram, MapPin, Clock, Truck, Shield } from 'lucide-react';
import RequirementForm from './RequirementForm';
import SalesForm from './SalesForm';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-primary-800 mb-12 text-center">
          Contact Us
        </h2>
        <div className="bg-gray-100 rounded-lg p-6 mb-6">

<ul className="space-y-3 text-gray-700 text-large">
  <li className="flex items-center gap-2">
    <Mail className="text-green-600 w-5 h-5" />
    <span className="font-medium text-gray-900">Official Mail:</span>{' '}
    srivenkateswaraagrosandherbs@gmail.com
  </li>
  <li className="flex items-center gap-2">
    <Mail className="text-green-600 w-5 h-5" />
    <span className="font-medium text-gray-900">Requirements:</span>{' '}
    Svahpl1@gmail.com
  </li>
  <li className="flex items-center gap-2">
    <Mail className="text-green-600 w-5 h-5" />
    <span className="font-medium text-gray-900">Sales:</span>{' '}
    svaherbs@gmail.com
  </li>
</ul>
</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
            <Clock className="text-primary-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-heading font-semibold text-primary-800 mb-2">Quick Response</h3>
            <p className="text-neutral-700">We aim to respond to all inquiries within 24 hours during business days.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
            <Truck className="text-primary-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-heading font-semibold text-primary-800 mb-2">Global Shipping</h3>
            <p className="text-neutral-700">We ship worldwide with reliable tracking and insurance coverage.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
            <Shield className="text-primary-600 w-8 h-8 mb-4" />
            <h3 className="text-xl font-heading font-semibold text-primary-800 mb-2">Secure Transactions</h3>
            <p className="text-neutral-700">Your data is protected with industry-standard encryption and security measures.</p>
          </div>
        </div>
        
<div className="bg-white rounded-lg shadow-md p-6 md:p-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    
    
<div>
  <h3 className="text-xl font-heading font-semibold text-primary-800 mb-4">Contact Information</h3>
  
  <div className="space-y-3">
    <div>
      <p className="text-neutral-700 font-semibold">Official Email:</p>
      <div className="flex items-center">
        <Mail className="text-primary-600 mr-3" size={20} />
        <a href="mailto:srivenkateswaraagrosandherbs@gmail.com" className="text-primary-700 hover:text-primary-900 transition-colors">
          srivenkateswaraagrosandherbs@gmail.com
        </a>
      </div>
    </div>
    
    <div>
      <p className="text-neutral-700 font-semibold">For Requirements:</p>
      <div className="flex items-center">
        <Mail className="text-primary-600 mr-3" size={20} />
        <a href="mailto:Svahpl1@gmail.com" className="text-primary-700 hover:text-primary-900 transition-colors">
          Svahpl1@gmail.com
        </a>
      </div>
    </div>
    
    <div>
      <p className="text-neutral-700 font-semibold">For Sales:</p>
      <div className="flex items-center">
        <Mail className="text-primary-600 mr-3" size={20} />
        <a href="mailto:svaherbs@gmail.com" className="text-primary-700 hover:text-primary-900 transition-colors">
          svaherbs@gmail.com
        </a>
      </div>
    </div>
    
    <div>
      <p className="text-neutral-700 font-semibold">Instagram:</p>
      <div className="flex items-center">
        <svg className="text-primary-600 mr-3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
        <a href="https://www.instagram.com/svah.2021" className="text-primary-700 hover:text-primary-900 transition-colors" target="_blank" rel="noopener noreferrer">
          @svah.2021
        </a>
        <span className="text-neutral-500 mx-2">|</span>
        <a href="https://www.instagram.com/svah_nurseries" className="text-primary-700 hover:text-primary-900 transition-colors" target="_blank" rel="noopener noreferrer">
          @SVAH_NURSERUES
        </a>
      </div>
    </div>
    
    <div>
      <p className="text-neutral-700 font-semibold">YouTube:</p>
      <div className="flex items-center">
        <svg className="text-primary-600 mr-3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
        <a href="https://www.youtube.com/@SVAH" className="text-primary-700 hover:text-primary-900 transition-colors" target="_blank" rel="noopener noreferrer">
          SVAH YouTube
        </a>
      </div>
    </div>
  </div>
</div>
  </div>
</div>
      </div>
    </section>
  );
};

export default Contact;