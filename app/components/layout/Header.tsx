import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div title="CONNECT" className="css-1ou76s8 e1bwn3l83">
            <a href="/">
              <span
                aria-label="Go to Connect Main Page"
                className="css-1ve2024 e1bwn3l84"
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
              <a
                href="#"
                className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Store
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Gallery
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contest
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Community
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Apps
              </a>
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
