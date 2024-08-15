import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// Load environment variables
config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK
const serviceAccountPath = path.resolve(__dirname, '../config/serviceAccountKey.json');
const firebaseApp = initializeApp({
  credential: cert(serviceAccountPath),
  databaseURL: `https://${process.env.VITE_PROJECT_ID}.firebaseio.com`,
});

const db = getFirestore(firebaseApp);

export { db };