import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDdJAG7d8a_4hX4m95z7xFKp4_O5qskcHk',
  authDomain: 'what-sapp-clone12.firebaseapp.com',
  projectId: 'what-sapp-clone12',
  storageBucket: 'what-sapp-clone12.appspot.com',
  messagingSenderId: '787731890831',
  appId: '1:787731890831:web:8d7a5d3deb7c507ce526fa',
};

export const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
