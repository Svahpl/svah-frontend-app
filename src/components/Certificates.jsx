import React from 'react';
import { certificates } from '../data/certificates';

const Certificates = () => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-primary-800 mb-12 text-center">
          Our Certifications
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center transform hover:scale-105 transition-transform">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 overflow-hidden rounded-full">
                <img
                  src={certificate.image}
                  alt={certificate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-primary-700 font-medium text-sm md:text-base">{certificate.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;