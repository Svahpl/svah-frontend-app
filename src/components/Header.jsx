import React, { useState, useEffect } from 'react';
import {
  Menu, X, Search, ChevronDown, ShoppingCart, User, Phone, Mail, Clock, Truck
} from 'lucide-react';
import { productCategories } from '../data/categories';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchText);
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-primary-100 transition-all duration-300 ${isScrolled ? 'shadow-lg py-0' : 'py-1'}`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white text-sm">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+919876543210" className="flex items-center hover:text-primary-100"><Phone className="h-4 w-4 mr-1.5" /> +91 98765 43210</a>
            <a href="mailto:info@svah.com" className="flex items-center hover:text-primary-100"><Mail className="h-4 w-4 mr-1.5" /> info@svah.com</a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5 text-primary-200" /> Mon-Sat: 9AM - 6PM</span>
            <span className="flex items-center font-medium"><Truck className="h-4 w-4 mr-1.5 text-primary-200" /> Free shipping over ₹500</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-1.5 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-inner">
              <div className="bg-white p-1 border border-primary-100/50 rounded-lg shadow-sm">
                <img src="/images/LOGO.png" alt="SVAH Logo" className="h-10 w-10 object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary-900 leading-tight">
                <span className="font-serif">SRI VENKATESWARA</span><br />
                <span className="text-primary-700">AGROS AND HERBS</span>
              </h1>
              <p className="text-xs text-gray-500 italic hidden md:block">Pure Nature, Pure Wellness</p>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block w-1/3 min-w-[280px] relative">
            <div className={`relative ${searchFocus ? 'scale-[1.02]' : ''} transition-all`}>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                placeholder="Search organic products..."
                className="w-full py-2.5 pl-5 pr-12 rounded-full border border-gray-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-300 bg-gray-50 focus:bg-white text-gray-700"
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50/50 rounded-full">
                <Search size={18} strokeWidth={2.5} />
              </button>
            </div>
          </form>

          {/* Account & Cart */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200 shadow-inner">
                <User size={20} className="text-primary-700" strokeWidth={2} />
              </div>
              <span className="text-xs mt-1.5 text-gray-600 group-hover:text-primary-700 font-medium">Account</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer relative group">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 group-hover:from-primary-100 group-hover:to-primary-200 shadow-inner">
                <ShoppingCart size={20} className="text-primary-700" strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-xs flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1.5 text-gray-600 group-hover:text-primary-700 font-medium">Cart</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2.5 rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} className="text-primary-700" /> : <Menu size={22} className="text-primary-700" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between border-t border-primary-100/50 py-2.5">
          <div className="flex items-center space-x-1">
            <a href="#" className="px-4 py-2 font-medium text-gray-700 rounded-lg hover:text-primary-700 hover:bg-primary-50/50">Home</a>
            <div className="relative group">
              <button className="flex items-center px-4 py-2 font-medium text-gray-700 rounded-lg hover:text-primary-700 hover:bg-primary-50/50">
                Products <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute top-full mt-1 w-64 bg-white rounded-lg shadow-xl z-50 border border-gray-100 hidden group-hover:block">
                <div className="py-1.5">
                  {productCategories.map((cat) => (
                    <div key={cat.id} className="group/item relative">
                      <a href={`#category-${cat.id}`} className="flex justify-between items-center px-4 py-2.5 text-gray-700 hover:bg-primary-50/50 hover:text-primary-700">
                        <span className="flex items-center">{cat.icon && <cat.icon className="h-4 w-4 mr-2.5 text-primary-500" />} {cat.name}</span>
                        {cat.subcategories && <ChevronDown className="h-4 w-4 text-gray-400" />}
                      </a>
                      {cat.subcategories && (
                        <div className="absolute top-0 left-full ml-0.5 w-64 bg-white shadow-xl rounded-lg border border-gray-100 hidden group-hover/item:block">
                          <div className="py-1.5">
                            {cat.subcategories.map((sub) => (
                              <a key={sub.id} href={`#subcategory-${sub.id}`} className="block px-4 py-2.5 text-gray-700 hover:bg-primary-50/50 hover:text-primary-700">
                                {sub.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href="/About" className="px-4 py-2 font-medium text-gray-700 rounded-lg hover:text-primary-700 hover:bg-primary-50/50">About Us</a>
            <a href="#blog" className="px-4 py-2 font-medium text-gray-700 rounded-lg hover:text-primary-700 hover:bg-primary-50/50">Blog</a>
            <a href="#contact" className="px-4 py-2 font-medium text-gray-700 rounded-lg hover:text-primary-700 hover:bg-primary-50/50">Contact</a>
          </div>
          <div className="text-sm bg-primary-50/50 text-primary-700 px-3 py-1.5 rounded-full font-medium flex items-center">
            <span className="hidden lg:inline">✨</span> Premium Organic Products <span className="hidden lg:inline">✨</span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-xl border-t border-primary-100/50">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search organic products..."
                  className="w-full py-2.5 pl-4 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-700"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Search size={18} strokeWidth={2.5} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2 mb-4">
              <a 
                href="#" 
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-lg font-medium text-gray-700 hover:bg-primary-50/50"
              >
                Home
              </a>
              
              <div className="py-2.5 px-4 rounded-lg font-medium text-gray-700">
                Products
                <div className="mt-2 pl-4 space-y-2">
                  {productCategories.map((cat) => (
                    <div key={cat.id}>
                      <a 
                        href={`#category-${cat.id}`} 
                        onClick={() => setMenuOpen(false)}
                        className="block py-2 text-gray-600 hover:text-primary-700"
                      >
                        {cat.name}
                      </a>
                      {cat.subcategories && (
                        <div className="pl-4 mt-1 space-y-1">
                          {cat.subcategories.map((sub) => (
                            <a
                              key={sub.id}
                              href={`#subcategory-${sub.id}`}
                              onClick={() => setMenuOpen(false)}
                              className="block py-1.5 text-gray-500 hover:text-primary-600"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href="/About" 
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-lg font-medium text-gray-700 hover:bg-primary-50/50"
              >
                About Us
              </a>
              <a 
                href="#blog" 
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-lg font-medium text-gray-700 hover:bg-primary-50/50"
              >
                Blog
              </a>
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-lg font-medium text-gray-700 hover:bg-primary-50/50"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Account & Cart */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                onClick={() => setMenuOpen(false)}
                className="flex-1 flex flex-col items-center py-2 rounded-lg hover:bg-primary-50/50"
              >
                <div className="p-2 rounded-full bg-primary-50 mb-1">
                  <User size={18} className="text-primary-600" />
                </div>
                <span className="text-xs text-gray-600">Account</span>
              </a>
              <a 
                href="#" 
                onClick={() => setMenuOpen(false)}
                className="flex-1 flex flex-col items-center py-2 rounded-lg hover:bg-primary-50/50 relative"
              >
                <div className="p-2 rounded-full bg-primary-50 mb-1">
                  <ShoppingCart size={18} className="text-primary-600" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-6 bg-primary-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-600">Cart</span>
              </a>
            </div>

            {/* Mobile Top Bar Info */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a 
                href="tel:+919876543210" 
                className="flex items-center text-sm text-gray-600 hover:text-primary-700"
              >
                <Phone className="h-4 w-4 mr-2 text-primary-500" /> +91 98765 43210
              </a>
              <a 
                href="mailto:info@svah.com" 
                className="flex items-center text-sm text-gray-600 hover:text-primary-700"
              >
                <Mail className="h-4 w-4 mr-2 text-primary-500" /> info@svah.com
              </a>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-primary-500" /> Mon-Sat: 9AM - 6PM
              </div>
              <div className="flex items-center text-sm text-gray-600 font-medium">
                <Truck className="h-4 w-4 mr-2 text-primary-500" /> Free shipping over ₹500
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;