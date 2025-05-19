import React from 'react';
import { certificates } from '../data/certificates';

const Certificates = () => {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-primary-800 mb-12 text-center">
          Our Certifications
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certificates.map((certificate) => (
            <div 
              key={certificate.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4 border-t border-neutral-100">
                <h3 className="text-primary-700 font-medium text-center">{certificate.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;