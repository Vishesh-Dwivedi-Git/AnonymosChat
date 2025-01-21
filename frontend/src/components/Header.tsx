import { useState, useEffect } from "react";
import { Button } from "./ui/moving-border";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle screen resize to reset menu state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="p-4 border-b border-gray-800 sticky top-0 bg-black/70 backdrop-blur-lg z-10">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white font-code">
          Anonymous<span className="text-blue-500">Chat</span>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon for close
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen
              ? "flex flex-col  justify-center items-center space-y-32 pb-5 bg-black absolute top-full left-0 w-full shadow-md h-screen"
              : "hidden"
          } md:flex md:flex-row md:relative md:top-0 md:left-0 md:space-y-0 md:space-x-6 md:w-auto md:shadow-none md:bg-transparent`}
        >
          <button className="text-gray-300 hover:text-white font-code font-bold text-lg transition duration-300">
            Home
          </button>
          <button className="text-gray-300 hover:text-white font-code font-bold text-lg transition duration-300">
            Features
          </button>
          <Button borderRadius="1.75rem" className="text-gray-300  hover:text-white font-code font-bold text-sm transition duration-300">
            Take Demo
          </Button>
        </div>
      </nav>
    </header>
  );
}
