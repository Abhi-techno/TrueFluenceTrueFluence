'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { signup, verifyOtp } from '@/app/auth/actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signup(values);
    setIsLoading(false);

    if (result.success && result.userId) {
      setUserId(result.userId);
      setShowOtpDialog(true);
      toast({
        title: 'OTP Sent!',
        description: 'Check your email for the One-Time Password.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: result.error,
      });
    }
  }

  async function handleVerifyOtp() {
    if (!userId || otp.length < 6) {
      return toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'Please enter a valid OTP.',
      });
    }
    setIsLoading(true);
    const result = await verifyOtp(userId, otp);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'Account Verified!',
        description: 'Welcome! You have been logged in.',
      });
      setShowOtpDialog(false);
      router.push('/');
      router.refresh(); // To update auth state
    } else {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: result.error,
      });
    }
  }

  return (
    <>
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <Card className="w-full max-w-md animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
              </form>
            </Form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Log In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Verification Code</DialogTitle>
            <DialogDescription>
              A One-Time Password has been sent to your email. Please enter it below to verify your account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              disabled={isLoading}
            />
            <Button onClick={handleVerifyOtp} className="w-full" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify & Login'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
