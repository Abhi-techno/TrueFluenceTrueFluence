import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const tiers = [
    {
        name: "Basic",
        price: "Free",
        description: "Get started and become visible to brands.",
        features: ["Verified Profile", "Basic Visibility", "Accept Collabs"],
        isPopular: false,
    },
    {
        name: "Pro",
        price: "1499",
        pricePrefix: "₹",
        priceSuffix: "/ month",
        description: "Unlock analytics and get a trust badge.",
        features: ["Everything in Basic", "Pro Verified Badge", "AI Growth Insights", "Enhanced Visibility"],
        isPopular: true,
    },
    {
        name: "Premium",
        price: "3999",
        pricePrefix: "₹",
        priceSuffix: "/ month",
        description: "For serious creators who want priority access.",
        features: ["Everything in Pro", "Premium Placement", "Priority Support", "Smart Pricing AI"],
        isPopular: false,
    }
];

export function PricingSection() {
    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">Influencer Pricing</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Invest in Your Growth</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Choose a plan that fits your journey. Free for all brands, forever.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                    {tiers.map((tier, index) => (
                        <Card 
                            key={tier.name} 
                            className={`flex flex-col rounded-xl transition-all duration-300 animate-fade-in-up ${tier.isPopular ? 'border-primary border-2 shadow-2xl shadow-primary/10 -translate-y-4 bg-card' : 'bg-card/80 backdrop-blur-sm border-border/20 hover:border-primary/40 hover:-translate-y-2'}`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <CardHeader className="p-6">
                                {tier.isPopular && <div className="text-xs font-semibold text-primary mb-2 tracking-widest uppercase">Most Popular</div>}
                                <CardTitle className="text-2xl text-foreground">{tier.name}</CardTitle>
                                <div className="flex items-baseline gap-1 pt-4 text-foreground">
                                    {tier.pricePrefix && <span className="text-2xl font-semibold">{tier.pricePrefix}</span>}
                                    <span className="text-4xl font-bold">{tier.price}</span>
                                    {tier.priceSuffix && <span className="text-muted-foreground">{tier.priceSuffix}</span>}
                                </div>
                                <CardDescription className="pt-1 h-12">{tier.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow p-6 border-t border-b border-border/20">
                                <ul className="space-y-3">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="p-6 mt-auto">
                                <Button className="w-full" variant={tier.isPopular ? 'default' : 'outline'}>
                                    Get Started
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}