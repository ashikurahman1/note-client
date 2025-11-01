// components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full lg:w-10/12 py-3 mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-sm animate-fadeIn">
          &copy; {new Date().getFullYear()} Notes. All rights reserved.
        </p>
        <div className="flex space-x-4">
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
