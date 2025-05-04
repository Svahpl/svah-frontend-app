import React from 'react';
import { Award, Users, Leaf, Globe } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-primary-800 mb-6 text-center">About Us</h2>
          
          <div className="bg-white shadow-md rounded-lg p-6 md:p-8 mb-8">
            <p className="mb-4 text-neutral-700 leading-relaxed">
              Founded in 2021, SRI VENKATESWARA AGROS AND HERBS (SVAH) is dedicated to providing premium quality natural and organic products 
              sourced directly from farmers and rural artisans across India. We specialize in medicinal plants, traditional herbs, 
              organic food products, and natural cosmetics.
            </p>
            
            <p className="mb-4 text-neutral-700 leading-relaxed">
              Our mission is to promote sustainable agriculture and traditional craftsmanship while ensuring fair compensation for producers. 
              We bridge the gap between rural communities and global markets, bringing authentic, high-quality natural products to consumers worldwide.
            </p>
            
            <p className="mb-4 text-neutral-700 leading-relaxed">
              At SVAH, we maintain stringent quality control processes to ensure that each product meets international standards. 
              Our certifications from ISO, APEDA, SPICE BOARD, and FSSAI reflect our commitment to excellence and safety.
            </p>
            
            <p className="text-neutral-700 leading-relaxed">
              Through our plant nursery division, we also promote environmental conservation by supplying a wide variety of indigenous plants 
              and offering guidance on sustainable gardening practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <Award className="text-primary-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-heading font-semibold text-primary-800">Quality Assurance</h3>
              </div>
              <p className="text-neutral-700">Every product undergoes rigorous testing and quality checks before reaching our customers, ensuring the highest standards of purity and effectiveness.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <Users className="text-primary-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-heading font-semibold text-primary-800">Community Impact</h3>
              </div>
              <p className="text-neutral-700">We work directly with over 500 farmers and artisans, providing fair trade opportunities and supporting sustainable rural development.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <Leaf className="text-primary-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-heading font-semibold text-primary-800">Sustainability</h3>
              </div>
              <p className="text-neutral-700">Our eco-friendly practices and packaging solutions minimize environmental impact while maximizing product freshness and quality.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
              <div className="flex items-center mb-4">
                <Globe className="text-primary-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-heading font-semibold text-primary-800">Global Reach</h3>
              </div>
              <p className="text-neutral-700">We export to over 20 countries, bringing India's natural treasures to health-conscious consumers worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;