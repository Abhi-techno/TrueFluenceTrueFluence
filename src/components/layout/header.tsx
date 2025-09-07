"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";
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
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Link href="/" className="z-20" onClick={() => setIsMenuOpen(false)}>
          <Logo />
        </Link>
        
        <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <nav className="flex items-center gap-2 rounded-full bg-background/50 backdrop-blur-xl border border-border/30 shadow-lg p-2">
            {navLinks.map((link) => (
                <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground px-4 py-2 rounded-full hover:bg-background/70"
                >
                {link.label}
                </Link>
            ))}
            </nav>
        </div>

        <div className="hidden md:flex items-center gap-2 z-20">
          <ThemeSwitcher />
          <Button variant="ghost" className="text-foreground/80 hover:text-foreground">Log In</Button>
          <Button className="rounded-full">Sign Up</Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 absolute top-full left-0 w-full">
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
            <div className="flex flex-col gap-4 pt-6 border-t border-border/50">
                <Button variant="ghost" size="lg" className="w-full text-lg">Log In</Button>
                <Button size="lg" className="w-full text-lg">Sign Up</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
