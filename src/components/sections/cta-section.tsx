import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
    return (
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-6 text-center bg-secondary/50 p-8 md:p-16 rounded-xl shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/10"></div>
                    <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl opacity-50"></div>
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl opacity-50"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Ready to Experience Authentic Influence?
                        </h2>
                        <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
                            Join the fastest-growing network of trusted brands and verified influencers.
                            Sign up today and transform your marketing.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                            <Button asChild size="lg" className="w-full sm:w-auto">
                                <Link href="#">Get Started as a Brand</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                                <Link href="#">Join as an Influencer</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
