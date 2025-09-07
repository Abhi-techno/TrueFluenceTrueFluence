"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { chat } from '@/ai/flows/truefluence-chatbot';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Welcome to TrueFluence! I'm your AI assistant. Are you a Brand or an Influencer?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chat({ message: input });
      const botMessage: Message = { text: result.response, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 animate-fade-in-up ${message.isUser ? 'justify-end' : ''}`}>
            {!message.isUser && (
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src="https://picsum.photos/100?random=4" alt="Bot" data-ai-hint="logo robot" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div className={`p-3 rounded-lg max-w-xs shadow-md ${message.isUser ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-secondary rounded-tl-none'}`}>
              {!message.isUser && <p className="font-semibold text-sm mb-1 text-primary">TrueFluence Bot</p>}
              <p className="text-sm">{message.text}</p>
            </div>
            {message.isUser && (
              <Avatar className="h-10 w-10 border-2 border-muted">
                <AvatarImage src="https://picsum.photos/100?random=5" alt="User" data-ai-hint="user portrait" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isLoading && (
            <div className="flex items-start gap-3 animate-fade-in-up">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src="https://picsum.photos/100?random=4" alt="Bot" data-ai-hint="logo robot" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-secondary p-3 rounded-lg rounded-tl-none max-w-xs shadow-md">
                <p className="text-sm">Typing...</p>
              </div>
            </div>
          )}
      </div>

      <div className="p-4 bg-background border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="group">
            <Paperclip className="transition-transform group-hover:scale-110" />
          </Button>
          <Input
            placeholder="Type a message..."
            className="flex-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button className="group" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="transition-transform group-hover:scale-110 group-hover:-rotate-12" />
          </Button>
        </div>
      </div>
    </div>
  );
