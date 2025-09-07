"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

export default function FindPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="text-center animate-fade-in-down">
            <h1 className="text-3xl font-bold tracking-tighter">
              Find Your Perfect Influencer
            </h1>
            <p className="max-w-[900px] mx-auto text-muted-foreground text-lg">
              Use our advanced filters to discover the perfect match for your brand.
            </p>
          </div>
          <Card className="bg-card border-border/50 animate-fade-in-up shadow-lg">
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by niche, keyword, or name..."
                    className="pl-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                      <SelectItem value="tech">Tech & Gadgets</SelectItem>
                      <SelectItem value="beauty">Beauty & Cosmetics</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="travel">Travel & Lifestyle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followers">Follower Count</Label>
                  <Slider defaultValue={[50000]} max={1000000} step={1000} id="followers" />
                   <div className="text-sm text-muted-foreground text-center">50,000+</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                   <Input placeholder="e.g., Mumbai, India" id="location" />
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
