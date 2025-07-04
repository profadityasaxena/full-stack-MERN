"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import links from "@/constants/constants.json";

// Placeholder authentication check
const isAuthenticated = false;
const user = {
  name: "Aditya",
  image: "/user-avatar.png", // Replace with dynamic source
};

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggle = (): void => setOpen((p) => !p);

  return (
    <nav className="w-full" style={{ backgroundColor: "var(--primary)", color: "#ffffff" }}>
      <div
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Left: Logo or Title */}
        <span className="font-semibold">SocialApp</span>

        {/* Right: Menu & Auth Actions */}
        <div className="flex items-center gap-4">
          {/* Hamburger Icon */}
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={toggle}
            style={{
              color: "#ffffff",
              padding: "0.5rem",
              borderRadius: "0.375rem",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            className="lg:hidden"
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              {open ? (
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

          {/* Conditional Auth Area */}
          {!isAuthenticated ? (
            <Link
              href="/register"
              style={{
                padding: "0.4rem 0.75rem",
                backgroundColor: "#ffffff",
                color: "var(--primary)",
                borderRadius: "0.375rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Login or Register
            </Link>
          ) : (
            <Link href="/profile" style={{ display: "inline-block" }}>
              <Image
                src={user.image}
                alt={user.name}
                width={32}
                height={32}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ffffff",
                }}
              />
            </Link>
          )}
        </div>
      </div>

      {/* Desktop navigation links */}
      <div className="hidden lg:flex justify-center gap-6 py-2">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            style={{ color: "#ffffff", textDecoration: "none" }}
            className="hover:underline"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile dropdown links */}
      {open && (
        <div className="lg:hidden space-y-1 px-4 pb-4">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.5rem 0.75rem",
                color: "#ffffff",
                borderRadius: "0.375rem",
                textDecoration: "none",
              }}
              className="hover:underline"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
