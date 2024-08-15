import { db } from './firebaseAdmin.js'; // Import the Firestore instance

const readHospitalData = async () => {
  try {
    const collectionRef = db.collection('hospitals');
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      console.log('No hospital data found.');
      return;
    }

    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Error reading hospital data:', error);
  }
};

readHospitalData();
