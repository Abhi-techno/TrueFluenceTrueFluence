'use server';

import { Databases, ID, Query } from 'node-appwrite';
import { createAdminClient } from './appwrite-server';

const OTP_DB_ID = '68c8a7c6b98bb3c8a9c2';
const OTP_COLLECTION_ID = '68c8a7d1d2c6b9a8a6b2';
let databases: Databases | null = null;
let dbSetupDone = false;

async function getDatabases() {
  if (databases) {
    return databases;
  }
  const { databases: db } = createAdminClient();
  databases = db;
  return databases;
}

// Sets up the database and collection if they don't exist
async function setupOtpDatabase() {
    if (dbSetupDone) return;
    const db = await getDatabases();
    try {
        await db.get(OTP_DB_ID);
    } catch (e: any) {
        if (e.code === 404) {
            await db.create(OTP_DB_ID, 'TrueFluenceDB');
            await db.createCollection(OTP_DB_ID, OTP_COLLECTION_ID, 'otps');
            await db.createStringAttribute(OTP_DB_ID, OTP_COLLECTION_ID, 'email', 255, true);
            await db.createStringAttribute(OTP_DB_ID, OTP_COLLECTION_ID, 'otp', 10, true);
            await db.createIntegerAttribute(OTP_DB_ID, OTP_COLLECTION_ID, 'expiresAt', true);
            await db.createIndex(OTP_DB_ID, OTP_COLLECTION_ID, 'email_index', 'key', ['email'], ['ASC']);
            await db.createIndex(OTP_DB_ID, OTP_COLLECTION_ID, 'otp_index', 'key', ['otp'], ['ASC']);
        } else {
            console.error("Error checking/creating database:", e);
            throw e;
        }
    }
    dbSetupDone = true;
}

// Stores an OTP with an email and expiry time
export async function storeOtp(email: string, otp: string): Promise<void> {
    await setupOtpDatabase();
    const db = await getDatabases();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Optional: Clean up old OTPs for the same email
    try {
        const oldOtps = await db.listDocuments(OTP_DB_ID, OTP_COLLECTION_ID, [Query.equal('email', email)]);
        for (const oldOtp of oldOtps.documents) {
            await db.deleteDocument(OTP_DB_ID, OTP_COLLECTION_ID, oldOtp.$id);
        }
    } catch (error) {
        // Log but don't block if cleanup fails
        console.error("Error cleaning up old OTPs:", error);
    }

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

// Retrieves a valid OTP document
export async function getOtp(email: string, otp: string) {
    const db = await getDatabases();
    try {
        const response = await db.listDocuments(OTP_DB_ID, OTP_COLLECTION_ID, [
            Query.equal('email', email),
            Query.equal('otp', otp),
            Query.greaterThan('expiresAt', Date.now()), // Check for expiration
            Query.orderDesc('$createdAt'),
            Query.limit(1)
        ]);

        if (response.documents.length > 0) {
            return response.documents[0];
        }
        return null;
    } catch (e) {
        console.error("Error fetching OTP:", e);
        // This might happen if the collection/db is not ready yet,
        // so we try to set it up again just in case.
        await setupOtpDatabase();
        return null;
    }
}

// Deletes an OTP document after use
export async function deleteOtp(documentId: string) {
    const db = await getDatabases();
    try {
        await db.deleteDocument(OTP_DB_ID, OTP_COLLECTION_ID, documentId);
    } catch (e) {
        // It's not critical if this fails, so just log the error.
        console.error("Error deleting OTP:", e);
    }
}
