'use client';

import { useState, useMemo } from 'react';
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
import { Eye, EyeOff } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const password = form.watch('password');

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length > 8) score++;
    if (/\d/.test(password)) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strengthColor = useMemo(() => {
    switch(passwordStrength) {
      case 0:
      case 1: return 'bg-destructive';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-destructive';
    }
  }, [passwordStrength]);


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
    if (!userId || otp.length === 0) {
      return toast({
        variant: 'destructive',
        title: 'Invalid OTP',
        description: 'Please enter a valid OTP.',
      });
    }
    setIsLoading(true);
    const result = await verifyOtp(userId, otp);

    if (result && result.success) {
      toast({
        title: 'Account Verified!',
        description: 'Welcome! You have been logged in.',
      });
      setShowOtpDialog(false);
      router.push('/');
    } else {
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: result ? result.error : 'An unknown error occurred.',
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
                         <div className="relative">
                          <Input 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password" 
                            {...field} 
                            disabled={isLoading}
                            className="pr-10"
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                           >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                         </div>
                      </FormControl>
                      {password.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <Progress value={passwordStrength * 25} className={`h-1.5 [&>*]:transition-all [&>*]:duration-300 ${strengthColor}`} />
                           <p className="text-xs text-muted-foreground">
                            {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1]}
                          </p>
                        </div>
                      )}
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
