import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import BottomNavbar from '@/components/layout/bottom-navbar';

export const metadata: Metadata = {
  title: "TrueFluence – Authentic Influence. Real Impact.",
  description: "A next-generation AI-powered Influencer Collaboration & Management Platform connecting authentic influencers with brands in a transparent, secure, and efficient ecosystem.",
  keywords: ["influencer marketing", "AI", "brand collaboration", "social media", "marketing platform"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pb-20 pt-4">{children}</main>
            <Footer />
          </div>
          <BottomNavbar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
