import React, { useState, useEffect } from 'react';
import {
  Menu, X, Search, ChevronDown, ShoppingCart, User
} from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchText, setSearchText] = useState('');
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-3">
          {/* Logo, Mobile Icons, and Menu Toggle */}
          <div className="w-full flex items-center justify-between">
            <a href="/" className="flex items-center space-x-3">
              <div className="p-1 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg">
                <div className="bg-white p-1 border border-primary-100/30 rounded-md">
                  <img 
                    src="/images/LOGO.png" 
                    alt="SVAH Logo" 
                    className="h-10 w-10 object-contain" 
                  />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-900 leading-tight">
                  <span className="font-serif tracking-wide">SRI VENKATESWARA</span><br />
                  <span className="text-primary-700 text-sm sm:text-base">AGROS AND HERBS</span>
                </h1>
              </div>
            </a>

            {/* Mobile Icons - Right Side */}
            <div className="flex items-center space-x-4 sm:hidden">
              <a href="#" className="text-gray-600 hover:text-primary-700">
                <User size={20} />
              </a>
              <a href="#" className="relative text-gray-600 hover:text-primary-700">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-full bg-primary-50 hover:bg-primary-100"
                aria-label="Toggle Menu"
              >
                {menuOpen ? <X size={22} className="text-primary-700" /> : <Menu size={22} className="text-primary-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Search - Always visible */}
          <form onSubmit={handleSearch} className="sm:hidden w-full">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search  products..."
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary-300 bg-gray-50 focus:bg-white text-gray-700 transition duration-200"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-700">
                <Search size={18} strokeWidth={2.5} />
              </button>
            </div>
          </form>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden sm:block w-1/3 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search  products..."
              className="w-full py-2 pl-5 pr-12 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary-300 bg-gray-50 focus:bg-white text-gray-700 transition duration-200"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-primary-700">
              <Search size={20} strokeWidth={2.5} />
            </button>
          </form>

          {/* Icons - Desktop */}
          <div className="hidden sm:flex items-center gap-6">
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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center justify-between py-2.5 border-t border-primary-100/50">
          <div className="flex items-center space-x-1">
            <a href="/" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Home</a>
            <a href="#CategorySection" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Products</a>
            <a href="/About" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">About Us</a>
            <a href="#blog" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Blog</a>
            <a href="/Contact" className="px-4 py-2 font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50/60 rounded-md transition">Contact</a>
          </div>
        </nav>

        {/* Mobile Navigation - Simplified */}
        {menuOpen && (
          <div className="sm:hidden mt-2 bg-white border-t border-primary-100/50 rounded-b-lg shadow-lg py-4 space-y-3">
            <nav className="flex flex-col space-y-1 px-4">
              <a href="/" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-gray-700 hover:bg-primary-50 rounded-md font-medium">Home</a>
              <a href="#CategorySection" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-gray-700 hover:bg-primary-50 rounded-md font-medium">Products</a>
              <a href="/About" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-gray-700 hover:bg-primary-50 rounded-md font-medium">About Us</a>
              <a href="#blog" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-gray-700 hover:bg-primary-50 rounded-md font-medium">Blog</a>
              <a href="/Contact" onClick={() => setMenuOpen(false)} className="py-3 px-4 text-gray-700 hover:bg-primary-50 rounded-md font-medium">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;