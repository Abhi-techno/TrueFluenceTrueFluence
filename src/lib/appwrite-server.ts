import { Client, Account, Users, Databases } from 'node-appwrite';
import { cookies } from 'next/headers';

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    },
    get databases() {
        return new Databases(client);
    }
  };
}

export async function createSessionClient(cookieStore: ReturnType<typeof cookies>) {
  const session = cookieStore.get('appwrite-session');

  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
  
  if (session) {
    client.setSession(session.value);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}
