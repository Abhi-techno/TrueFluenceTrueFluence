'use server';

import { Databases, ID, Query } from 'node-appwrite';
import { createAdminClient } from './appwrite-server';

const OTP_DB_ID = '68c8a7c6b98bb3c8a9c2';
const OTP_COLLECTION_ID = '68c8a7d1d2c6b9a8a6b2';

let databases: Databases | null = null;

async function getDatabases() {
  if (databases) {
    return databases;
  }
  const { databases: db } = createAdminClient();
  databases = db;
  return databases;
}

export async function setupOtpDatabase() {
    const db = await getDatabases();
    try {
        await db.get(OTP_DB_ID);
    } catch (e) {
        // If DB doesn't exist, create it.
        if ((e as any).code === 404) {
            await db.create(OTP_DB_ID, 'TrueFluenceDB');
            await db.createCollection(
                OTP_DB_ID,
                OTP_COLLECTION_ID,
                'otps',
            );

            // Add attributes to the collection
            await db.createStringAttribute(OTP_DB_ID, OTP_COLLECTION_ID, 'email', 255, true);
            await db.createStringAttribute(OTP_DB_ID, OTP_COLLECTION_ID, 'otp', 10, true);
            await db.createIntegerAttribute(OTP_DB_ID, OTP_COLLECTION_ID, 'expiresAt', true);

            // Add indexes for querying
            await db.createIndex(OTP_DB_ID, OTP_COLLECTION_ID, 'email_index', 'key', ['email'], ['ASC']);

        } else {
            throw e;
        }
    }
}

export async function storeOtp(email: string, otp: string): Promise<void> {
    await setupOtpDatabase();
    const db = await getDatabases();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await db.createDocument(
        OTP_DB_ID,
        OTP_COLLECTION_ID,
        ID.unique(),
        {
            email,
            otp,
            expiresAt,
        }
    );
}

export async function getOtp(email: string, otp: string) {
    const db = await getDatabases();
    try {
        const response = await db.listDocuments(OTP_DB_ID, OTP_COLLECTION_ID, [
            Query.equal('email', email),
            Query.equal('otp', otp),
            Query.orderDesc('$createdAt'),
            Query.limit(1)
        ]);

        if (response.documents.length > 0) {
            return response.documents[0];
        }
        return null;
    } catch (e) {
        console.error("Error fetching OTP:", e);
        return null;
    }
}

export async function deleteOtp(documentId: string) {
    const db = await getDatabases();
    try {
        await db.deleteDocument(OTP_DB_ID, OTP_COLLECTION_ID, documentId);
    } catch (e) {
        console.error("Error deleting OTP:", e);
    }
}