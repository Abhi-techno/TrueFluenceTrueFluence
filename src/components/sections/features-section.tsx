import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Verified, Search, FileText, Landmark, TrendingUp, BarChart, Layers } from "lucide-react";

const coreFeatures = [
  { icon: <Verified className="h-8 w-8 text-primary" />, title: "Influencer Verification", description: "AI-based profile scoring and KYC to verify influencer identities and stamp out fraud." },
  { icon: <Search className="h-8 w-8 text-primary" />, title: "Smart Matchmaking", description: "Our AI matches brands with the most suitable influencers based on niche, audience, and goals." },
  { icon: <FileText className="h-8 w-8 text-primary" />, title: "Campaign Brief Tool", description: "An intuitive tool for brands to create clear campaign objectives, deliverables, and timelines." },
  { icon: <Landmark className="h-8 w-8 text-primary" />, title: "Secure Escrow System", description: "Protect payments with our secure escrow, releasing funds only after deliverables are met." },
  { icon: <Layers className="h-8 w-8 text-primary" />, title: "Subscription Tiers", description: "Influencers can subscribe to different tiers for varying levels of visibility and features." },
  { icon: <BarChart className="h-8 w-8 text-primary" />, title: "Performance Analytics", description: "Access real-time campaign ROI tracking for reach, clicks, and conversions." },
  { icon: <TrendingUp className="h-8 w-8 text-primary" />, title: "AI Growth Insights", description: "Influencers get AI-powered insights on audience engagement and content performance to grow faster." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-fade-in-up">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">Core Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Built for Impact</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Every feature is designed to foster trust, drive efficiency, and deliver measurable results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="text-center p-6 bg-secondary/20 border-secondary hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
              <CardHeader className="flex flex-col items-center p-0 mb-4">
                <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4 group-hover:scale-110 duration-300">
                    {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
