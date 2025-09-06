"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#solution", label: "Solution" },
    { href: "#pricing", label: "Pricing" },
    { href: "#security", label: "Trust" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-black/70 backdrop-blur-xl border-b border-white/10"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" className="text-white hover:bg-white/10">Log In</Button>
          <Button className="bg-white text-black hover:bg-gray-200">Sign Up</Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 absolute top-full left-0 w-full">
          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-gray-200 hover:text-white py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/20">
                <Button variant="ghost" size="lg" className="w-full text-lg">Log In</Button>
                <Button size="lg" className="w-full text-lg bg-white text-black hover:bg-gray-200">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
