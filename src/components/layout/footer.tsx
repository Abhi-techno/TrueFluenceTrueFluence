import React from 'react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/20 border-t border-white/10">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground">
              Authentic Influence. Real Impact. AI-Powered Influencer Marketing You Can Trust.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Youtube size={20} /></Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-foreground/90">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
              <li><Link href="#solution" className="text-muted-foreground hover:text-primary">For Brands</Link></li>
              <li><Link href="#solution" className="text-muted-foreground hover:text-primary">For Influencers</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-foreground/90">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Press</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-foreground/90">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-foreground/90">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TrueFluence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
