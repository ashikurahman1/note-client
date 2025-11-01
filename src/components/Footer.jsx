// components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto flex justify-center items-center">
      <div className="absolute bottom-4 flex flex-col items-center md:flex-row md:gap-20 md:justify-center">
        <p className="text-sm md:text-base  animate-fadeIn">
          &copy; {new Date().getFullYear()} Notes. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.facebook.com/ashikke2.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-5 h-5 hover:scale-125 transition-transform duration-300" />
          </a>

          <a
            href="https://www.linkedin.com/in/ashikur-dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5 hover:scale-125 transition-transform duration-300" />
          </a>

          <p>
            <FaInstagram className="w-5 h-5 hover:scale-125 transition-transform duration-300" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
