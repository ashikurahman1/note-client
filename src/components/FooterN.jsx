import React from 'react';

const FooterN = () => {
  return (
    <footer className="text-white py-8 shadow-inner">
      <div>
        <p className="text-sm md:text-base mb-4 md:mb-0 animate-fadeIn">
          &copy; {new Date().getFullYear()} Notes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterN;
