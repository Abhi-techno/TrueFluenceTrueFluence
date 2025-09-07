"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Chat messages will go here */}
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="https://picsum.photos/100?random=4" alt="Bot" data-ai-hint="logo robot" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="bg-secondary p-3 rounded-lg rounded-tl-none max-w-xs">
            <p className="font-semibold text-sm mb-1">TrueFluence Bot</p>
            <p className="text-sm">
              Welcome to the chat! How can I help you find the perfect influencer today?
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 justify-end">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-xs">
                <p className="text-sm">
                    I'm looking for a fashion influencer in Mumbai with over 50k followers.
                </p>
            </div>
          <Avatar className="h-10 w-10 border-2 border-muted">
            <AvatarImage src="https://picsum.photos/100?random=5" alt="User" data-ai-hint="user portrait" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

      </div>

      <div className="p-4 bg-background border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip />
          </Button>
          <Input placeholder="Type a message..." className="flex-1" />
          <Button>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
