import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import axios from 'axios';
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

// Function to fetch hospital data and save to Firebase
const fetchHospitalData = async () => {
  try {
    // Fetch hospital data from API
    const response = await axios.get('https://api.reliancehmo.com/v3/providers');
    
    // Log the entire response to understand its structure
    console.log('API Response:', JSON.stringify(response.data, null, 2));

    // If the response data is a single hospital object, wrap it in an array
    const hospitals = Array.isArray(response.data) ? response.data : [response.data];

    // Check if hospitals is an array
    if (!Array.isArray(hospitals)) {
      throw new Error('Expected an array of hospitals. Check the API response structure.');
    }

    // Log the number of hospitals and the first few entries to verify
    console.log(`Number of hospitals found: ${hospitals.length}`);
    if (hospitals.length > 0) {
      console.log('First hospital entry:', hospitals[0]);
    }

    // Save data to Firebase Firestore
    const collectionRef = db.collection('hospitals');

    // Clear existing data in the collection
    const snapshot = await collectionRef.get();
    const deletePromises = snapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    // Add new data using a batch
    const batch = db.batch();
    hospitals.forEach((hospital) => {
      // Validate hospital object
      if (typeof hospital.id !== 'number' || !hospital.name) {
        console.warn('Skipping invalid hospital entry:', hospital);
        return;
      }
      const docRef = collectionRef.doc(String(hospital.id));
      batch.set(docRef, hospital);
      console.log(`Added hospital ${hospital.name} to batch.`);
    });

    // Commit the batch write
    await batch.commit();
    console.log('Hospital data successfully saved to Firebase');
  } catch (error) {
    // Detailed error logging
    console.error('Error fetching or saving hospital data:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

// Run the function
fetchHospitalData();
