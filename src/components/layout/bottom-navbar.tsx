'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Search, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

const defaultLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/find', label: 'Find', icon: Search },
];

const BottomNavbar = () => {
  const pathname = usePathname();
  const { user, isLoading, checkUser } = useAuth();

  useEffect(() => {
    checkUser();
  }, [checkUser]);
  
  const navLinks = [
    ...defaultLinks,
    user
      ? { href: '/profile', label: 'Profile', icon: User }
      : { href: '/login', label: 'Login', icon: LogIn },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-t border-border/50 z-50">
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link href={link.href}>
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all duration-300 w-16 group',
                      isActive
                        ? 'text-primary scale-110'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <link.icon
                      className={cn(
                        'h-6 w-6 transition-transform',
                        isActive ? 'scale-110' : 'group-hover:scale-125'
                      )}
                    />
                    <span className="text-xs font-medium">{link.label}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavbar;
