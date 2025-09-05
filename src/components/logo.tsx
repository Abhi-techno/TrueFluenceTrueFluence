import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <div className={`inline-flex items-center gap-2 ${className}`}>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0L32 9.2376V22.7624L16 32L0 22.7624V9.2376L16 0Z" fill="url(#paint0_linear_logo)"/>
        <path d="M16.0001 21.3333C18.9456 21.3333 21.3334 18.9455 21.3334 16C21.3334 13.0545 18.9456 10.6667 16.0001 10.6667C13.0546 10.6667 10.6667 13.0545 10.6667 16C10.6667 18.9455 13.0546 21.3333 16.0001 21.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 5.33331V7.99998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 24V26.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.88916 8.88916L10.7781 10.778" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21.2222 21.2222L23.1111 23.1111" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5.33331 16H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 16H26.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.88916 23.1111L10.7781 21.2222" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21.2222 10.778L23.1111 8.88916" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="paint0_linear_logo" x1="16" y1="0" x2="16" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#29ABE2"/>
                <stop offset="1" stopColor="#1E88A8"/>
            </linearGradient>
        </defs>
    </svg>
    <span className="text-xl font-bold text-foreground">TrueFluence</span>
  </div>
);

export default Logo;
