import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export function CtaSection() {
    return (
        <section id="cta" className="w-full py-20 md:py-28 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-6 text-center bg-card p-8 md:p-16 rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden relative border border-primary/20 animate-fade-in-up">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow delay-1000"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                            Ready to Experience Authentic Influence?
                        </h2>
                        <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
                            Join the fastest-growing network of trusted brands and verified influencers.
                            Sign up today and transform your marketing.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
                            <Button asChild size="lg" className="w-full sm:w-auto group/cta shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                                <Link href="#">
                                    Get Started as a Brand
                                    <MoveRight className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-foreground hover:bg-primary/10 hover:text-primary-foreground border-primary/30 hover:border-primary">
                                <Link href="#">Join as an Influencer</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
