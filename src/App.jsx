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
import { HomePage, CartPage, AccountPage, ProductPage } from "./Page/pageIndex";
import ProductScreen from "./Page/ProductScreen";
import { AddressManager } from "./components/compIndex";
import PaypalPayment from "./components/PaypalPayment";
import PaymentSuccess from "./components/PaymentSuccess"

function App() {
  useEffect(() => {
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
          <Route path="/cart" element={<CartPage />} />
          <Route path="/view-product/:id" element={<ProductScreen />} />
          <Route path="/my-account" element={<AccountPage />} />
          <Route path="/my-account/addresses" element={<AddressManager />} />

          {/* -------- IMPORTANT PAYMENT ROUTES DO NOT TOUCH ---------- */}
          <Route path="/paypal-test" element={<PaypalPayment />} />
          <Route path="/complete-payment" element={<PaymentSuccess />} />
          {/* ----------------- END OF PAYMENT ROUTES ------------ */}

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
