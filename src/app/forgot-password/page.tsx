'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { sendPasswordResetEmail, resetPassword } from '@/app/auth/actions';
import { Eye, EyeOff } from 'lucide-react';
import { account } from '@/lib/appwrite-client';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

const otpSchema = z.object({
  otp: z.string().min(1, { message: 'OTP is required.' }),
});

const resetSchema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type ResetFormValues = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [secret, setSecret] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onEmailSubmit(values: EmailFormValues) {
    setIsLoading(true);
    const result = await sendPasswordResetEmail(values.email);

    // This message is intentionally generic to prevent user enumeration.
    toast({
        title: 'Recovery Email Sent',
        description: 'If an account exists for this email, you will receive a recovery code.',
    });

    if (result.success) {
      try {
        const users = await account.listUsers(values.email);
        if (users.total > 0) {
            setUserId(users.users[0].$id);
            setUserEmail(values.email);
            setStep('otp');
        } else {
            // If user not found, redirect to login to complete the generic flow.
            router.push('/login');
        }
      } catch (e) {
          // If Appwrite throws (e.g. user not found), redirect to login
          router.push('/login');
      }
    } else {
        // Handle server-side errors from sendPasswordResetEmail if any
        toast({ variant: 'destructive', title: 'Error', description: result.error });
    }
    setIsLoading(false);
  }

  function onOtpSubmit(values: OtpFormValues) {
    setSecret(values.otp);
    setStep('reset');
  }

  async function onResetSubmit(values: ResetFormValues) {
    setIsLoading(true);

    if (!userId || !secret) {
        toast({ variant: 'destructive', title: 'Error', description: 'Something went wrong. Please restart the process.' });
        setIsLoading(false);
        return;
    }

    const result = await resetPassword({
        userId: userId,
        secret: secret,
        passwordNew: values.password,
    });

    if (result.success) {
      toast({
        title: 'Password Changed!',
        description: 'You can now log in with your new password.',
      });
      router.push('/login');
    } else {
      toast({
        variant: 'destructive',
        title: 'Password Reset Failed',
        description: result.error,
      });
    }
    setIsLoading(false);
  }

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Reset Your Password</CardTitle>
              <CardDescription className="text-center">Enter your email to receive a recovery code.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Recovery Code'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        );
      case 'otp':
        return (
          <>
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">Verify Your Identity</CardTitle>
                <CardDescription className="text-center">Enter the code sent to {userEmail}.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                        <FormField
                        control={otpForm.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Recovery Code (from Email)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the code from your email" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            Verify Code
                        </Button>
                    </form>
                </Form>
            </CardContent>
          </>
        );
      case 'reset':
        return (
          <>
             <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">Set Your New Password</CardTitle>
                <CardDescription className="text-center">Create a new, strong password.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
                    <FormField
                    control={resetForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input 
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter new password" 
                                    {...field} 
                                    disabled={isLoading} 
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                            <Input 
                                type="password"
                                placeholder="Confirm your new password" 
                                {...field} 
                                disabled={isLoading}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
                </Form>
            </CardContent>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md animate-fade-in-up">
        {renderStep()}
        <CardContent>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Remembered your password?{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                Log In
                </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
