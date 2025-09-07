'use server';

import { createAdminClient } from '@/lib/appwrite-server';
import { ID } from 'node-appwrite';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function sendPasswordResetEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { account } = createAdminClient();
    const headersList = headers();
    const origin = headersList.get('origin');
    // The URL must be whitelisted in your Appwrite console
    const resetUrl = `${origin}/auth/reset`;

    await account.createRecovery(email, resetUrl);
    return { success: true };
  } catch (e: any) {
    // Don't reveal if the user does not exist or not.
    // Always return success to prevent email enumeration.
    if (
      e.type === 'user_not_found' ||
      e.type === 'general_unauthorized_scope'
    ) {
      return { success: true };
    }
    console.error('Failed to send password reset email:', e);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
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
    await account.updateRecovery(userId, secret, password, password);
    // Password was changed, redirect to login
    redirect('/login');
  } catch (e: any) {
    console.error('Failed to reset password:', e);
    if (e.message.includes('Invalid token')) {
      return { success: false, error: 'The recovery link is invalid or has expired. Please try again.' };
    }
    return { success: false, error: 'Failed to reset password. Please try again.' };
  }
}
