"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#solution", label: "Solution" },
  { href: "#pricing", label: "Pricing" },
  { href: "#security", label: "Trust" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
           isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <div className="lg:flex-1 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Logo />
            </Link>
          </div>

          <div className="lg:flex-1 flex items-center justify-end gap-2">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">Log In</Button>
              <Button>Sign Up</Button>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl animate-fade-in"
          style={{ animationDuration: '0.5s' }}
        >
          <div className="container mx-auto px-4 md:px-6 h-full">
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-4xl font-bold text-foreground/80 hover:text-foreground transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
               <div className="flex items-center gap-4 pt-8 mt-4 border-t border-border/50 md:hidden w-full max-w-xs">
                <Button variant="outline" size="lg" className="w-full text-lg">Log In</Button>
                <Button size="lg" className="w-full text-lg">Sign Up</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
