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
      setIsScrolled(window.scrollY > 50);
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
          <div className="flex items-center gap-2 lg:flex-1">
            <Link href="/" className="z-50" onClick={() => setIsMenuOpen(false)}>
              <Logo />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
             <div className="p-1 rounded-full bg-secondary/60 backdrop-blur-md border border-border/50 shadow-inner-lg">
                {navLinks.map((link) => (
                    <Link
                    key={link.label}
                    href={link.href}
                    className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:bg-background/50 focus:text-foreground"
                    >
                    {link.label}
                    </Link>
                ))}
             </div>
          </nav>

          <div className="flex items-center justify-end gap-2 lg:flex-1">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost">Log In</Button>
              <Button>Sign Up</Button>
            </div>
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden z-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      
      {isMenuOpen && (
        <div
          className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 fixed top-20 left-0 w-full h-[calc(100vh-80px)] z-40 animate-fade-in-down"
          style={{ animationDuration: '0.3s' }}
        >
          <nav className="flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg font-medium text-foreground/80 hover:text-foreground py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-border/50 md:hidden">
              <Button variant="outline" size="lg" className="w-full text-lg">Log In</Button>
              <Button size="lg" className="w-full text-lg">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
