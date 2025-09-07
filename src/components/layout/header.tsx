"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex-1">
          {/* Placeholder for potential left-aligned content */}
        </div>

        <div className="flex-1 flex justify-center">
            <Link href="/">
              <Logo />
            </Link>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
