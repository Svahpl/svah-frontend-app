import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CyberCrimeWarning from "./components/CyberCrimeWarning";
import Header from "./components/Header";
import Slideshow from "./components/Slideshow";
import CategorySection from "./components/CategorySection";
import Certificates from "./components/Certificates";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ShippingPolicy from "./components/ShippingPolicy";
import TermsOfService from "./components/TermsOfService";
// import PrivacyPolicy from "./components/PrivacyPolicy";
import { HomePage } from "./Page/pageIndex";

function App() {
  useEffect(() => {
    document.title = "Sri Venkateswara Agros and Herbs";

    const titleElement = document.querySelector("title[data-default]");
    if (titleElement) {
      titleElement.removeAttribute("data-default");
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <CyberCrimeWarning />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
