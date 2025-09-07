'use server';

import { cookies } from 'next/headers';
import { createAdminClient, createSessionClient } from '@/lib/appwrite-server';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';

interface FormState {
  success: boolean;
  error?: string;
  userId?: string;
}

export async function signup(formData: {name: string, email: string, password: string }): Promise<FormState> {
  try {
    const { users, account } = await createAdminClient();
    
    const newUser = await users.create(
      ID.unique(),
      formData.email,
      undefined, // phone
      formData.password,
      formData.name
    );

    // Create a token for email verification (OTP)
    const token = await account.createEmailToken(newUser.$id, formData.email);
      
    return { success: true, userId: newUser.$id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function verifyOtp(userId: string, secret: string): Promise<FormState> {
    try {
        const { account } = await createAdminClient();
        
        // This will verify the token and log the user in
        const session = await account.createSession(userId, secret);

        cookies().set('appwrite-session', session.secret, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          expires: new Date(session.expire),
        });

        redirect('/');
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function login(formData: {email: string, password: string }): Promise<FormState> {
  try {
    const { account } = await createSessionClient(cookies());
    await account.createEmailPasswordSession(
      formData.email,
      formData.password
    );
    redirect('/');
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function logout() {
  try {
    const { account } = await createSessionClient(cookies());
    await account.deleteSession('current');
  } catch (e: any) {
    // Fail silently
  }
  redirect('/login');
}

export async function sendPasswordResetEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { account } = await createAdminClient();
    // The URL is required but we won't use it, as our UI is in-app.
    // The secret token sent in the email will be used as the OTP.
    await account.createRecovery(email, `${process.env.NEXT_PUBLIC_APP_URL}/login`);
    return { success: true };
  } catch (e: any) {
    // Appwrite throws an error if user is not found. 
    // We catch it and return a generic success message to prevent user enumeration.
    if (e.code === 404) {
      return { success: true };
    }
    return { success: false, error: e.message };
  }
}

export async function resetPassword(formData: {
  userId: string;
  secret: string;
  passwordNew: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { account } = await createAdminClient();
    await account.updateRecovery(
      formData.userId,
      formData.secret,
      formData.passwordNew,
      formData.passwordNew
    );
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}
