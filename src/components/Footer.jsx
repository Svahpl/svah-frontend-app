import React from 'react';
import { Leaf, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="text-white h-6 w-6" />
              <h3 className="font-heading font-bold text-lg">SRI VENKATESWARA AGROS AND HERBS</h3>
            </div>
            <p className="max-w-md text-neutral-200">
              Committed to providing premium quality natural and organic products sourced directly from farmers and rural artisans across India.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:space-x-8">
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-neutral-200 hover:text-white transition-colors">Home</a></li>
                <li><a href="/About" className="text-neutral-200 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-neutral-200 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy-policy" className="text-neutral-200 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-neutral-200 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/shipping-policy" className="text-neutral-200 hover:text-white transition-colors">Shipping Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Contact Information</h4>
              <ul className="space-y">
                <li>
                  <div className="flex items-center">
                    <Mail className="text-neutral-200 mr-1" size={10} />
                    <a href="mailto:srivenkateswaraagrosandherbs@gmail.com" className="text-neutral-200 hover:text-white transition-colors">
                      Official: 
                      srivenkateswaraagrosandherbs@gmail.com
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Mail className="text-neutral-200 mr-1" size={10} />
                    <a href="mailto:Svahpl1@gmail.com" className="text-neutral-200 hover:text-white transition-colors">
                      Requirements: 
                      Svahpl1@gmail.com
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <Mail className="text-neutral-200 mr-1" size={10} />
                    <a href="mailto:svaherbs@gmail.com" className="text-neutral-200 hover:text-white transition-colors">
                      Sales: svaherbs@gmail.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-700 pt-6 mt-6">
          <p className="text-center text-neutral-300">
            © {currentYear} SRI VENKATESWARA AGROS AND HERBS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;