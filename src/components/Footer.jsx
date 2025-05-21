import React from 'react';
import { Leaf, Mail, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/About" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="/shipping-policy" className="hover:text-white transition">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={26} className="mt-1 text-green-300" />
                <div>
                  <a href="mailto:srivenkateswaraagrosandherbs@gmail.com" className="text-white hover:underline">
                    srivenkateswaraagrosandherbs@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={26} className="mt-1 text-green-300" />
                <div>
                  <span className="text-gray-400 block">Requirements</span>
                  <a href="mailto:Svahpl1@gmail.com" className="text-white hover:underline">
                    Svahpl1@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={26} className="mt-1 text-green-300" />
                <div>
                  <span className="text-gray-400 block">Sales</span>
                  <a href="mailto:svaherbs@gmail.com" className="text-white hover:underline">
                    svaherbs@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Instagram size={26} className="mt-1 text-pink-400" />
                <div>
                  <a
                    href="https://www.instagram.com/YOUR_INSTAGRAM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    @svaherbs
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Youtube size={26} className="mt-1 text-red-500" />
                <div>
                  <a
                    href="https://www.youtube.com/YOUR_YOUTUBE_CHANNEL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    SVAH YouTube Channel
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 text-center text-sm text-gray-500">
          © {currentYear} SRI VENKATESWARA AGROS AND HERBS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
