import React, { useState } from 'react';
import { LuLeaf, LuMenu } from 'react-icons/lu';

const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <LuLeaf className="h-6 w-6 text-green-500" />
          <span className="text-lg">EcoBite</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
