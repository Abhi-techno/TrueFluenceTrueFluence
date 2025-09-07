"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit, LogOut, Settings, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 animate-fade-in-down">
          <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
            <AvatarImage src="https://picsum.photos/200" alt="User" data-ai-hint="user portrait" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Alex Doe</h1>
            <p className="text-muted-foreground">alex.doe@example.com</p>
          </div>
          <Button variant="outline" className="group">
            <Edit className="mr-2 h-4 w-4 transition-transform group-hover:scale-125" />
            Edit Profile
          </Button>
        </div>

        <Separator className="my-8 bg-border/50" />

        <Card className="bg-card border-border/50 animate-fade-in-up shadow-lg">
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start group text-base py-6">
                    <Settings className="mr-4 transition-transform group-hover:rotate-45"/>
                    <span>Settings</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start group text-base py-6">
                    <Shield className="mr-4 transition-transform group-hover:scale-110"/>
                    <span>Privacy & Security</span>
                </Button>
                 <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive group text-base py-6">
                    <LogOut className="mr-4 transition-transform group-hover:translate-x-1"/>
                    <span>Logout</span>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
