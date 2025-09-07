'use server';

import { createAdminClient } from '@/lib/appwrite-server';
import { storeOtp, getOtp, deleteOtp } from '@/lib/appwrite-db';
import { ID, AppwriteException } from 'node-appwrite';

// Step 1: Send OTP to user's email
export async function sendResetOtp(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { account, users } = createAdminClient();
    
    // Check if user exists
    try {
        await users.list([ID.custom(email)]);
    } catch (e) {
         // Appwrite throws if user is not found, which is expected in some cases.
         // We'll return a generic success message to prevent user enumeration.
        if ((e as AppwriteException).code === 404 || (e as AppwriteException).code === 400) {
             return { success: true }; // Pretend success
        }
        throw e; // Re-throw other errors
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in the database with an expiry
    await storeOtp(email, otp);

    // Send the OTP via email using createEmailToken as a transport mechanism
    // The user will receive an email containing this token.
    // **IMPORTANT**: The Appwrite email template for "Password Reset" MUST be
    // configured to display the {{token}} directly.
    await account.createToken(ID.unique(), email, ['password-reset'], `Your password reset OTP is: ${otp}`);
    
    return { success: true };
  } catch (e: any) {
    console.error(e);
    // Generic error to avoid leaking information
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}

// Step 2: Verify the OTP entered by the user
export async function verifyResetOtp(email: string, otp: string): Promise<{ success: boolean; error?: string }> {
  try {
    const storedOtpDoc = await getOtp(email, otp);

    if (!storedOtpDoc) {
      return { success: false, error: 'Invalid OTP.' };
    }

    if (Date.now() > storedOtpDoc.expiresAt) {
      // Clean up expired OTP
      await deleteOtp(storedOtpDoc.$id);
      return { success: false, error: 'OTP has expired. Please request a new one.' };
    }

    return { success: true };
  } catch (e: any) {
    console.error(e);
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
        const { account, users } = createAdminClient();
        
        // First, re-verify the OTP to make sure it's still valid
        const storedOtpDoc = await getOtp(email, otp);
        if (!storedOtpDoc || Date.now() > storedOtpDoc.expiresAt) {
            return { success: false, error: 'Invalid or expired OTP. Please restart the process.' };
        }

        // Get user to update password
        const userList = await users.list([ID.custom(email)]);
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
        console.error(e);
        return { success: false, error: 'Failed to reset password. Please try again.' };
    }
}