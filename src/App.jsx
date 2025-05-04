import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CyberCrimeWarning from './components/CyberCrimeWarning';
import Header from './components/Header';
import Slideshow from './components/Slideshow';
import CategorySection from './components/CategorySection';
import Certificates from './components/Certificates';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShippingPolicy from './components/ShippingPolicy';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  useEffect(() => {
    document.title = "Sri Venkateswara Agros and Herbs";
    
    const titleElement = document.querySelector('title[data-default]');
    if (titleElement) {
      titleElement.removeAttribute('data-default');
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <CyberCrimeWarning />
        <Header />
        <Routes>
          <Route path="/" element={
            <main>
              <Slideshow />
              <About />
              <CategorySection />
              <Certificates />
              <Contact />
            </main>
          } />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
