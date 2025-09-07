import React from "react";
import { ShieldCheck, Lock, Scale, Landmark, MessageCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const securityFeatures = [
    {
        icon: <Lock className="h-8 w-8 text-primary" />,
        title: "Blockchain-Powered Contracts",
        description: "Tamper-proof agreements ensure every detail is recorded and immutable."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "AI Fraud Detection",
        description: "Our algorithms constantly scan for fake followers and bot engagement."
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary" />,
        title: "Secure Escrow System",
        description: "Funds are protected and released only after deliverables are met."
    },
    {
        icon: <Scale className="h-8 w-8 text-primary" />,
        title: "Two-Sided Rating System",
        description: "Both brands and influencers rate each other to build long-term trust."
    },
];

export function SecuritySection() {
    return (
        <section id="security" className="w-full py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                            Your Foundation of Trust
                        </Badge>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter">Built with AI + Blockchain Security</h2>
                    <p className="max-w-[900px] text-muted-foreground text-lg">
                        We've built TrueFluence on a robust framework of security measures to protect every user.
                    </p>
                </div>
                <div className="max-w-md mx-auto grid grid-cols-1 gap-8">
                    {securityFeatures.map((feature, index) => (
                        <Card 
                            key={index} 
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-transparent hover:border-primary/30 transition-all group animate-fade-in-up hover:shadow-xl hover:-translate-y-1"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                             <CardHeader className="p-0 mb-4">
                                <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                                    {React.cloneElement(feature.icon, { className: 'h-8 w-8 text-primary transition-transform group-hover:scale-110 group-hover:-rotate-6' })}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
