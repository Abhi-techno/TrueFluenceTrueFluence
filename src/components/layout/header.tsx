"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useSidebar } from '@/hooks/use-sidebar';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isExpanded } = useSidebar();

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
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent",
        isExpanded ? 'lg:ml-64' : 'lg:ml-20',
        'transition-[margin-left] duration-300 ease-in-out'
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
          <Button variant="ghost">Log In</Button>
          <Button>Sign Up</Button>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
