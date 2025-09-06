import { ShieldCheck, Lock, Scale, Landmark, MessageCircle } from "lucide-react";

const securityFeatures = [
    {
        icon: <Lock className="h-8 w-8 text-primary" />,
        title: "Blockchain-Powered Contracts",
        description: "Tamper-proof collaboration agreements ensure every detail is recorded and immutable."
    },
    {
        icon: <ShieldCheck className="h-8 w-8 text-primary" />,
        title: "AI Fraud Detection",
        description: "Our algorithms constantly scan for fake followers, bot engagement, and low authenticity."
    },
    {
        icon: <Landmark className="h-8 w-8 text-primary" />,
        title: "Secure Escrow System",
        description: "Protects payments with our secure escrow, releasing funds only after deliverables are met."
    },
    {
        icon: <Scale className="h-8 w-8 text-primary" />,
        title: "Two-Sided Rating System",
        description: "Builds long-term trust and accountability by allowing both brands and influencers to rate each other."
    },
    {
        icon: <MessageCircle className="h-8 w-8 text-primary" />,
        title: "Encrypted Communication",
        description: "Secure, end-to-end encrypted chat and calls for all collaborations."
    }
];

export function SecuritySection() {
    return (
        <section id="security" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">Security & Trust</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Foundation of Trust</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        We've built TrueFluence on a robust framework of security measures to protect every user.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                    {securityFeatures.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary/30 transition-colors group">
                             <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold mt-2 mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
