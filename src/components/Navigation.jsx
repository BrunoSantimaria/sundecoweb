"use client";

import React, { useState, useEffect } from "react";

const menuItems = [
  { name: "Inicio", href: "/" },
  { name: "Cortinas", href: "/cortinas" },
  { name: "Redes", href: "/redes" },
  { name: "Cercos", href: "/cercos" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 shadow-lg" : "bg-gray-900/80 backdrop-blur-sm"}`}>
      <div className='container mx-auto px-2'>
        <div className='flex items-center justify-between py-4'>
          {/* Logo */}
          <a href='/' className='flex items-center'>
            <img
              src='https://res.cloudinary.com/di92lsbym/image/upload/f_auto,q_auto/v1736404361/Sundeco/Logo-Sundeco-Minimal.webp'
              alt='Sundeco Logo'
              width={60}
              height={60}
            />
          </a>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-1'>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='px-2 py-2 rounded-md text-sm font-medium text-gray-200 transition-colors duration-200 hover:bg-gray-800 hover:text-white'
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className='md:hidden text-white' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-gray-900'>
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className='block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800' onClick={() => setIsOpen(false)}>
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
