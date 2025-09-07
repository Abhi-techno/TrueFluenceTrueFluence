"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FindPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center animate-fade-in-down">
            <h1 className="text-3xl font-bold tracking-tighter">
              Find Influencers
            </h1>
            <p className="max-w-[900px] mx-auto text-muted-foreground text-lg">
              Discover the perfect match for your brand.
            </p>
          </div>
          <Card className="bg-secondary/30 border-secondary animate-fade-in-up">
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by niche, keyword, or name..."
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="w-full group">
                  <Search className="mr-2 transition-transform group-hover:scale-125" />
                  Find Influencers
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
