import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Bot, IndianRupee, EyeOff, ShieldAlert, Users } from "lucide-react";

const problems = [
  {
    icon: <Bot className="h-10 w-10 text-accent" />,
    title: "Fake Engagement",
    description: "Wasted spend on bots",
  },
  {
    icon: <IndianRupee className="h-10 w-10 text-accent" />,
    title: "High Costs & Fees",
    description: "Hefty, unclear agency fees",
  },
  {
    icon: <EyeOff className="h-10 w-10 text-accent" />,
    title: "Lack of Transparency",
    description: "Struggle to track true ROI",
  },
  {
    icon: <ShieldAlert className="h-10 w-10 text-accent" />,
    title: "Risk of Fraud",
    description: "Payment and deliverable scams",
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: "Small Businesses Left Out",
    description: "Priced out of the market",
  },
];

export function ProblemsSection() {
  return (
    <section id="problems" className="w-full py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-fade-in-up">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium text-accent">The Problem</div>
          <h2 className="text-3xl font-bold tracking-tighter">Influencer Marketing is Broken</h2>
          <p className="max-w-[900px] text-muted-foreground text-lg">
            The industry is plagued by issues of trust, transparency, and accessibility.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-xs mx-auto animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <CarouselContent>
            {problems.map((problem, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="h-full bg-card border hover:border-accent/40 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center aspect-square">
                      <div className="p-4 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300 mb-4">
                        {React.cloneElement(problem.icon, { className: 'h-10 w-10 text-accent transition-transform group-hover:scale-110' })}
                      </div>
                      <CardTitle className="text-xl mb-1 text-foreground">{problem.title}</CardTitle>
                      <p className="text-muted-foreground">{problem.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2" />
          <CarouselNext className="-right-2" />
        </Carousel>
      </div>
    </section>
  );
}
