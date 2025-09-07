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
    
    // Create user
    const newUser = await users.create(
      ID.unique(),
      formData.email,
      undefined, // phone
      formData.password,
      formData.name
    );

    // Create email verification link
    // The URL should point to your app's verification page
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verification`;
    await account.createVerification(verificationUrl);
      
    return { success: true, userId: newUser.$id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function verifyEmail(userId: string, secret: string): Promise<FormState> {
    try {
        const { account } = await createAdminClient();
        
        // Verify the token by calling updateVerification
        await account.updateVerification(userId, secret);

        return { success: true, userId };
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
}
