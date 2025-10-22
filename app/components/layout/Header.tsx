"use client";
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full" style={{ background: '#000', borderBottom: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div title="CONNECT" className="css-1ou76s8 e1bwn3l83">
            <a href="/">
              <span
                aria-label="Go to Connect Main Page"
                style={{
                  display: 'inline-block',
                  width: '80px',
                  height: '16px',
                  background: 'url(https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg) no-repeat',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              ></span>
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Store</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contest</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Community</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Apps</a>
            </div>
          </nav>

          {/* Auth Buttons (desktop only) */}
          <div className="hidden md:flex items-center space-x-4">
            <button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontFamily: 'AvenirNextLTProBold', fontSize: '13px', padding: '6px 18px', fontWeight: 700, letterSpacing: '0.02em', boxShadow: 'none', outline: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>SIGN IN</button>
            <button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '6px', fontFamily: 'AvenirNextLTProBold', fontSize: '13px', padding: '6px 18px', fontWeight: 700, letterSpacing: '0.02em', boxShadow: 'none', outline: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>SIGN UP</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-black px-4 py-4 rounded-b-lg shadow-lg">
            <nav className="flex flex-col gap-2 mb-4">
              <a href="#" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Store</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contest</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Community</a>
              <a href="#" className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">Apps</a>
            </nav>
            <div className="flex flex-col gap-2">
              <button style={{ background: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontFamily: 'AvenirNextLTProBold', fontSize: '13px', padding: '6px 18px', fontWeight: 700, letterSpacing: '0.02em', boxShadow: 'none', outline: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>SIGN IN</button>
              <button style={{ background: 'transparent', color: '#fff', border: '2px solid #fff', borderRadius: '6px', fontFamily: 'AvenirNextLTProBold', fontSize: '13px', padding: '6px 18px', fontWeight: 700, letterSpacing: '0.02em', boxShadow: 'none', outline: 'none', cursor: 'pointer', transition: 'background 0.2s' }}>SIGN UP</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
