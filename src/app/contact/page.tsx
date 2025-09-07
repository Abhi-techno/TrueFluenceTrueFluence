"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter animate-fade-in-down">Get in Touch</h1>
            <p className="max-w-[900px] text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              Have a question or want to work with us? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full pb-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-10">
            <Card className="bg-card border border-border/50 animate-fade-in-up shadow-lg" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <Card className="bg-card border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Our Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <MapPin className="h-6 w-6 text-primary mt-1 transition-transform group-hover:scale-125" />
                    <div>
                      <p className="font-semibold">TrueFluence India</p>
                      <p className="text-muted-foreground">456 Tech Park, Koramangala<br/>Bengaluru, Karnataka 560095</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Mail className="h-6 w-6 text-primary mt-1 transition-transform group-hover:scale-125" />
                    <div>
                      <p className="font-semibold">Email Us</p>
                      <p className="text-muted-foreground">contact@truefluence.in</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group">
                    <Phone className="h-6 w-6 text-primary mt-1 transition-transform group-hover:scale-125" />
                    <div>
                      <p className="font-semibold">Call Us</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
