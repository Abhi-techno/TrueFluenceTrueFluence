'use server';

import { createAdminClient } from '@/lib/appwrite-server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function sendPasswordResetEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { account } = createAdminClient();
    const headersList = headers();
    const origin = headersList.get('origin');
    // The URL must be whitelisted in your Appwrite console under the platform settings
    const resetUrl = `${origin}/auth/reset`;

    await account.createRecovery(email, resetUrl);

    return { success: true };
  } catch (e: any) {
    // To prevent email enumeration, we always return a success message.
    // Appwrite's createRecovery will not throw an error for a non-existent email by default.
    // We log the actual error for debugging but don't expose it to the client.
    console.error('Failed to send password reset email:', e.message);

    // If Appwrite *does* throw an error (e.g., rate-limiting), we can return a generic error.
    if (e.type && e.type.startsWith('general_')) {
       return { success: true }; // Still return success to prevent enumeration
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

export async function resetPassword(
  userId: string,
  secret: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { account } = createAdminClient();
    // The secret is the token from the URL
    await account.updateRecovery(userId, secret, password, password);
    // Password was changed, redirect to login
  } catch (e: any) {
    console.error('Failed to reset password:', e);
    if (e.message.includes('Invalid token')) {
      return { success: false, error: 'The recovery link is invalid or has expired. Please request a new one.' };
    }
    return { success: false, error: 'Failed to reset password. Please try again.' };
  }
  
  redirect('/login');
}
