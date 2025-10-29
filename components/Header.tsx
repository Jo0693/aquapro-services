'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const navItems = [
    { href: '/', label: t('nav_home') },
    { href: '/services', label: t('nav_services') },
    { href: '/gallery', label: t('nav_gallery') },
    { href: '/blog', label: t('nav_blog') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-lightgray shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className={`font-poppins text-2xl font-bold ${isScrolled ? 'text-steel' : 'text-white'}`}>
            AquaPro Services
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors ${
                pathname === item.href
                  ? isScrolled
                    ? 'text-steel'
                    : 'text-gold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-steel'
                  : 'text-white hover:text-gold'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isScrolled
                ? 'bg-steel text-white hover:bg-blue-900'
                : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
            }`}
          >
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden ${isScrolled ? 'text-steel' : 'text-white'}`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 ${
                  pathname === item.href ? 'text-steel font-semibold' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="w-full text-left py-2 text-steel font-medium"
            >
              {i18n.language === 'fr' ? 'English' : 'Français'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
