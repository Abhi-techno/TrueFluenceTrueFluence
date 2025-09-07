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

    // Create a token for email verification
    const token = await account.createEmailToken(newUser.$id, formData.email);
      
    return { success: true, userId: newUser.$id };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function verifyOtp(userId: string, secret: string): Promise<FormState> {
    try {
        const { account } = await createAdminClient();
        
        const session = await account.createSession(userId, secret);

        cookies().set('appwrite-session', session.secret, {
          path: '/',
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          expires: new Date(session.expire),
        });

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
