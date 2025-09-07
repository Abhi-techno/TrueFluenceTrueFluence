import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Verified, BrainCircuit, LayoutDashboard, Banknote, TrendingUp, Search, ShieldCheck, FileText, Landmark, LineChart } from "lucide-react";

const influencerFeatures = [
    { icon: <Verified className="h-6 w-6 text-primary" />, title: "Verified Identity & Social Proof", description: "AI-based profile scoring, KYC, and API integration to prove your authenticity." },
    { icon: <TrendingUp className="h-6 w-6 text-primary" />, title: "AI Growth Insights", description: "Track real-time audience engagement, authenticity, and content performance." },
    { icon: <BrainCircuit className="h-6 w-6 text-primary" />, title: "Smart Pricing AI", description: "Get data-driven suggestions for fair pricing on posts, stories, and reels." },
    { icon: <LayoutDashboard className="h-6 w-6 text-primary" />, title: "Unified Campaign Manager", description: "Handle multiple brand deals and communications in one clean dashboard." },
    { icon: <Banknote className="h-6 w-6 text-primary" />, title: "Guaranteed Earning Protection", description: "Our secure escrow system ensures you get paid on time, every time." },
];

const brandFeatures = [
    { icon: <Search className="h-6 w-6 text-primary" />, title: "AI-Powered Matchmaker", description: "Instantly find the perfect-fit influencers for your niche, budget, and goals." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Advanced Fraud Detection", description: "Our AI filters out influencers with fake followers or inflated stats." },
    { icon: <FileText className="h-6 w-6 text-primary" />, title: "Effortless Campaign Brief Tool", description: "Create detailed campaign objectives and timelines in minutes." },
    { icon: <Landmark className="h-6 w-6 text-primary" />, title: "Secure Escrow & Digital Contracts", description: "Payment is held securely and released only after deliverables are met." },
    { icon: <LineChart className="h-6 w-6 text-primary" />, title: "Real-Time Performance Analytics", description: "Track your campaign's ROI with live data on reach, clicks, and conversions." },
];

export function SolutionSection() {
    return (
        <section id="solution" className="w-full py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20 shadow-sm">The Solution</div>
                    <h2 className="text-4xl font-extrabold tracking-tight">A Trust-First Ecosystem</h2>
                    <p className="max-w-[900px] text-muted-foreground text-lg">
                        TrueFluence empowers both sides of the collaboration with powerful, easy-to-use tools.
                    </p>
                </div>
                <Tabs defaultValue="brands" className="w-full max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <TabsList className="grid w-full grid-cols-2 h-14 bg-secondary p-1.5 rounded-xl shadow-inner-lg">
                        <TabsTrigger value="brands" className="text-base rounded-lg">For Brands</TabsTrigger>
                        <TabsTrigger value="influencers" className="text-base rounded-lg">For Influencers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="brands" className="mt-10 data-[state=active]:animate-fade-in-up" style={{ animationDuration: '600ms' }}>
                        <div className="grid gap-6">
                            {brandFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-5 p-5 rounded-xl transition-all duration-300 hover:bg-secondary/60 animate-fade-in-up group" style={{ animationDelay: `${index * 120}ms`, animationDuration: '500ms' }}>
                                    <div className="flex-shrink-0 mt-1 p-3.5 bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                                      {React.cloneElement(feature.icon, { className: 'h-6 w-6 text-primary transition-transform group-hover:rotate-6' })}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="influencers" className="mt-10 data-[state=active]:animate-fade-in-up" style={{ animationDuration: '600ms' }}>
                        <div className="grid gap-6">
                            {influencerFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-5 p-5 rounded-xl transition-all duration-300 hover:bg-secondary/60 animate-fade-in-up group" style={{ animationDelay: `${index * 120}ms`, animationDuration: '500ms' }}>
                                    <div className="flex-shrink-0 mt-1 p-3.5 bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                                      {React.cloneElement(feature.icon, { className: 'h-6 w-6 text-primary transition-transform group-hover:rotate-6' })}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
