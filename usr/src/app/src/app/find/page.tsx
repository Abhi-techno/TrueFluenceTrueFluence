"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FindPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter">Find Influencers</h1>
            <p className="max-w-[900px] text-muted-foreground text-lg">
                Discover the perfect match for your brand.
            </p>
        </div>

        <Card className="bg-secondary/30 border-secondary">
            <CardHeader>
                <CardTitle>Search Criteria</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <Input placeholder="Niche (e.g., Fashion, Gaming)" />
                    <Input placeholder="Audience Size (e.g., 10k-50k)" />
                    <Input placeholder="Location (e.g., Mumbai)" />
                    <Button type="submit" className="w-full">
                        <Search className="mr-2 h-4 w-4" />
                        Find Influencers
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  );
}
