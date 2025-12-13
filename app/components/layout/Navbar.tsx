'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/learn-ecg', label: 'Learn ECG' },
    { href: '/app', label: 'App' },
    { href: '/blog', label: 'Blog' },
    { href: '/forum', label: 'Community' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container-width">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/logo/logo.png"
                alt="E-PulsePoints logo - heart with ECG waveform representing cardiac education platform"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-red-600">
                E-PulsePoints
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">ECG Learning Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Get App CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-green-600 font-semibold transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-green-50"
            >
              Login
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <div className={`w-5 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-700 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 bg-white">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-red-600 font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-green-600 hover:text-green-700 font-bold py-3 px-4 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=com.ecgkid.pulsepoints"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get App
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;