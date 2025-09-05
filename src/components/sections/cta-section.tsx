import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
    return (
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center gap-6 text-center bg-primary text-primary-foreground p-8 md:p-16 rounded-xl shadow-2xl">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Ready to Experience Authentic Influence?
                    </h2>
                    <p className="max-w-2xl text-lg md:text-xl text-primary-foreground/80">
                        Join the fastest-growing network of trusted brands and verified influencers.
                        Sign up today and transform your marketing.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                        <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                            <Link href="#">Get Started as a Brand</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto">
                            <Link href="#">Join as an Influencer</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
