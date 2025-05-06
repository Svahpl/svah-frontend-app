import React, { useState, useEffect } from 'react';
import {
  Menu, X, Search, ChevronDown, ShoppingCart, User
} from 'lucide-react';
import { productCategories } from '../data/categories';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const [cartCount, setCartCount] = useState(3);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchText);
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white backdrop-blur-lg transition-all duration-300 ${isScrolled ? 'shadow-md py-1' : 'py-2 border-b border-primary-100/50'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="p-1.5 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl shadow-inner">
              <div className="bg-white p-1 border border-primary-100/50 rounded-lg shadow-sm">
                <img src="/images/LOGO.png" alt="SVAH Logo" className="h-10 w-10 object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary-900 leading-snug">
                <span className="font-serif tracking-wide">SRI VENKATESWARA</span><br />
                <span className="text-primary-700">AGROS & HERBS</span>
              </h1>
              <p className="text-xs italic text-gray-500 hidden md:block">Pure Nature, Pure Wellness</p>
            </div>
          </a>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block w-1/3 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              placeholder="Search organic products..."
              className="w-full py-2.5 pl-5 pr-12 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary-300 bg-gray-50 focus:bg-white text-gray-700 transition duration-200"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-primary-700">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="group flex flex-col items-center transition hover:scale-105">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 group-hover:shadow-lg transition">
                <User size={20} className="text-primary-700" />
              </div>
              <span className="text-xs text-gray-600 group-hover:text-primary-700">Account</span>
            </a>

            <a href="#" className="relative group flex flex-col items-center transition hover:scale-105">
              <div className="p-2.5 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 group-hover:shadow-lg transition">
                <ShoppingCart size={20} className="text-primary-700" />
              </div>
              <span className="text-xs text-gray-600 group-hover:text-primary-700">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-full bg-primary-50 hover:bg-primary-100"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={22} className="text-primary-700" /> : <Menu size={22} className="text-primary-700" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between py-2.5 border-t border-primary-100/50">
          <div className="flex items-center space-x-1">
            <a href="#" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Home</a>
            <a href="/#products" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Products</a>
            <a href="/About" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">About Us</a>
            <a href="#blog" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Blog</a>
            <a href="#contact" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Contact</a>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white border-t border-primary-100/50 rounded-b-lg shadow-lg py-4 space-y-4">
            <form onSubmit={handleSearch} className="px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2.5 pl-4 pr-10 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-700"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <Search size={18} strokeWidth={2.5} />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-2 px-4">
              <a href="#" onClick={() => setMenuOpen(false)} className="py-2 px-4 text-gray-700 hover:bg-primary-50 rounded-md">Home</a>
              {productCategories.map(cat => (
                <div key={cat.id}>
                  <a href={`#category-${cat.id}`} className="block py-2 px-4 text-gray-700 font-medium hover:text-primary-700">
                    {cat.name}
                  </a>
                  {cat.subcategories && (
                    <div className="pl-6 mt-1 space-y-1">
                      {cat.subcategories.map(sub => (
                        <a key={sub.id} href={`#subcategory-${sub.id}`} className="block py-1.5 text-gray-500 hover:text-primary-600">
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="/About" className="py-2 px-4 text-gray-700 hover:bg-primary-50 rounded-md">About Us</a>
              <a href="#blog" className="py-2 px-4 text-gray-700 hover:bg-primary-50 rounded-md">Blog</a>
              <a href="#contact" className="py-2 px-4 text-gray-700 hover:bg-primary-50 rounded-md">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
