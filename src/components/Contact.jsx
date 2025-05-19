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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <RequirementForm />
          <SalesForm />
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
              <h3 className="text-xl font-heading font-semibold text-primary-800 mb-4">Our Address</h3>
              
              <div className="flex items-start mb-4">
                <MapPin className="text-primary-600 mt-1 mr-3 shrink-0" size={20} />
                <div>
                  <p className="text-neutral-700">
                    3-1/A, Veerabhadravaram Village,<br />
                    Venkatapuram Mandal,<br />
                    Mulugu District, Telangana, India.<br />
                    PIN: 507136
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="text-primary-600 mr-3" size={20} />
                  <a href="mailto:srivenkateswaraagrosandherbs@gmail.com" className="text-primary-700 hover:text-primary-900 transition-colors">
                    srivenkateswaraagrosandherbs@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="text-primary-600 mr-3" size={20} />
                  <a href="mailto:svaherbs@gmail.com" className="text-primary-700 hover:text-primary-900 transition-colors">
                    svaherbs@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Youtube className="text-primary-600 mr-3" size={20} />
                  <a href="https://youtube.com/@svah-2021" target="_blank" rel="noopener noreferrer" className="text-primary-700 hover:text-primary-900 transition-colors">
                    youtube.com/@svah-2021
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Instagram className="text-primary-600 mr-3" size={20} />
                  <span className="text-neutral-700">svah_2021, svah_nurseries</span>
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