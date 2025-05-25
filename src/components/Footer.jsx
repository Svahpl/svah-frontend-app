import React from 'react';
import { Leaf, Mail, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          {/* Brand */}
          <div className="flex flex-col justify-start">
            <div className="flex items-center space-x-3 mb-6">
              
              <span className="text-2xl font-bold text-white"></span>
            </div>
           
          </div>

          {/* Quick Links */}
          <div className="flex flex-col justify-start">
            <h4 className="text-xl text-white font-semibold mb-5">QUICK LINKS</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="hover:text-green-400 transition-colors">Home</a></li>
              <li><a href="/About" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col justify-start">
            <h4 className="text-xl text-white font-semibold mb-5">LEGAL</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/privacy-policy" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              <li><a href="/shipping-policy" className="hover:text-green-400 transition-colors">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-start">
            <h4 className="text-xl text-white font-semibold mb-5">CONTACT</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3>OFFICIAL MAIL</h3>
                  <a href="mailto:srivenkateswaraagrosandherbs@gmail.com" className="text-white hover:text-green-300 transition-colors">
                    srivenkateswaraagrosandherbs@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-gray-400 block">FOR REQUIREMENTS</span>
                  <a href="mailto:Svahpl1@gmail.com" className="text-white hover:text-green-400 transition-colors">
                    Svahpl1@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-gray-400 block">FOR SALES</span>
                  <a href="mailto:svaherbs@gmail.com" className="text-white hover:text-green-400 transition-colors">
                    svaherbs@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div className="flex items-center flex-wrap gap-2">
                  <a href="https://www.instagram.com/svah.2021?utm_source=qr&igsh=MTZrbGswaXE4dXhqeA%3D%3D" className="text-white hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    svah.2021
                  </a>
                  <span className="text-gray-400 mx-2">|</span>
                  <a href="https://www.instagram.com/svah_nurseries?utm_source=qr&igsh=N2Jpb3JwdmJmdmpk" className="text-white hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                    svah_nurseries
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Youtube size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <a
                    href="https://www.youtube.com/@svah-2021"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-green-400 transition-colors"
                  >
                    @svah-2021
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 text-center text-sm text-gray-400">
          © {currentYear} SRI VENKATESWARA AGROS AND HERBS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;