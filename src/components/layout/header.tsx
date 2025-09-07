
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { cn } from "@/lib/utils";

const pageTitles: { [key: string]: string } = {
  "/": "Home",
  "/chat": "Chat",
  "/find": "Find Influencers",
  "/profile": "Profile",
  "/contact": "Contact Us",
};

const Header = () => {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "TrueFluence";
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left placeholder for spacing */}
        <div className="flex-1 flex justify-start">
          <div className="w-10 h-10"></div>
        </div>

        {/* Centered Logo or Title */}
        <div className="flex-1 flex justify-center">
            <div className={cn(
                "absolute transition-opacity duration-500",
                isHome ? "opacity-100" : "opacity-0"
            )}>
                <Logo />
            </div>
            <h1 className={cn("text-lg font-semibold tracking-tight transition-opacity duration-500",
                isHome ? "opacity-0" : "opacity-100"
            )}>
              {title}
            </h1>
        </div>
        
        {/* Right Aligned Controls */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
