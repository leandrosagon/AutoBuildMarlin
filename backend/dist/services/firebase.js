import { env } from '../config/env.js';
let initialized = false;
export function getFirebaseAdmin() {
    if (!env.firebaseProjectId || !env.firebaseClientEmail || !env.firebasePrivateKey) {
        return null; // not configured
    }
    if (!initialized) {
        // Lazy init to avoid requiring firebase-admin if not configured
        const admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: env.firebaseProjectId,
                clientEmail: env.firebaseClientEmail,
                privateKey: env.firebasePrivateKey
            })
        });
        initialized = true;
    }
    return require('firebase-admin');
}
