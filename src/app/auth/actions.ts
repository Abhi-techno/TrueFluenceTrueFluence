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

    // Create email verification token
    await account.createEmailToken(
        newUser.$id,
        formData.email
    );
      
    return { success: true, userId: newUser.$id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function verifyEmail(userId: string, secret: string): Promise<FormState> {
    try {
        const { account } = await createAdminClient();
        
        // Verify the token
        await account.updateEmailVerification(userId, secret);

        // Create a session for the user
        const session = await account.createSession(userId, secret);

        // Set the session cookie
        cookies().set(
            'appwrite-session',
            session.secret,
            {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
            }
        );

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
    return { success: true };
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
