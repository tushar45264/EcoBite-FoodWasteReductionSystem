import React, { useState } from "react";
import { LuLeaf, LuMenu } from "react-icons/lu";

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <LuLeaf className="h-6 w-6 text-green-500" />
          <span className="text-lg">EcoBite</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          <a
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Welcome
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Logout
          </a>
        </nav>
        <button className="md:hidden" onClick={toggleSheet}>
          <LuMenu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </button>
        {isSheetOpen && (
          <div className="absolute right-0 top-16 w-64 bg-white shadow-md ">
            <div className="grid gap-6 p-6">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={toggleSheet}
              >
                Welcome
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={toggleSheet}
              >
                Map
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={toggleSheet}
              >
                Chat
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={toggleSheet}
              >
                Testimonials
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={toggleSheet}
              >
                Join Us
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
