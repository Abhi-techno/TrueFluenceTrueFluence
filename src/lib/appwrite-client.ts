'use client';

import { Client, Account } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

// This check prevents the build from failing on Vercel if env vars are not set.
// The app will not function correctly without them, but it will build.
if (endpoint && projectId) {
    client
        .setEndpoint(endpoint)
        .setProject(projectId);
}

export const account = new Account(client);
