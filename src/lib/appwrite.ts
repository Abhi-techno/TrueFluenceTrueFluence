'use client';

import { Client, Account } from 'appwrite';

let appwriteClient: Client | null = null;
let appwriteAccount: Account | null = null;

export const getAppwriteClient = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (appwriteClient && appwriteAccount) {
    return appwriteAccount;
  }

  const client = new Client();

  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (endpoint && projectId) {
      client
          .setEndpoint(endpoint)
          .setProject(projectId);
  } else {
    console.error("Appwrite environment variables are not set.");
    return null;
  }
  
  appwriteClient = client;
  appwriteAccount = new Account(appwriteClient);

  return appwriteAccount;
};
