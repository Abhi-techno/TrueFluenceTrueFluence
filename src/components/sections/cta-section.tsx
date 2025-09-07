import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function CtaSection() {
    return (
        <section id="cta" className="w-full py-20 md:py-28 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-6 text-center bg-card/50 backdrop-blur-sm p-8 md:p-16 rounded-3xl shadow-2xl overflow-hidden relative border border-primary/20 animate-fade-in-up">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/10 animate-pulse-slow"></div>
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-40 animate-pulse-slow"></div>
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-40 animate-pulse-slow delay-1000"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                            Ready to Experience Authentic Influence?
                        </h2>
                        <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
                            Join the fastest-growing network of trusted brands and verified influencers.
                            Sign up today and transform your marketing.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                            <Button asChild size="lg" className="w-full sm:w-auto group/cta">
                                <Link href="#">
                                    Get Started as a Brand
                                    <MoveRight className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-foreground hover:bg-primary/10 hover:text-primary-foreground">
                                <Link href="#">Join as an Influencer</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}