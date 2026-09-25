import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Add your Firebase web app configuration here (Firebase Console → Project settings → Your apps).
const firebaseConfig = {
  apiKey: 'AIzaSyD7NyXUw7mRFzwbgFD75nmi1-HHaFB21m4',
  authDomain: 'nexa-employee-portal.firebaseapp.com',
  projectId: 'nexa-employee-portal',
  storageBucket: 'nexa-employee-portal.firebasestorage.app',
  messagingSenderId: '437128317776',
  appId: '1:437128317776:web:2319bad429dc74d539fa55'
};

const configured = !Object.values(firebaseConfig).some(v => String(v).startsWith('YOUR_'));
let app, db, auth;
if (configured) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
}
export { db, auth, configured };
