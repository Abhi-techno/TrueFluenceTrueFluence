import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Verified, BrainCircuit, LayoutDashboard, Banknote, TrendingUp, Search, ShieldCheck, FileText, Landmark, LineChart } from "lucide-react";

const influencerFeatures = [
    { icon: <Verified className="h-6 w-6 text-primary" />, title: "Verified Identity & Social Proof", description: "AI-based profile scoring, KYC, and API integration with social platforms to prove your authenticity." },
    { icon: <TrendingUp className="h-6 w-6 text-primary" />, title: "AI Growth Insights", description: "Track real-time audience engagement, authenticity, and content performance to grow your brand." },
    { icon: <BrainCircuit className="h-6 w-6 text-primary" />, title: "Smart Pricing AI", description: "Get data-driven suggestions for fair pricing on posts, stories, reels, and collaborations." },
    { icon: <LayoutDashboard className="h-6 w-6 text-primary" />, title: "Unified Campaign Manager", description: "Handle multiple brand deals, deliverables, and communications in one clean dashboard." },
    { icon: <Banknote className="h-6 w-6 text-primary" />, title: "Guaranteed Earning Protection", description: "Our secure escrow system ensures you get paid on time, every time, after completing your work." },
];

const brandFeatures = [
    { icon: <Search className="h-6 w-6 text-primary" />, title: "AI-Powered Matchmaker", description: "Instantly find the perfect-fit influencers for your niche, audience size, budget, and goals." },
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Advanced Fraud Detection", description: "Our AI filters out influencers with fake followers or inflated stats, ensuring genuine reach." },
    { icon: <FileText className="h-6 w-6 text-primary" />, title: "Effortless Campaign Brief Tool", description: "Create detailed campaign objectives, deliverables, and timelines in minutes with our guided tool." },
    { icon: <Landmark className="h-6 w-6 text-primary" />, title: "Secure Escrow & Digital Contracts", description: "Payment is held securely and released only after deliverables are met, eliminating financial risk." },
    { icon: <LineChart className="h-6 w-6 text-primary" />, title: "Real-Time Performance Analytics", description: "Track your campaign's ROI with live data on reach, clicks, engagement, and conversions." },
];

export function SolutionSection() {
    return (
        <section id="solution" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">The Solution</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Trust-First Ecosystem</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        TrueFluence empowers both sides of the collaboration with powerful, easy-to-use tools.
                    </p>
                </div>
                <Tabs defaultValue="brands" className="w-full max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 h-12 bg-secondary/50">
                        <TabsTrigger value="brands" className="text-base">For Brands</TabsTrigger>
                        <TabsTrigger value="influencers" className="text-base">For Influencers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="brands" className="mt-8">
                        <div className="grid gap-6">
                            {brandFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-background/50">
                                    <div className="flex-shrink-0 mt-1 p-2 bg-primary/10 rounded-full">{feature.icon}</div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="influencers" className="mt-8">
                        <div className="grid gap-6">
                            {influencerFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-lg transition-colors hover:bg-background/50">
                                    <div className="flex-shrink-0 mt-1 p-2 bg-primary/10 rounded-full">{feature.icon}</div>
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
