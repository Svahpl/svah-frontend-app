import React from 'react';
import { Mail, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Data for footer sections
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/About' },
    { label: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
  ];

  const contactItems = [
    {
      icon: <Mail size={24} className="text-green-400 flex-shrink-0 mt-1" />,
      label: 'OFFICIAL MAIL',
      subLabel: 'OFFICIAL MAIL',
      content: (
        <a
          href="mailto:srivenkateswaraagrosandherbs@gmail.com"
          className="text-white hover:text-green-300 transition-colors"
        >
          srivenkateswaraagrosandherbs@gmail.com
        </a>
      ),
    },
    {
      icon: <Mail size={24} className="text-green-400 flex-shrink-0 mt-1" />,
      label: 'FOR REQUIREMENTS',
      subLabel: 'FOR REQUIREMENTS',
      content: (
        <a
          href="mailto:Svahpl1@gmail.com"
          className="text-white hover:text-green-400 transition-colors"
        >
          Svahpl1@gmail.com
        </a>
      ),
    },
    {
      icon: <Mail size={24} className="text-green-400 flex-shrink-0 mt-1" />,
      label: 'FOR SALES',
      subLabel: 'FOR SALES',
      content: (
        <a
          href="mailto:svaherbs@gmail.com"
          className="text-white hover:text-green-400 transition-colors"
        >
          svaherbs@gmail.com
        </a>
      ),
    },
    {
      icon: <Instagram size={24} className="text-green-400 flex-shrink-0 mt-1" />,
      label: 'INSTAGRAM',
      content: (
        <div className="flex items-center flex-wrap gap-2">
          <a
            href="https://www.instagram.com/svah.2021?utm_source=qr&igsh=MTZrbGswaXE4dXhqeA%3D%3D"
            className="text-white hover:text-green-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            svah.2021
          </a>
          <span className="text-gray-400 mx-2">|</span>
          <a
            href="https://www.instagram.com/svah_nurseries?utm_source=qr&igsh=N2Jpb3JwdmJmdmpk"
            className="text-white hover:text-green-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            svah_nurseries
          </a>
        </div>
      ),
    },
    {
      icon: <Youtube size={24} className="text-green-400 flex-shrink-0 mt-1" />,
      label: 'YOUTUBE',
      content: (
        <a
          href="https://www.youtube.com/@svah-2021"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-400 transition-colors"
        >
          @svah-2021
        </a>
      ),
    },
  ];

  // Reusable Link Component
  const FooterLink = ({ href, label }) => (
    <li>
      <a href={href} className="hover:text-green-400 transition-colors">
        {label}
      </a>
    </li>
  );

  // Reusable Contact Item Component
  const ContactItem = ({ icon, label, subLabel, content }) => (
    <li className="flex items-start gap-3">
      {icon}
      <div>
        {subLabel && <span className="text-gray-400 block text-xs uppercase">{subLabel}</span>}
        {content}
      </div>
    </li>
  );

  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg text-white font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg text-white font-semibold mb-4">LEGAL</h4>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg text-white font-semibold mb-4">CONTACT</h4>
            <ul className="space-y-4 text-sm">
              {contactItems.map((item, index) => (
                <ContactItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  subLabel={item.subLabel}
                  content={item.content}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 text-sm text-gray-400 text-left">
          © {currentYear} SRI VENKATESWARA AGROS AND HERBS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;