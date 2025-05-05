import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Scale, 
  BarChart2, 
  Eye, 
  Gavel, 
  Crosshair,
  CheckCircle,
  Users,
  Leaf,
  Globe
} from 'lucide-react';

const About = () => {
  const coreValues = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Ethical Commitment",
      description: "We operate with integrity and transparency in all business dealings."
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Honesty & Integrity",
      description: "We uphold the highest standards in all customer interactions."
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Business Stability",
      description: "Committed to long-term sustainability and stable business practices."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Pursuit of Excellence",
      description: "Continuous improvement in our products and services."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparency",
      description: "Clear and open business operations and decisions."
    },
    {
      icon: <Gavel className="w-6 h-6" />,
      title: "Impartiality",
      description: "Fair decisions based on merit and objectivity."
    },
    {
      icon: <Crosshair className="w-6 h-6" />,
      title: "Accuracy",
      description: "Precision and attention to detail in all we do."
    }
  ];

  return (
    <section id="about" className="py-16 bg-gradient-to-b from-neutral-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-800 mb-4 font-serif">About Sri Venkateswara Agros and Herbs</h2>
            <div className="w-24 h-1 bg-green-600 mx-auto"></div>
          </div>
          
          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-l-4 border-green-600">
            <h3 className="text-2xl font-semibold text-primary-800 mb-4 flex items-center">
              <CheckCircle className="text-green-600 mr-3" /> Our Mission
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              As a government-recognized, customer-centric organization, we take full responsibility for delivering exceptional service and quality to our valued customers. We consistently deliver high-quality natural farming products that meet evolving needs while maintaining the highest ethical standards.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Through sustainable agriculture and traditional practices, we bridge the gap between rural communities and global markets, bringing authentic, healthy products to consumers worldwide.
            </p>
          </div>
          
          {/* Core Values */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center text-primary-800 mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.slice(0, 4).map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-600">
                  <div className="text-green-600 mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 text-primary-800">{value.title}</h4>
                  <p className="text-neutral-700">{value.description}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {coreValues.slice(4).map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-green-600">
                  <div className="text-green-600 mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold mb-2 text-primary-800">{value.title}</h4>
                  <p className="text-neutral-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Compliance & Operations */}
          <div className="bg-green-800 text-white rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-semibold mb-4">Compliance & Ethics</h3>
            <p className="mb-4 leading-relaxed">
              We operate in full compliance with all applicable laws and regulations. Our commitment to ethical business practices is reflected in our certifications from ISO, APEDA, SPICE BOARD, and FSSAI.
            </p>
            <p className="leading-relaxed">
              Every product undergoes rigorous testing to ensure it meets international standards of purity, safety, and effectiveness.
            </p>
          </div>
          
          {/* Impact Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center mb-4">
                <Users className="text-green-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold text-primary-800">Community Impact</h3>
              </div>
              <p className="text-neutral-700">Working directly with farmers and artisans, providing fair trade opportunities and supporting sustainable rural development.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center mb-4">
                <Leaf className="text-green-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold text-primary-800">Sustainability</h3>
              </div>
              <p className="text-neutral-700">Eco-friendly practices and packaging that minimize environmental impact while maximizing product quality.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center mb-4">
                <Globe className="text-green-600 w-8 h-8 mr-3" />
                <h3 className="text-xl font-semibold text-primary-800">Global Reach</h3>
              </div>
              <p className="text-neutral-700">Bringing India's natural agricultural treasures to health-conscious consumers worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;