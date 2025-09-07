"use client";

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Compass,
  DollarSign,
  Shield,
  Mail,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "#features", label: "Features", icon: Compass },
  { href: "#pricing", label: "Pricing", icon: DollarSign },
  { href: "#security", label: "Trust", icon: Shield },
  { href: "/contact", label: "Contact", icon: Mail },
];

const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full bg-card border-r z-50 flex flex-col transition-all duration-300 ease-in-out',
        isExpanded ? 'w-64' : 'w-20'
      )}
    >
      <div className="flex items-center justify-center h-20 border-b relative">
        <Button
          onClick={toggleSidebar}
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-card hover:bg-secondary border rounded-full h-8 w-8"
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>

      <nav className="flex-1 px-4 py-6">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={link.href}>
                      <div
                        className={cn(
                          'flex items-center gap-4 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors',
                           !isExpanded && "justify-center"
                        )}
                      >
                        <link.icon className="h-5 w-5 flex-shrink-0" />
                        <span
                          className={cn(
                            'transition-opacity duration-200',
                            isExpanded ? 'opacity-100' : 'opacity-0 hidden'
                          )}
                        >
                          {link.label}
                        </span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right" sideOffset={10}>
                      {link.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
      
      <div className="px-4 py-6 border-t">
        {/* Can add user profile / logout button here */}
      </div>
    </aside>
  );
};

export default Sidebar;
