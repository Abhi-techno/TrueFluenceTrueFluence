"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  DollarSign,
  Shield,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#features", label: "Features", icon: Compass },
  { href: "/#pricing", label: "Pricing", icon: DollarSign },
  { href: "/#security", label: "Trust", icon: Shield },
  { href: "/contact", label: "Contact", icon: Mail },
];

const BottomNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-t border-border/50 z-50 lg:hidden">
            <div className="container mx-auto h-full">
                <ul className="flex justify-around items-center h-full">
                    {navLinks.map((link) => {
                        const isActive = (pathname === "/" && link.href === "/") || (pathname !== "/" && link.href.startsWith(pathname));
                        return (
                            <li key={link.href}>
                                <Link href={link.href}>
                                    <div className={cn(
                                        'flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors',
                                        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    )}>
                                        <link.icon className="h-6 w-6" />
                                        <span className="text-xs font-medium">
                                            {link.label}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default BottomNavbar;
