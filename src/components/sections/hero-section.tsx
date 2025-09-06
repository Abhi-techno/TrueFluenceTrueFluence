import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full filter blur-3xl opacity-30 animate-pulse-slow delay-2000"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="flex flex-col items-center space-y-6">
            <Badge variant="outline" className="py-2 px-4 rounded-full text-sm border-primary/30 bg-primary/10 text-primary">
              AI-Powered Influencer Marketing
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              TrueFluence – Authentic Influence. Real Impact.
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
              The next-generation AI platform connecting brands with verified, authentic influencers.
              Transparent, secure, and efficient collaborations for real results.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#">I'm a Brand</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href="#">I'm an Influencer</Link>
              </Button>
            </div>
          </div>
          <div className="mt-12 lg:mt-20">
            <div className="relative mx-auto max-w-6xl">
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-primary/20 to-accent/20 blur-xl opacity-50"></div>
                <Image
                  src="https://picsum.photos/1200/600"
                  alt="TrueFluence Dashboard"
                  width={1200}
                  height={600}
                  className="rounded-xl shadow-2xl ring-1 ring-border relative"
                  data-ai-hint="dashboard analytics"
                />
            </div>
          </div>
        </div>
    </section>
  );
}
