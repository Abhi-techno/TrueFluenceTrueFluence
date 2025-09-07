import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 pb-12 bg-background overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(hsl(var(--primary)/0.1)_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-col items-center space-y-6 animate-fade-in-down">
            <Badge variant="outline" className="py-2 px-4 rounded-full text-sm border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all shadow-sm">
              AI-Powered Influencer Marketing
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground">
              TrueFluence – Authentic Influence. Real Impact.
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
              The next-generation AI platform connecting brands with verified, authentic influencers.
              Transparent, secure, and efficient collaborations for real results.
            </p>
            <div className="flex flex-col items-center gap-4 w-full">
              <Button asChild size="lg" className="w-full group/hero shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                <Link href="#">
                  I'm a Brand
                  <ArrowRight className="transition-transform duration-300 group-hover/hero:translate-x-1" />
                  </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full bg-transparent border-primary/50 text-foreground hover:bg-primary/10 hover:text-primary-foreground">
                <Link href="#">I'm an Influencer</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 animate-zoom-in" style={{ animationDelay: '300ms' }}>
            <div className="relative mx-auto max-w-6xl">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-tr from-primary/10 to-accent/10 blur-xl opacity-60"></div>
                <Image
                  src="https://picsum.photos/1200/600"
                  alt="TrueFluence Dashboard"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-2xl ring-1 ring-border/50 relative transform hover:scale-[1.02] transition-transform duration-500 w-full h-auto"
                  data-ai-hint="dashboard analytics"
                />
            </div>
          </div>
        </div>
    </section>
  );
}
