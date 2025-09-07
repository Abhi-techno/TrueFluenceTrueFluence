"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : ""
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:flex-1">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        <div className="flex justify-center md:flex-1">
            <Link href="/" className="z-50" onClick={() => setIsMenuOpen(false)}>
                <Logo />
            </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 md:flex-1">
          <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
          </Button>
          <ThemeSwitcher />
        </div>

      </div>

      {isMenuOpen && (
        <div 
          className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 absolute top-full left-0 w-full z-40 animate-fade-in-down"
          style={{animationDuration: '0.3s'}}
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
            <div className="flex flex-col gap-4 pt-6 mt-4 border-t border-border/50">
                <Button variant="outline" size="lg" className="w-full text-lg">Log In</Button>
                <Button size="lg" className="w-full text-lg">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
