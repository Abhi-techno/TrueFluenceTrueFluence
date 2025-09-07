'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmail } from '@/app/auth/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function VerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');

    if (!userId || !secret) {
      setStatus('error');
      setError('Invalid verification link. Please try signing up again.');
      return;
    }

    async function handleVerification() {
      const result = await verifyEmail(userId, secret);
      if (result.success) {
        setStatus('success');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setStatus('error');
        setError(result.error || 'An unknown error occurred.');
      }
    }

    handleVerification();
  }, [searchParams, router]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md animate-fade-in-up">
        <CardHeader className="items-center text-center">
          {status === 'verifying' && <CardTitle>Verifying Your Account...</CardTitle>}
          {status === 'success' && <CardTitle className="text-green-500 flex items-center gap-2"><CheckCircle /> Account Verified!</CardTitle>}
          {status === 'error' && <CardTitle className="text-destructive flex items-center gap-2"><XCircle /> Verification Failed</CardTitle>}
        </CardHeader>
        <CardContent className="text-center">
          {status === 'verifying' && <p>Please wait while we verify your email address.</p>}
          {status === 'success' && (
            <div>
              <p>Your email has been successfully verified. You will be redirected to the login page shortly.</p>
              <Button asChild className="mt-4">
                <Link href="/login">Login Now</Link>
              </Button>
            </div>
          )}
          {status === 'error' && (
             <div>
              <p className="text-destructive">{error}</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/signup">Return to Signup</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


export default function VerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerificationContent />
        </Suspense>
    )
}
