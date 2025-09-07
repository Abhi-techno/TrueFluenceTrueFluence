
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { sendResetOtp, verifyResetOtp, updatePasswordWithOtp } from '@/app/auth/password-reset-actions';

// Schemas for each step of the form
const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
});

const otpSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be 6 digits.' }).max(6),
});

const resetSchema = z
  .object({
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Stage = 'email' | 'otp' | 'reset';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<Stage>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });
  
  async function onEmailSubmit(values: z.infer<typeof emailSchema>) {
    setIsLoading(true);
    const result = await sendResetOtp(values.email);
    setIsLoading(false);

    if (result.success) {
      setEmail(values.email);
      setStage('otp');
      toast({
        title: 'OTP Sent',
        description: 'Check your email for the One-Time Password.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  }

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    setIsLoading(true);
    const result = await verifyResetOtp(email, values.otp);
    setIsLoading(false);

    if (result.success) {
      setOtp(values.otp);
      setStage('reset');
      toast({
        title: 'OTP Verified',
        description: 'Please set your new password.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: result.error,
      });
    }
  }
  
  async function onResetSubmit(values: z.infer<typeof resetSchema>) {
    setIsLoading(true);
    const result = await updatePasswordWithOtp(email, otp, values.password);
    setIsLoading(false);

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
  }

  const renderStage = () => {
    switch (stage) {
      case 'email':
        return (
          <>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Reset Your Password</CardTitle>
              <CardDescription className="text-center">
                Enter your email to receive a recovery code.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form
                  onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            disabled={isLoading}
                          />
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
                <CardDescription className="text-center">
                    Enter the 6-digit code sent to {email}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
                        <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            maxLength={6}
                                            placeholder="123456"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
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
                    <CardTitle className="text-center text-2xl font-bold">Set New Password</CardTitle>
                    <CardDescription className="text-center">
                        Create a new, strong password.
                    </CardDescription>
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
                                            {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                            ) : (
                                            <Eye className="h-5 w-5" />
                                            )}
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
        {renderStage()}
         <p className="mt-4 text-center text-sm text-muted-foreground p-6 pt-0">
            Remembered your password?{' '}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Log In
            </Link>
          </p>
      </Card>
    </div>
  );
}

