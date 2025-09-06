import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const testimonials = [
    {
        name: "Sarah L.",
        role: "Founder, EcoBloom",
        avatar: "https://picsum.photos/100/100?random=1",
        testimonial: "TrueFluence revolutionized how we find influencers. The AI matchmaking is scarily accurate and saved us countless hours. We found partners who genuinely love our brand.",
        aiHint: "woman portrait"
    },
    {
        name: "David Chen",
        role: "Fitness Influencer",
        avatar: "https://picsum.photos/100/100?random=2",
        testimonial: "Finally, a platform that respects creators. The growth insights are invaluable, and the escrow system gives me peace of mind to focus on creating great content.",
        aiHint: "man portrait"
    },
    {
        name: "Priya Sharma",
        role: "Marketing Head, TechSavvy",
        avatar: "https://picsum.photos/100/100?random=3",
        testimonial: "The transparency is a game-changer. We can track ROI in real-time and the fraud detection has saved us from wasting our budget. Highly recommend for any brand.",
        aiHint: "woman portrait"
    }
];

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Brands & Influencers</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                        Don't just take our word for it. Here's what our users are saying.
                    </p>
                </div>
                <Carousel
                    opts={{ align: "start", loop: true }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2">
                                <div className="p-1">
                                    <Card className="h-full bg-secondary/20 border-secondary">
                                        <CardContent className="flex flex-col items-start justify-between p-6 h-full">
                                            <blockquote className="text-muted-foreground italic border-l-2 border-primary pl-4 mb-6">"{item.testimonial}"</blockquote>
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={item.avatar} alt={item.name} data-ai-hint={item.aiHint} />
                                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{item.name}</p>
                                                    <p className="text-sm text-muted-foreground">{item.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
}
