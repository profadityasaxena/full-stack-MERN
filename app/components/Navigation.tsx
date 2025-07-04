"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import links from "@/constants/constants.json";

const isAuthenticated = true; // Replace with real session logic
const user = {
  name: "Aditya",
  image: "/user-avatar.png",
};

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-primary text-white shadow-md">
      <div className="h-14 flex items-center justify-between px-[1em]">
        {/* Logo (left-aligned) */}
        <span className="font-semibold text-lg">SocialApp</span>

        {/* Right Side (links + auth) */}
        <div className="hidden lg:flex items-center gap-6 ml-auto" ref={dropdownRef}>
          {/* Links */}
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:underline font-medium"
            >
              {label}
            </Link>
          ))}

          {/* Auth */}
          {!isAuthenticated ? (
            <Link
              href="/register"
              className="bg-white text-primary font-medium py-1 px-3 rounded-md hover:opacity-90 whitespace-nowrap"
            >
              Login or Register
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="focus:outline-none"
              >
                <Image
                  src={user.image}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white object-cover"
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>

          {!isAuthenticated ? (
            <Link
              href="/register"
              className="bg-white text-primary font-medium py-1 px-3 rounded-md hover:opacity-90 whitespace-nowrap"
            >
              Login or Register
            </Link>
          ) : (
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-white object-cover"
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden px-[1em] pb-4 space-y-2">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block font-medium hover:underline"
            >
              {label}
            </Link>
          ))}

          {isAuthenticated && dropdownOpen && (
            <div className="pt-2 border-t border-gray-200">
              <Link
                href="/settings"
                className="block py-2 font-medium hover:underline"
              >
                Settings
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full text-left py-2 font-medium hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
