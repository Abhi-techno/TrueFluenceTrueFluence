'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit, LogOut, Settings, Shield } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isLoading, checkUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="text-center space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <Separator className="my-8" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4 animate-fade-in-down">
          <Avatar className="h-24 w-24 border-4 border-primary shadow-lg">
            <AvatarImage src={`https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(user.name)}`} alt={user.name} data-ai-hint="user portrait" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
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
              <Settings className="mr-4 transition-transform group-hover:rotate-45" />
              <span>Settings</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start group text-base py-6">
              <Shield className="mr-4 transition-transform group-hover:scale-110" />
              <span>Privacy & Security</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive group text-base py-6"
              onClick={handleLogout}
            >
              <LogOut className="mr-4 transition-transform group-hover:translate-x-1" />
              <span>Logout</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
