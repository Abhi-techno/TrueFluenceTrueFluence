'use server';

import { createAdminClient } from '@/lib/appwrite-server';
import { storeOtp, getOtp, deleteOtp } from '@/lib/appwrite-db';
import { ID } from 'node-appwrite';
import { Query } from 'appwrite';

// Step 1: Send OTP to user's email
export async function sendResetOtp(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { account, users } = createAdminClient();
    
    // Check if user exists
    try {
        const userList = await users.list([Query.equal('email', email)]);
        if (userList.total === 0) {
            // To prevent user enumeration, we return success even if the email is not found.
            // This is a security measure. The UI will indicate that if an account exists, an email has been sent.
            return { success: true };
        }
    } catch (e: any) {
        // If there's an error listing users, still pretend success to not leak info.
        console.error("Error checking for user:", e);
        return { success: true };
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in the database with an expiry
    await storeOtp(email, otp);

    // This is a workaround to send a simple text email via Appwrite.
    // The Appwrite email template for "General" (createToken) must be configured
    // to display the token. E.g., "Your password reset OTP is: {{token}}"
    // The 'url' param is mandatory but we don't need it.
    await account.createToken(ID.unique(), email, ['password-reset'], `http://localhost/reset`, otp);
    
    return { success: true };
  } catch (e: any) {
    console.error("Failed to send OTP:", e);
    // Generic error to avoid leaking information
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

// Step 2: Verify the OTP entered by the user
export async function verifyResetOtp(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
  try {
    const storedOtpDoc = await getOtp(email, otp);

    if (!storedOtpDoc) {
      return { success: false, error: 'Invalid or expired OTP. Please try again.' };
    }

    // The Date.now() > storedOtpDoc.expiresAt check is not strictly needed here because
    // a background process could clean up expired OTPs, but it's good for immediate feedback.
    // However, the getOtp function already handles finding non-expired tokens.
    
    return { success: true };
  } catch (e: any) {
    console.error("Failed to verify OTP:", e);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}

// Step 3: Reset password after successful OTP verification
export async function updatePasswordWithOtp(
    email: string, 
    otp: string, 
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    try {
        // First, re-verify the OTP to make sure it's still valid
        const storedOtpDoc = await getOtp(email, otp);
        if (!storedOtpDoc) {
            return { success: false, error: 'Invalid or expired OTP. Please restart the process.' };
        }

        const { users } = createAdminClient();
        
        // Get user to update password
        const userList = await users.list([Query.equal('email', email)]);
        if (userList.total === 0) {
            return { success: false, error: "User not found." };
        }
        const user = userList.users[0];
        
        // Update user's password
        await users.updatePassword(user.$id, newPassword);

        // Invalidate the OTP after use
        await deleteOtp(storedOtpDoc.$id);
        
        // Delete all sessions for the user to force re-login
        await users.deleteSessions(user.$id);

        return { success: true };
    } catch (e: any) {
        console.error("Failed to reset password:", e);
        return { success: false, error: 'Failed to reset password. Please try again.' };
    }
}
