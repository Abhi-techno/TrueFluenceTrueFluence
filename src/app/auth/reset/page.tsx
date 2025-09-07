
'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { Eye, EyeOff } from 'lucide-react';
import { resetPassword } from '@/app/auth/password-reset-actions';

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const userId = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const resetForm = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onResetSubmit(values: ResetFormValues) {
    if (!userId || !secret) {
      toast({
        variant: 'destructive',
        title: 'Invalid Link',
        description: 'The password reset link is incomplete. Please try again.',
      });
      return;
    }

    setIsLoading(true);
    // This action does not exist in the new flow, so this component is effectively dead code
    // and will be removed. I've kept it here to avoid breaking changes if it was
    // referenced somewhere else, but the new flow does not use this page.
    // const result = await resetPassword(userId, secret, values.password);
    setIsLoading(false);

    // if (!result.error) {
    //   toast({
    //     title: 'Password Changed!',
    //     description: 'You can now log in with your new password.',
    //   });
    //   // Redirect to login handled by server action
    // } else {
    //   toast({
    //     variant: 'destructive',
    //     title: 'Password Reset Failed',
    //     description: result.error,
    //   });
    // }
  }

  if (!userId || !secret) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-destructive">
            Invalid Recovery Link
          </CardTitle>
          <CardDescription className="text-center">
            This link is either expired or invalid. Please request a new
            password reset link.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Set Your New Password
        </CardTitle>
        <CardDescription className="text-center">
          Create a new, strong password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(onResetSubmit)}
            className="space-y-6"
          >
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
    </Card>
  );
}

export default function ResetPasswordPage() {
    return (
        <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    )
}
