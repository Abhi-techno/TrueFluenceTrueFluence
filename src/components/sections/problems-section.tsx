import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, IndianRupee, EyeOff, ShieldAlert, Users } from "lucide-react";

const problems = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Fake Engagement",
    description: "Up to 40% of influencers use bots or fake followers, leading to wasted marketing spend.",
  },
  {
    icon: <IndianRupee className="h-8 w-8 text-primary" />,
    title: "High Costs & Fees",
    description: "Traditional agencies and platforms charge hefty fees, making influencer marketing inaccessible for many.",
  },
  {
    icon: <EyeOff className="h-8 w-8 text-primary" />,
    title: "Lack of Transparency",
    description: "Brands struggle to track the true ROI of their campaigns, with unclear metrics and results.",
  },
  {
    icon: <ShieldAlert className="h-8 w-8 text-primary" />,
    title: "Risk of Fraud",
    description: "Delayed payments, missed deliverables, and outright scams are common risks for both parties.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Small Businesses Left Out",
    description: "High costs and complexity prevent small businesses from leveraging influencer marketing.",
  },
];

export function ProblemsSection() {
  return (
    <section id="problems" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-primary">The Problem</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Influencer Marketing is Broken</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Despite its potential, the industry is plagued by issues of trust, transparency, and accessibility.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <Card 
              key={problem.title} 
              className="flex flex-col items-start p-6 text-left bg-card border hover:border-primary/40 transition-all duration-300 group animate-fade-in-up hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
              >
              <CardHeader className="p-0 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">{problem.icon}</div>
              </CardHeader>
              <CardContent className="p-0">
                <CardTitle className="text-xl mb-2 text-foreground">{problem.title}</CardTitle>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
