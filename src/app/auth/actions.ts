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

    // Create email verification token (OTP)
    const token = await account.createEmailToken(
        newUser.$id,
        formData.email
    );
      
    console.log('Email token created:', token);

    return { success: true, userId: newUser.$id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function verifyEmail(userId: string, secret: string): Promise<FormState> {
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession(userId, secret);
        
        const sessionClient = await createSessionClient(cookies());
        cookies().set(
            sessionClient.client.config.sessionName,
            session.secret,
            sessionClient.client.config.sessionOptions
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
