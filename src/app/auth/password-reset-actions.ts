
'use server';

import { createAdminClient } from '@/lib/appwrite-server';
import { setupOtpDatabase, getOtp, deleteOtp } from '@/lib/appwrite-db';
import { ID, Query } from 'node-appwrite';
import { redirect } from 'next/navigation';

// Helper function to send an email. In a real app, use a robust email service.
async function sendEmail(to: string, subject: string, text: string) {
  // This is a placeholder. For this to work, you MUST configure Appwrite's SMTP service.
  // Appwrite's createEmailToken is used here as a vehicle to send a templated email.
  // You need to create a custom email template in Appwrite for this.
  const { users, account } = createAdminClient();
  try {
     // Find the user to get their ID for the email sending function
    const userList = await users.list([Query.equal('email', [to])]);
    if (userList.users.length === 0) {
      // Don't throw an error to prevent email enumeration
      console.log(`Password reset attempted for non-existent user: ${to}`);
      return;
    }
    const user = userList.users[0];
    
    // We use Appwrite's built-in mailer. The 'token' in the Appwrite email template
    // will be our OTP text.
    await account.createToken(user.$id, to, text);

  } catch (error) {
    console.error("Failed to send OTP email:", error);
    // Do not rethrow to the client to avoid exposing internal errors.
  }
}

// Step 1: Send OTP
export async function sendResetOtp(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { users } = createAdminClient();
    await setupOtpDatabase();

    const userList = await users.list([Query.equal('email', [email])]);

    if (userList.users.length === 0) {
      // Silently succeed to prevent email enumeration
      console.log(`Password reset attempted for non-existent user: ${email}`);
      return { success: true };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const { databases } = createAdminClient();
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_OTPS_COLLECTION_ID!,
      ID.unique(),
      {
        email,
        otp,
        expiresAt: expiry.toISOString(),
      }
    );

    // IMPORTANT: For this to work, you MUST have an Appwrite email template for "Token"
    // that displays the token to the user. E.g., "Your verification code is {{token}}"
    await sendEmail(email, "Your Password Reset Code", otp);
    
    return { success: true };
  } catch (e: any) {
    console.error("Error in sendResetOtp:", e);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}

// Step 2: Verify OTP
export async function verifyResetOtp(
  email: string,
  otp: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const storedOtp = await getOtp(email, otp);

    if (!storedOtp) {
      return { success: false, error: 'Invalid or expired OTP.' };
    }

    return { success: true };
  } catch (e: any) {
    console.error("Error in verifyResetOtp:", e);
    return {
      success: false,
      error: 'An unexpected error occurred during OTP verification.',
    };
  }
}

// Step 3: Reset Password
export async function updatePasswordWithOtp(
  email: string,
  otp: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Re-verify OTP before changing password
    const storedOtp = await getOtp(email, otp);
    if (!storedOtp) {
      return { success: false, error: 'Invalid or expired OTP. Please start over.' };
    }
    
    const { users } = createAdminClient();
    const userList = await users.list([Query.equal('email', [email])]);
     if (userList.users.length === 0) {
      return { success: false, error: 'User not found.' };
    }
    const user = userList.users[0];

    await users.updatePassword(user.$id, password);

    // Invalidate the OTP
    await deleteOtp(storedOtp.$id);
    
  } catch (e: any) {
    console.error("Error in updatePasswordWithOtp:", e);
    return {
      success: false,
      error: 'Failed to reset password. Please try again.',
    };
  }

  // On success, redirect on the client-side after showing a success message.
  return { success: true };
}
