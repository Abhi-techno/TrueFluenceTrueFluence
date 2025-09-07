
'use server';

import { Client, Databases, ID, Query } from 'node-appwrite';

const getClient = () => {
    return new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!);
}

export async function setupOtpDatabase() {
    const client = getClient();
    const databases = new Databases(client);

    const dbId = process.env.APPWRITE_DATABASE_ID!;
    const collectionId = process.env.APPWRITE_OTPS_COLLECTION_ID!;

    try {
        await databases.get(dbId);
    } catch (error: any) {
        if (error.code === 404) {
            try {
                await databases.create(dbId, 'TrueFluenceDB');
                await databases.createCollection(dbId, collectionId, 'OTPs');

                await databases.createStringAttribute(dbId, collectionId, 'email', 255, true);
                await databases.createStringAttribute(dbId, collectionId, 'otp', 10, true);
                await databases.createDatetimeAttribute(dbId, collectionId, 'expiresAt', true);

                console.log("OTP Database and Collection created successfully.");
            } catch (setupError) {
                console.error("Error setting up OTP database:", setupError);
                throw new Error("Could not initialize OTP database.");
            }
        } else {
            console.error("Error checking for database:", error);
            throw error;
        }
    }
}

export async function getOtp(email: string, otp: string): Promise<any | null> {
    await setupOtpDatabase();
    const client = getClient();
    const databases = new Databases(client);

    try {
        const response = await databases.listDocuments(
            process.env.APPWRITE_DATABASE_ID!,
            process.env.APPWRITE_OTPS_COLLECTION_ID!,
            [
                Query.equal('email', email),
                Query.equal('otp', otp),
                Query.greaterThan('expiresAt', new Date().toISOString())
            ]
        );

        return response.documents.length > 0 ? response.documents[0] : null;
    } catch(e) {
        console.error("Failed to get OTP", e);
        return null;
    }
}

export async function deleteOtp(documentId: string): Promise<void> {
     const client = getClient();
     const databases = new Databases(client);
     try {
         await databases.deleteDocument(
             process.env.APPWRITE_DATABASE_ID!,
             process.env.APPWRITE_OTPS_COLLECTION_ID!,
             documentId
         );
     } catch (e) {
         console.error("Failed to delete OTP", e);
         // Fail silently, it will expire anyway
     }
}
